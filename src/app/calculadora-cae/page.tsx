import type { Metadata } from 'next'
import { Calculadora } from '@/components/calculadora/Calculadora'
import { AvisoPeriodoTransitorio } from '@/components/calculadora/AvisoPeriodoTransitorio'

export const metadata: Metadata = {
  title: 'Calculadora de CAE y ayudas para instaladores | PactStream',
  description:
    'Calcula el valor real del CAE de una actuación con las fichas oficiales RES022 (aislamiento de buhardillas) y RES060 (sustitución de caldera por bomba de calor), y la deducción de IRPF que le corresponde a tu cliente.',
  keywords: [
    'calculadora CAE',
    'certificados de ahorro energético',
    'ficha RES022',
    'ficha RES060',
    'CAE aerotermia',
    'valor CAE por metro cuadrado',
    'deducción IRPF eficiencia energética',
    'aislamiento buhardilla CAE',
  ],
  alternates: { canonical: 'https://pactstream.io/calculadora-cae' },
  openGraph: {
    title: 'Calculadora de CAE y ayudas para instaladores',
    description:
      'El número no sale de una tabla: depende del certificado energético anterior a la obra. Calcúlalo antes de descontarlo de tu oferta.',
    url: 'https://pactstream.io/calculadora-cae',
    type: 'website',
    locale: 'es_ES',
    siteName: 'PactStream',
  },
}

export default function CalculadoraCaePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-[var(--color-navy-vault)] sm:text-4xl">
          ¿Cuánto vale de verdad este trabajo antes de que lo ofertes?
        </h1>
        <p className="mt-4 text-base text-[var(--color-ps-navy-400)]">
          Si descuentas el CAE de tu oferta antes de emitirlo y luego el expediente sale por
          menos o decae, la pérdida es tuya y contra margen. Y el número no sale de una tabla:
          en las dos fichas que cubre esta calculadora depende del{' '}
          <strong>certificado energético anterior a la obra</strong> — en buhardillas porque
          topa el ahorro, y en bombas de calor porque es de donde salen las demandas.
        </p>
        <AvisoPeriodoTransitorio />
      </header>

      <Calculadora />

      <footer className="mt-12 max-w-3xl text-xs text-[var(--color-ps-navy-300)]">
        <p>
          Cálculo orientativo. La ficha RES022 se transcribió de BOE-A-2026-12283 el 7 de
          agosto de 2026 y la RES060 V1.1, del catálogo vigente del MITECO, el 9 de agosto.
          Las deducciones de IRPF se verificaron contra la AEAT el 7 de agosto. Las
          deducciones han sufrido cambios normativos durante 2025 y 2026:
          confírmalas antes de comprometerlas con un cliente. No sustituye al criterio de un
          técnico ni al de un asesor fiscal.
        </p>
      </footer>
    </main>
  )
}
