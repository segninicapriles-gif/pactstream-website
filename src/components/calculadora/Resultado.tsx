'use client'

// Los seis bloques de salida del spec. Reglas que no se negocian:
//   · Ninguna cifra sin su fuente al lado.
//   · Sin consumo previo NO se muestra ningun numero presentado como final:
//     solo techo y sensibilidad, ambos etiquetados.
//   · Donde no hay ficha transcrita del BOE, se dice; no se estima.

import { AlertTriangle, FileWarning, Info } from 'lucide-react'
import { calcularRES022, valorarKwh } from '@/lib/cae/calculo'
import { escaleraIRPF } from '@/lib/cae/irpf'
import { FICHA_RES022, PRECIO_CAE_EUR_MWH } from '@/lib/cae/fichas'
import { euros, eurosRango, kwh, milimetros } from '@/lib/cae/formato'
import { Fuente } from './Fuente'
import { usaFichaRES022, type DatosFormulario, type Tecnologia } from './Formulario'

const FUENTE_CAE = `${FICHA_RES022.boe} · ficha ${FICHA_RES022.codigo} ${FICHA_RES022.version}`
const FUENTE_IRPF = 'AEAT · deducciones por obras de eficiencia energética (verificado 7-ago-2026)'

const tarjeta =
  'rounded-[var(--radius-lg)] border border-[var(--color-ps-neutral-400)] bg-white p-5 shadow-[var(--shadow-ps-sm)]'
const titulo = 'font-display text-lg font-bold text-[var(--color-navy-vault)]'
const cifra = 'font-mono text-3xl font-bold text-[var(--color-primary)]'

function SinFicha({ tecnologia }: { tecnologia: Tecnologia }) {
  const esFotovoltaica = tecnologia === 'fotovoltaica'
  return (
    <div className={tarjeta}>
      <div className="flex gap-3">
        <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-ps-orange-500)]" />
        <div>
          <h3 className={titulo}>Certificados de ahorro energético</h3>
          <p className="mt-2 text-sm text-[var(--color-ps-navy-400)]">
            {esFotovoltaica
              ? 'No nos consta que el autoconsumo fotovoltaico genere CAE. Preferimos decirlo a estimar una cifra que luego no se cobre.'
              : 'Esta actuación puede generar CAE, pero su ficha todavía no está incorporada a la calculadora. No mostramos un importe que no podamos justificar con el BOE en la mano.'}
          </p>
          <p className="mt-2 text-sm text-[var(--color-ps-navy-400)]">
            La deducción de IRPF de aquí abajo sí aplica.
          </p>
        </div>
      </div>
    </div>
  )
}

export function Resultado({ datos }: { datos: DatosFormulario }) {
  const irpf = escaleraIRPF(datos.importeObra)
  const conFicha = usaFichaRES022(datos.tecnologia)
  const cae = conFicha
    ? calcularRES022({
        zona: datos.zona,
        anioConstruccion: datos.anioConstruccion,
        superficieM2: datos.superficieM2,
        cefCalefaccionKwhAnio: datos.cefCalefaccion,
        lambdaD: datos.lambdaD,
      })
    : null

  const precio = PRECIO_CAE_EUR_MWH.oficial

  return (
    <div className="grid gap-4">
      {/* Bloque 1 y 2 — CAE */}
      {!conFicha && <SinFicha tecnologia={datos.tecnologia} />}

      {cae && !cae.aplicable && (
        <div className={tarjeta}>
          <h3 className={titulo}>Certificados de ahorro energético</h3>
          <p className="mt-2 text-sm text-[var(--color-ps-navy-400)]">{cae.motivoNoAplicable}</p>
          <Fuente texto={FUENTE_CAE} />
        </div>
      )}

      {cae && cae.aplicable && (
        <div className={tarjeta}>
          <h3 className={titulo}>Valor del CAE</h3>

          {cae.ahorroKwh !== null ? (
            <>
              <p className="mt-3 text-sm text-[var(--color-ps-navy-400)]">Ahorro certificable</p>
              <p className={cifra}>{kwh(cae.ahorroKwh)}/año</p>
              <p className="mt-1 font-mono text-lg text-[var(--color-navy-vault)]">
                {eurosRango(valorarKwh(cae.ahorroKwh, precio))}
              </p>
              <p className="mt-3 rounded-[var(--radius-sm)] bg-[var(--color-ps-neutral-100)] p-3 text-sm text-[var(--color-navy-vault)]">
                {cae.mandaTope
                  ? 'Lo limita el consumo de calefacción del certificado previo, no la superficie. Por eso el número es menor del que da la tabla.'
                  : 'Aquí manda la superficie, no el consumo: el tope no llega a morder.'}
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-[var(--color-ps-navy-400)]">
                Techo — <strong>no es el valor final</strong>
              </p>
              <p className={cifra}>{kwh(cae.aesKwh)}/año</p>
              <p className="mt-1 font-mono text-lg text-[var(--color-navy-vault)]">
                {eurosRango(valorarKwh(cae.aesKwh, precio))}
              </p>

              <p className="mt-4 text-sm font-medium text-[var(--color-navy-vault)]">
                Cómo lo recorta el tope, según el consumo del edificio
              </p>
              <p className="text-xs text-[var(--color-ps-neutral-600)]">
                Ilustrativo: son consumos de referencia, no los de esta vivienda.
              </p>
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-[var(--color-ps-neutral-600)]">
                    <th className="py-1 font-medium">Consumo</th>
                    <th className="py-1 font-medium">Ahorro</th>
                    <th className="py-1 font-medium">Valor</th>
                    <th className="py-1 font-medium">% del techo</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {cae.sensibilidad.map((s) => (
                    <tr key={s.cefUnitario} className="border-t border-[var(--color-ps-neutral-300)]">
                      <td className="py-1">{s.cefUnitario} kWh/m²</td>
                      <td className="py-1">{kwh(s.ahorroKwh)}</td>
                      <td className="py-1">{eurosRango(valorarKwh(s.ahorroKwh, precio))}</td>
                      <td className="py-1">{s.pctSobreTecho} %</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 flex gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)]/5 p-3 text-sm text-[var(--color-navy-vault)]">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span>
                  El número definitivo depende del certificado energético previo.
                  <strong> Pídelo antes de empezar la obra</strong>: después ya no se puede
                  emitir, y sin él tu cliente pierde además la deducción de IRPF.
                </span>
              </p>
            </>
          )}

          <p className="mt-3 text-xs text-[var(--color-ps-neutral-600)]">
            Precio aplicado: {precio.min}–{precio.max} €/MWh. {precio.fuente}.
          </p>
          <Fuente texto={FUENTE_CAE} />
        </div>
      )}

      {/* Bloque 5 — espesor */}
      {cae && cae.aplicable && (
        <div className={tarjeta}>
          <h3 className={titulo}>Espesor mínimo exigido</h3>
          <p className="mt-2 font-mono text-2xl font-bold text-[var(--color-navy-vault)]">
            {milimetros(cae.espesorMinimoMm)}
          </p>
          <p className="mt-1 text-sm text-[var(--color-ps-navy-400)]">
            Sale de e = Rt · λd. No es orientativo: es una fórmula, y λd se toma de la
            Declaración de Prestaciones del producto, así que es comprobable.
          </p>
          <Fuente texto={FUENTE_CAE} />
        </div>
      )}

      {/* Bloque 3 — IRPF */}
      <div className={tarjeta}>
        <h3 className={titulo}>Deducción de IRPF de tu cliente</h3>
        {datos.importeObra > 0 ? (
          <>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {irpf.map((t) => (
                  <tr key={t.porcentaje} className="border-t border-[var(--color-ps-neutral-300)] align-top">
                    <td className="py-2 pr-3 font-mono font-bold text-[var(--color-primary)]">
                      {t.porcentaje} %
                    </td>
                    <td className="py-2 pr-3">
                      <span className="text-[var(--color-ps-navy-400)]">{t.condicion}</span>
                      {t.nota && (
                        <span className="block text-xs text-[var(--color-ps-neutral-600)]">{t.nota}</span>
                      )}
                    </td>
                    <td className="py-2 text-right font-mono font-bold text-[var(--color-navy-vault)]">
                      {euros(t.deduccion)}
                      <span className="block text-xs font-normal text-[var(--color-ps-neutral-600)]">
                        base {euros(t.baseAplicada)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-[var(--color-ps-navy-400)]">
              Cuál de los tres aplica lo determinan los certificados energéticos previo y
              posterior, no esta calculadora. El porcentaje se aplica sobre la base máxima,
              no sobre el importe de la obra.
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-[var(--color-ps-navy-400)]">
            Introduce el importe estimado de la obra para ver la deducción.
          </p>
        )}
        <Fuente texto={FUENTE_IRPF} />
      </div>

      {/* Bloque 6 — qué puede descontar el instalador */}
      {cae && cae.aplicable && (
        <div className={tarjeta}>
          <h3 className={titulo}>Qué puedes descontar en tu oferta</h3>
          <p className="mt-3 font-mono text-2xl font-bold text-[var(--color-navy-vault)]">
            {cae.ahorroKwh !== null
              ? eurosRango(valorarKwh(cae.ahorroKwh, precio))
              : `hasta ${eurosRango(valorarKwh(cae.aesKwh, precio))}`}
          </p>
          <p className="mt-2 text-sm text-[var(--color-ps-navy-400)]">
            {cae.ahorroKwh !== null
              ? 'Es el CAE que te cede tu cliente, y por tanto lo que puedes rebajar del precio sin perder margen.'
              : 'Es el techo. Sin el certificado previo no sabes cuánto de esto vas a cobrar, así que descontarlo entero es apostar contra tu propio margen.'}
          </p>
          <p className="mt-3 rounded-[var(--radius-sm)] bg-[var(--color-ps-neutral-100)] p-3 text-sm text-[var(--color-navy-vault)]">
            <strong>La deducción de IRPF no entra aquí.</strong> Es de tu cliente, no tuya:
            sirve como argumento de venta, pero no es dinero que tú puedas descontar.
          </p>
          <Fuente texto={FUENTE_CAE} />
        </div>
      )}

      {/* Bloque 4 — el aviso, siempre */}
      <div className="rounded-[var(--radius-lg)] border-2 border-[var(--color-ps-orange-400)] bg-[var(--color-ps-orange-50)] p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-ps-orange-500)]" />
          <div>
            <h3 className={titulo}>Antes de empezar la obra: el certificado previo</h3>
            <p className="mt-2 text-sm text-[var(--color-navy-vault)]">
              Las deducciones de IRPF exigen certificado energético <strong>antes y después</strong>.
              El previo no se puede emitir con la obra ya empezada, así que si nadie lo pide,
              tu cliente pierde la deducción entera y de forma irreversible. Con el tramo del
              40 % sobre una base de 7.500 €, son <strong>3.000 € que se esfuman</strong> y que
              nadie descubre hasta la declaración de la renta.
            </p>
            <p className="mt-2 text-sm text-[var(--color-navy-vault)]">
              El certificado posterior tiene fecha límite: 1 de enero de 2027 en vivienda.
            </p>
            <Fuente texto={FUENTE_IRPF} />
          </div>
        </div>
      </div>
    </div>
  )
}
