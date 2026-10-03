import type { Metadata } from 'next'
import { AutopromotoresLanding } from '@/components/autopromotores/AutopromotoresLanding'

const ALT = {
  canonical: 'https://pactstream.io/autopromotores',
  languages: {
    'es-ES': 'https://pactstream.io/autopromotores',
    'x-default': 'https://pactstream.io/autopromotores',
  },
}

export const metadata: Metadata = {
  title: 'Protege los pagos de tu obra o reforma | PactStream',
  description:
    'Tu dinero en una cuenta de garantía regulada y cada pago liberado solo cuando la dirección técnica certifica el avance. Reserva tu plaza en el acceso anticipado.',
  keywords: [
    'proteger anticipo obra',
    'autopromoción vivienda',
    'reforma integral sin riesgo',
    'constructor abandona la obra',
    'pago por certificaciones',
    'cuenta de garantía obra',
  ],
  alternates: ALT,
  openGraph: {
    title: 'Protege los pagos de tu obra o reforma',
    description:
      'El dinero espera en una cuenta de garantía regulada y se libera cuando la dirección técnica certifica el avance. Acceso anticipado.',
    url: 'https://pactstream.io/autopromotores',
    type: 'website',
    locale: 'es_ES',
    siteName: 'PactStream',
  },
}

export default function AutopromotoresPage() {
  return <AutopromotoresLanding />
}
