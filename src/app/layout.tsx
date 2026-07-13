import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pactstream.io"),
  title: "PactStream — Cobra antes. Documenta mejor. Certifica sin riesgos.",
  description:
    "El único escrow inteligente para construcción en España. Pagos protegidos PSD2, verificación con IA (score 0-100) y cobros por hitos validados. Para promotores, constructores y técnicos.",
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
    title: "PactStream — Cobra antes. Documenta mejor. Certifica sin riesgos.",
    description:
      "Escrow inteligente con verificación IA y pagos por hitos. El único ciclo completo para construcción residencial en España.",
    type: "website",
    locale: "es_ES",
    siteName: "PactStream",
    url: "https://pactstream.io",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PactStream — Escrow inteligente para construcción",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PactStream — Escrow inteligente para construcción",
    description:
      "Pagos protegidos PSD2, verificación IA y cobros por hitos. Para promotores, constructores y técnicos en España.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pactstream.io",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PactStream",
  url: "https://pactstream.io",
  description:
    "Escrow inteligente para construcción residencial en España. Pagos protegidos PSD2, verificación de evidencias con IA (score 0-100) y cobros por hitos validados.",
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
    <html lang="es" className={`${inter.className} ${nunito.variable}`}>
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
