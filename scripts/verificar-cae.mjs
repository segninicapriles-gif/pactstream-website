// Comprueba el motor de CAE contra los siete casos del spec
// docs/superpowers/specs/2026-08-08-calculadora-cae-instalador-design.md §9
// Todos los valores esperados salen de BOE-A-2026-12283.
import { calcularRES022, calcularRES060, valorarKwh } from '../src/lib/cae/calculo'
import { PRECIO_CAE_EUR_MWH, actuacionesParaElMinimo } from '../src/lib/cae/fichas'
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

// ─── RES060 · sustitucion de caldera por bomba de calor ───────────────────────
// Valores esperados calculados a mano desde la formula de la ficha V1.1:
//   AE = FP · [ (D_cal · S) · (1/eta - 1/SCOP) + D_ACS · (1/eta - 1/SCOP_dhw) ]
//   con FP = 1 y eta = 0,92 fijados por la propia ficha.
const a1 = calcularRES060({ demandaCalefaccionKwhM2: 85, superficieUtilM2: 120,
  demandaAcsKwhAnio: 2200, scopCalefaccion: 3.5, scopAcs: 2.8 })
comprobar('11 RES060 calefaccion', a1.ahorroCalefaccionKwh, 8173)
comprobar('11 RES060 ACS', a1.ahorroAcsKwh, 1606)
comprobar('11 RES060 total', a1.ahorroKwh, 9779)
comprobar('11 RES060 usa el 0,92 de la ficha', a1.rendimientoPorDefecto, true)

// Sin ACS: el segundo termino se anula, no se estima
const a2 = calcularRES060({ demandaCalefaccionKwhM2: 85, superficieUtilM2: 120,
  demandaAcsKwhAnio: 0, scopCalefaccion: 3.5 })
comprobar('12 RES060 sin ACS', a2.ahorroKwh, 8173)

// Una bomba peor que la caldera no puede dar ahorro negativo
const a3 = calcularRES060({ demandaCalefaccionKwhM2: 85, superficieUtilM2: 120,
  demandaAcsKwhAnio: 0, scopCalefaccion: 0.90 })
comprobar('13 RES060 SCOP por debajo de la caldera', a3.ahorroKwh, 0)

// Sin certificado previo no hay numero: la ficha no admite estimacion
const a4 = calcularRES060({ demandaCalefaccionKwhM2: 0, superficieUtilM2: 120,
  demandaAcsKwhAnio: 0, scopCalefaccion: 3.5 })
comprobar('14 RES060 sin datos del CEE previo', a4.aplicable, false)


// ─── Minimo de 30 MWh por solicitud (Orden TED/815/2023, art. 14.6) ──────────
// El caso que importa: ninguna vivienda sola llega al minimo.
comprobar('15 aerotermia del ejemplo no llega sola', actuacionesParaElMinimo(9779), 4)
comprobar('15 buhardilla en su techo tampoco', actuacionesParaElMinimo(12500), 3)
// Justo en el umbral no debe pedir dos por un error de redondeo
comprobar('16 exactamente 30 MWh basta con una', actuacionesParaElMinimo(30000), 1)
comprobar('16 por encima del minimo sigue siendo una', actuacionesParaElMinimo(41000), 1)
// Sin ahorro no hay solicitud que agrupar: 0, no infinito ni division por cero
comprobar('17 sin ahorro no se pide nada', actuacionesParaElMinimo(0), 0)

// El techo miente sobre cuantas viviendas hacen falta: con el tope aplicado
// salen MAS, nunca menos. Caso tipico D / 1979-2006, 100 m2, CEF 12.000.
const b1 = calcularRES022({ zona: 'D', anioConstruccion: 1990, superficieM2: 100 })
comprobar('18 sobre el techo salen 3', actuacionesParaElMinimo(b1.aesKwh), 3)
const b2 = calcularRES022({ zona: 'D', anioConstruccion: 1990, superficieM2: 100, cefCalefaccionKwhAnio: 12000 })
comprobar('18 con el tope el ahorro cae a 6.000', b2.ahorroKwh, 6000)
comprobar('18 y entonces hacen falta 5, no 3', actuacionesParaElMinimo(b2.ahorroKwh), 5)

console.log(fallos === 0 ? '\nTodo correcto.' : `\n${fallos} comprobaciones fallidas.`)
process.exit(fallos === 0 ? 0 : 1)
