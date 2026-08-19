import type { Metadata } from 'next'
import { CalculadoraCaja } from '@/components/calculadora-caja/CalculadoraCaja'

const ALT = {
  canonical: 'https://pactstream.io/pt/calculadora-dias-de-caixa',
  languages: {
    'es-ES': 'https://pactstream.io/calculadora-dias-de-caja',
    'en-US': 'https://pactstream.io/en/cash-days-calculator',
    'pt-PT': 'https://pactstream.io/pt/calculadora-dias-de-caixa',
    'x-default': 'https://pactstream.io/calculadora-dias-de-caja',
  },
}

export const metadata: Metadata = {
  title: 'Calculadora de dias de caixa para construtoras | PactStream',
  description:
    'Portugal recebe a 81 dias — o pior prazo de pagamento da UE. Calcule quanto caixa lhe devolve receber contra certificação verificada, com o resultado honesto, mesmo quando não nos favorece.',
  keywords: [
    'prazo de pagamento construção',
    'fundo de maneio obra',
    'confirming construção',
    'receber contra certificação',
    'dias de caixa construtora',
    'pagamento por certificações',
  ],
  alternates: ALT,
  openGraph: {
    title: 'Calculadora de dias de caixa para construtoras',
    description:
      'Quanto caixa lhe devolve receber contra certificação? Mova os dados da sua obra e veja o resultado — mesmo quando não nos favorece.',
    url: 'https://pactstream.io/pt/calculadora-dias-de-caixa',
    type: 'website',
    locale: 'pt_PT',
    siteName: 'PactStream',
  },
}

export default function CalculadoraDiasDeCaixaPage() {
  return <CalculadoraCaja locale="pt" />
}
