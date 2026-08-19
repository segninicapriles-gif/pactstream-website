'use client'

import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   Calculadora de días de caja — trilingüe (ES / EN / PT).
   El cálculo es idéntico en los tres idiomas; solo cambian el copy, el
   formateo numérico y el valor por defecto del plazo de cobro (por mercado).
   Terminología EN/PT reutilizada de la landing de campaña aprobada.
   ───────────────────────────────────────────────────────────────────────── */

type Loc = 'es' | 'en' | 'pt'

const LOCALE_TAG: Record<Loc, string> = { es: 'es-ES', en: 'en-US', pt: 'pt-PT' }

/* Formateadores por idioma. nf0 = enteros con agrupación; nf1 = hasta 1 decimal
   (deja caer el ,0 solo). El símbolo de moneda es € en los tres (PactStream
   tarifa en €; Portugal es euro). */
function makeFmt(loc: Loc) {
  const tag = LOCALE_TAG[loc]
  const nf0 = new Intl.NumberFormat(tag, { maximumFractionDigits: 0, useGrouping: 'always' })
  const nf1 = new Intl.NumberFormat(tag, { maximumFractionDigits: 1 })
  return {
    int: (n: number) => nf0.format(Math.round(n)),
    euro: (n: number) => `${nf0.format(Math.round(n))} €`,
    pct1: (n: number) => nf1.format(n),
  }
}

/* Texto crudo → número, según el idioma. es/pt: coma decimal, el punto/espacio
   son miles. en: punto decimal, la coma es miles. type="text" y no
   type="number" porque number bloquea la coma decimal al teclear. */
function parseNum(s: string, loc: Loc): number {
  let clean = s.replace(/[\s €%]/g, '')
  if (loc === 'en') {
    clean = clean.replace(/,/g, '')
  } else {
    clean = clean.replace(/\./g, '').replace(',', '.')
  }
  const n = parseFloat(clean)
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

/* ─── Copy por idioma ─────────────────────────────────────────────────────── */

type Tramo = { pct: number; rango: string }

type Strings = {
  back: string
  h1: string
  lead: React.ReactNode
  defDias: number
  fObra: { label: string; hint: string; unidad: string; aria: string }
  fDias: { label: string; hint: string; unidad: string; aria: string }
  fCoste: { label: string; hint: string; unidad: string; aria: string }
  tramoRangos: [string, string, string, string]
  tramoNota: (pct: string, rango: string) => React.ReactNode
  resHead: string
  rowDias: string
  rowCaja: string
  rowValor: string
  rowComision: string
  diasUnit: string
  verdPos: string
  verdNeg: string
  verdPosBody: React.ReactNode
  verdNegBody: React.ReactNode
  noDepende: string
  paraTi: string
  paraTiPuntos: [string, string, string]
  paraCliente: string
  paraClientePuntos: [string, string, string]
  confirming: (dias: string, pct: string, importe: string) => React.ReactNode
  cierre: React.ReactNode
  cta: string
  nota: string
}

/* Escalera fundador por operación — fuente: PRICING_CANONICO_2026-08-07.md.
   Idéntica en los tres idiomas; solo se traduce la etiqueta del rango. */
function tramoFor(strings: Strings) {
  return (importe: number): Tramo => {
    const [r0, r1, r2, r3] = strings.tramoRangos
    if (importe < 100_000) return { pct: 0.024, rango: r0 }
    if (importe < 400_000) return { pct: 0.02, rango: r1 }
    if (importe < 1_000_000) return { pct: 0.015, rango: r2 }
    return { pct: 0.012, rango: r3 }
  }
}

const STR: Record<Loc, Strings> = {
  es: {
    back: '← PactStream',
    h1: '¿Cuánta caja te devuelve cobrar contra certificación?',
    lead: (
      <>
        El sector cobra a 96,5 días de media (PMcM).{' '}
        <b className="text-[var(--color-navy-vault)]">PactStream invierte el orden</b>: el dinero de
        la obra queda custodiado en cuenta regulada antes de empezar, y cada certificación verificada
        libera tu cobro en 24&nbsp;horas desde la validación del hito. Mueve los datos de tu obra y
        mira lo que eso vale — también cuando no nos favorece.
      </>
    ),
    defDias: 96,
    fObra: { label: 'Importe de la obra', hint: 'determina tu tramo de comisión', unidad: '€', aria: 'Importe de la obra en euros' },
    fDias: { label: 'Días que tardas en cobrar hoy', hint: 'media del sector: 96', unidad: 'días', aria: 'Días de cobro actuales' },
    fCoste: { label: 'Coste anual de adelantar ese dinero', hint: 'confirming/factoring típico: 8–12 %', unidad: '%', aria: 'Coste de financiación anual en porcentaje' },
    tramoRangos: ['hasta 100.000 €', '100.000 – 400.000 €', '400.000 € – 1 M€', 'más de 1 M€'],
    tramoNota: (pct, rango) => (
      <>
        Tu tramo (precio fundador, por operación):{' '}
        <b className="tabular-nums text-[var(--color-primary)]">{pct}&nbsp;%</b> ({rango})
      </>
    ),
    resHead: 'El dinero, sin rodeos',
    rowDias: 'Días de circulante que liberas',
    rowCaja: 'Caja que dejas de tener atrapada',
    rowValor: 'Lo que vale esa caja a tu coste de financiación',
    rowComision: 'Comisión PactStream de la operación',
    diasUnit: 'días',
    verdPos: 'SOLO EL CIRCULANTE YA PAGA LA COMISIÓN',
    verdNeg: 'A ESTE PLAZO, EL CIRCULANTE NO CUBRE LA COMISIÓN',
    verdPosBody: (
      <>
        Y el circulante es solo la parte que se puede medir en euros.{' '}
        <b className="text-[#6fe0b8]">Lo que de verdad cambia no depende de este número</b> — lo
        tienes justo debajo, y vale igual para ti y para tu cliente.
      </>
    ),
    verdNegBody: (
      <>
        Te lo decimos tal cual. Pero el circulante nunca fue el motivo para usar PactStream:{' '}
        <b className="text-[var(--color-ps-red-400)]">lo que sí cambia sigue intacto</b> a cualquier
        plazo — y vale igual para ti y para tu cliente.
      </>
    ),
    noDepende: 'Lo que no depende del cálculo',
    paraTi: 'Para ti',
    paraTiPuntos: [
      'Cobras contra tu avance certificado, no contra la tesorería de tu cliente.',
      'El impago deja de ser posible: el dinero se custodia en cuenta regulada antes de empezar.',
      'Si hay desacuerdo, solo se aparta el importe en disputa. La obra no se para.',
    ],
    paraCliente: 'Para tu cliente',
    paraClientePuntos: [
      'Su dinero se libera contra certificación verificada, nunca por adelantado.',
      'Paga por obra ejecutada y sellada, no sobre promesas.',
      'Ante un problema, retiene solo lo que discute — el resto sigue fluyendo.',
    ],
    confirming: (dias, pct, importe) => (
      <>
        Adelantar esos {dias} días vía confirming al {pct}&nbsp;% te costaría{' '}
        <b className="tabular-nums text-[var(--color-ps-amber-400)]">{importe}</b> —{' '}
        <b className="text-[var(--color-ps-amber-400)]">con recurso</b>: si tu cliente no paga, el
        banco te lo reclama a ti. Y no resuelve la discusión de si el trabajo está bien ejecutado.
      </>
    ),
    cierre: (
      <>
        Tu cobro deja de depender de tu cliente. Depende de tu avance.{' '}
        <span className="text-[var(--color-cyan-glow)]">Eso es PactStream.</span>
      </>
    ),
    cta: 'Reservar mi plaza en PactStream →',
    nota: 'Cálculo orientativo sobre el importe custodiado de la operación, con la escalera de precios fundador publicada (2,4 % <100K€ · 2,0 % 100–400K€ · 1,5 % 400K€–1M€ · 1,2 % >1M€). El plazo de 24 horas se cuenta desde la validación del hito. No es una oferta vinculante.',
  },

  en: {
    back: '← PactStream',
    h1: 'How much cash does getting paid against certification give back to you?',
    lead: (
      <>
        In construction, getting paid takes months — 96.5 days on average in Spain (PMcM), 81 in
        Portugal, the worst in the EU.{' '}
        <b className="text-[var(--color-navy-vault)]">PactStream inverts the order</b>: the project&apos;s
        money is held in a regulated account before work starts, and each verified certification
        releases your payment within 24&nbsp;hours of the milestone being validated. Move your
        project&apos;s figures and see what that is worth — even when it doesn&apos;t favour us.
      </>
    ),
    defDias: 90,
    fObra: { label: 'Project value', hint: 'sets your commission tier', unidad: '€', aria: 'Project value in euros' },
    fDias: { label: 'Days it takes you to get paid today', hint: 'typical: 90+ days', unidad: 'days', aria: 'Current collection period in days' },
    fCoste: { label: 'Annual cost of advancing that money', hint: 'typical confirming/factoring: 8–12%', unidad: '%', aria: 'Annual financing cost as a percentage' },
    tramoRangos: ['up to €100,000', '€100,000 – 400,000', '€400,000 – 1M', 'over €1M'],
    tramoNota: (pct, rango) => (
      <>
        Your tier (founder pricing, per operation):{' '}
        <b className="tabular-nums text-[var(--color-primary)]">{pct}%</b> ({rango})
      </>
    ),
    resHead: 'The money, straight',
    rowDias: 'Days of working capital you free up',
    rowCaja: 'Cash you stop having trapped',
    rowValor: 'What that cash is worth at your financing cost',
    rowComision: 'PactStream fee for the operation',
    diasUnit: 'days',
    verdPos: 'THE WORKING CAPITAL ALONE ALREADY PAYS THE FEE',
    verdNeg: 'AT THIS TERM, THE WORKING CAPITAL DOESN’T COVER THE FEE',
    verdPosBody: (
      <>
        And working capital is only the part you can measure in euros.{' '}
        <b className="text-[#6fe0b8]">What really changes doesn&apos;t depend on this number</b> —
        it&apos;s right below, and it&apos;s worth the same for you and for your client.
      </>
    ),
    verdNegBody: (
      <>
        We&apos;re telling you straight. But working capital was never the reason to use PactStream:{' '}
        <b className="text-[var(--color-ps-red-400)]">what does change stays intact</b> at any term —
        and it&apos;s worth the same for you and for your client.
      </>
    ),
    noDepende: 'What doesn’t depend on the calculation',
    paraTi: 'For you',
    paraTiPuntos: [
      'You get paid against your certified progress, not against your client’s cash flow.',
      'Non-payment stops being possible: the money is held in a regulated account before work starts.',
      'If there’s a disagreement, only the disputed amount is set aside. Work doesn’t stop.',
    ],
    paraCliente: 'For your client',
    paraClientePuntos: [
      'Their money is released against verified certification, never in advance.',
      'They pay for executed and sealed work, not for promises.',
      'If a problem arises, they hold back only what they dispute — the rest keeps flowing.',
    ],
    confirming: (dias, pct, importe) => (
      <>
        Advancing those {dias} days via confirming at {pct}% would cost you{' '}
        <b className="tabular-nums text-[var(--color-ps-amber-400)]">{importe}</b> —{' '}
        <b className="text-[var(--color-ps-amber-400)]">with recourse</b>: if your client
        doesn&apos;t pay, the bank claims it back from you. And it doesn&apos;t resolve whether the
        work was properly executed.
      </>
    ),
    cierre: (
      <>
        Your payment stops depending on your client. It depends on your progress.{' '}
        <span className="text-[var(--color-cyan-glow)]">That&apos;s PactStream.</span>
      </>
    ),
    cta: 'Reserve my seat in PactStream →',
    nota: 'Indicative calculation on the amount held in custody for the operation, using the published founder pricing ladder (2.4% <€100K · 2.0% €100–400K · 1.5% €400K–1M · 1.2% >€1M). The 24-hour term runs from validation of the milestone. Not a binding offer.',
  },

  pt: {
    back: '← PactStream',
    h1: 'Quanto caixa lhe devolve receber contra certificação?',
    lead: (
      <>
        O setor recebe a 81 dias em Portugal — o pior prazo de pagamento da UE.{' '}
        <b className="text-[var(--color-navy-vault)]">A PactStream inverte a ordem</b>: o dinheiro da
        obra fica custodiado em conta regulada antes de começar, e cada certificação verificada
        liberta o seu recebimento em 24&nbsp;horas após a validação do marco. Mova os dados da sua
        obra e veja quanto isso vale — mesmo quando não nos favorece.
      </>
    ),
    defDias: 81,
    fObra: { label: 'Valor da obra', hint: 'determina o seu escalão de comissão', unidad: '€', aria: 'Valor da obra em euros' },
    fDias: { label: 'Dias que demora a receber hoje', hint: 'média em Portugal: 81', unidad: 'dias', aria: 'Prazo de recebimento atual em dias' },
    fCoste: { label: 'Custo anual de adiantar esse dinheiro', hint: 'confirming/factoring típico: 8–12 %', unidad: '%', aria: 'Custo de financiamento anual em percentagem' },
    tramoRangos: ['até 100.000 €', '100.000 – 400.000 €', '400.000 € – 1 M€', 'mais de 1 M€'],
    tramoNota: (pct, rango) => (
      <>
        O seu escalão (preço fundador, por operação):{' '}
        <b className="tabular-nums text-[var(--color-primary)]">{pct}&nbsp;%</b> ({rango})
      </>
    ),
    resHead: 'O dinheiro, sem rodeios',
    rowDias: 'Dias de fundo de maneio que liberta',
    rowCaja: 'Caixa que deixa de ter presa',
    rowValor: 'Quanto vale esse caixa ao seu custo de financiamento',
    rowComision: 'Comissão PactStream da operação',
    diasUnit: 'dias',
    verdPos: 'SÓ O FUNDO DE MANEIO JÁ PAGA A COMISSÃO',
    verdNeg: 'A ESTE PRAZO, O FUNDO DE MANEIO NÃO COBRE A COMISSÃO',
    verdPosBody: (
      <>
        E o fundo de maneio é só a parte que se pode medir em euros.{' '}
        <b className="text-[#6fe0b8]">O que de verdade muda não depende deste número</b> — está mesmo
        por baixo, e vale o mesmo para si e para o seu cliente.
      </>
    ),
    verdNegBody: (
      <>
        Dizemos-lhe tal e qual. Mas o fundo de maneio nunca foi o motivo para usar a PactStream:{' '}
        <b className="text-[var(--color-ps-red-400)]">o que muda continua intacto</b> a qualquer
        prazo — e vale o mesmo para si e para o seu cliente.
      </>
    ),
    noDepende: 'O que não depende do cálculo',
    paraTi: 'Para si',
    paraTiPuntos: [
      'Recebe contra o seu avanço certificado, não contra a tesouraria do seu cliente.',
      'O incumprimento deixa de ser possível: o dinheiro é custodiado em conta regulada antes de começar.',
      'Se houver desacordo, só se separa o valor em disputa. A obra não para.',
    ],
    paraCliente: 'Para o seu cliente',
    paraClientePuntos: [
      'O dinheiro dele é libertado contra certificação verificada, nunca por adiantado.',
      'Paga por obra executada e selada, não sobre promessas.',
      'Perante um problema, retém só o que discute — o resto continua a fluir.',
    ],
    confirming: (dias, pct, importe) => (
      <>
        Adiantar esses {dias} dias via confirming a {pct}&nbsp;% custar-lhe-ia{' '}
        <b className="tabular-nums text-[var(--color-ps-amber-400)]">{importe}</b> —{' '}
        <b className="text-[var(--color-ps-amber-400)]">com recurso</b>: se o seu cliente não pagar, o
        banco reclama-lho a si. E não resolve a discussão sobre se o trabalho está bem executado.
      </>
    ),
    cierre: (
      <>
        O seu recebimento deixa de depender do seu cliente. Depende do seu avanço.{' '}
        <span className="text-[var(--color-cyan-glow)]">Isto é a PactStream.</span>
      </>
    ),
    cta: 'Reservar a minha vaga na PactStream →',
    nota: 'Cálculo orientativo sobre o valor custodiado da operação, com a escala de preços fundador publicada (2,4 % <100K€ · 2,0 % 100–400K€ · 1,5 % 400K€–1M€ · 1,2 % >1M€). O prazo de 24 horas conta-se desde a validação do marco. Não é uma oferta vinculativa.',
  },
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

export function CalculadoraCaja({ locale = 'es' }: { locale?: Loc }) {
  const s = STR[locale]
  const f = makeFmt(locale)
  const tramo = tramoFor(s)

  const [obra, setObra] = useState(700_000)
  const [dias, setDias] = useState(s.defDias)
  const [coste, setCoste] = useState(9)
  const [tObra, setTObra] = useState(f.int(700_000))
  const [tDias, setTDias] = useState(f.int(s.defDias))
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
          <a href={locale === 'es' ? '/' : `/${locale}`}>{s.back}</a>
        </p>
        <h1 className="mt-4 max-w-[22ch] font-display text-3xl font-black leading-[1.08] tracking-tight text-[var(--color-navy-vault)] sm:text-4xl [text-wrap:balance]">
          {s.h1}
        </h1>
        <p className="mt-3 mb-9 max-w-[58ch] text-[17px] text-[#3d445f]">{s.lead}</p>

        <div className="grid items-start gap-7 md:grid-cols-[minmax(300px,5fr)_minmax(320px,6fr)]">
          <section aria-label={s.resHead} className="rounded-2xl border border-[#e3e2db] bg-white p-6 pb-4">
            <Campo
              label={s.fObra.label}
              hint={s.fObra.hint}
              unidad={s.fObra.unidad}
              min={30_000}
              max={3_000_000}
              step={10_000}
              valor={obra}
              texto={tObra}
              inputMode="numeric"
              ariaLabel={s.fObra.aria}
              onSlider={(v) => { const c = clampObra(v); setObra(c); setTObra(f.int(c)) }}
              onTexto={(str) => { setTObra(str); setObra(clampObra(parseNum(str, locale))) }}
            />
            <Campo
              label={s.fDias.label}
              hint={s.fDias.hint}
              unidad={s.fDias.unidad}
              min={15}
              max={210}
              step={1}
              valor={dias}
              texto={tDias}
              inputMode="numeric"
              ariaLabel={s.fDias.aria}
              onSlider={(v) => { const c = clampDias(v); setDias(c); setTDias(f.int(c)) }}
              onTexto={(str) => { setTDias(str); setDias(clampDias(parseNum(str, locale))) }}
            />
            <Campo
              label={s.fCoste.label}
              hint={s.fCoste.hint}
              unidad={s.fCoste.unidad}
              min={2}
              max={18}
              step={0.5}
              valor={coste}
              texto={tCoste}
              inputMode="decimal"
              ariaLabel={s.fCoste.aria}
              onSlider={(v) => { const c = clampCoste(v); setCoste(c); setTCoste(f.pct1(c)) }}
              onTexto={(str) => { setTCoste(str); setCoste(clampCoste(parseNum(str, locale))) }}
            />
            <p className="mt-1 border-t border-[#e3e2db] pt-4 text-[13px] text-[#3d445f]">
              {s.tramoNota(f.pct1(t.pct * 100), t.rango)}
            </p>
          </section>

          <section
            aria-label={s.resHead}
            aria-live="polite"
            className="rounded-2xl bg-[var(--color-navy-vault)] p-7 pb-6 text-white shadow-[0_18px_40px_-18px_rgba(8,13,66,0.45)]"
          >
            <h2 className="mb-4 font-display text-[15px] font-bold text-[var(--color-cyan-glow)]">
              {s.resHead}
            </h2>
            <Fila label={s.rowDias} valor={`${f.int(diasLib)} ${s.diasUnit}`} />
            <Fila label={s.rowCaja} valor={f.euro(obra)} borde />
            <Fila
              label={s.rowValor}
              valor={f.euro(valor)}
              sub={`${f.pct1((valor / obra) * 100)} %`}
              borde
            />
            <Fila label={s.rowComision} valor={f.euro(comision)} sub={`${f.pct1(t.pct * 100)} %`} borde />

            <div className={`mt-4 rounded-xl p-4 ${positivo ? 'bg-[rgba(18,176,122,0.16)]' : 'bg-[rgba(232,96,122,0.14)]'}`}>
              <p className={`text-[13px] font-bold tracking-wide ${positivo ? 'text-[#6fe0b8]' : 'text-[var(--color-ps-red-400)]'}`}>
                {positivo ? s.verdPos : s.verdNeg}
              </p>
              <p className="mt-1 font-display text-3xl font-black tabular-nums leading-tight">
                {positivo ? '+' : '−'}
                {f.euro(Math.abs(neto))}
              </p>
              <p className="mt-2 max-w-[52ch] text-[13.5px] text-[var(--color-ps-navy-200)]">
                {positivo ? s.verdPosBody : s.verdNegBody}
              </p>
            </div>

            <p className="mt-5 text-[13px] font-bold text-white">{s.noDepende}</p>
            <div className="mt-2 grid gap-4 rounded-xl border border-[rgba(169,243,255,0.16)] bg-[rgba(169,243,255,0.05)] p-4 sm:grid-cols-2">
              <BenefBloque titulo={s.paraTi} puntos={s.paraTiPuntos} />
              <BenefBloque titulo={s.paraCliente} puntos={s.paraClientePuntos} />
            </div>

            <p className="mt-4 border-t border-[rgba(169,243,255,0.14)] pt-3 text-[13px] text-[var(--color-ps-navy-200)]">
              {s.confirming(f.int(diasLib), f.pct1(coste), f.euro(confirming))}
            </p>

            <p className="mt-5 font-display text-[17px] font-bold leading-snug text-white [text-wrap:balance]">
              {s.cierre}
            </p>
            <a
              href={locale === 'es' ? '/#waitlist' : `/${locale}#waitlist`}
              className="mt-4 inline-block rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-cyan-glow)]"
            >
              {s.cta}
            </a>
          </section>
        </div>

        <p className="mt-7 max-w-[72ch] text-[12.5px] text-[var(--color-ps-navy-300)]">{s.nota}</p>
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

function BenefBloque({ titulo, puntos }: { titulo: string; puntos: readonly string[] }) {
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
