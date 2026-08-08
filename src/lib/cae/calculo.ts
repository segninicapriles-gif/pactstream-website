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
  tramoDeAnio, esZonaRES022,
} from './fichas'

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
  /** Solo se rellena cuando NO hay consumo aportado */
  sensibilidad: PuntoSensibilidad[]
}

const NO_APLICABLE: Omit<ResultadoRES022, 'motivoNoAplicable'> = {
  aplicable: false, vauz: 0, aesKwh: 0, topeKwh: null,
  ahorroKwh: null, mandaTope: null, espesorMinimoMm: 0, sensibilidad: [],
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

  const lambda = e.lambdaD && e.lambdaD > 0 ? e.lambdaD : LAMBDA_D_POR_DEFECTO
  const espesorMinimoMm = Math.round(RT_MINIMA_RES022[e.zona] * lambda * 1000)

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
      espesorMinimoMm, sensibilidad,
    }
  }

  const topeKwh = Math.round(TOPE_SOBRE_CEF_RES022 * cef)
  const ahorroKwh = Math.min(aesKwh, topeKwh)
  return {
    aplicable: true, motivoNoAplicable: null, vauz, aesKwh,
    topeKwh, ahorroKwh, mandaTope: topeKwh < aesKwh,
    espesorMinimoMm, sensibilidad: [],
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
