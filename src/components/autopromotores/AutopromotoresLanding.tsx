'use client'

/* ─────────────────────────────────────────────────────────────────────────
   Landing /autopromotores — captación del PARTICULAR que invierte en su obra
   (autopromoción + reforma integral). Enfoque CANAL (reserva plaza → trae a su
   constructor; la custodia la paga la constructora). Acceso anticipado, Q4 2026.
   Copy aprobado 3-oct-2026. Sin «único», Hito 0 «en negociación», la dirección
   técnica certifica (la IA solo puntúa). ES.
   Craft al nivel de pactstream.io (Sistema ARCO): acento cian #A9F3FF sobre navy
   y teal #0D9B84 sobre claro; reveals framer-motion; mockup de app en el hero.
   ───────────────────────────────────────────────────────────────────────── */

import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck, Lock, ClipboardCheck, ScanLine, Boxes, ArrowRight, Plus,
  CircleDollarSign, TrendingUp, CalendarX2, FileWarning, Download,
} from 'lucide-react'
import PhoneFrame from '@/components/PhoneFrame'
import { ScreenDashboardPromotor } from '@/components/AppScreens'
import { getDictionary } from '@/i18n'
import { insertWaitlist } from '@/lib/waitlist'

type Caso = 'build' | 'reform'
const NAVY = '#080D42'
const CYAN = '#A9F3FF'
const BLUE = '#0121DC'
const TEAL = '#0D9B84'
const EASE = [0.22, 1, 0.36, 1] as const

const eur = (n: number) => `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(Math.round(n))} €`

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }} className={className}>
      {children}
    </motion.div>
  )
}

/* ─── Fondo ambiental del hero / secciones navy (replica del sitio) ─────── */
function NavyAtmosphere() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        background:
          'radial-gradient(circle at 88% 6%, rgba(1,33,220,0.25) 0%, transparent 55%), radial-gradient(ellipse 160% 120% at 75% 0%, rgba(169,243,255,0.06) 0%, transparent 70%)',
      }} />
      <motion.div aria-hidden className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0D9B84, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0121DC, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
    </>
  )
}

/* ─── Calculadora de retención por hito ─────────────────────────────────── */
function Calculadora() {
  const [obra, setObra] = useState(300_000)
  const [anticipo, setAnticipo] = useState(20)
  const [hitos, setHitos] = useState(5)
  const [reten, setReten] = useState(0)
  const r = useMemo(() => {
    const anticipoEur = (obra * anticipo) / 100
    const porHito = (obra - anticipoEur) / hitos
    const retenPorHito = (porHito * reten) / 100
    return { anticipoEur, porHito, retenPorHito, retenTotal: retenPorHito * hitos }
  }, [obra, anticipo, hitos, reten])

  const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-white mb-2">{label}</label>
      {children}
      {hint && <p className="text-xs text-white/40 mt-1.5">{hint}</p>}
    </div>
  )
  return (
    <section id="calculadora" className="relative py-20 md:py-28 overflow-hidden" style={{ background: NAVY }}>
      <NavyAtmosphere />
      <div className="relative max-w-[1000px] mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: CYAN }}>Herramienta</p>
          <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-white mb-4">¿Cuánto deberías retener en cada hito?</h2>
          <p className="text-lg text-[#8896A6] max-w-2xl mx-auto">Mueve los datos de tu obra y mira cuánto conviene no pagar por adelantado. Orientación educativa — las cifras son tuyas, no se guardan.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <Reveal>
            <div className="rounded-[24px] p-7 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Field label={`Presupuesto de la obra: ${eur(obra)}`} hint="Autopromoción ~700.000 € · reforma integral ~65.000 €">
                <input type="range" min={30_000} max={1_200_000} step={5_000} value={obra} onChange={(e) => setObra(+e.target.value)} className="ps-range" />
              </Field>
              <Field label={`Anticipo inicial: ${anticipo}%`} hint="No hay cifra fija: si el anticipo no tiene respaldo, solo lo imprescindible para empezar">
                <input type="range" min={0} max={40} step={1} value={anticipo} onChange={(e) => setAnticipo(+e.target.value)} className="ps-range" />
              </Field>
              <Field label={`Certificaciones (hitos): ${hitos}`}>
                <input type="range" min={2} max={10} step={1} value={hitos} onChange={(e) => setHitos(+e.target.value)} className="ps-range" />
              </Field>
              <Field label={`Retención por certificación: ${reten}%`} hint="La que figure en tu contrato. Se libera al final de la obra">
                <input type="range" min={0} max={10} step={1} value={reten} onChange={(e) => setReten(+e.target.value)} className="ps-range" />
              </Field>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[24px] p-7 text-white border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <h3 className="font-semibold mb-5" style={{ color: CYAN }}>Tu obra, por tramos</h3>
              {[
                ['Anticipo inicial', eur(r.anticipoEur), 'El momento de mayor exposición'],
                ['Importe por certificación', eur(r.porHito), `${hitos} pagos contra avance certificado`],
                ['Se retiene en cada hito', eur(r.retenPorHito), 'No se paga hasta el remate'],
                ['Retención total al final', eur(r.retenTotal), 'Tu garantía hasta terminar'],
              ].map(([k, v, h], i) => (
                <div key={i} className="py-3.5" style={{ borderTop: i ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[#8896A6] text-sm">{k}</span>
                    <span className="font-display text-xl font-black tabular-nums" style={{ color: CYAN }}>{v}</span>
                  </div>
                  <p className="text-xs text-white/35 mt-0.5">{h}</p>
                </div>
              ))}
              <div className="mt-6 rounded-[14px] p-4 text-sm leading-relaxed text-white/85" style={{ background: 'rgba(1,33,220,0.18)' }}>
                Con PactStream, estos importes esperan en una <b className="text-white">cuenta de garantía regulada</b> y se liberan solo cuando la <b className="text-white">dirección técnica certifica</b> el avance. El anticipo inicial, con <b className="text-white">Hito 0</b> (en negociación), iría protegido por una póliza de caución.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Formulario de lista de espera ─────────────────────────────────────── */
function Waitlist({ caso }: { caso: Caso }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || state === 'loading') return
    setState('loading')
    ;(window as any).cimbriumEvento?.(`autopromotores-submit-${caso}`)
    try { await insertWaitlist(email, 'Promotor / Autopromotor', `autopromotores-${caso}`); (window as any).cimbriumEvento?.(`autopromotores-alta-${caso}`); setState('ok') }
    catch { setState('err') }
  }
  if (state === 'ok') return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-[20px] p-6 text-center border border-white/10" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <p className="font-display text-xl font-bold text-white mb-1">Plaza reservada.</p>
      <p className="text-[#8896A6] text-sm">Te escribiremos cuando abramos el acceso. Si quieres, ya puedes enviar a tu constructor un resumen de cómo funciona.</p>
    </motion.div>
  )
  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@correo.com"
          className="flex-1 pl-5 pr-5 py-4 bg-white/[0.08] border border-white/[0.12] rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#0D9B84]/60 focus:ring-1 focus:ring-[#0D9B84]/30 transition-colors" />
        <button type="submit" disabled={state === 'loading'}
          className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0121DC] text-white text-base font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)] whitespace-nowrap disabled:opacity-60">
          {state === 'loading' ? 'Enviando…' : 'Reserva mi plaza'} {state !== 'loading' && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
      {state === 'err' && <p className="text-[#F7B54A] text-sm mt-2">No hemos podido guardar tu reserva. Inténtalo de nuevo.</p>}
      <p className="text-xs text-[#8896A6] mt-3">Al reservar, aceptas recibir correos de PactStream sobre el acceso anticipado (previsto Q4 2026). Sin coste ni compromiso; te das de baja cuando quieras. <a href="/privacidad" className="underline hover:text-white transition-colors">Privacidad</a>.</p>
    </form>
  )
}

/* ─── Landing ───────────────────────────────────────────────────────────── */
export function AutopromotoresLanding() {
  const [caso, setCaso] = useState<Caso>('build')
  const screens = getDictionary('es').screens

  const hero = caso === 'build'
    ? {
        kicker: 'Autopromoción · construir tu casa',
        title: ['Vas a poner media vida en una obra. ', 'Que cada pago tenga respaldo.'],
        subtitle: 'PactStream guarda el dinero en una cuenta de garantía regulada y solo lo libera cuando tu arquitecto o aparejador certifica que ese tramo de obra está hecho. Tú no pagas por protegerte: la custodia la paga tu constructora.',
      }
    : {
        kicker: 'Reforma integral de tu vivienda',
        title: ['Tu reforma, pagada por tramos y ', 'solo contra obra certificada.'],
        subtitle: 'Tanto si la has heredado como si la acabas de comprar, tu dinero espera en una cuenta de garantía regulada y se libera cuando la dirección técnica certifica el avance. Sin pagar por adelantado a ciegas. Sin coste para ti: la custodia la paga la constructora.',
      }

  const fears: [typeof CircleDollarSign, string, string][] = [
    [CircleDollarSign, '«Y si pago el anticipo y el constructor desaparece»', 'Es el temor número uno, y no es paranoia: los impagos y abandonos de obra con anticipo están documentados en el sector. Entregar un buen pico de dinero antes de ver un solo ladrillo es un acto de fe que no debería hacer falta.'],
    [TrendingUp, '«Y si el presupuesto crece a mitad de obra»', 'Los sobrecostes son frecuentes y casi nunca llegan de golpe: llegan en pequeños «imprevistos» que se acumulan. Cuando quieres darte cuenta, ya has pagado de más y no sabes cuánto había hecho de verdad.'],
    [CalendarX2, '«Y si pago por algo que no está hecho»', 'Muchas obras se pagan por calendario, no por avance real. Así es fácil que lo pagado vaya por delante de lo ejecutado y que, si hay un problema, tu capacidad de reclamar sea mínima.'],
    [FileWarning, '«Y si no puedo demostrar nada»', 'Conversaciones de WhatsApp, fotos sueltas, un presupuesto en un PDF. Cuando hay un conflicto, tener la historia de la obra ordenada y fechada marca la diferencia.'],
  ]

  const layers: [typeof Lock, string, string][] = [
    [Lock, 'Tu dinero, en una cuenta de garantía regulada', 'No pasa a manos del constructor ni se queda en la tuya: se deposita en una cuenta de garantía regulada, externa a ambas partes y sujeta a la normativa europea de servicios de pago (PSD2). Está ahí, a la vista de los dos, hasta que toca liberarlo.'],
    [ClipboardCheck, 'Cada pago lo libera la dirección técnica', 'La decisión de liberar un pago no es de la constructora, ni se hace por calendario, ni a ciegas. La libera la certificación de tu arquitecto o aparejador: la persona cualificada para decir qué parte de la obra está realmente terminada.'],
    [ScanLine, 'Evidencias ordenadas y puntuadas', 'Fotos, mediciones y partes de avance se suben a la plataforma, y un sistema las puntúa de 0 a 100 con un código de color. Es una ayuda para que la dirección técnica certifique con más datos: la puntuación respalda la decisión, no la sustituye.'],
    [Boxes, 'Un ecosistema de principio a fin', 'Del presupuesto al pago y a la factura sin rehacer nada: CostPact presupuesta por hitos, PactStream protege los pagos de esos hitos y FiscalCore se ocupa de la parte fiscal. Todo conectado, para que lo pactado sea lo que se paga.'],
  ]

  const pasos = [
    ['Se definen los hitos', 'Con tu constructor y tu dirección técnica, la obra se divide en tramos claros (cimentación, estructura, cubierta, instalaciones, acabados…) y cada uno lleva su importe. Lo acordado queda por escrito desde el principio.'],
    ['Se deposita con protección', 'El importe de cada hito se deposita en la cuenta de garantía regulada. El constructor sabe que el dinero está ahí; tú sabes que no puede tocarlo hasta que haya obra certificada.'],
    ['Se certifica el avance', 'La constructora sube las evidencias del tramo. La dirección técnica las revisa (con la puntuación de apoyo, si quiere) y emite su certificación o pide correcciones.'],
    ['Se libera el pago', 'Con la certificación emitida, el pago se libera. Si no hay certificación, no hay pago. Así cada euro va detrás de obra real.'],
  ]

  const faqs = [
    ['¿Necesito arquitecto o aparejador?', 'En obra nueva y autopromoción la normativa ya exige dirección facultativa, así que tu técnico es quien certifica cada hito. En reforma integral lo habitual es contar con técnico cuando hay licencia o intervención de calado. Si aún no tienes a nadie, en la lista de espera te explicamos cómo incorporar a un profesional independiente. La certificación técnica es el corazón del sistema: sin ella no hay liberación de pago.'],
    ['¿Y si mi constructor no quiere usarlo?', 'Es una pregunta lógica. Para la constructora, el sistema es una ventaja: el dinero del hito está depositado y a la vista, y cobra al certificarse. Te prepararemos un mensaje claro para presentárselo. Y aunque decida no hacerlo, reservar tu plaza no te compromete a nada.'],
    ['¿Sirve para obra nueva y para reforma?', 'Sí. Está diseñado para ambas: desde la autopromoción de una vivienda unifamiliar hasta una reforma integral de un piso, con los hitos adaptados a cada caso.'],
    ['¿Cuándo estará disponible?', 'El lanzamiento está previsto para el cuarto trimestre de 2026. Ahora abrimos una lista de espera de acceso anticipado: quienes reserven plaza recibirán el aviso antes que nadie y serán de los primeros en probarlo. Todavía no es un servicio operativo.'],
    ['¿Cuánto me cuesta?', 'Para ti, nada: la custodia la paga la constructora. Reservar tu plaza tampoco te cuesta nada ni te obliga a contratar.'],
    ['¿Y si el constructor abandona la obra?', 'Como cada pago solo se libera tras la certificación de la dirección técnica, lo que no se ha certificado no se ha pagado: tu dinero sigue en la cuenta de garantía. Para el anticipo inicial, el momento de mayor exposición, está el Hito 0, protegido por una póliza de caución con una aseguradora líder del mercado (en negociación).'],
    ['¿Quién custodia mi dinero? ¿Es seguro?', 'Se deposita en una cuenta de garantía regulada, externa a ti y al constructor, sujeta a la normativa europea de servicios de pago (PSD2). Ninguna de las dos partes puede disponer de él por su cuenta. Detallaremos entidad y condiciones antes del lanzamiento.'],
    ['¿Decide una máquina si se me paga?', 'No. La decisión es de la dirección técnica, que certifica el avance. La puntuación de las evidencias (0 a 100, verde/ámbar/rojo) solo es una ayuda para que certifique con más información. Ni tú ni nadie aprueba pagos a ciegas.'],
  ]

  return (
    <main className="text-[#16181D]">
      <style>{`.ps-range{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:rgba(255,255,255,0.14);outline:none}
.ps-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;border-radius:999px;background:${CYAN};cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.4)}
.ps-range::-moz-range-thumb{width:18px;height:18px;border:0;border-radius:999px;background:${CYAN};cursor:pointer}
#autopromotores-faq summary::-webkit-details-marker{display:none}`}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(8,13,66,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center" aria-label="PactStream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pactstream-logo-white.svg" alt="PactStream" className="h-6 w-auto" />
          </a>
          <a href="#waitlist" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0121DC] text-white text-sm font-semibold rounded-full hover:bg-[#0019B3] transition-colors">
            Reservar plaza <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-30 pb-20 md:pt-36 md:pb-28 overflow-hidden" style={{ background: NAVY }}>
        <NavyAtmosphere />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <div className="inline-flex p-1 rounded-full mb-7 border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {([['build', 'Construyo mi casa'], ['reform', 'Reformo mi vivienda']] as const).map(([k, label]) => (
                  <button key={k} onClick={() => setCaso(k)} className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                    style={caso === k ? { background: '#fff', color: NAVY } : { color: 'rgba(255,255,255,0.6)' }}>{label}</button>
                ))}
              </div>
              <motion.p key={hero.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: CYAN }}>{hero.kicker}</motion.p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
                {hero.title[0]}<span style={{ color: CYAN }}>{hero.title[1]}</span>
              </h1>
              <p className="text-lg text-[#8896A6] leading-relaxed mb-8 max-w-xl">{hero.subtitle}</p>
              <Waitlist caso={caso} />
              <a href="#calculadora" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/55 hover:text-white transition-colors mt-5">
                Calcula cuánto retener en cada hito <ArrowRight className="w-4 h-4 rotate-90" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.25 }} className="relative justify-center hidden lg:flex" style={{ perspective: '1200px' }}>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                <PhoneFrame><ScreenDashboardPromotor t={screens} /></PhoneFrame>
              </motion.div>
            </motion.div>
          </div>

          {/* Franja de confianza */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14">
            {[
              [ShieldCheck, 'Cuenta de garantía regulada'],
              [ClipboardCheck, 'Libera la dirección técnica'],
              [CircleDollarSign, 'Sin coste para el propietario'],
              [TrendingUp, 'Acceso anticipado · Q4 2026'],
            ].map(([Icon, t], i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-[14px] px-4 py-3.5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <Icon className="w-5 h-5 shrink-0" style={{ color: TEAL }} />
                <span className="text-xs text-[#8896A6] leading-snug">{t as string}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MIEDOS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: TEAL }}>Lo que de verdad preocupa</p>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">Si te da respeto pagar una obra, es porque te tomas en serio tu dinero.</h2>
            <p className="text-lg text-[#5A6B7F]">Estos son los miedos que más oímos — y el motivo por el que existe PactStream.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {fears.map(([Icon, t, b], i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card-surface card-surface-hover p-7 h-full">
                  <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-5" style={{ background: 'rgba(193,34,60,0.08)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#A31C33' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t}</h3>
                  <p className="text-[#5A6B7F] leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10"><p className="text-lg font-medium" style={{ color: TEAL }}>No hace falta desconfiar de nadie. Hace falta que el sistema funcione aunque algo salga mal.</p></Reveal>
        </div>
      </section>

      {/* 4 CAPAS */}
      <section className="py-20 md:py-28" style={{ background: '#F6F6F3' }}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: TEAL }}>Cómo protege tu obra</p>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">Cuatro capas para que el dinero no dependa de la buena fe de nadie</h2>
            <p className="text-lg text-[#5A6B7F]">Ni tú ni el constructor tenéis que fiaros del otro. El sistema se fía del proceso.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {layers.map(([Icon, t, b], i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="card-surface card-surface-hover p-7 h-full">
                  <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-5" style={{ background: 'rgba(13,155,132,0.1)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#0B6E5F' }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t}</h3>
                  <p className="text-[#5A6B7F] leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: TEAL }}>Paso a paso</p>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">Así está pensado, de la firma al último pago</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-x-6 gap-y-10 relative">
            {pasos.map(([t, b], i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="font-display text-5xl font-black mb-3 tabular-nums" style={{ color: 'rgba(1,33,220,0.18)' }}>{i + 1}</div>
                <h3 className="font-semibold mb-2">{t}</h3>
                <p className="text-sm text-[#5A6B7F] leading-relaxed">{b}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12"><p className="text-sm text-[#5A6B7F]">La puntuación orienta; la <b className="text-[#16181D]">certificación de la dirección técnica</b> es la que decide.</p></Reveal>
        </div>
      </section>

      {/* CALCULADORA */}
      <Calculadora />

      {/* HITO 0 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.12em] font-semibold mb-5" style={{ background: 'rgba(143,93,0,0.08)', color: '#8F5D00' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#8F5D00' }} /> En negociación
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-5">Hito 0: cuando la obra necesita un anticipo para arrancar</h2>
            <p className="text-lg text-[#5A6B7F] mb-4">Muchas obras exigen un primer pago para empezar. El Hito 0 está pensado para que ese anticipo no se entregue a pelo: protegido por una <b className="text-[#16181D]">póliza de caución con una aseguradora líder del mercado (en negociación)</b>. Es una pieza opcional y la contrata la parte promotora; no es un coste obligatorio para el propietario.</p>
            <p className="text-xs text-[#5A6B7F]/80 mt-6">El Hito 0 está en fase de negociación con la aseguradora y no se ofrece hoy. Sus condiciones, coberturas y disponibilidad se informarán antes del lanzamiento y están sujetas a la aprobación de la aseguradora.</p>
          </Reveal>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section className="py-20 md:py-28" style={{ background: '#F6F6F3' }}>
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">Tres formas de proteger un pago de obra</h2>
            <p className="text-lg text-[#5A6B7F]">Todas tienen su sentido. Esta es la diferencia de mecanismo.</p>
          </Reveal>
          <Reveal>
            <div className="card-surface overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr style={{ background: NAVY }} className="text-white text-left">
                      <th className="p-4 font-semibold"></th>
                      <th className="p-4 font-semibold text-[#8896A6]">Pago directo</th>
                      <th className="p-4 font-semibold text-[#8896A6]">Aval</th>
                      <th className="p-4 font-semibold" style={{ color: CYAN }}>Cuenta de garantía + certificación técnica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Quién decide cuándo se paga', 'Tú, con lo que sepas', 'Se reclama si hay incumplimiento', 'La dirección técnica, al certificar'],
                      ['Cuándo actúa', 'Dependes de la buena fe', 'Cuando ya hay un problema', 'Antes de cada pago'],
                      ['Evidencias de avance', 'Fotos y mensajes dispersos', 'No es su función', 'Ordenadas, fechadas y puntuadas'],
                      ['Obra nueva y autopromoción', 'Sí', 'Sí', 'Sí, diseñado para ello'],
                      ['Coste para el propietario', 'Ninguno, pero con todo el riesgo', 'Suele tener coste y trámite', 'Sin coste para ti: la paga la constructora'],
                    ].map((row, i) => (
                      <tr key={i} className="card-row">
                        <td className="p-4 font-medium">{row[0]}</td>
                        <td className="p-4 text-[#5A6B7F]">{row[1]}</td>
                        <td className="p-4 text-[#5A6B7F]">{row[2]}</td>
                        <td className="p-4 font-semibold" style={{ color: '#0B6E5F' }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
          <Reveal className="text-center mt-6"><p className="text-sm text-[#5A6B7F]">Un aval puede ser un buen complemento. La diferencia es cuándo entra en juego: tras el problema, o antes de cada pago.</p></Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="autopromotores-faq" className="py-20 md:py-28 bg-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <Reveal><h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-10 text-center">Preguntas frecuentes</h2></Reveal>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <Reveal key={i} delay={i * 0.03}>
                <details className="card-surface p-6 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                    {q}<Plus className="w-5 h-5 shrink-0 text-[#0121DC] transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="text-[#5A6B7F] mt-3 leading-relaxed">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDADOR */}
      <section className="py-16 md:py-20" style={{ background: '#F6F6F3' }}>
        <Reveal className="max-w-[720px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-tight mb-4">Nacido dentro de una constructora</h2>
          <p className="text-lg text-[#5A6B7F] leading-relaxed">PactStream no lo ha ideado alguien que miró la construcción desde fuera. Viene de una constructora con años de obra real en Madrid, donde hemos visto de cerca dónde se rompe la confianza entre quien paga y quien construye. Los anticipos perdidos y las obras abandonadas son casos documentados en el sector: es el motivo por el que lo hemos diseñado así.</p>
        </Reveal>
      </section>

      {/* GUÍAS GRATIS (lead magnets) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: TEAL }}>Guías gratuitas</p>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-3">Llévate lo que hemos aprendido en obra</h2>
            <p className="text-lg text-[#5A6B7F] max-w-xl mx-auto">Dos guías prácticas para proteger tu dinero antes de firmar. Descarga directa, sin compromiso.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {([
              [ClipboardCheck, '20 preguntas antes de firmar con tu constructor', 'La lista que lleva por escrito quien no quiere jugársela a la confianza.', '/guias/20-preguntas-antes-de-firmar.pdf'],
              [ShieldCheck, 'Cómo proteger el anticipo de tu obra', 'El pago que más miedo da, y cómo darle respaldo paso a paso.', '/guias/proteger-el-anticipo-de-tu-obra.pdf'],
            ] as const).map(([Icon, t, d, href]) => (
              <Reveal key={href}>
                <a href={href} download className="card-surface card-surface-hover p-7 flex flex-col h-full group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(13,155,132,0.1)' }}>
                    <Icon className="w-5 h-5" style={{ color: TEAL }} />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2 leading-snug">{t}</h3>
                  <p className="text-[#5A6B7F] leading-relaxed mb-5 flex-1">{d}</p>
                  <span className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: BLUE }}>
                    <Download className="w-4 h-4" /> Descargar PDF
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-8">
            <p className="text-sm text-[#5A6B7F]">¿Eres arquitecto, aparejador o asesor? <a href="/guias/one-pager-prescriptores.pdf" download className="font-semibold underline" style={{ color: BLUE }}>Descarga el one-pager para prescriptores</a>.</p>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="waitlist" className="relative py-20 md:py-28 overflow-hidden" style={{ background: NAVY }}>
        <NavyAtmosphere />
        <Reveal className="relative max-w-[760px] mx-auto px-6 lg:px-10 text-center flex flex-col items-center">
          <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-white mb-4">Reserva tu plaza antes de firmar tu obra</h2>
          <p className="text-lg text-[#8896A6] mb-8 max-w-xl">Abrimos el acceso anticipado por orden de reserva. Déjanos tu correo y te avisaremos cuando llegue el momento; tráete a tu constructor cuando quieras.</p>
          <Waitlist caso={caso} />
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="py-10" style={{ background: '#05081f' }}>
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pactstream-logo-white.svg" alt="PactStream" className="h-5 w-auto mx-auto mb-4 opacity-80" />
          <p className="text-xs text-white/35 leading-relaxed max-w-[720px] mx-auto">
            PactStream se encuentra en fase de acceso anticipado y no está operativo. Las funcionalidades descritas corresponden al diseño del producto y pueden variar hasta el lanzamiento. Las condiciones del Hito 0 están en negociación con la aseguradora y no constituyen una oferta ni un contrato. La liberación de pagos depende de la certificación de la dirección técnica; la puntuación de evidencias es un apoyo informativo.
          </p>
          <a href="/" className="inline-block text-xs text-white/50 hover:text-white underline mt-4 transition-colors">Volver a pactstream.io</a>
        </div>
      </footer>
    </main>
  )
}
