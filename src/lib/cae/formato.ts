// Formateo español. Se centraliza para que toda cifra de la página se componga
// igual: separador de millares con punto y decimal con coma.

const EUR = new Intl.NumberFormat('es-ES', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
})
const NUM = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 })

export function euros(n: number): string {
  return EUR.format(n)
}

/** Un rango se escribe «1.200 – 1.500 €», y si coincide, un solo importe. */
export function eurosRango(r: { min: number; max: number }): string {
  if (r.min === r.max) return euros(r.min)
  return `${NUM.format(r.min)} – ${euros(r.max)}`
}

export function kwh(n: number): string {
  return `${NUM.format(n)} kWh`
}

export function milimetros(n: number): string {
  return `${NUM.format(n)} mm`
}
