import type { Metadata } from "next";
import SiteContent from "@/components/SiteContent";

export const metadata: Metadata = {
  title: "PactStream — Construction control, AI verification and milestone-based payment",
  description:
    "Construction control, AI-verified progress (0-100 score) and payment released only against certified work. Funds held in a regulated PSD2 account external to both parties. For developers, builders and technical certifiers.",
  openGraph: {
    title: "PactStream — Construction control, AI verification and payment tied to real progress",
    description:
      "Funds in a regulated account external to both parties. AI verifies every milestone. Payment releases only against certified work.",
    type: "website",
    locale: "en_US",
    siteName: "PactStream",
    url: "https://pactstream.io/en",
    images: [
      { url: "/og-image.png?v=2", width: 1200, height: 630, alt: "PactStream — Smart escrow for construction" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PactStream — Construction control, AI verification and milestone-based payment",
    description:
      "Funds in a regulated account external to both parties. AI verifies every milestone. Payment releases only against certified work.",
    images: ["/og-image.png?v=2"],
  },
  alternates: {
    canonical: "https://pactstream.io/en",
    languages: {
      "es-ES": "https://pactstream.io",
      "en-US": "https://pactstream.io/en",
      "pt-PT": "https://pactstream.io/pt",
      "x-default": "https://pactstream.io",
    },
  },
};

export default function Page() {
  return <SiteContent initialLocale="en" />;
}
