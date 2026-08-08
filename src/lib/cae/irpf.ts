// ─── Deducciones de IRPF por obras de eficiencia energética ───────────────────
//
// Verificado el 7-ago-2026 contra AEAT, OCU y Ministerio de Vivienda.
// Prorrogadas hasta el 31-dic-2026 en vivienda y el 31-dic-2027 en edificios.
//
// ⚠️ Estas deducciones han sufrido vaivenes normativos en 2025 y 2026.
// Revisarlas antes de cada campaña; la fecha de verificación se muestra en la
// página para que nadie las dé por vigentes sin comprobarlas.
//
// El error que más se comete: aplicar el porcentaje sobre el importe de la obra
// en vez de sobre la base máxima. Con 10.000 € de obra, el tramo del 20 % no da
// 2.000 € sino 1.000 €. Duplicar esa cifra delante de un cliente es grave.

export interface TramoIRPF {
  porcentaje: 20 | 40 | 60
  /** Base máxima anual sobre la que se aplica el porcentaje, en € */
  baseMaxima: number
  /** mín(importe de la obra, base máxima), en € */
  baseAplicada: number
  /** porcentaje × baseAplicada, en € */
  deduccion: number
  condicion: string
  nota: string | null
}

const TRAMOS: Array<Pick<TramoIRPF, 'porcentaje' | 'baseMaxima' | 'condicion' | 'nota'>> = [
  {
    porcentaje: 20,
    baseMaxima: 5000,
    condicion: 'Reducción de al menos el 7 % de la demanda de calefacción y refrigeración',
    nota: null,
  },
  {
    porcentaje: 40,
    baseMaxima: 7500,
    condicion:
      'Reducción de al menos el 30 % del consumo de energía primaria no renovable, o alcanzar calificación A o B',
    nota: null,
  },
  {
    porcentaje: 60,
    baseMaxima: 5000,
    condicion: 'Rehabilitación energética de un edificio residencial completo',
    nota: 'Hasta 15.000 € de base acumulada en cuatro años',
  },
]

/**
 * Devuelve los tres tramos con el importe que resultaría para una obra dada.
 *
 * NO decide cuál aplica: eso lo determinan los certificados energéticos previo
 * y posterior, no esta función. La página debe presentarlos como escenarios.
 */
export function escaleraIRPF(importeObra: number): TramoIRPF[] {
  const importe = importeObra > 0 ? importeObra : 0
  return TRAMOS.map((t) => {
    const baseAplicada = Math.min(importe, t.baseMaxima)
    return {
      ...t,
      baseAplicada,
      deduccion: Math.round((t.porcentaje / 100) * baseAplicada),
    }
  })
}
