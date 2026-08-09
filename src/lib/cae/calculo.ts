// ─── Motor de cálculo del CAE ─────────────────────────────────────────────────
//
// Funciones puras, sin React y sin efectos. El dato normativo está en
// `fichas.ts`; aquí solo se aplica.
//
// La fórmula de RES022 es AE = mín(S × VAUZ, 0,50 × CEF). El segundo término es
// el que casi nadie aplica y el que hace que un presupuesto salga mal: puede
// dejar el ahorro por debajo de un tercio del que da la tabla.

import {
  VAUZ_RES022, RT_MINIMA_RES022, TOPE_SOBRE_CEF_RES022,
  LAMBDA_D_POR_DEFECTO, CEF_REFERENCIA_KWH_M2,
  RENDIMIENTO_CALDERA_RES060, FACTOR_PONDERACION_RES060,
  tramoDeAnio, esZonaRES022,
} from './fichas'

/**
 * Cota de cordura para λd. Fuera de este rango no es un dato del BOE que se
 * pueda cuestionar: es un error de tecleo o de unidad, y calcular un espesor
 * con eso produce una cifra absurda (ver crítico de la revisión del 8-ago).
 */
export const LAMBDA_D_RANGO = { min: 0.010, max: 0.100 } as const

export interface EntradaRES022 {
  /** Zona climática del CTE. RES022 solo aplica en C, D y E. */
  zona: string
  anioConstruccion: number
  /** Superficie en planta de la partición horizontal rehabilitada, m². */
  superficieM2: number
  /** Consumo de calefacción del certificado energético previo, kWh/año. Opcional. */
  cefCalefaccionKwhAnio?: number | null
  /** Conductividad declarada del aislante, W/mK. */
  lambdaD?: number
}

export interface PuntoSensibilidad {
  /** Consumo unitario supuesto, kWh/m²·año */
  cefUnitario: number
  /** Consumo total resultante para la superficie dada, kWh/año */
  cefTotal: number
  /** Ahorro que quedaría con ese consumo, kWh/año */
  ahorroKwh: number
  /** Porcentaje que representa sobre el techo */
  pctSobreTecho: number
}

export interface ResultadoRES022 {
  aplicable: boolean
  motivoNoAplicable: string | null
  /** Valor unitario aplicado, kWh/m² */
  vauz: number
  /** Techo: S × VAUZ, kWh/año */
  aesKwh: number
  /** 0,50 × CEF, kWh/año. `null` si no se aportó el consumo */
  topeKwh: number | null
  /** mín(AEs, tope). `null` si no se aportó el consumo: solo hay techo */
  ahorroKwh: number | null
  /** `true` si el tope es lo que limita. `null` si no se aportó el consumo */
  mandaTope: boolean | null
  espesorMinimoMm: number
  /** `false` cuando λd está fuera del rango plausible: no se calcula un espesor con ese dato. */
  espesorCalculable: boolean
  /** `true` cuando no se indicó λd (o no era positiva) y se aplicó 0,035 W/mK por defecto. */
  lambdaDPorDefecto: boolean
  /** Solo se rellena cuando NO hay consumo aportado */
  sensibilidad: PuntoSensibilidad[]
}

const NO_APLICABLE: Omit<ResultadoRES022, 'motivoNoAplicable'> = {
  aplicable: false, vauz: 0, aesKwh: 0, topeKwh: null,
  ahorroKwh: null, mandaTope: null, espesorMinimoMm: 0,
  espesorCalculable: true, lambdaDPorDefecto: false, sensibilidad: [],
}

export function calcularRES022(e: EntradaRES022): ResultadoRES022 {
  if (!esZonaRES022(e.zona)) {
    return {
      ...NO_APLICABLE,
      motivoNoAplicable:
        'La ficha RES022 solo se aplica en las zonas climáticas C, D y E.',
    }
  }
  if (!(e.superficieM2 > 0)) {
    return {
      ...NO_APLICABLE,
      motivoNoAplicable: 'Introduce la superficie tratada para poder calcular.',
    }
  }

  const vauz = VAUZ_RES022[e.zona][tramoDeAnio(e.anioConstruccion)]
  const aesKwh = Math.round(e.superficieM2 * vauz)

  const lambdaDPorDefecto = !(e.lambdaD && e.lambdaD > 0)
  const lambda = lambdaDPorDefecto ? LAMBDA_D_POR_DEFECTO : (e.lambdaD as number)
  const lambdaDFueraDeRango =
    !lambdaDPorDefecto && (lambda < LAMBDA_D_RANGO.min || lambda > LAMBDA_D_RANGO.max)
  const espesorCalculable = !lambdaDFueraDeRango
  const espesorMinimoMm = espesorCalculable
    ? Math.round(RT_MINIMA_RES022[e.zona] * lambda * 1000)
    : 0

  // Un consumo cero o negativo se trata como ausente: no es un dato, es un error.
  const cef =
    e.cefCalefaccionKwhAnio != null && e.cefCalefaccionKwhAnio > 0
      ? e.cefCalefaccionKwhAnio
      : null

  if (cef === null) {
    const sensibilidad: PuntoSensibilidad[] = CEF_REFERENCIA_KWH_M2.map((u) => {
      const cefTotal = u * e.superficieM2
      const ahorro = Math.min(aesKwh, Math.round(TOPE_SOBRE_CEF_RES022 * cefTotal))
      return {
        cefUnitario: u,
        cefTotal,
        ahorroKwh: ahorro,
        pctSobreTecho: Math.round((ahorro / aesKwh) * 100),
      }
    })
    return {
      aplicable: true, motivoNoAplicable: null, vauz, aesKwh,
      topeKwh: null, ahorroKwh: null, mandaTope: null,
      espesorMinimoMm, espesorCalculable, lambdaDPorDefecto, sensibilidad,
    }
  }

  const topeKwh = Math.round(TOPE_SOBRE_CEF_RES022 * cef)
  const ahorroKwh = Math.min(aesKwh, topeKwh)
  return {
    aplicable: true, motivoNoAplicable: null, vauz, aesKwh,
    topeKwh, ahorroKwh, mandaTope: topeKwh < aesKwh,
    espesorMinimoMm, espesorCalculable, lambdaDPorDefecto, sensibilidad: [],
  }
}

// ─── RES060 · Sustitución de caldera por bomba de calor ───────────────────────
//
// AE = FP · [ (D_cal · S) · (1/ηi − 1/SCOP) + D_ACS · (1/ηi − 1/SCOP_dhw) ]
//
// A diferencia de la RES022 no hay tope, pero la dependencia del certificado
// energético previo es total: D_cal y D_ACS salen de él. Por eso aquí no cabe
// un «techo» como en buhardillas — sin certificado no hay cálculo posible, y
// decirlo es más honesto que ofrecer un número orientativo.

export interface EntradaRES060 {
  /** Demanda de calefacción del CEE ANTERIOR a la actuación, kWh/m²·año */
  demandaCalefaccionKwhM2: number
  /** Superficie útil habitable, m² */
  superficieUtilM2: number
  /** Demanda de ACS del CEE ANTERIOR a la actuación, kWh/año. 0 si no aplica */
  demandaAcsKwhAnio: number
  /** Rendimiento estacional de la bomba de calor en calefacción */
  scopCalefaccion: number
  /** Rendimiento estacional en ACS. Si no produce ACS, se ignora */
  scopAcs?: number
  /** Rendimiento de la caldera sustituida. Por defecto el 0,92 de la ficha */
  rendimientoCaldera?: number
}

export interface ResultadoRES060 {
  aplicable: boolean
  motivoNoAplicable: string | null
  /** Ahorro imputable a calefacción, kWh/año */
  ahorroCalefaccionKwh: number
  /** Ahorro imputable a ACS, kWh/año */
  ahorroAcsKwh: number
  /** Suma, kWh/año */
  ahorroKwh: number
  /** Rendimiento de caldera aplicado */
  rendimientoCaldera: number
  /** `true` si se usó el 0,92 por defecto de la ficha en vez de un dato propio */
  rendimientoPorDefecto: boolean
}

const RES060_NO_APLICABLE: Omit<ResultadoRES060, 'motivoNoAplicable'> = {
  aplicable: false, ahorroCalefaccionKwh: 0, ahorroAcsKwh: 0, ahorroKwh: 0,
  rendimientoCaldera: RENDIMIENTO_CALDERA_RES060, rendimientoPorDefecto: true,
}

export function calcularRES060(e: EntradaRES060): ResultadoRES060 {
  const eta =
    e.rendimientoCaldera && e.rendimientoCaldera > 0
      ? e.rendimientoCaldera
      : RENDIMIENTO_CALDERA_RES060
  const porDefecto = !(e.rendimientoCaldera && e.rendimientoCaldera > 0)

  if (!(e.scopCalefaccion > 0)) {
    return {
      ...RES060_NO_APLICABLE,
      motivoNoAplicable:
        'Falta el rendimiento estacional (SCOP) de la bomba de calor: viene en su ficha técnica.',
    }
  }
  if (!(e.demandaCalefaccionKwhM2 > 0) || !(e.superficieUtilM2 > 0)) {
    return {
      ...RES060_NO_APLICABLE,
      motivoNoAplicable:
        'Faltan la demanda de calefacción y la superficie útil. Ambas salen del certificado energético anterior a la obra: sin él no hay cálculo posible.',
    }
  }
  // Una bomba con SCOP por debajo del rendimiento de la caldera no ahorraría
  // nada. No debería ocurrir, pero el término se anula en vez de restar.
  const factorCal = Math.max(0, 1 / eta - 1 / e.scopCalefaccion)
  const ahorroCal = FACTOR_PONDERACION_RES060 * e.demandaCalefaccionKwhM2 * e.superficieUtilM2 * factorCal

  const scopAcs = e.scopAcs && e.scopAcs > 0 ? e.scopAcs : null
  const ahorroAcs =
    scopAcs && e.demandaAcsKwhAnio > 0
      ? FACTOR_PONDERACION_RES060 * e.demandaAcsKwhAnio * Math.max(0, 1 / eta - 1 / scopAcs)
      : 0

  // El total es la SUMA DE LOS REDONDEOS, no el redondeo de la suma: si no,
  // las dos partes que se muestran en pantalla no cuadran con su total y
  // parece un error de la herramienta. Aquí se pierde como mucho 1 kWh.
  const calRedondeado = Math.round(ahorroCal)
  const acsRedondeado = Math.round(ahorroAcs)

  return {
    aplicable: true,
    motivoNoAplicable: null,
    ahorroCalefaccionKwh: calRedondeado,
    ahorroAcsKwh: acsRedondeado,
    ahorroKwh: calRedondeado + acsRedondeado,
    rendimientoCaldera: eta,
    rendimientoPorDefecto: porDefecto,
  }
}

/**
 * Convierte kWh de ahorro en euros según un rango de precio por MWh.
 * El valor en euros SIEMPRE es un rango, porque el precio se negocia.
 */
export function valorarKwh(
  kwh: number,
  precio: { min: number; max: number },
): { min: number; max: number } {
  return {
    min: Math.round((kwh / 1000) * precio.min),
    max: Math.round((kwh / 1000) * precio.max),
  }
}
