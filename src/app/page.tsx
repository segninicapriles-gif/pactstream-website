import type { Metadata } from "next";
import SiteContent from "@/components/SiteContent";

// Alternates por locale: canonical propio + mapa hreflang completo (es/en/pt + x-default).
// El título/descripción en español ya viven en layout.tsx (metadata global).
export const metadata: Metadata = {
  alternates: {
    canonical: "https://pactstream.io",
    languages: {
      "es-ES": "https://pactstream.io",
      "en-US": "https://pactstream.io/en",
      "pt-PT": "https://pactstream.io/pt",
      "x-default": "https://pactstream.io",
    },
  },
};

export default function Page() {
  return <SiteContent initialLocale="es" />;
}
