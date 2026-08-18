import type { Metadata } from "next";
import SiteContent from "@/components/SiteContent";

export const metadata: Metadata = {
  title: "PactStream — Controlo de obra, verificação por IA e pagamento por marcos",
  description:
    "Controlo de obra, verificação do progresso com IA (score 0-100) e pagamento condicionado ao trabalho executado. O dinheiro numa conta regulada PSD2 externa às partes. Para promotores, construtores e técnicos.",
  openGraph: {
    title: "PactStream — Controlo de obra, verificação por IA e pagamento ligado ao progresso real",
    description:
      "O dinheiro numa conta regulada externa às duas partes. A IA verifica cada marco. O pagamento é libertado apenas contra trabalho certificado.",
    type: "website",
    locale: "pt_PT",
    siteName: "PactStream",
    url: "https://pactstream.io/pt",
    images: [
      { url: "/og-image.png?v=2", width: 1200, height: 630, alt: "PactStream — Escrow inteligente para construção" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PactStream — Controlo de obra, verificação por IA e pagamento por marcos",
    description:
      "O dinheiro numa conta regulada externa às partes. A IA verifica cada marco. O pagamento é libertado apenas contra trabalho certificado.",
    images: ["/og-image.png?v=2"],
  },
  alternates: {
    canonical: "https://pactstream.io/pt",
    languages: {
      "es-ES": "https://pactstream.io",
      "en-US": "https://pactstream.io/en",
      "pt-PT": "https://pactstream.io/pt",
      "x-default": "https://pactstream.io",
    },
  },
};

export default function Page() {
  return <SiteContent initialLocale="pt" />;
}
