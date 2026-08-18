'use client'

import { useEffect, useRef, useState } from 'react'

/* Escalera fundador por operación — fuente: PRICING_CANONICO_2026-08-07.md */
function tramo(importe: number): { pct: number; rango: string } {
  if (importe < 100_000) return { pct: 0.024, rango: 'hasta 100.000 €' }
  if (importe < 400_000) return { pct: 0.02, rango: '100.000 – 400.000 €' }
  if (importe < 1_000_000) return { pct: 0.015, rango: '400.000 € – 1 M€' }
  return { pct: 0.012, rango: 'más de 1 M€' }
}

const fmt = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' })
const fmt1 = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const euro = (n: number) => `${fmt.format(Math.round(n))} €`
const pct1 = (n: number) => fmt1.format(n).replace(',0', '')

/* Texto crudo → número: el campo permite puntos de millar y coma decimal (es-ES).
   Texto crudo y no type="number" porque number bloquea la coma decimal al teclear. */
function parseNum(s: string): number {
  const n = parseFloat(s.replace(/\./g, '').replace(/\s|€|%/g, '').replace(',', '.'))
  return Number.isFinite(n) ? n : 0
}

const clampObra = (v: number) => Math.min(Math.max(v, 10_000), 20_000_000)
const clampDias = (v: number) => Math.min(Math.max(v, 2), 365)
const clampCoste = (v: number) => Math.min(Math.max(v, 0.5), 30)

/* La rueda sobre un slider cambia el valor durante el scroll de página: bloquearla.
   Listener nativo con passive:false — el onWheel de React no garantiza preventDefault. */
function useBlockWheel(ref: React.RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const stop = (e: WheelEvent) => e.preventDefault()
    el.addEventListener('wheel', stop, { passive: false })
    return () => el.removeEventListener('wheel', stop)
  }, [ref])
}

type CampoProps = {
  label: string
  hint: string
  unidad: string
  min: number
  max: number
  step: number
  valor: number
  texto: string
  onTexto: (s: string) => void
  onSlider: (v: number) => void
  inputMode: 'numeric' | 'decimal'
  ariaLabel: string
}

function Campo({ label, hint, unidad, min, max, step, valor, texto, onTexto, onSlider, inputMode, ariaLabel }: CampoProps) {
  const sliderRef = useRef<HTMLInputElement>(null)
  useBlockWheel(sliderRef)
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-[var(--color-navy-vault)]">
        {label} <span className="ml-1 font-normal text-xs text-[var(--color-ps-navy-300)]">{hint}</span>
      </label>
      <div className="mt-2 flex items-center gap-3">
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={Math.min(valor, max)}
          onChange={(e) => onSlider(parseFloat(e.target.value))}
          aria-hidden="true"
          tabIndex={-1}
          className="h-8 flex-1 accent-[var(--color-primary)]"
        />
        <span className="flex min-w-[118px] items-baseline justify-end gap-1 rounded-lg border-[1.5px] border-[#e3e2db] bg-white px-2.5 py-1.5 focus-within:border-[var(--color-primary)] focus-within:outline focus-within:outline-2 focus-within:outline-[rgba(1,33,220,0.18)]">
          <input
            type="text"
            inputMode={inputMode}
            value={texto}
            onChange={(e) => onTexto(e.target.value)}
            aria-label={ariaLabel}
            className="w-[9ch] border-0 bg-transparent p-0 text-right font-bold tabular-nums text-[var(--color-navy-vault)] outline-none"
          />
          <span className="text-[13px] font-bold text-[var(--color-ps-navy-300)]">{unidad}</span>
        </span>
      </div>
    </div>
  )
}

export function CalculadoraCaja() {
  const [obra, setObra] = useState(700_000)
  const [dias, setDias] = useState(96)
  const [coste, setCoste] = useState(9)
  const [tObra, setTObra] = useState(fmt.format(700_000))
  const [tDias, setTDias] = useState('96')
  const [tCoste, setTCoste] = useState('9')

  const t = tramo(obra)
  const diasLib = Math.max(dias - 1, 0)
  const valor = (obra * (coste / 100) * diasLib) / 365
  const comision = obra * t.pct
  const neto = valor - comision
  const confirming = (obra * (coste / 100) * dias) / 365
  const positivo = neto >= 0

  return (
    <main className="min-h-screen bg-[var(--color-canvas)] px-6 py-14">
      <div className="mx-auto max-w-[1060px]">
        <p className="text-sm font-semibold text-[var(--color-primary)]">
          <a href="/">← PactStream</a>
        </p>
        <h1 className="mt-4 max-w-[22ch] font-display text-3xl font-black leading-[1.08] tracking-tight text-[var(--color-navy-vault)] sm:text-4xl [text-wrap:balance]">
          ¿Cuánta caja te devuelve cobrar contra certificación?
        </h1>
        <p className="mt-3 mb-9 max-w-[58ch] text-[17px] text-[#3d445f]">
          El sector cobra a 96,5 días de media (PMcM).{' '}
          <b className="text-[var(--color-navy-vault)]">PactStream invierte el orden</b>: el dinero
          de la obra queda custodiado en cuenta regulada antes de empezar, y cada certificación
          verificada libera tu cobro en 24&nbsp;horas desde la validación del hito. Mueve los datos
          de tu obra y mira lo que eso vale — también cuando no nos favorece.
        </p>

        <div className="grid items-start gap-7 md:grid-cols-[minmax(300px,5fr)_minmax(320px,6fr)]">
          <section aria-label="Datos de tu obra" className="rounded-2xl border border-[#e3e2db] bg-white p-6 pb-4">
            <Campo
              label="Importe de la obra"
              hint="determina tu tramo de comisión"
              unidad="€"
              min={30_000}
              max={3_000_000}
              step={10_000}
              valor={obra}
              texto={tObra}
              inputMode="numeric"
              ariaLabel="Importe de la obra en euros"
              onSlider={(v) => { const c = clampObra(v); setObra(c); setTObra(fmt.format(c)) }}
              onTexto={(s) => { setTObra(s); setObra(clampObra(parseNum(s))) }}
            />
            <Campo
              label="Días que tardas en cobrar hoy"
              hint="media del sector: 96"
              unidad="días"
              min={15}
              max={210}
              step={1}
              valor={dias}
              texto={tDias}
              inputMode="numeric"
              ariaLabel="Días de cobro actuales"
              onSlider={(v) => { const c = clampDias(v); setDias(c); setTDias(fmt.format(c)) }}
              onTexto={(s) => { setTDias(s); setDias(clampDias(parseNum(s))) }}
            />
            <Campo
              label="Coste anual de adelantar ese dinero"
              hint="confirming/factoring típico: 8–12 %"
              unidad="%"
              min={2}
              max={18}
              step={0.5}
              valor={coste}
              texto={tCoste}
              inputMode="decimal"
              ariaLabel="Coste de financiación anual en porcentaje"
              onSlider={(v) => { const c = clampCoste(v); setCoste(c); setTCoste(pct1(c)) }}
              onTexto={(s) => { setTCoste(s); setCoste(clampCoste(parseNum(s))) }}
            />
            <p className="mt-1 border-t border-[#e3e2db] pt-4 text-[13px] text-[#3d445f]">
              Tu tramo (precio fundador, por operación):{' '}
              <b className="tabular-nums text-[var(--color-primary)]">{pct1(t.pct * 100)}&nbsp;%</b>{' '}
              ({t.rango})
            </p>
          </section>

          <section
            aria-label="Resultado"
            aria-live="polite"
            className="rounded-2xl bg-[var(--color-navy-vault)] p-7 pb-6 text-white shadow-[0_18px_40px_-18px_rgba(8,13,66,0.45)]"
          >
            <h2 className="mb-4 font-display text-[15px] font-bold text-[var(--color-cyan-glow)]">
              El dinero, sin rodeos
            </h2>
            <Fila label="Días de circulante que liberas" valor={`${fmt.format(diasLib)} días`} />
            <Fila label="Caja que dejas de tener atrapada" valor={euro(obra)} borde />
            <Fila
              label="Lo que vale esa caja a tu coste de financiación"
              valor={euro(valor)}
              sub={`${fmt1.format((valor / obra) * 100)} %`}
              borde
            />
            <Fila label="Comisión PactStream de la operación" valor={euro(comision)} sub={`${pct1(t.pct * 100)} %`} borde />

            <div className={`mt-4 rounded-xl p-4 ${positivo ? 'bg-[rgba(18,176,122,0.16)]' : 'bg-[rgba(232,96,122,0.14)]'}`}>
              <p className={`text-[13px] font-bold tracking-wide ${positivo ? 'text-[#6fe0b8]' : 'text-[var(--color-ps-red-400)]'}`}>
                {positivo ? 'SOLO EL CIRCULANTE YA PAGA LA COMISIÓN' : 'A ESTE PLAZO, EL CIRCULANTE NO CUBRE LA COMISIÓN'}
              </p>
              <p className="mt-1 font-display text-3xl font-black tabular-nums leading-tight">
                {positivo ? '+' : '−'}
                {euro(Math.abs(neto))}
              </p>
              <p className="mt-2 max-w-[52ch] text-[13.5px] text-[var(--color-ps-navy-200)]">
                {positivo ? (
                  <>
                    Y el circulante es solo la parte que se puede medir en euros.{' '}
                    <b className="text-[#6fe0b8]">Lo que de verdad cambia no depende de este número</b> —
                    lo tienes justo debajo, y vale igual para ti y para tu cliente.
                  </>
                ) : (
                  <>
                    Te lo decimos tal cual. Pero el circulante nunca fue el motivo para usar
                    PactStream:{' '}
                    <b className="text-[var(--color-ps-red-400)]">lo que sí cambia sigue intacto</b> a
                    cualquier plazo — y vale igual para ti y para tu cliente.
                  </>
                )}
              </p>
            </div>

            <p className="mt-5 text-[13px] font-bold text-white">Lo que no depende del cálculo</p>
            <div className="mt-2 grid gap-4 rounded-xl border border-[rgba(169,243,255,0.16)] bg-[rgba(169,243,255,0.05)] p-4 sm:grid-cols-2">
              <BenefBloque
                titulo="Para ti"
                puntos={[
                  'Cobras contra tu avance certificado, no contra la tesorería de tu cliente.',
                  'El impago deja de ser posible: el dinero se custodia en cuenta regulada antes de empezar.',
                  'Si hay desacuerdo, solo se aparta el importe en disputa. La obra no se para.',
                ]}
              />
              <BenefBloque
                titulo="Para tu cliente"
                puntos={[
                  'Su dinero se libera contra certificación verificada, nunca por adelantado.',
                  'Paga por obra ejecutada y sellada, no sobre promesas.',
                  'Ante un problema, retiene solo lo que discute — el resto sigue fluyendo.',
                ]}
              />
            </div>

            <p className="mt-4 border-t border-[rgba(169,243,255,0.14)] pt-3 text-[13px] text-[var(--color-ps-navy-200)]">
              Adelantar esos {fmt.format(diasLib)} días vía confirming al {pct1(coste)}&nbsp;% te
              costaría <b className="tabular-nums text-[var(--color-ps-amber-400)]">{euro(confirming)}</b> —{' '}
              <b className="text-[var(--color-ps-amber-400)]">con recurso</b>: si tu cliente no paga, el
              banco te lo reclama a ti. Y no resuelve la discusión de si el trabajo está bien
              ejecutado.
            </p>

            <p className="mt-5 font-display text-[17px] font-bold leading-snug text-white [text-wrap:balance]">
              Tu cobro deja de depender de tu cliente. Depende de tu avance.{' '}
              <span className="text-[var(--color-cyan-glow)]">Eso es PactStream.</span>
            </p>
            <a
              href="/#waitlist"
              className="mt-4 inline-block rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-cyan-glow)]"
            >
              Reservar mi plaza en PactStream →
            </a>
          </section>
        </div>

        <p className="mt-7 max-w-[72ch] text-[12.5px] text-[var(--color-ps-navy-300)]">
          Cálculo orientativo sobre el importe custodiado de la operación, con la escalera de
          precios fundador publicada (2,4&nbsp;% &lt;100K€ · 2,0&nbsp;% 100–400K€ · 1,5&nbsp;%
          400K€–1M€ · 1,2&nbsp;% &gt;1M€). El plazo de 24&nbsp;horas se cuenta desde la validación
          del hito. No es una oferta vinculante.
        </p>
      </div>
    </main>
  )
}

function Fila({ label, valor, sub, borde }: { label: string; valor: string; sub?: string; borde?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-2 ${borde ? 'border-t border-[rgba(169,243,255,0.14)]' : ''}`}>
      <span className="max-w-[30ch] text-sm text-[var(--color-ps-navy-200)]">{label}</span>
      <span className="whitespace-nowrap text-lg font-extrabold tabular-nums">
        {valor}
        {sub ? <small className="ml-1.5 text-xs font-semibold text-[var(--color-ps-navy-200)]">{sub}</small> : null}
      </span>
    </div>
  )
}

function BenefBloque({ titulo, puntos }: { titulo: string; puntos: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-cyan-glow)]">
        {titulo}
      </p>
      <ul className="space-y-2">
        {puntos.map((p) => (
          <li key={p} className="flex gap-2 text-[13px] leading-snug text-[var(--color-ps-navy-200)]">
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="mt-[3px] h-3 w-3 shrink-0 fill-none stroke-[var(--color-cyan-glow)]"
              strokeWidth={2}
            >
              <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
