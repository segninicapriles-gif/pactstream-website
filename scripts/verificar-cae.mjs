// Comprueba el motor de CAE contra los siete casos del spec
// docs/superpowers/specs/2026-08-08-calculadora-cae-instalador-design.md §9
// Todos los valores esperados salen de BOE-A-2026-12283.
import { calcularRES022, valorarKwh } from '../src/lib/cae/calculo'
import { PRECIO_CAE_EUR_MWH } from '../src/lib/cae/fichas'
import { escaleraIRPF } from '../src/lib/cae/irpf'

let fallos = 0
function comprobar(nombre, real, esperado) {
  const ok = JSON.stringify(real) === JSON.stringify(esperado)
  if (!ok) fallos++
  console.log(`${ok ? 'OK  ' : 'FALLO'}  ${nombre}` + (ok ? '' : `\n        esperado ${JSON.stringify(esperado)}\n        obtenido ${JSON.stringify(real)}`))
}

// 1 — Zona E, anterior a 1978, 100 m², sin consumo: techo 15.000 kWh
const c1 = calcularRES022({ zona: 'E', anioConstruccion: 1970, superficieM2: 100 })
comprobar('1 techo AEs', c1.aesKwh, 15000)
comprobar('1 sin CEF no hay ahorro cerrado', c1.ahorroKwh, null)
comprobar('1 valor del techo a 140 EUR/MWh', valorarKwh(c1.aesKwh, { min: 140, max: 140 }).min, 2100)

// 2 — Mismo caso con consumo 20.000: manda el tope
const c2 = calcularRES022({ zona: 'E', anioConstruccion: 1970, superficieM2: 100, cefCalefaccionKwhAnio: 20000 })
comprobar('2 ahorro topado', c2.ahorroKwh, 10000)
comprobar('2 manda el tope', c2.mandaTope, true)

// 3 — Mismo caso con consumo 40.000: manda la superficie
const c3 = calcularRES022({ zona: 'E', anioConstruccion: 1970, superficieM2: 100, cefCalefaccionKwhAnio: 40000 })
comprobar('3 ahorro por superficie', c3.ahorroKwh, 15000)
comprobar('3 no manda el tope', c3.mandaTope, false)

// 4 — Zona C, posterior a 2007, 50 m²
const c4 = calcularRES022({ zona: 'C', anioConstruccion: 2010, superficieM2: 50 })
comprobar('4 AEs zona C moderna', c4.aesKwh, 3000)

// 5 — Espesor mínimo en zona E con lambda 0,035
comprobar('5 espesor minimo', c1.espesorMinimoMm, 165)

// 6 — Zona A: la ficha no aplica
const c6 = calcularRES022({ zona: 'A', anioConstruccion: 1970, superficieM2: 100 })
comprobar('6 zona A no aplicable', c6.aplicable, false)

// 7 — Sensibilidad sin CEF: tres consumos de referencia sobre 100 m²
comprobar('7 sensibilidad', c1.sensibilidad.map(s => s.ahorroKwh), [4000, 6000, 10000])

// 8 — El rango oficial de precio es el del MITECO
comprobar('8 rango oficial', [PRECIO_CAE_EUR_MWH.oficial.min, PRECIO_CAE_EUR_MWH.oficial.max], [115, 140])

// 9 — Escalera de IRPF sobre una obra de 10.000 EUR.
// El porcentaje se aplica sobre la BASE MAXIMA, no sobre el importe de la obra.
const irpf = escaleraIRPF(10000)
comprobar('9 deducciones', irpf.map(t => t.deduccion), [1000, 3000, 3000])
comprobar('9 bases topadas', irpf.map(t => t.baseAplicada), [5000, 7500, 5000])

// 10 — Obra pequeña: la base no llega al tope y manda el importe
const irpfPeq = escaleraIRPF(3000)
comprobar('10 base sin topar', irpfPeq.map(t => t.baseAplicada), [3000, 3000, 3000])
comprobar('10 deducciones pequenas', irpfPeq.map(t => t.deduccion), [600, 1200, 1800])

console.log(fallos === 0 ? '\nTodo correcto.' : `\n${fallos} comprobaciones fallidas.`)
process.exit(fallos === 0 ? 0 : 1)
