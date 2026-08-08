import type { Metadata } from 'next'
import { Calculadora } from '@/components/calculadora/Calculadora'

export const metadata: Metadata = {
  title: 'Calculadora de CAE y ayudas para instaladores | PactStream',
  description:
    'Calcula el valor real del CAE de una actuación aplicando el tope del 50 % sobre el consumo de calefacción del certificado previo, y la deducción de IRPF que le corresponde a tu cliente. Según BOE-A-2026-12283.',
  keywords: [
    'calculadora CAE',
    'certificados de ahorro energético',
    'ficha RES022',
    'valor CAE por metro cuadrado',
    'deducción IRPF eficiencia energética',
    'aislamiento buhardilla CAE',
  ],
  alternates: { canonical: 'https://pactstream.io/calculadora-cae' },
  openGraph: {
    title: 'Calculadora de CAE y ayudas para instaladores',
    description:
      'El tope del 50 % sobre el consumo de calefacción puede dejar el ahorro por debajo de un tercio del que da la tabla. Calcúlalo antes de ofertar.',
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
          Si descuentas el CAE de tu oferta antes de emitirlo y luego el expediente se topa
          o decae, la pérdida es tuya y contra margen. La tabla de valores que circula es un
          techo: el ahorro real está limitado por la mitad del consumo de calefacción del
          certificado previo, y ese tope casi nadie lo aplica.
        </p>
      </header>

      <Calculadora />

      <footer className="mt-12 max-w-3xl text-xs text-[var(--color-ps-navy-300)]">
        <p>
          Cálculo orientativo. La ficha RES022 se transcribió de BOE-A-2026-12283 el 7 de
          agosto de 2026 y las deducciones de IRPF se verificaron ese mismo día contra la
          AEAT. Las deducciones han sufrido cambios normativos durante 2025 y 2026:
          confírmalas antes de comprometerlas con un cliente. No sustituye al criterio de un
          técnico ni al de un asesor fiscal.
        </p>
      </footer>
    </main>
  )
}
