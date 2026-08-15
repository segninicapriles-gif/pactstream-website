import type { Metadata } from 'next'
import { CalculadoraCaja } from '@/components/calculadora-caja/CalculadoraCaja'

export const metadata: Metadata = {
  title: 'Calculadora de días de caja para constructoras | PactStream',
  description:
    'El sector cobra a 96,5 días de media. Calcula cuánta caja te devuelve cobrar contra certificación verificada — con el resultado honesto, también cuando no nos favorece.',
  keywords: [
    'plazo de cobro construcción',
    'circulante obra',
    'confirming construcción',
    'cobrar certificación de obra',
    'días de caja constructora',
    'pago por certificaciones',
  ],
  alternates: { canonical: 'https://pactstream.io/calculadora-dias-de-caja' },
  openGraph: {
    title: 'Calculadora de días de caja para constructoras',
    description:
      '¿Cuánta caja te devuelve cobrar contra certificación? Mueve los datos de tu obra y mira el resultado — también cuando no nos favorece.',
    url: 'https://pactstream.io/calculadora-dias-de-caja',
    type: 'website',
    locale: 'es_ES',
    siteName: 'PactStream',
  },
}

export default function CalculadoraDiasDeCajaPage() {
  return <CalculadoraCaja />
}
