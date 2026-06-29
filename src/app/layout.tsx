import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "PactStream — Escrow inteligente para construcción",
    description:
      "Pagos protegidos PSD2, verificación IA y cobros por hitos. Para promotores, constructores y técnicos en España.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pactstream.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.className} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
