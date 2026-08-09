// ─── Catálogo de fichas del sistema CAE ───────────────────────────────────────
//
// Solo dato normativo. La lógica vive en `calculo.ts`.
//
// Cada valor es transcripción literal del BOE. Si un número no está en el BOE,
// no entra aquí: el ahorro lo audita un verificador acreditado por ENAC y una
// constante inventada es un expediente rechazado.
//
// Fuente RES022: BOE-A-2026-12283, Resolución de 3 de junio de 2026 (BOE núm.
// 138, de 6 de junio de 2026), que actualiza el anexo I de la Orden
// TED/845/2023. Verificado el 7-ago-2026.

export type ZonaClimaticaRES022 = 'C' | 'D' | 'E'
export type TramoAntiguedad = 'hasta1978' | 'de1979a2006' | 'desde2007'

export const FICHA_RES022 = {
  codigo: 'RES022',
  version: 'V1.0',
  denominacion:
    'Rehabilitación de buhardillas o desvanes no habitables de edificios de viviendas',
  boe: 'BOE-A-2026-12283',
  finPeriodoTransitorio: '2026-09-07',
} as const

/**
 * Valor unitario del ahorro por zona climática y antigüedad, en kWh/m².
 * Anexo I de la resolución.
 *
 * OJO: es un TECHO. El ahorro final lo topa el consumo de calefacción real.
 */
export const VAUZ_RES022: Record<ZonaClimaticaRES022, Record<TramoAntiguedad, number>> = {
  C: { hasta1978: 70, de1979a2006: 60, desde2007: 60 },
  D: { hasta1978: 125, de1979a2006: 100, desde2007: 100 },
  E: { hasta1978: 150, de1979a2006: 130, desde2007: 100 },
}

/** Resistencia térmica mínima del aislamiento, en m²K/W. El espesor sale de e = Rt · λd. */
export const RT_MINIMA_RES022: Record<ZonaClimaticaRES022, number> = {
  C: 3.8,
  D: 4.0,
  E: 4.7,
}

/** Fracción máxima del consumo de calefacción previo reconocible como ahorro. */
export const TOPE_SOBRE_CEF_RES022 = 0.5

/** Conductividad declarada por defecto, en W/mK. Lana mineral corriente. */
export const LAMBDA_D_POR_DEFECTO = 0.035

/**
 * Precio del CAE en €/MWh (2026). No existe precio oficial único.
 *
 * `oficial` es el rango medio recibido por los propietarios del ahorro según el
 * informe del MITECO de agosto de 2025, y es el que se usa por defecto.
 * `mercado` procede de portales del sector, que son parte interesada: sirve
 * para acotar el mejor y el peor caso, nunca para prometer.
 */
export const PRECIO_CAE_EUR_MWH = {
  oficial: { min: 115, max: 140, fuente: 'Informe MITECO, agosto 2025' },
  mercado: { min: 85, max: 155, fuente: 'Portales del sector (no oficial)' },
} as const

// ─── RES060 · Sustitución de caldera por bomba de calor ───────────────────────
//
// Fuente: ficha oficial del catálogo vigente del MITECO, «Ficha RES060.pdf»,
// versión V1.1. Transcrita el 9-ago-2026.
//
// Tres cosas que un instalador necesita saber ANTES de ofertar, y que la ficha
// deja claras en su ámbito de aplicación:
//
//   1. Es una ficha de SUSTITUCIÓN de caldera de combustión. Una bomba de calor
//      en obra nueva, o que sustituya a un sistema eléctrico, no entra aquí.
//   2. «La actuación no afecta a los elementos terminales que configuran la
//      instalación térmica»: si además se cambian los emisores, deja de encajar.
//   3. No admite bombas de calor con compresor de accionamiento térmico.
//
// A diferencia de la RES022, esta ficha NO lleva tope sobre el consumo previo.
// Pero depende por completo del certificado energético anterior: la demanda de
// calefacción y la de ACS salen de él. Sin certificado previo no hay número.

export const FICHA_RES060 = {
  codigo: 'RES060',
  version: 'V1.1',
  denominacion:
    'Sustitución de caldera de combustión por una bomba de calor de accionamiento eléctrico',
  boe: 'Catálogo vigente MITECO · Ficha RES060 V1.1',
} as const

/**
 * Rendimiento de la caldera de combustible fósil sustituida, sobre energía
 * final referida a PCS. La ficha lo fija: no es un dato del instalador.
 *
 * Nota: la ficha admite alternativamente el valor de la última inspección.
 */
export const RENDIMIENTO_CALDERA_RES060 = 0.92

/** Factor de ponderación de la ficha. Vale 1. */
export const FACTOR_PONDERACION_RES060 = 1

/**
 * Conversión de poder calorífico inferior a superior (PCS = PCI × Fconv),
 * según la tabla CB-01 de la guía del IDAE que cita la ficha.
 * Se incluye porque el rendimiento de la caldera va referido a PCS y los
 * catálogos de caldera suelen darlo sobre PCI.
 */
export const CONVERSION_PCI_A_PCS = {
  gasNatural: 1.106,
  gasoleo: 1.059,
  propano: 1.087,
  butano: 1.083,
} as const

/** Consumos de calefacción de referencia para la tabla de sensibilidad, kWh/m²·año. */
export const CEF_REFERENCIA_KWH_M2 = [80, 120, 200] as const

export function tramoDeAnio(anioConstruccion: number): TramoAntiguedad {
  if (anioConstruccion <= 1978) return 'hasta1978'
  if (anioConstruccion <= 2006) return 'de1979a2006'
  return 'desde2007'
}

export function esZonaRES022(zona: string): zona is ZonaClimaticaRES022 {
  return zona === 'C' || zona === 'D' || zona === 'E'
}
