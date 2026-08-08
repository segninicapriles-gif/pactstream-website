'use client'

// Campos 1-7 del spec. Regla de diseño: cada campo de más reduce la conversión,
// así que solo está lo que cambia el resultado.
//
// La zona climática se ELIGE, no se deduce de la provincia: la tabla del CTE no
// está verificada y no se inventa. Mapearla queda para la v2.

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
const ayuda = 'mt-1 block text-xs text-[var(--color-ps-neutral-600)]'

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
              id="superficie" type="number" min={0} className={campo}
              value={datos.superficieM2 || ''}
              onChange={(ev) => set('superficieM2', numero(ev.target.value))}
            />
          </div>

          <div>
            <label className={etiqueta} htmlFor="lambda">
              Conductividad del aislante λd (W/mK)
            </label>
            <input
              id="lambda" type="number" step="0.001" min={0} className={campo}
              value={datos.lambdaD || ''}
              onChange={(ev) => set('lambdaD', numero(ev.target.value))}
            />
            <span className={ayuda}>
              Viene en la Declaración de Prestaciones del producto. 0,035 es lo corriente
              en lana mineral.
            </span>
          </div>

          <div>
            <label className={etiqueta} htmlFor="cef">
              Consumo de calefacción del certificado previo (kWh/año)
              <span className="ml-1 font-normal text-[var(--color-ps-neutral-600)]">— opcional</span>
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
          id="importe" type="number" min={0} className={campo}
          value={datos.importeObra || ''}
          onChange={(ev) => set('importeObra', numero(ev.target.value))}
        />
        <span className={ayuda}>Para calcular la deducción que le corresponde a tu cliente.</span>
      </div>
    </div>
  )
}
