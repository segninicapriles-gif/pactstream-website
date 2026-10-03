'use client'

/* ─────────────────────────────────────────────────────────────────────────
   Landing /autopromotores — captación del PARTICULAR que invierte en su obra
   (autopromoción + reforma integral). Enfoque: CANAL de captación (el
   propietario reserva plaza y trae a su constructor; la custodia la paga la
   constructora). Estado: acceso anticipado, lanzamiento previsto Q4 2026.
   Copy aprobado 3-oct-2026. Sin «único», Hito 0 «en negociación», la
   dirección técnica certifica (la IA solo puntúa). ES (EN/PT más adelante).
   ───────────────────────────────────────────────────────────────────────── */

import { useMemo, useState } from 'react'
import { insertWaitlist } from '@/lib/waitlist'

type Caso = 'build' | 'reform'
const NAVY = 'var(--color-navy-vault)'
const BLUE = 'var(--color-primary)'
const TEAL = 'var(--color-ps-teal-600)'
const GOLD = 'var(--color-ps-amber-500)'

const eur = (n: number) => `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(Math.round(n))} €`

/* ─── Calculadora de retención por hito ─────────────────────────────────── */
function Calculadora() {
  const [obra, setObra] = useState(300_000)
  const [anticipo, setAnticipo] = useState(20)
  const [hitos, setHitos] = useState(5)
  const [reten, setReten] = useState(5)

  const r = useMemo(() => {
    const anticipoEur = (obra * anticipo) / 100
    const restante = obra - anticipoEur
    const porHito = restante / hitos
    const retenPorHito = (porHito * reten) / 100
    const retenTotal = retenPorHito * hitos
    return { anticipoEur, porHito, retenPorHito, retenTotal }
  }, [obra, anticipo, hitos, reten])

  const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-white mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-white/40 mt-1">{hint}</p>}
    </div>
  )

  return (
    <section id="calculadora" className="py-20 md:py-28" style={{ background: NAVY }}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-4" style={{ color: GOLD }}>
            Herramienta
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Cuánto deberías retener en cada hito?
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Mueve los datos de tu obra y mira cuánto conviene no pagar por adelantado. Es una
            orientación educativa — las cifras son tuyas, no se guardan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Controles */}
          <div className="rounded-[24px] p-7" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Field label={`Presupuesto de la obra: ${eur(obra)}`} hint="Autopromoción ~700.000 € · reforma integral ~65.000 €">
              <input type="range" min={30_000} max={1_200_000} step={5_000} value={obra}
                onChange={(e) => setObra(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
            </Field>
            <Field label={`Anticipo inicial: ${anticipo}%`} hint="Recomendación habitual: no más del 20-30% (OCU)">
              <input type="range" min={0} max={40} step={1} value={anticipo}
                onChange={(e) => setAnticipo(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
            </Field>
            <Field label={`Número de certificaciones (hitos): ${hitos}`}>
              <input type="range" min={2} max={10} step={1} value={hitos}
                onChange={(e) => setHitos(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
            </Field>
            <Field label={`Retención por certificación: ${reten}%`} hint="Garantía de remate que se libera al final de la obra">
              <input type="range" min={0} max={10} step={1} value={reten}
                onChange={(e) => setReten(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
            </Field>
          </div>

          {/* Resultado */}
          <div className="rounded-[24px] p-7 text-white" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <h3 className="font-semibold mb-5" style={{ color: GOLD }}>Tu obra, por tramos</h3>
            {[
              ['Anticipo inicial', eur(r.anticipoEur), 'El momento de mayor exposición'],
              ['Importe por certificación', eur(r.porHito), `${hitos} pagos contra avance certificado`],
              ['Se retiene en cada hito', eur(r.retenPorHito), 'No se paga hasta el remate'],
              ['Retención total al final', eur(r.retenTotal), 'Tu garantía hasta terminar'],
            ].map(([k, v, h], i) => (
              <div key={i} className="py-3" style={{ borderTop: i ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/70 text-sm">{k}</span>
                  <span className="font-display text-xl font-bold">{v}</span>
                </div>
                <p className="text-xs text-white/40 mt-0.5">{h}</p>
              </div>
            ))}
            <div className="mt-6 rounded-xl p-4 text-sm leading-relaxed" style={{ background: 'rgba(1,33,220,0.18)' }}>
              Con PactStream, estos importes esperan en una <b>cuenta de garantía regulada</b> y se
              liberan solo cuando la <b>dirección técnica certifica</b> el avance. El anticipo inicial,
              con <b>Hito 0</b> (en negociación), iría protegido por una póliza de caución.
            </div>
          </div>
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
    try {
      await insertWaitlist(email, 'Promotor / Autopromotor', `autopromotores-${caso}`)
      setState('ok')
    } catch {
      setState('err')
    }
  }

  if (state === 'ok') {
    return (
      <div className="rounded-[20px] p-6 text-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <p className="font-display text-xl font-bold text-white mb-1">Plaza reservada.</p>
        <p className="text-white/60 text-sm">
          Te escribiremos cuando abramos el acceso. Si quieres, ya puedes enviar a tu constructor un
          resumen de cómo funciona.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="nombre@correo.com"
          className="flex-1 px-5 py-3.5 rounded-full text-[var(--color-navy-vault)] bg-white placeholder:text-ps-navy-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-ps-amber-400)]"
        />
        <button type="submit" disabled={state === 'loading'}
          className="px-6 py-3.5 rounded-full font-semibold text-white whitespace-nowrap transition-colors disabled:opacity-60"
          style={{ background: BLUE }}>
          {state === 'loading' ? 'Enviando…' : 'Reserva mi plaza'}
        </button>
      </div>
      {state === 'err' && <p className="text-[var(--color-ps-amber-400)] text-sm mt-2">No hemos podido guardar tu reserva. Inténtalo de nuevo.</p>}
      <p className="text-xs text-white/40 mt-3">
        Sin coste ni compromiso. Solo te escribimos para avisarte del lanzamiento (previsto Q4 2026).
      </p>
    </form>
  )
}

/* ─── Landing ───────────────────────────────────────────────────────────── */
export function AutopromotoresLanding() {
  const [caso, setCaso] = useState<Caso>('build')

  const hero = caso === 'build'
    ? {
        eyebrow: 'Para quien construye su casa en autopromoción',
        title: 'Estás a punto de poner media vida en una obra. Que cada pago tenga respaldo.',
        subtitle:
          'PactStream guarda el dinero en una cuenta de garantía regulada y solo lo libera cuando tu arquitecto o aparejador certifica que ese tramo de obra está hecho. Tú no pagas por protegerte: la custodia la paga tu constructora.',
        badge: 'Diseñado para obra nueva y autopromoción',
      }
    : {
        eyebrow: 'Para quien reforma su vivienda de forma integral',
        title: 'Tu reforma, pagada por tramos y solo contra obra certificada.',
        subtitle:
          'Tanto si la has heredado como si la acabas de comprar, tu dinero espera en una cuenta de garantía regulada y se libera cuando la dirección técnica certifica el avance. Sin pagar por adelantado a ciegas. Sin coste para ti: la custodia la paga la constructora.',
        badge: 'Diseñado para reforma integral',
      }

  const fears = [
    ['«Y si pago el anticipo y el constructor desaparece»', 'Es el temor número uno, y no es paranoia: los impagos y abandonos de obra con anticipo están documentados en el sector. Entregar un buen pico de dinero antes de ver un solo ladrillo es un acto de fe que no debería hacer falta.'],
    ['«Y si el presupuesto crece a mitad de obra»', 'Los sobrecostes son frecuentes y casi nunca llegan de golpe: llegan en pequeños «imprevistos» que se acumulan. Cuando quieres darte cuenta, ya has pagado de más y no sabes cuánto había hecho de verdad.'],
    ['«Y si pago por algo que no está hecho»', 'Muchas obras se pagan por calendario, no por avance real. Así es fácil que lo pagado vaya por delante de lo ejecutado y que, si hay un problema, tu capacidad de reclamar sea mínima.'],
    ['«Y si no puedo demostrar nada»', 'Conversaciones de WhatsApp, fotos sueltas, un presupuesto en un PDF. Cuando hay un conflicto, tener la historia de la obra ordenada y fechada marca la diferencia.'],
  ]

  const layers = [
    ['Tu dinero, en una cuenta de garantía regulada', 'No pasa a manos del constructor ni se queda en la tuya: se deposita en una cuenta de garantía regulada, externa a ambas partes y sujeta a la normativa europea de servicios de pago (PSD2). Está ahí, a la vista de los dos, hasta que toca liberarlo.'],
    ['Cada pago lo libera la dirección técnica', 'La decisión de liberar un pago no es de la constructora, ni se hace por calendario, ni a ciegas. La libera la certificación de tu arquitecto o aparejador: la persona cualificada para decir qué parte de la obra está realmente terminada.'],
    ['Evidencias ordenadas y puntuadas', 'Fotos, mediciones y partes de avance se suben a la plataforma, y un sistema las puntúa de 0 a 100 con un código de color. Es una ayuda para que la dirección técnica certifique con más datos: la puntuación respalda la decisión, no la sustituye.'],
    ['Un ecosistema de principio a fin', 'Del presupuesto al pago y a la factura sin rehacer nada: CostPact presupuesta por hitos, PactStream protege los pagos de esos hitos y FiscalCore se ocupa de la parte fiscal. Todo conectado, para que lo pactado sea lo que se paga.'],
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
    <main className="text-[var(--color-navy-vault)]">
      {/* Banner acceso anticipado */}
      <div className="text-center text-xs font-semibold py-2 px-4 text-white" style={{ background: BLUE }}>
        Acceso anticipado · Lanzamiento previsto en el cuarto trimestre de 2026
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28" style={{ background: NAVY }}>
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          {/* Toggle */}
          <div className="inline-flex p-1 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {([['build', 'Construyo mi casa'], ['reform', 'Reformo mi vivienda']] as const).map(([k, label]) => (
              <button key={k} onClick={() => setCaso(k)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                style={caso === k ? { background: '#fff', color: 'var(--color-navy-vault)' } : { color: 'rgba(255,255,255,0.65)' }}>
                {label}
              </button>
            ))}
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-5" style={{ color: GOLD }}>{hero.eyebrow}</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-6">{hero.title}</h1>
          <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-8">{hero.subtitle}</p>
          <Waitlist caso={caso} />
          <p className="text-sm text-white/45 mt-5">
            <a href="#calculadora" className="underline hover:text-white transition-colors">Calcula cuánto retener en cada hito ↓</a>
          </p>
        </div>
        {/* Trust strip */}
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10 mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Cuenta de garantía regulada, externa a las dos partes', 'Pagos liberados por certificación de la dirección técnica', 'Sin coste para el propietario', 'Acceso anticipado · Q4 2026'].map((t, i) => (
              <div key={i} className="rounded-[16px] p-4 text-xs text-white/70" style={{ background: 'rgba(255,255,255,0.05)' }}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* MIEDOS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Si te da respeto pagar una obra, es porque te tomas en serio tu dinero.</h2>
            <p className="text-lg text-ps-navy-300">Estos son los miedos que más oímos — y el motivo por el que existe PactStream.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {fears.map(([t, b], i) => (
              <div key={i} className="card-surface p-7">
                <h3 className="font-semibold text-lg mb-2">{t}</h3>
                <p className="text-ps-navy-300">{b}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-lg font-medium mt-10" style={{ color: TEAL }}>No hace falta desconfiar de nadie. Hace falta que el sistema funcione aunque algo salga mal.</p>
        </div>
      </section>

      {/* 4 CAPAS */}
      <section className="py-20 md:py-28" style={{ background: 'var(--color-canvas)' }}>
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Cuatro capas para que el dinero no dependa de la buena fe de nadie</h2>
            <p className="text-lg text-ps-navy-300">Ni tú ni el constructor tenéis que fiaros del otro. El sistema se fía del proceso.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {layers.map(([t, b], i) => (
              <div key={i} className="card-surface p-7">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold mb-4" style={{ background: BLUE }}>{i + 1}</div>
                <h3 className="font-semibold text-lg mb-2">{t}</h3>
                <p className="text-ps-navy-300">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Así está pensado, paso a paso</h2>
            <p className="text-lg text-ps-navy-300">Un recorrido corto, sin jerga.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {pasos.map(([t, b], i) => (
              <div key={i}>
                <div className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--color-ps-neutral-500)' }}>{i + 1}</div>
                <h3 className="font-semibold mb-2">{t}</h3>
                <p className="text-sm text-ps-navy-300">{b}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-10 text-ps-navy-300">La puntuación orienta; la <b className="text-[var(--color-navy-vault)]">certificación de la dirección técnica</b> es la que decide.</p>
        </div>
      </section>

      {/* CALCULADORA */}
      <Calculadora />

      {/* HITO 0 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[820px] mx-auto px-6 lg:px-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold mb-5" style={{ background: 'var(--color-ps-amber-50)', color: 'var(--color-ps-amber-700)' }}>En negociación</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">Hito 0: cuando la obra necesita un anticipo para arrancar</h2>
          <p className="text-lg text-ps-navy-300 mb-4">Muchas obras exigen un primer pago para empezar. El Hito 0 está pensado para que ese anticipo no se entregue a pelo: protegido por una <b className="text-[var(--color-navy-vault)]">póliza de caución con una aseguradora líder del mercado (en negociación)</b>. Es una pieza opcional y la contrata la parte promotora; no es un coste obligatorio para el propietario.</p>
          <p className="text-xs text-ps-navy-300/80 mt-6">El Hito 0 está en fase de negociación con la aseguradora y no se ofrece hoy. Sus condiciones, coberturas y disponibilidad se informarán antes del lanzamiento y están sujetas a la aprobación de la aseguradora.</p>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section className="py-20 md:py-28" style={{ background: 'var(--color-canvas)' }}>
        <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Tres formas de proteger un pago de obra</h2>
            <p className="text-lg text-ps-navy-300">Todas tienen su sentido. Esta es la diferencia de mecanismo.</p>
          </div>
          <div className="card-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: NAVY }} className="text-white text-left">
                    <th className="p-4 font-semibold"></th>
                    <th className="p-4 font-semibold">Pago directo</th>
                    <th className="p-4 font-semibold">Aval</th>
                    <th className="p-4 font-semibold" style={{ color: GOLD }}>Cuenta de garantía + certificación técnica</th>
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
                      <td className="p-4 text-ps-navy-300">{row[1]}</td>
                      <td className="p-4 text-ps-navy-300">{row[2]}</td>
                      <td className="p-4" style={{ color: TEAL, fontWeight: 600 }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-sm text-ps-navy-300 mt-6">Un aval puede ser un buen complemento. La diferencia es cuándo entra en juego: tras el problema, o antes de cada pago.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <details key={i} className="card-surface p-6 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  {q}<span className="text-[var(--color-primary)] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="text-ps-navy-300 mt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDADOR */}
      <section className="py-16 md:py-20" style={{ background: 'var(--color-canvas)' }}>
        <div className="max-w-[720px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Nacido dentro de una constructora</h2>
          <p className="text-lg text-ps-navy-300">PactStream no lo ha ideado alguien que miró la construcción desde fuera. Viene de una constructora con años de obra real en Madrid, donde hemos visto de cerca dónde se rompe la confianza entre quien paga y quien construye. Los anticipos perdidos y las obras abandonadas son casos documentados en el sector: es el motivo por el que lo hemos diseñado así.</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-28" style={{ background: NAVY }}>
        <div className="max-w-[760px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Reserva tu plaza antes de firmar tu obra</h2>
          <p className="text-lg text-white/60 mb-8">Abrimos el acceso anticipado por orden de reserva. Déjanos tu correo y te avisaremos cuando llegue el momento; tráete a tu constructor cuando quieras.</p>
          <Waitlist caso={caso} />
        </div>
      </section>

      {/* DISCLAIMER */}
      <footer className="py-10 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <p className="text-xs text-ps-navy-300/80 leading-relaxed text-center">
            PactStream se encuentra en fase de acceso anticipado y no está operativo. Las funcionalidades
            descritas corresponden al diseño del producto y pueden variar hasta el lanzamiento. Las
            condiciones del Hito 0 están en negociación con la aseguradora y no constituyen una oferta ni
            un contrato. La liberación de pagos depende de la certificación de la dirección técnica; la
            puntuación de evidencias es un apoyo informativo. · <a href="/" className="underline">PactStream</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
