# PactStream Website — Frontend Design Spec

**Date:** 2026-06-25
**Tech stack:** Next.js (static export), Tailwind CSS v4, Framer Motion, Lucide icons, Inter + Nunito + CorporativeSansRd fonts
**Design tokens:** See `globals.css` `@theme inline` block

---

## 1. Social Proof Section

**Placement:** Between `HeroSection` and `WaitlistSection` in the page composition.

### Layout

Horizontal strip on dark background (`bg-[#0A1420]`), centered `max-w-[1200px]`, with a 3-column grid on desktop and vertical stack on mobile.

### Component Code

```tsx
/* ─── SOCIAL PROOF ─── */
function SocialProofSection({ t }: { t: Dict }) {
  const stats = [
    { target: 53, suffix: "+", label: "En lista de espera", icon: Users },
    { target: 8, suffix: "", label: "Proyectos piloto", icon: Building2 },
    { target: 0, suffix: "", label: "Disputas", icon: Shield },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#0A1420] border-y border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <AnimatedSection key={stat.label} delay={i * 0.12}>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="w-12 h-12 rounded-[10px] bg-[#0D9B84]/15 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[#0D9B84]" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-black font-display text-white">
                      <CountUp target={stat.target} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-[#8896A6]">{stat.label}</div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        {/* Trust badges row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { icon: Lock, text: "Escrow PSD2" },
            { icon: ShieldCheck, text: "IA verificada" },
            { icon: Zap, text: "Pagos en 24h" },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-sm text-white/50">
              <badge.icon className="w-4 h-4 text-[#0D9B84]" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Integration in Page

```tsx
<HeroSection t={t} />
<SocialProofSection t={t} />
<WaitlistSection t={t} locale={locale} />
```

---

## 2. ROI Calculator

**Placement:** After `ValidationSection`, before `PricingSection`.

### Component Code

```tsx
/* ─── ROI CALCULATOR ─── */
function ROICalculator() {
  const [amount, setAmount] = useState(65000);
  const [milestones, setMilestones] = useState(4);

  // Business logic based on industry data
  const disputeRate = 0.23; // 23% of projects have payment disputes
  const avgDisputeCost = 0.12; // 12% of project value lost to disputes
  const delayDaysWithout = 45; // average payment delay days without escrow
  const delayDaysWith = 3; // with PactStream
  const pactStreamFee = 0.024; // 2.4% platform fee

  const potentialLoss = amount * disputeRate * avgDisputeCost;
  const timeSaved = delayDaysWithout - delayDaysWith;
  const platformCost = amount * pactStreamFee;
  const netSaving = potentialLoss - platformCost;
  const roi = netSaving > 0 ? Math.round((netSaving / platformCost) * 100) : 0;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0F1D2F] via-[#1B2D45] to-[#0F1D2F] text-white overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-sm font-semibold text-[#a9f3ff] uppercase tracking-wider mb-3">
            Calculadora de ahorro
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Descubre cuanto puedes ahorrar
          </h2>
          <p className="text-lg text-[#8896A6] max-w-xl mx-auto">
            Introduce el presupuesto de tu obra y calcula el ahorro estimado con PactStream.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="p-8 md:p-10 rounded-[16px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            {/* Input: Reform amount */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/70 mb-3">
                Presupuesto de la obra
              </label>
              <div className="relative">
                <input
                  type="range"
                  min={10000}
                  max={1000000}
                  step={5000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0D9B84]
                    [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(13,155,132,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-[#0D9B84] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-xs text-white/30">
                  <span>10.000 EUR</span>
                  <span>1.000.000 EUR</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-4xl font-black font-display text-[#a9f3ff]">
                  {formatCurrency(amount)}
                </span>
              </div>
            </div>

            {/* Input: Milestones */}
            <div className="mb-10">
              <label className="block text-sm font-medium text-white/70 mb-3">
                Numero de hitos
              </label>
              <div className="flex gap-3">
                {[2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setMilestones(n)}
                    className={`flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all ${
                      milestones === n
                        ? "bg-[#0D9B84] text-white shadow-[0_4px_12px_rgba(13,155,132,0.4)]"
                        : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                className="p-4 rounded-[12px] bg-white/[0.06] text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                key={`${amount}-${milestones}-loss`}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl font-black font-display text-red-400">
                  {formatCurrency(potentialLoss)}
                </div>
                <div className="text-xs text-white/50 mt-1">Riesgo de disputa evitado</div>
              </motion.div>

              <motion.div
                className="p-4 rounded-[12px] bg-white/[0.06] text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                key={`${amount}-${milestones}-time`}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <div className="text-2xl font-black font-display text-[#a9f3ff]">
                  {timeSaved} dias
                </div>
                <div className="text-xs text-white/50 mt-1">Cobro mas rapido</div>
              </motion.div>

              <motion.div
                className="p-4 rounded-[12px] bg-white/[0.06] text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                key={`${amount}-${milestones}-cost`}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-2xl font-black font-display text-white/70">
                  {formatCurrency(platformCost)}
                </div>
                <div className="text-xs text-white/50 mt-1">Coste PactStream</div>
              </motion.div>

              <motion.div
                className="p-4 rounded-[12px] bg-[#0D9B84]/20 border border-[#0D9B84]/30 text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                key={`${amount}-${milestones}-net`}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <div className="text-2xl font-black font-display text-[#0D9B84]">
                  {formatCurrency(netSaving)}
                </div>
                <div className="text-xs text-white/50 mt-1">Ahorro neto estimado</div>
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B6E5F] text-white text-base font-semibold rounded-[10px] hover:bg-[#095A4E] transition-all hover:shadow-[0_8px_30px_rgba(11,110,95,0.4)]"
              >
                Protege tu proyecto <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-xs text-white/30 mt-3">
                * Estimacion basada en datos del sector de construccion en Espana (CNMC, 2024). Resultados orientativos.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

### Integration in Page

```tsx
<ValidationSection t={t} />
<ROICalculator />
<PricingSection t={t} />
```

---

## 3. FAQ Accordion (Enhanced)

The existing `FAQSection` already has an accordion with Framer Motion `AnimatePresence`. The current implementation is solid. Below is an enhanced version with smoother height animation and a subtle border highlight on the open item:

### Enhanced Component Code

```tsx
/* ─── FAQ (ENHANCED) ─── */
function FAQSection({ t }: { t: Dict }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.faq.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332]">{t.faq.heading}</h2>
        </AnimatedSection>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div
                  className={`rounded-[12px] bg-white border overflow-hidden transition-colors duration-200 ${
                    isOpen ? "border-[#0D9B84]/30 shadow-[0_2px_8px_rgba(13,155,132,0.08)]" : "border-[#E8ECF2]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                  >
                    <span className="text-sm font-semibold text-[#1A2332] group-hover:text-[#0B6E5F] transition-colors">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown className="w-5 h-5 text-[#8896A6] shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-[#E8ECF2]/50">
                          <p className="text-sm text-[#5A6B7F] leading-relaxed pt-4">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Changes from current:**
- Teal border highlight on open item with subtle shadow
- Hover color change on question text
- `motion.div` wrapper on chevron for smooth rotation (replaces CSS class toggle)
- Inner border-top separator between question and answer
- `initial={false}` on AnimatePresence to prevent mount animation

---

## 4. Improved Hero — Dual CTA

The current hero already has dual CTAs (email form + "Ver como funciona" link). The enhancement makes the secondary CTA more prominent and adds a smooth scroll behavior.

### Code Changes

Replace the secondary CTA block (line ~268) in `HeroSection`:

**Current:**
```tsx
<a href="#como-funciona" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-[10px] hover:bg-white/10 transition-colors">
  {t.hero.ctaSecondary}
</a>
```

**Replace with:**
```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <a
    href="#waitlist"
    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0B6E5F] text-white text-sm font-semibold rounded-[10px] hover:bg-[#095A4E] transition-all hover:shadow-[0_8px_30px_rgba(11,110,95,0.4)]"
  >
    <Lock className="w-4 h-4" />
    Unete a la lista
  </a>
  <a
    href="#como-funciona"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 text-white/80 text-sm font-semibold rounded-[10px] hover:bg-white/[0.08] hover:text-white hover:border-white/30 transition-all"
  >
    Descubre como funciona
    <ChevronDown className="w-4 h-4" />
  </a>
</div>
```

This gives:
- Primary CTA: "Unete a la lista" with Lock icon and teal background (scrolls to waitlist)
- Secondary CTA: "Descubre como funciona" with ChevronDown and ghost/outline style (smooth scrolls to how-it-works)
- Both sit side-by-side on desktop, stack on mobile

---

## 5. OG Metadata

### Exact code for `layout.tsx`

Replace the current `metadata` export with:

```tsx
export const metadata: Metadata = {
  title: "PactStream — Confidence to Build | Escrow inteligente para construccion",
  description:
    "PactStream digitaliza la confianza en la construccion. Escrow regulado PSD2, verificacion con IA y pagos por hitos para promotores, constructores y arquitectos en Espana.",
  keywords: [
    "escrow construccion",
    "pagos por hitos obra",
    "verificacion IA construccion",
    "app constructores Espana",
    "gestion obra digital",
    "autopromocion vivienda",
    "reforma alta gama Madrid",
    "certificacion obra digital",
    "PactStream",
    "CostPact",
  ],
  metadataBase: new URL("https://pactstream.io"),
  openGraph: {
    title: "PactStream — Escrow inteligente para construccion",
    description:
      "Protege cada euro de tu obra. Escrow regulado PSD2, verificacion con IA y pagos por hitos. Acceso limitado a 200 profesionales.",
    type: "website",
    locale: "es_ES",
    url: "https://pactstream.io",
    siteName: "PactStream",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PactStream — Confidence to Build. Escrow inteligente para construccion.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PactStream — Escrow inteligente para construccion",
    description:
      "Protege cada euro de tu obra. Escrow PSD2, IA y pagos por hitos. Acceso limitado.",
    images: ["/og-image.png"],
    creator: "@pactstream",
    site: "@pactstream",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pactstream.io",
  },
};
```

**Note:** You will need to create `/public/og-image.png` (1200x630px). Recommended design: dark navy (#0A1420) background, PactStream logo centered, tagline "Confidence to Build" below, teal accent gradient.

---

## 6. Cookie Consent Banner

### Component Code

```tsx
/* ─── COOKIE CONSENT ─── */
function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ps-cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("ps-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("ps-cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="max-w-[900px] mx-auto p-5 md:p-6 rounded-[16px] bg-[#0F1D2F]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_-4px_30px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-white/80 leading-relaxed">
                Usamos cookies esenciales para el funcionamiento del sitio. No usamos cookies de seguimiento ni publicidad.{" "}
                <a
                  href="/cookies"
                  className="text-[#0D9B84] hover:text-[#a9f3ff] underline underline-offset-2 transition-colors"
                >
                  Politica de cookies
                </a>
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2.5 text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
              >
                Solo esenciales
              </button>
              <button
                onClick={accept}
                className="px-5 py-2.5 bg-[#0D9B84] text-white text-sm font-semibold rounded-[10px] hover:bg-[#0B8572] transition-colors"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Required import:** Add `useEffect` to the React imports at the top of `page.tsx`:
```tsx
import { useRef, useState, useCallback, useId, useEffect } from "react";
```

### Integration in Page

Add at the end of the `Page` component, after `<Footer>`:

```tsx
export default function Page() {
  const [t, locale, setLocale] = useLang();
  return (
    <>
      <Navbar t={t} locale={locale} setLocale={setLocale} />
      <main>
        <HeroSection t={t} />
        <SocialProofSection t={t} />
        <WaitlistSection t={t} locale={locale} />
        <ProblemSection t={t} />
        <StickyPhoneSection t={t} />
        <HowItWorksSection t={t} />
        <RolesSection t={t} />
        <UseCasesSection t={t} />
        <AISection t={t} />
        <EcosystemSection t={t} />
        <Hito0Section t={t} />
        <ValidationSection t={t} />
        <ROICalculator />
        <PricingSection t={t} />
        <FAQSection t={t} />
        <CTASection t={t} />
      </main>
      <Footer t={t} locale={locale} setLocale={setLocale} />
      <CookieConsent />
    </>
  );
}
```

---

## Implementation Checklist

| Component | New file? | Estimated effort |
|---|---|---|
| SocialProofSection | No, add to page.tsx | 10 min |
| ROICalculator | No, add to page.tsx | 15 min |
| FAQ Enhancement | No, modify existing in page.tsx | 5 min |
| Hero Dual CTA | No, modify existing in page.tsx | 5 min |
| OG Metadata | No, modify layout.tsx | 5 min |
| Cookie Consent | No, add to page.tsx + add `useEffect` import | 10 min |
| OG Image | Yes, `/public/og-image.png` (1200x630) | 20 min (design) |

**Total estimated effort:** ~70 minutes

---

## Design Token Reference (quick lookup)

| Token | Value | Usage |
|---|---|---|
| Background dark | `#0A1420` | Page bg, navbar, footer |
| Navy mid | `#0F1D2F` / `#1B2D45` | Gradient sections |
| Primary teal | `#0D9B84` | CTAs, accents, icons |
| Teal dark | `#0B6E5F` | Button bg, hover states |
| Teal darker | `#095A4E` | Button hover bg |
| Cyan accent | `#a9f3ff` | Highlight text, stats |
| Text muted | `#8896A6` | Subtext on dark bg |
| Text light-bg muted | `#5A6B7F` | Subtext on light bg |
| Text dark | `#1A2332` | Headings on light bg |
| Border light | `border-white/[0.06]` | Subtle borders on dark |
| Border light-bg | `border-[#E8ECF2]` | Borders on light bg |
| Card bg dark | `bg-white/[0.04]` | Cards on dark sections |
| Radius | `rounded-[10px]` buttons, `rounded-[12px]` cards, `rounded-[16px]` panels |
| Font display | `font-display` (CorporativeSansRd) | Headings |
| Font logo | `font-[family-name:var(--font-nunito)]` | Logo only |
