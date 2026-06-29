# PactStream Website — Site Architecture Plan

**Date:** 2026-06-25
**Author:** Information Architecture Audit
**Source:** `website/src/app/page.tsx` (1192 lines, 14 sections)
**Status:** Recommendation — pending implementation

---

## 1. Current Section Order vs. Recommended

### Current order (page.tsx lines 1168-1189)

| # | Section | Component | Issue |
|---|---------|-----------|-------|
| 1 | Hero | `HeroSection` | OK but email capture competes with waitlist below |
| 2 | Waitlist | `WaitlistSection` | Too early — no problem/value established yet |
| 3 | Problem | `ProblemSection` | Should come right after hero |
| 4 | Features (sticky phone) | `StickyPhoneSection` | Heading duplicated (`t.features.tag` used as both `<p>` tag and `<h2>`) |
| 5 | How it works | `HowItWorksSection` | Good position |
| 6 | Roles (para quien) | `RolesSection` | Good but needs persona-split CTA |
| 7 | Use cases | `UseCasesSection` | Overlaps with Roles; merge or differentiate |
| 8 | AI | `AISection` | Should be inside features or right after |
| 9 | Ecosystem | `EcosystemSection` | CostPact cross-sell — keep near bottom |
| 10 | Hito 0 | `Hito0Section` | Confusing label for visitors; relabel |
| 11 | Validation | `ValidationSection` | This IS social proof but labeled wrong |
| 12 | Pricing | `PricingSection` | OK position |
| 13 | FAQ | `FAQSection` | OK position |
| 14 | CTA Final | `CTASection` | OK position |

### Recommended order

| # | Section | Rationale |
|---|---------|-----------|
| 1 | **Hero** | Hook + primary email capture. Keep the inline form. |
| 2 | **Problem/Pain** | Agitate before showing solution. The 40% stat is strong. |
| 3 | **How it works** | Show the 4-step flow immediately after pain — "here's how we fix it." |
| 4 | **Features** (sticky phone) | Deep dive on capabilities. Fix duplicate heading. Absorb AI section as a 6th tab. |
| 5 | **Roles / Para quien** | Persona-specific value props. Add "Soy propietario / Soy contratista" toggle. |
| 6 | **Social Proof** (NEW) | Trust signals, pilot logos, counters. Absorbs current ValidationSection + new content. |
| 7 | **Hito 0 / Guarantee** | Relabel to "Tu dinero, siempre protegido" — explain escrow guarantee. |
| 8 | **Ecosystem** | CostPact cross-sell for presupuestacion. |
| 9 | **Pricing** | After trust is built, show pricing. |
| 10 | **FAQ** | Handle objections before final CTA. |
| 11 | **Final CTA + Waitlist** | Merge current CTA and Waitlist into one high-conversion section. |

**Removed/merged:**
- `UseCasesSection` — merge into Roles as expandable examples per persona
- `AISection` — merge into Features as a tab (already exists as tab 3 "Verificacion IA")
- `ValidationSection` — absorb into new Social Proof section
- `WaitlistSection` at position 2 — move to bottom, merge with Final CTA

---

## 2. Section-by-Section Specification

### 2.1 Hero
**Purpose:** Capture attention, communicate core value prop, capture email.

**Contains:**
- Badge: "Acceso solo por invitacion" (keep)
- Headline with gradient text (keep)
- Subheadline (keep)
- Inline email capture form (keep — remove role selector, just email)
- Phone mockup with dashboard (keep)
- Trust badges row: "PSD2 regulado", "IA verificacion", "Escrow protegido" (keep)
- Stats row (keep)

**Changes needed:**
- Remove secondary CTA "Ver como funciona" — the email form is enough
- Add a micro-video play button overlaying the phone mockup (placeholder for future demo video)

**Components:** `HeroSection` (existing, minor edits)

### 2.2 Problem/Pain
**Purpose:** Agitate pain points by persona.

**Contains:**
- Stat headline: "El 40% de las obras terminan en disputa"
- 3 cards: Promotores / Constructores / Tecnicos with persona-specific pain
- Each card should include a concrete monetary figure (e.g., "30-45 dias sin cobrar", "Sobrecostes del 25% sin control")

**Changes needed:**
- Add monetary/time figures to each card (currently generic text)
- Consider adding a subtle animated counter for the 40% stat

**Components:** `ProblemSection` (existing, content update)

### 2.3 How It Works
**Purpose:** Show simplicity of the solution in 4 steps.

**Contains:**
- 4-step horizontal flow with icons and connecting lines
- Steps: Create obra > Deposit escrow > Upload evidence > Get paid

**Changes needed:**
- Add a mini-animation or micro-interaction showing the flow
- "Paso" prefix should be localized (currently hardcoded Spanish on line 658)

**Components:** `HowItWorksSection` (existing, minor fix)

### 2.4 Features (Consolidated)
**Purpose:** Deep-dive on product capabilities with interactive phone demo.

**Contains:**
- Tab pills for each feature (horizontal scroll mobile, centered desktop)
- Phone mockup that changes per tab
- Feature description card
- **5 existing tabs + merge AI as enhanced content within tab 3**

**Changes needed:**
- **Fix duplicate heading:** Line 541 uses `t.features.tag` for both the `<p>` section tag AND the `<h2>`. The `<h2>` should use a separate key like `t.features.heading` (e.g., "Todo lo que necesitas para proteger tu obra").
- Remove standalone `AISection` — its 3 items (verification, assistant, analytics) are already covered by feature tabs 3, 4, and 5
- Consider adding a 6th tab for CostPact integration

**Components:** `StickyPhoneSection` (existing, heading fix + possible tab addition)

### 2.5 Roles / Para Quien (with Persona Split)
**Purpose:** Show role-specific value. Enable self-selection.

**Contains:**
- **NEW: Dual-persona toggle** at top: "Soy propietario" / "Soy profesional (constructor/tecnico)"
  - Propietario view: emphasizes protection, transparency, escrow
  - Profesional view: emphasizes getting paid faster, trust score, certifications
- 3 role cards with benefits list (existing content)
- **Merge use cases as expandable examples under each role card** (absorbs `UseCasesSection`)
- CTA per card: "Reservar mi plaza como [role]" — pre-fills the waitlist role

**Changes needed:**
- Add toggle component
- Merge `UseCasesSection` content as "Ejemplo: [case]" accordion under each role
- Add role-specific CTA buttons linking to `#waitlist` with `?role=promotor` etc.

**Components:** `RolesSection` (major refactor), remove `UseCasesSection`

### 2.6 Social Proof (NEW SECTION)
**Purpose:** Build trust. Answer "quien mas lo usa?"

**Contains:**

| Element | What to show | Source |
|---------|-------------|--------|
| Pilot counter | "8 proyectos piloto en Madrid" | WeAreTomato pilots |
| Company logo strip | WeAreTomato logo + partner logos if available | Current assets |
| Stat counters (animated) | Absorb `ValidationSection` stats — reformat as: "X euros protegidos", "Y hitos verificados", "Z profesionales registrados" | Existing `CountUp` component |
| Quote/testimonial placeholder | "Proximamente: testimonios de pilotos" or a founder quote from Andres | Placeholder |
| Trust badges | PSD2, GDPR, encryption icons | Expand existing trust badges from hero |
| Press/mention logos | If any media coverage exists | TBD |

**Changes needed:**
- Create new `SocialProofSection` component
- Absorb `ValidationSection` stats into this section
- Remove standalone `ValidationSection`

**Components:** NEW `SocialProofSection`

### 2.7 Escrow Guarantee (relabeled Hito 0)
**Purpose:** Explain the escrow protection mechanism. Build financial trust.

**Contains:**
- Shield icon with gradient background (keep)
- **Relabel:** "Tu dinero, siempre protegido" instead of "Hito 0 Asegurado"
- Explanation of PSD2 escrow, how funds are protected
- Tags: "Cuenta regulada", "Fondos segregados", etc. (keep existing tags)

**Changes needed:**
- Rename section heading and tag in i18n
- Consider adding a simple diagram showing money flow: Promotor > Escrow > Constructor

**Components:** `Hito0Section` (existing, relabel only)

### 2.8 Ecosystem (CostPact)
**Purpose:** Cross-sell CostPact. Show the complete construction lifecycle.

**Contains:**
- Two cards: CostPact (budgeting) + PactStream (payments/escrow)
- "Competitive advantage" tagline
- Link to CostPact

**Changes needed:**
- Add a simple flow diagram: "Presupuesto (CostPact) > Obra (PactStream) > Cobro (PactStream)"
- Make CostPact card link to costpact.com when live

**Components:** `EcosystemSection` (existing, minor enhancement)

### 2.9 Pricing
**Purpose:** Show per-role pricing with clear value.

**Contains:**
- 3 profile-based pricing cards (keep)
- Founder note badge (keep)
- CTA per card linking to waitlist

**Changes needed:**
- Add "Mas popular" badge to Constructor card (most common user)
- Add toggle: monthly/annual (even if not implemented — shows future direction)
- Add "Incluye CostPact" mention in features where applicable

**Components:** `PricingSection` (existing, minor additions)

### 2.10 FAQ
**Purpose:** Handle objections. SEO long-tail.

**Current state:** FAQ component exists but needs content review.

**Recommended questions (8):**

| # | Question (ES) | Answer summary |
|---|--------------|----------------|
| 1 | Que es PactStream y como funciona? | Escrow + IA verification platform for construction. 4-step flow summary. |
| 2 | Es seguro depositar dinero en PactStream? | PSD2 regulated account, segregated funds, bank-grade encryption. Funds never touch PactStream's balance sheet. |
| 3 | Cuanto cuesta usar PactStream? | Per-role pricing summary. Founder pricing for first 50. Link to pricing section. |
| 4 | Que pasa si el constructor no cumple el hito? | Escrow funds remain protected. Dispute resolution process. Evidence-based arbitration. |
| 5 | Como funciona la verificacion con IA? | Upload geolocated photos, AI scores 0-100, green/amber/red findings. Human validation still required. |
| 6 | Puedo usar PactStream para reformas pequenas? | Yes — works for any size project. Reforma ticket from 65K EUR. Explain minimum viable project. |
| 7 | Que relacion tiene CostPact con PactStream? | CostPact = budgeting AI SaaS. PactStream = escrow + payments. Together = full construction lifecycle. |
| 8 | En que ciudades esta disponible? | Launching in Madrid with 8 WeAreTomato pilots. Expansion plan Spain > Portugal > LATAM. |

**Components:** `FAQSection` (existing, content update in i18n)

### 2.11 Final CTA + Waitlist (Merged)
**Purpose:** Maximum conversion. Urgency + scarcity + form.

**Contains:**
- Gradient dark background (merge current CTA + Waitlist visual style)
- Headline: strong closing statement
- Spots counter with progress bar (from current WaitlistSection)
- Waitlist form: email + role selector
- Tier breakdown: Fundador / Early Adopter / Lista de espera
- Social sharing after submission

**Changes needed:**
- Merge `CTASection` and `WaitlistSection` into a single component
- Keep the scarcity mechanics (147/200 spots)
- Add a subtle urgency element: "X plazas reservadas esta semana"

**Components:** NEW `FinalCTASection` (merge of `WaitlistSection` + `CTASection`)

---

## 3. Social Proof Strategy (with current assets)

### Available now (8 WeAreTomato pilots)

| Asset | How to use |
|-------|-----------|
| WeAreTomato logo | Logo strip: "Confiado por" section |
| 8 pilot projects | Counter: "8 proyectos piloto activos en Madrid" |
| Pilot data | Stats: total euros managed, hitos verified, professionals onboarded (use real numbers from pilots if available, otherwise reasonable projections) |
| Andres as founder | Founder quote: "Cree PactStream porque yo mismo perdi dinero en una reforma" or similar authentic story |
| WeAreTomato relationship | "Desarrollado por WeAreTomato" badge in footer |

### To build next (Q3/Q4 2026)

| Asset | Priority | Source |
|-------|----------|--------|
| Video testimonial from pilot user | HIGH | Record during pilot phase |
| NPS score from pilots | HIGH | Survey pilot participants |
| "Euros protegidos" live counter | MEDIUM | Connect to Supabase real data |
| Press mentions | MEDIUM | After ENISA/public funding announcement |
| ROI calculator | LOW | "Cuanto ahorras con PactStream" interactive widget |
| Integration logos (banks, PSD2 provider) | LOW | After partnerships confirmed |

---

## 4. CTA Placement Strategy

| Location | CTA Type | Text (ES) | Target |
|----------|----------|-----------|--------|
| Navbar (sticky) | Button | "Solicitar invitacion" | `#waitlist` (bottom) |
| Hero | Inline email form | "Unirme a la lista" | Direct Supabase insert |
| After Problem | Text link | "Ver como te protege PactStream" | `#funcionalidades` |
| Each Role card | Button | "Reservar mi plaza como [rol]" | `#waitlist?role=X` |
| After Social Proof | Button | "Unete a los 8 proyectos piloto" | `#waitlist` |
| After Pricing | Button (per card) | "Reservar plaza" | `#waitlist` |
| Final CTA (bottom) | Full form | Email + role + submit | Direct Supabase insert |

**Rule:** Never more than 2 scroll-lengths between CTAs. On mobile, every section should have a path to `#waitlist`.

---

## 5. Mobile-First Considerations

### Current good patterns (keep)
- Horizontal scroll carousels for Roles and Pricing on mobile
- Swipeable phone screenshots in Features section
- Responsive phone frame (full frame desktop, clean screenshot mobile)
- Mobile hamburger menu with smooth AnimatePresence

### Issues to fix

| Issue | Location | Fix |
|-------|----------|-----|
| Hero phone mockup floats with `perspective: 1200px` — can cause jank on low-end Android | Line 287 | Disable perspective animation on mobile via `lg:` prefix |
| Features dot indicators too small for touch (8px) | Line 624-631 | Increase to 12px with 44px tap target |
| Waitlist form in modal-like card — hard to scroll past on small screens | WaitlistSection | Moving to bottom solves this |
| Trust badges wrap awkwardly on 320px screens | Hero line 272-279 | Use 2-column grid instead of flex-wrap |
| `CountUp` animation fires on scroll — can cause layout shift if counter section scrolls into view partially | Line 96-121 | Add `will-change: contents` or use CSS containment |
| Footer links too dense on mobile | Footer | Stack into 2-column grid on `<sm` |

### Mobile-specific additions
- Sticky bottom bar on mobile (after scrolling past hero): "Reservar plaza" button, always visible
- Reduce phone mockup animations on `prefers-reduced-motion`
- Lazy-load phone screen components below the fold

---

## 6. Navigation Structure

### Recommendation: Stay single-page, BUT add subpages for legal/content

**Single-page (keep):**
The current single-page scroll is correct for a pre-launch waitlist landing page. Construction buyers in Spain make decisions slowly — they need to see everything on one page to build trust. A multi-page site fragments the conversion funnel at this stage.

**Add as separate routes:**

| Route | Purpose |
|-------|---------|
| `/` | Main landing page (current) |
| `/legal` | Aviso legal (already linked in footer) |
| `/privacidad` | Privacy policy (already linked) |
| `/cookies` | Cookie policy (already linked) |
| `/blog` | Future — SEO content hub |
| `/demo` | Future — video demo or interactive walkthrough |

### Navigation bar updates

**Current nav items:** Funcionalidades | Como funciona | Para quien | Precios

**Recommended:**
- Keep the same 4 items — they map well to the restructured sections
- Add `#social-proof` as a hidden anchor (no nav link) for internal linking
- Update anchor IDs to match new section order
- Add "Recursos" dropdown later (blog, documentation, API docs)

---

## 7. Implementation Priority

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| P0 | Reorder sections (just move components in page.tsx) | 5 min | HIGH — fixes the narrative flow |
| P0 | Fix duplicate "Funcionalidades" heading (line 541) | 2 min | MEDIUM — looks broken |
| P1 | Merge Waitlist + CTA into single bottom section | 1 hr | HIGH — eliminates premature conversion ask |
| P1 | Create SocialProofSection (absorb ValidationSection) | 2 hr | HIGH — trust signals |
| P1 | Relabel Hito0Section heading in i18n | 5 min | MEDIUM — reduces confusion |
| P2 | Add persona toggle to RolesSection | 3 hr | MEDIUM — Procore-style differentiation |
| P2 | Merge UseCases into Roles as expandable content | 2 hr | MEDIUM — reduces redundancy |
| P2 | Merge AISection into Features tabs | 2 hr | MEDIUM — removes redundant section |
| P3 | Add FAQ content (8 questions in i18n) | 1 hr | MEDIUM — SEO + objection handling |
| P3 | Mobile sticky bottom CTA bar | 1 hr | MEDIUM — conversion |
| P3 | Add video/demo placeholder | 30 min | LOW — future asset |

---

## Appendix: Component Mapping After Restructure

```
page.tsx (new order):
  <Navbar />
  <main>
    <HeroSection />           // existing, minor edits
    <ProblemSection />         // existing, content update
    <HowItWorksSection />      // existing, minor localization fix
    <StickyPhoneSection />     // existing, fix heading + absorb AI
    <RolesSection />           // refactored, add toggle + absorb use cases
    <SocialProofSection />     // NEW (absorbs ValidationSection)
    <Hito0Section />           // existing, relabel
    <EcosystemSection />       // existing
    <PricingSection />         // existing, minor additions
    <FAQSection />             // existing, content update
    <FinalCTASection />        // NEW (merge WaitlistSection + CTASection)
  </main>
  <Footer />
```

**Removed components:**
- `WaitlistSection` — merged into `FinalCTASection`
- `CTASection` — merged into `FinalCTASection`
- `ValidationSection` — absorbed into `SocialProofSection`
- `UseCasesSection` — absorbed into `RolesSection`
- `AISection` — absorbed into `StickyPhoneSection` tabs
