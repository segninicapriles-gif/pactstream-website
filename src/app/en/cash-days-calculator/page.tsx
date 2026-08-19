import type { Metadata } from 'next'
import { CalculadoraCaja } from '@/components/calculadora-caja/CalculadoraCaja'

const ALT = {
  canonical: 'https://pactstream.io/en/cash-days-calculator',
  languages: {
    'es-ES': 'https://pactstream.io/calculadora-dias-de-caja',
    'en-US': 'https://pactstream.io/en/cash-days-calculator',
    'pt-PT': 'https://pactstream.io/pt/calculadora-dias-de-caixa',
    'x-default': 'https://pactstream.io/calculadora-dias-de-caja',
  },
}

export const metadata: Metadata = {
  title: 'Cash-days calculator for construction firms | PactStream',
  description:
    'Construction gets paid on months-long terms. Work out how much cash getting paid against verified certification gives back to you — with the honest result, even when it doesn’t favour us.',
  keywords: [
    'construction payment terms',
    'working capital construction',
    'confirming construction',
    'get paid against certification',
    'cash days construction',
    'condition-based payment',
  ],
  alternates: ALT,
  openGraph: {
    title: 'Cash-days calculator for construction firms',
    description:
      'How much cash does getting paid against certification give back to you? Move your project’s figures and see the result — even when it doesn’t favour us.',
    url: 'https://pactstream.io/en/cash-days-calculator',
    type: 'website',
    locale: 'en_US',
    siteName: 'PactStream',
  },
}

export default function CashDaysCalculatorPage() {
  return <CalculadoraCaja locale="en" />
}
