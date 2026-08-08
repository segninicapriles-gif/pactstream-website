'use client'

import { useState } from 'react'
import { LAMBDA_D_RANGO } from '@/lib/cae/calculo'

// Campos 1-7 del spec. Regla de diseño: cada campo de más reduce la conversión,
// así que solo está lo que cambia el resultado.
//
// La zona climática se ELIGE, no se deduce de la provincia: la tabla del CTE no
// está verificada y no se inventa. Mapearla queda para la v2.
//
// Campos numéricos de texto libre (superficie, importe, λd): el estado que
// controla el <input> es el TEXTO CRUDO tecleado, nunca el número derivado.
// Antes se hacía `value={datos.x || ''}`, y como "0" o cualquier prefijo que
// evalúa a 0/NaN es falsy, React reescribía el campo a vacío en cada pulsación
// (tecleando "0,032" el campo acababa en "32"). Ver crítico de la revisión del
// 8-ago-2026. El número solo se calcula a partir del texto al notificar arriba.

export type Tecnologia =
  | 'aislamiento_buhardilla'
  | 'aerotermia'
  | 'geotermia'
  | 'baterias'
  | 'fotovoltaica'

export interface DatosFormulario {
  tecnologia: Tecnologia
  zona: string
  anioConstruccion: number
  superficieM2: number
  importeObra: number
  cefCalefaccion: number | null
  lambdaD: number
}

export const DATOS_INICIALES: DatosFormulario = {
  tecnologia: 'aislamiento_buhardilla',
  zona: 'D',
  anioConstruccion: 1970,
  superficieM2: 100,
  importeObra: 0,
  cefCalefaccion: null,
  lambdaD: 0.035,
}

const TECNOLOGIAS: Array<{ valor: Tecnologia; etiqueta: string }> = [
  { valor: 'aislamiento_buhardilla', etiqueta: 'Aislamiento de buhardilla o desván' },
  { valor: 'aerotermia', etiqueta: 'Aerotermia' },
  { valor: 'geotermia', etiqueta: 'Geotermia' },
  { valor: 'baterias', etiqueta: 'Baterías' },
  { valor: 'fotovoltaica', etiqueta: 'Fotovoltaica de autoconsumo' },
]

/** Solo la ficha RES022 necesita zona, año y superficie. */
export function usaFichaRES022(t: Tecnologia): boolean {
  return t === 'aislamiento_buhardilla'
}

const etiqueta = 'block text-sm font-medium text-[var(--color-navy-vault)]'
const campo =
  'mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--color-ps-neutral-400)] ' +
  'bg-white px-3 py-2 font-mono text-sm text-[var(--color-navy-vault)] ' +
  'focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 ' +
  'focus:ring-[var(--color-primary)]/20'
const ayuda = 'mt-1 block text-xs text-[var(--color-ps-navy-300)]'

export function Formulario({
  datos,
  onChange,
}: {
  datos: DatosFormulario
  onChange: (d: DatosFormulario) => void
}) {
  const set = <K extends keyof DatosFormulario>(k: K, v: DatosFormulario[K]) =>
    onChange({ ...datos, [k]: v })

  const numero = (v: string) => (v === '' ? 0 : Number(v))

  /** Acepta coma o punto como separador decimal. Lo que no parsea, es 0. */
  const numeroComaOPunto = (texto: string) => {
    const normalizado = texto.trim().replace(',', '.')
    if (normalizado === '') return 0
    const valor = Number(normalizado)
    return Number.isFinite(valor) ? valor : 0
  }

  const [textoSuperficie, setTextoSuperficie] = useState(
    datos.superficieM2 ? String(datos.superficieM2) : '',
  )
  const [textoImporte, setTextoImporte] = useState(
    datos.importeObra ? String(datos.importeObra) : '',
  )
  const [textoLambda, setTextoLambda] = useState(
    datos.lambdaD ? String(datos.lambdaD).replace('.', ',') : '',
  )

  const lambdaNumero = numeroComaOPunto(textoLambda)
  const lambdaFueraDeRango =
    textoLambda.trim() !== '' &&
    (lambdaNumero < LAMBDA_D_RANGO.min || lambdaNumero > LAMBDA_D_RANGO.max)

  return (
    <div className="grid gap-5">
      <div>
        <label className={etiqueta} htmlFor="tecnologia">Tecnología</label>
        <select
          id="tecnologia"
          className={campo}
          value={datos.tecnologia}
          onChange={(ev) => set('tecnologia', ev.target.value as Tecnologia)}
        >
          {TECNOLOGIAS.map((t) => (
            <option key={t.valor} value={t.valor}>{t.etiqueta}</option>
          ))}
        </select>
      </div>

      {usaFichaRES022(datos.tecnologia) && (
        <>
          <div>
            <label className={etiqueta} htmlFor="zona">Zona climática</label>
            <select
              id="zona"
              className={campo}
              value={datos.zona}
              onChange={(ev) => set('zona', ev.target.value)}
            >
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="otra">A o B</option>
            </select>
            <span className={ayuda}>
              La ficha RES022 solo se aplica en zonas C, D y E. Es la del Código Técnico
              de la Edificación, no la provincia.
            </span>
          </div>

          <div>
            <label className={etiqueta} htmlFor="anio">Año de construcción del edificio</label>
            <select
              id="anio"
              className={campo}
              value={datos.anioConstruccion}
              onChange={(ev) => set('anioConstruccion', numero(ev.target.value))}
            >
              <option value={1970}>Anterior a 1979</option>
              <option value={1990}>Entre 1979 y 2006</option>
              <option value={2010}>Desde 2007</option>
            </select>
            <span className={ayuda}>Sale del certificado energético o del Catastro.</span>
          </div>

          <div>
            <label className={etiqueta} htmlFor="superficie">Superficie tratada (m²)</label>
            <input
              id="superficie" type="text" inputMode="decimal" className={campo}
              value={textoSuperficie}
              onChange={(ev) => {
                const texto = ev.target.value
                setTextoSuperficie(texto)
                set('superficieM2', numeroComaOPunto(texto))
              }}
            />
          </div>

          <div>
            <label className={etiqueta} htmlFor="lambda">
              Conductividad del aislante λd (W/mK)
            </label>
            <input
              id="lambda" type="text" inputMode="decimal" className={campo}
              value={textoLambda}
              onChange={(ev) => {
                const texto = ev.target.value
                setTextoLambda(texto)
                set('lambdaD', numeroComaOPunto(texto))
              }}
            />
            <span className={ayuda}>
              Viene en la Declaración de Prestaciones del producto. 0,035 es lo corriente
              en lana mineral.
            </span>
            {lambdaFueraDeRango && (
              <span className="mt-1 block text-xs text-[var(--color-ps-orange-700)]">
                Fuera del rango plausible (0,010–0,100 W/mK): revisa la Declaración de
                Prestaciones. No se calculará el espesor con este valor.
              </span>
            )}
          </div>

          <div>
            <label className={etiqueta} htmlFor="cef">
              Consumo de calefacción del certificado previo (kWh/año)
              <span className="ml-1 font-normal text-[var(--color-ps-navy-300)]">— opcional</span>
            </label>
            <input
              id="cef" type="number" min={0} className={campo}
              value={datos.cefCalefaccion ?? ''}
              onChange={(ev) =>
                set('cefCalefaccion', ev.target.value === '' ? null : numero(ev.target.value))
              }
            />
            <span className={ayuda}>
              Anexo II del certificado energético anterior a la obra. Sin este dato no se
              puede cerrar el número: solo se puede acotar.
            </span>
          </div>
        </>
      )}

      <div>
        <label className={etiqueta} htmlFor="importe">Importe estimado de la obra (€)</label>
        <input
          id="importe" type="text" inputMode="decimal" className={campo}
          value={textoImporte}
          onChange={(ev) => {
            const texto = ev.target.value
            setTextoImporte(texto)
            set('importeObra', numeroComaOPunto(texto))
          }}
        />
        <span className={ayuda}>Para calcular la deducción que le corresponde a tu cliente.</span>
      </div>
    </div>
  )
}
