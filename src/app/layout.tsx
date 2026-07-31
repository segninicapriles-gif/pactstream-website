import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Nunito } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Sistema ARCO — UI/body
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
});

// Sistema ARCO — Cifra Viva (importes, scores, hitos)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "600", "700"],
});

// Sistema ARCO — display/headings + wordmark (it.6: sustituye a Bricolage Grotesque)
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pactstream.io"),
  title: "PactStream — Control de obra, verificación IA y pago condicionado",
  description:
    "Control de obra, verificación del avance con IA (score 0-100) y pago condicionado al trabajo hecho. El dinero, en una cuenta regulada PSD2 externa a las partes. Para promotores, constructores y técnicos.",
  keywords: [
    "escrow construcción España",
    "pagos por hitos obra",
    "verificación IA construcción",
    "app constructores España",
    "gestión obra digital",
    "autopromoción vivienda",
    "reforma alta gama Madrid",
    "certificación obra digital",
    "escrow regulado PSD2",
    "PactStream",
    "CostPact",
    "presupuesto obra IA",
  ],
  openGraph: {
    title: "PactStream — Control de obra, verificación por IA y pago condicionado al avance real",
    description:
      "El dinero en una cuenta regulada externa a las dos partes. La IA verifica cada hito. El pago se libera solo con trabajo certificado.",
    type: "website",
    locale: "es_ES",
    siteName: "PactStream",
    url: "https://pactstream.io",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "PactStream — Escrow inteligente para construcción",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PactStream — Control de obra, verificación IA y pago condicionado",
    description:
      "El dinero en una cuenta regulada externa a las partes. La IA verifica cada hito. El pago se libera solo con trabajo certificado.",
    images: ["/og-image.png?v=2"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pactstream.io",
  },
  icons: {
    icon: [
      { url: "/favicon-64.png?v=arco2", sizes: "64x64", type: "image/png" },
      { url: "/icon-192.png?v=arco2", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=arco2", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=arco2", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PactStream",
  url: "https://pactstream.io",
  description:
    "Control de obra con verificación del avance por IA (score 0-100) y pago condicionado por hitos sobre cuenta regulada PSD2. Presupuesto de origen con CostPact.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Starter — gratis, 2,4% por transacción",
  },
  author: {
    "@type": "Organization",
    name: "Tomato Design S.L.",
    url: "https://wearetomato.com",
  },
  inLanguage: "es",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${hankenGrotesk.className} ${hankenGrotesk.variable} ${jetbrainsMono.variable} ${nunito.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        {/* Google Analytics 4 — Consent Mode v2, denied por defecto: sin cookies sin consentimiento */}
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
            gtag('js', new Date());
            gtag('config', 'G-0X036FTNKN');
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0X036FTNKN" strategy="afterInteractive" />
      </body>
    </html>
  );
}
