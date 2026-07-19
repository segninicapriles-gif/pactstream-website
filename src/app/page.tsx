"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useId, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Shield,
  Camera,
  CreditCard,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Building2,
  Paintbrush,
  Ruler,
  Home as LucideHome,
  Lock,
  Zap,
  Eye,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  Mail,
  Globe,
  Users,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { Hito0Seal } from "@/components/Hito0Seal";
import {
  ScreenDashboardConstructor,
  ScreenObraDetail,
  ScreenAIVerification,
  ScreenAssistant,
  ScreenDashboardPromotor,
} from "@/components/AppScreens";
import { type Locale, type Dict, getDictionary, defaultLocale } from "@/i18n";
import { track } from "@vercel/analytics";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

/* Evento de conversión GA4 (complementa a Vercel Analytics, cuyo plan Hobby no registra custom events) */
function gaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") window.gtag?.("event", name, params);
}

const SUPABASE_URL = "https://tkncogzzlzbfhsfqlnsw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9Td5AIshuNe-LOGdKTYcNw_N7rqGQUD";

async function insertWaitlist(email: string, role?: string, source = "website") {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({ email, role: role || null, source }),
  });
  if (!res.ok && res.status !== 409) throw new Error("Error al registrar");
}

/* ─── Language context ─── */
function useLang(): [Dict, Locale, (l: Locale) => void] {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  return [getDictionary(locale), locale, setLocale];
}

/* ─── Animations helpers ─── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });
  const [val, setVal] = useState(0);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ─── LOGO (HTML text — avoids SVG font-loading issues on mobile) ─── */
function PactStreamLogo({ size = "md" }: { size?: "sm" | "md" }) {
  const uid = useId();
  const iconH = size === "sm" ? 34 : 36;
  const textClass = size === "sm" ? "text-lg" : "text-xl";
  const subClass = size === "sm" ? "text-[8px]" : "text-[9px]";
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="35 232 45 48" xmlns="http://www.w3.org/2000/svg" style={{ height: iconH, width: iconH * (45/48) }}>
        <defs>
          <linearGradient id={`${uid}-g1`} gradientUnits="userSpaceOnUse" x1="47.87" y1="238.78" x2="56.45" y2="265.86">
            <stop offset="0" stopColor="#a9f3ff"/><stop offset="1" stopColor="#0121dc"/>
          </linearGradient>
          <linearGradient id={`${uid}-g2`} gradientUnits="userSpaceOnUse" x1="61.03" y1="261.28" x2="40.24" y2="245.45">
            <stop offset="0" stopColor="#a9f3ff"/><stop offset="1" stopColor="#0121dc"/>
          </linearGradient>
        </defs>
        <path fill={`url(#${uid}-g1)`} d="m 62.24,235.68 c -4.05,0.1 -8.13,-0.15 -12.17,0.22 -4.69,0.72 -9.23,5.01 -9.16,9.95 -0.05,8.27 0,16.37 0,24.59 -0.01,2.58 2.82,4.39 5.71,4.4 2.74,-0.03 5.16,-2.11 5.21,-5.25 0.12,-2.32 1,-7.46 10.07,-7.46 4.73,0.07 9.64,-2.97 10.83,-7.71 0.61,-2.5 0.55,-4.97 0.49,-7.63 0,-2.96 -0.25,-5.52 -2.19,-7.5 -2.21,-2.47 -5.54,-3.61 -8.79,-3.62 z"/>
        <path fill={`url(#${uid}-g2)`} d="m 73.2,245.52 c -0.07,-0.48 -0.12,-0.92 -0.11,-1.23 0,0 0.5,8.78 -15.41,8.66 -12.76,-0.09 -16.16,3.59 -16.79,9.6 0,2.03 0.01,4.06 0.01,6.1 0,0.02 0,0.04 0,0.06 0.05,0.77 1.24,-8.35 17.62,-6.73 0.82,0.08 1.6,0.13 2.34,0.16 0.33,-0.02 0.67,-0.03 1.03,-0.03 4.73,0.07 9.64,-2.97 10.83,-7.71 0.61,-2.5 0.55,-4.97 0.49,-7.63 0,-0.43 -0.01,-0.86 -0.03,-1.27 z"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`${textClass} font-[family-name:var(--font-nunito)] font-bold text-white tracking-tight`}>PactStream</span>
        <span className={`${subClass} font-[family-name:var(--font-nunito)] font-normal text-white/50 tracking-wide`}>confidence to build</span>
      </div>
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar({ t, locale, setLocale }: { t: Dict; locale: Locale; setLocale: (l: Locale) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featDropdown, setFeatDropdown] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080D42]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <PactStreamLogo />
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <div className="relative" onMouseEnter={() => setFeatDropdown(true)} onMouseLeave={() => setFeatDropdown(false)}>
            <a href="#funcionalidades" className="flex items-center gap-1 hover:text-white transition-colors">
              {t.nav.features} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${featDropdown ? "rotate-180" : ""}`} />
            </a>
            <AnimatePresence>
              {featDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                >
                  <div className="w-56 p-2 rounded-[24px] bg-[#080D42] shadow-[0_10px_28px_-10px_rgba(8,13,66,0.45)]">
                    {t.features.items.map((f, i) => (
                      <a key={f.tag} href="#funcionalidades" onClick={(e) => { e.preventDefault(); setFeatDropdown(false); window.dispatchEvent(new CustomEvent('pactstream:feature', { detail: i })); document.getElementById('funcionalidades')?.scrollIntoView({ behavior: 'smooth' }); }} className="block px-3 py-2.5 rounded-[10px] text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors">
                        {f.tag}
                        <span className="block text-xs text-white/30 mt-0.5">{f.title}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="#como-funciona" className="hover:text-white transition-colors">{t.nav.howItWorks}</a>
          <a href="#para-quien" className="hover:text-white transition-colors">{t.nav.forWhom}</a>
          <a href="#comparativa" className="hover:text-white transition-colors">{t.nav.comparison}</a>
          <a href="#precios" className="hover:text-white transition-colors">{t.nav.pricing}</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-white/50 hover:text-white/80 text-sm transition-colors"
            aria-label="Switch language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase font-medium">{locale === "es" ? "EN" : "ES"}</span>
          </button>
          <a href="#waitlist" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#0121DC] text-white text-sm font-semibold rounded-full hover:bg-[#0019B3] transition-colors">
            {t.nav.cta} <ArrowRight className="w-4 h-4" />
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white/70 hover:text-white" aria-label="Menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080D42]/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {[
                { href: "#funcionalidades", label: t.nav.features },
                { href: "#como-funciona", label: t.nav.howItWorks },
                { href: "#para-quien", label: t.nav.forWhom },
                { href: "#comparativa", label: t.nav.comparison },
                { href: "#precios", label: t.nav.pricing },
              ].map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="py-3 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="#waitlist" onClick={() => setMobileOpen(false)} className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-[#0121DC] text-white text-sm font-semibold rounded-full">
                {t.nav.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── HERO ─── */
function HeroSection({ t }: { t: Dict }) {
  const [heroEmail, setHeroEmail] = useState("");
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#080D42] via-[#080D42] to-[#080D42]" />
      {/* Luz ambiental (it.6) — halos degradados, sin curvas ni SVG decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 88% 6%, rgba(1,33,220,0.25) 0%, transparent 55%), radial-gradient(ellipse 160% 120% at 75% 0%, rgba(169,243,255,0.06) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #0D9B84, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #0121DC, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A9F3FF]/10 border border-[#A9F3FF]/30 text-[#A9F3FF] text-sm font-medium mb-8">
              <Lock className="w-4 h-4" /> {t.hero.badge}
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-[80px] font-black text-white leading-[1.05] tracking-tighter mb-6">
              {t.hero.heading[0]}
              <span className="text-[#A9F3FF]">{t.hero.heading[1]}</span>
              {t.hero.heading[2]}
            </h1>
            <p className="text-lg md:text-xl text-[#8896A6] leading-relaxed mb-10 max-w-xl">
              {t.hero.sub}
            </p>
            {/* Inline email capture */}
            {!heroSubmitted ? (
              <form onSubmit={async (e) => { e.preventDefault(); if (!heroEmail) return; setHeroLoading(true); try { await insertWaitlist(heroEmail, undefined, "hero"); track("waitlist_submit", { source: "hero" }); gaEvent("waitlist_submit", { source: "hero" }); setHeroSubmitted(true); } catch { /* error silently */ } setHeroLoading(false); }} className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="email"
                  required
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  placeholder={t.heroEmail.placeholder}
                  className="flex-1 px-5 py-4 bg-white/[0.08] border border-white/[0.12] rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#0D9B84]/50 focus:ring-1 focus:ring-[#0D9B84]/30 transition-colors"
                />
                <button type="submit" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0121DC] text-white text-base font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)] whitespace-nowrap">
                  {t.heroEmail.cta} <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6 text-[#0D9B84]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">{t.heroEmail.note.includes("spam") ? "¡Registrado! Te contactaremos pronto." : "Registered! We'll contact you soon."}</span>
              </motion.div>
            )}
            <p className="text-xs text-[#8896A6] mb-6">{t.heroEmail.note}</p>
            <a href="#como-funciona" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-[10px] hover:bg-white/10 transition-colors">
              {t.hero.ctaSecondary}
            </a>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {t.trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs text-[#8896A6]">
                  <ShieldCheck className="w-4 h-4 text-[#0D9B84]" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative flex justify-center"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Desktop: full phone frame */}
              <div className="hidden lg:block">
                <PhoneFrame><ScreenDashboardConstructor /></PhoneFrame>
              </div>
              {/* Mobile: clean screenshot, no frame */}
              <div className="lg:hidden w-[240px] h-[480px] rounded-[28px] overflow-hidden shadow-[0_12px_60px_rgba(0,0,0,0.4)] border border-white/10">
                <ScreenDashboardConstructor />
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
          {t.hero.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-black font-display text-[#a9f3ff]">{stat.value}</div>
              <div className="text-sm text-[#8896A6] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── WAITLIST ─── */
function WaitlistSection({ t, locale }: { t: Dict; locale: Locale }) {
  const TOTAL_SPOTS = 200;
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) return;
    setLoading(true);
    setError(false);
    try { await insertWaitlist(email, role, "waitlist"); track("waitlist_submit", { source: "waitlist", role }); gaEvent("waitlist_submit", { source: "waitlist", role }); setSubmitted(true); } catch { setError(true); }
    setLoading(false);
  };

  return (
    <section id="waitlist" className="py-20 md:py-28 bg-gradient-to-br from-[#080D42] via-[#080D42] to-[#080D42] text-white overflow-hidden relative">
      {/* subtle radial glow instead of pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(13,155,132,0.3), transparent 60%)" }} />
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-sm font-semibold text-[#a9f3ff] uppercase tracking-wider mb-3">{t.waitlist.sectionTag}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">{t.waitlist.heading}</h2>
            <p className="text-lg text-[#8896A6] leading-relaxed mb-10">{t.waitlist.sub}</p>

            {/* Spots — primera fase */}
            <div className="mb-10">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-5xl font-black font-display text-[#a9f3ff]">{TOTAL_SPOTS}</span>
                <span className="text-lg text-[#8896A6]">{locale === "es" ? "plazas en la primera oleada" : "spots in the first wave"}</span>
              </div>
              <p className="text-sm text-[#8896A6]">
                {locale === "es"
                  ? "Acceso por orden de registro. Cuando se completen, abriremos lista de espera."
                  : "Access in order of registration. Once full, we'll open a waiting list."}
              </p>
            </div>

            {/* Tiers */}
            <div className="space-y-3">
              {t.waitlist.tiers.map((tier, i) => (
                <div key={i} className="flex items-start gap-3 p-3 card-surface-navy">
                  <span className="text-xl mt-0.5">{tier.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{tier.name}</span>
                      <span className="text-xs text-[#8896A6]">{tier.range}</span>
                    </div>
                    <p className="text-xs text-[#8896A6] mt-0.5">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="p-8 md:p-10 card-surface-navy backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.waitlist.emailPlaceholder}
                        className="w-full px-4 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-[10px] text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#0D9B84]/50 focus:ring-1 focus:ring-[#0D9B84]/30 transition-colors"
                      />
                    </div>
                    <div>
                      <select
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-[10px] text-white text-sm focus:outline-none focus:border-[#0D9B84]/50 focus:ring-1 focus:ring-[#0D9B84]/30 transition-colors appearance-none"
                        style={!role ? { color: "rgba(255,255,255,0.3)" } : undefined}
                      >
                        <option value="" disabled>{t.waitlist.rolePlaceholder}</option>
                        {t.waitlist.roles.map((r) => (
                          <option key={r} value={r} className="bg-[#080D42] text-white">{r}</option>
                        ))}
                      </select>
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#0121DC] text-white text-base font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t.waitlist.cta} <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    {error && (
                      <p className="text-xs text-center text-red-300" role="alert">
                        {locale === "es"
                          ? "No hemos podido registrarte. Inténtalo de nuevo o escríbenos a hello@pactstream.io."
                          : "We couldn't register you. Try again or write to hello@pactstream.io."}
                      </p>
                    )}
                    <p className="text-xs text-center text-[#8896A6]">{t.waitlist.privacy}</p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-[#0D9B84]/20 flex items-center justify-center mx-auto mb-5"
                    >
                      <CheckCircle2 className="w-8 h-8 text-[#0D9B84]" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">
                      {locale === "es" ? "¡Estás dentro!" : "You're in!"}
                    </h3>
                    <p className="text-[#8896A6] text-sm mb-4">
                      {locale === "es"
                        ? "Tu plaza queda reservada por orden de registro. Te avisaremos cuando sea tu turno."
                        : "Your spot is reserved in order of registration. We'll notify you when it's your turn."}
                    </p>
                    <div className="p-3 rounded-[10px] bg-white/[0.06]">
                      <p className="text-xs text-[#8896A6] mb-1">
                        {locale === "es" ? "Comparte con tu red:" : "Share with your network:"}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <code className="flex-1 px-3 py-1.5 bg-white/[0.06] rounded text-[#a9f3ff] truncate">pactstream.io</code>
                        <button onClick={() => navigator.clipboard.writeText("https://pactstream.io")} className="px-2 py-1.5 bg-white/[0.08] hover:bg-white/[0.12] rounded text-white/60 transition-colors">{locale === "es" ? "Copiar" : "Copy"}</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEMA ─── */
function ProblemSection({ t }: { t: Dict }) {
  const icons = [LucideHome, Building2, Ruler];
  const styles = [
    { bg: "bg-[#EBF3FC]", iconBg: "bg-[#1A6FD4]/10", iconColor: "text-[#1A6FD4]" },
    { bg: "bg-[#FFF0E6]", iconBg: "bg-[#D4640A]/10", iconColor: "text-[#D4640A]" },
    { bg: "bg-[#E8F7F0]", iconBg: "bg-[#0E8A5F]/10", iconColor: "text-[#0E8A5F]" },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.problem.heading}</h2>
          <p className="text-lg text-[#5A6B7F]">{t.problem.sub}</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {t.problem.cards.map((card, i) => {
            const Icon = icons[i];
            const s = styles[i];
            return (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <div className={`p-8 card-surface h-full`}>
                  <div className={`w-12 h-12 rounded-[10px] ${s.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A2332] mb-2">{card.title}</h3>
                  <p className="text-[#5A6B7F]">{card.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        <AnimatedSection className="mt-10 text-center">
          <a href="#waitlist" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0121DC] text-white text-sm font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)]">
            {t.nav.cta} <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── STICKY PHONE + FEATURES ─── */
function StickyPhoneSection({ t }: { t: Dict }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const swipeDir = useRef(1);
  const total = t.features.items.length;

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      if (typeof idx === 'number') { swipeDir.current = idx > 0 ? 1 : -1; setActiveIndex(idx); }
    };
    window.addEventListener('pactstream:feature', handler);
    return () => window.removeEventListener('pactstream:feature', handler);
  }, []);

  const swipe = useCallback((dir: 1 | -1) => {
    swipeDir.current = dir;
    setActiveIndex(prev => Math.max(0, Math.min(total - 1, prev + dir)));
  }, [total]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    touchStart.current = null;
    if (Math.abs(delta) > 50) swipe(delta > 0 ? 1 : -1);
  }, [swipe]);

  const screens = [
    <ScreenDashboardConstructor key="dash" />,
    <ScreenObraDetail key="obra" />,
    <ScreenAIVerification key="ai" />,
    <ScreenAssistant key="chat" />,
    <ScreenDashboardPromotor key="promotor" />,
  ];

  const featureIcons = [BarChart3, Shield, Eye, MessageSquare, CreditCard];

  return (
    <section id="funcionalidades" className="relative bg-[#F5F7FA] py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.features.tag}</p>
          <h2 className="font-display text-2xl lg:text-4xl font-bold text-[#1A2332]">{t.features.heading}</h2>
        </div>

        {/* Tab pills - horizontal scroll on mobile, centered on desktop */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 lg:mb-12 lg:justify-center scrollbar-hide" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {t.features.items.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <button
                key={f.title}
                onClick={() => { swipeDir.current = i > activeIndex ? 1 : -1; setActiveIndex(i); }}
                className={`flex items-center gap-2 px-3 py-2.5 text-sm whitespace-nowrap transition-colors ${i === activeIndex ? "text-[#16181D] font-extrabold" : "text-[#9AA0AB] font-medium hover:text-[#5A6B7F]"}`}
              >
                <Icon className="w-4 h-4" />
                {f.tag}
              </button>
            );
          })}
        </div>

        {/* Content: phone + description — swipeable */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center touch-pan-y"
        >
          {/* Phone screen */}
          <div className="flex justify-center mb-8 lg:mb-0">
            <div className="relative">
              {/* Desktop: PhoneFrame */}
              <div className="hidden lg:block">
                <PhoneFrame>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full"
                    >
                      {screens[activeIndex]}
                    </motion.div>
                  </AnimatePresence>
                </PhoneFrame>
              </div>
              {/* Mobile: clean screenshot */}
              <div className="lg:hidden">
                <AnimatePresence mode="wait" custom={swipeDir.current}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 60 * swipeDir.current }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 * swipeDir.current }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="w-[240px] h-[480px] rounded-[28px] overflow-hidden shadow-[0_12px_60px_rgba(0,0,0,0.15)] border border-black/5"
                  >
                    {screens[activeIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -inset-12 bg-gradient-to-r from-[#0D9B84]/10 to-[#1A6FD4]/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>

          {/* Description card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[11px] font-semibold text-[#0B6E5F] uppercase tracking-wide">{t.features.items[activeIndex].tag}</span>
              <h3 className="text-xl lg:text-2xl font-semibold text-[#1A2332] mt-1 mb-3">{t.features.items[activeIndex].title}</h3>
              <p className="text-sm lg:text-base text-[#5A6B7F] leading-relaxed">{t.features.items[activeIndex].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation: arrows + dots */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => swipe(-1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full bg-white border border-[#E8ECF2] flex items-center justify-center text-[#5A6B7F] hover:border-[#0B6E5F]/30 hover:text-[#0B6E5F] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {t.features.items.map((_, i) => (
              <button
                key={i}
                onClick={() => { swipeDir.current = i > activeIndex ? 1 : -1; setActiveIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-[#0B6E5F] w-6" : "bg-[#D0D5DD]"}`}
              />
            ))}
          </div>
          <button
            onClick={() => swipe(1)}
            disabled={activeIndex === total - 1}
            className="w-10 h-10 rounded-full bg-white border border-[#E8ECF2] flex items-center justify-center text-[#5A6B7F] hover:border-[#0B6E5F]/30 hover:text-[#0B6E5F] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-10 text-center">
          <a href="#waitlist" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0121DC] text-white text-sm font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)]">
            {t.nav.cta} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── CÓMO FUNCIONA ─── */
function HowItWorksSection({ t }: { t: Dict }) {
  const stepIcons = [Zap, Lock, Camera, CreditCard];
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.howItWorks.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.howItWorks.heading}</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-4 gap-8">
          {t.howItWorks.steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <AnimatedSection key={s.step} delay={i * 0.12}>
                <div className="relative">
                  {i < 3 && <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-[#DDE3ED]" />}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E6F5F2] to-[#B3E2D9] flex items-center justify-center mb-5 relative z-10">
                      <Icon className="w-8 h-8 text-[#0B6E5F]" />
                    </div>
                    <span className="text-xs font-bold text-[#0B6E5F] uppercase tracking-widest mb-2">Paso {s.step}</span>
                    <h3 className="text-lg font-semibold text-[#1A2332] mb-2">{s.title}</h3>
                    <p className="text-sm text-[#5A6B7F] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── PARA QUIÉN ─── */
function RolesSection({ t }: { t: Dict }) {
  const roleIcons = [LucideHome, Building2, Ruler];
  const roleStyles = [
    { color: "#1A6FD4", bg: "#EBF3FC", border: "border-[#1A6FD4]/20" },
    { color: "#D4640A", bg: "#FFF0E6", border: "border-[#D4640A]/20" },
    { color: "#0E8A5F", bg: "#E8F7F0", border: "border-[#0E8A5F]/20" },
  ];
  return (
    <section id="para-quien" className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.roles.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.roles.heading}</h2>
          <p className="text-lg text-[#5A6B7F]">{t.roles.sub}</p>
        </AnimatedSection>
        {/* Desktop: grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {t.roles.items.map((role, i) => {
            const Icon = roleIcons[i];
            const s = roleStyles[i];
            return (
              <AnimatedSection key={role.title} delay={i * 0.1}>
                <div className="p-8 card-surface card-surface-hover h-full">
                  <div className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-6" style={{ background: s.bg }}>
                    <Icon className="w-7 h-7" style={{ color: s.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A2332] mb-1">{role.title}</h3>
                  <p className="text-sm font-medium mb-5" style={{ color: s.color }}>{role.subtitle}</p>
                  <ul className="space-y-3">
                    {role.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: s.color }} />
                        <span className="text-sm text-[#3A4D65]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-6 -mx-6" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {t.roles.items.map((role, i) => {
            const Icon = roleIcons[i];
            const s = roleStyles[i];
            return (
              <div key={role.title} className="flex-none w-[80vw] snap-center">
                <div className="p-6 card-surface h-full">
                  <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-4" style={{ background: s.bg }}>
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2332] mb-1">{role.title}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: s.color }}>{role.subtitle}</p>
                  <ul className="space-y-2.5">
                    {role.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: s.color }} />
                        <span className="text-sm text-[#3A4D65]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CASOS DE USO ─── */
function UseCasesSection({ t }: { t: Dict }) {
  const caseIcons = [LucideHome, Paintbrush, Building2, Ruler];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.useCases.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.useCases.heading}</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6">
          {t.useCases.items.map((c, i) => {
            const Icon = caseIcons[i];
            return (
              <AnimatedSection key={c.title} delay={i * 0.08}>
                <div className="group flex gap-6 p-8 card-surface card-surface-hover">
                  <div className="w-14 h-14 rounded-[14px] bg-[#E6F5F2] flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-[#0B6E5F]" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold text-[#095A4E] bg-[#E6F5F2] rounded-full mb-3 tracking-wide">{c.tag}</span>
                    <h3 className="text-lg font-semibold text-[#1A2332] mb-2">{c.title}</h3>
                    <p className="text-sm text-[#5A6B7F] leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── IA ─── */
function AISection({ t }: { t: Dict }) {
  const aiIcons = [Eye, MessageSquare, TrendingUp];
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#080D42] via-[#080D42] to-[#080D42] text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-sm font-semibold text-[#a9f3ff] uppercase tracking-wider mb-3">{t.ai.tag}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{t.ai.heading}</h2>
            <p className="text-lg text-[#8896A6] leading-relaxed mb-10">{t.ai.sub}</p>
            <div className="space-y-6">
              {t.ai.items.map((item, i) => {
                const Icon = aiIcons[i];
                return (
                  <AnimatedSection key={item.title} delay={i * 0.12}>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#a9f3ff]" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-[#8896A6] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex justify-center order-first lg:order-none mb-8 lg:mb-0">
            <div className="relative">
              {/* Desktop: full phone frame */}
              <div className="hidden lg:block">
                <PhoneFrame><ScreenAIVerification /></PhoneFrame>
              </div>
              {/* Mobile: clean screenshot */}
              <div className="lg:hidden w-[240px] h-[480px] rounded-[28px] overflow-hidden shadow-[0_12px_60px_rgba(0,0,0,0.4)] border border-white/10">
                <ScreenAIVerification />
              </div>
              <div className="absolute -inset-16 bg-gradient-to-r from-[#0D9B84]/15 to-[#a9f3ff]/10 rounded-full blur-3xl -z-10" />
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection className="mt-12 text-center">
          <a href="#waitlist" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0121DC] text-white text-sm font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.3)]">
            {t.nav.cta} <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── ECOSISTEMA ─── */
function EcosystemSection({ t }: { t: Dict }) {
  return (
    <section className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.ecosystem.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.ecosystem.heading}</h2>
          <p className="text-lg text-[#5A6B7F]">{t.ecosystem.sub}</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="p-8 card-surface h-full">
              <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#E6F5F2] to-[#B3E2D9] flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-[#0B6E5F]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2332] mb-2">{t.ecosystem.costpact.name}</h3>
              <p className="text-sm text-[#0B6E5F] font-medium mb-4">{t.ecosystem.costpact.sub}</p>
              <p className="text-[#5A6B7F] text-sm leading-relaxed mb-5">{t.ecosystem.costpact.desc}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-[#0B6E5F]">
                <ChevronRight className="w-4 h-4" /> {t.ecosystem.costpact.link}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="p-8 rounded-[24px] bg-gradient-to-br from-[#080D42] to-[#080D42] text-white shadow-[0_1px_2px_rgba(8,13,66,0.04),0_10px_28px_-14px_rgba(8,13,66,0.10)] h-full">
              <div className="w-14 h-14 rounded-[14px] bg-white/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#a9f3ff]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.ecosystem.pactstream.name}</h3>
              <p className="text-sm text-[#a9f3ff] font-medium mb-4">{t.ecosystem.pactstream.sub}</p>
              <p className="text-[#8896A6] text-sm leading-relaxed mb-5">{t.ecosystem.pactstream.desc}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-[#a9f3ff]">
                <ChevronRight className="w-4 h-4" /> {t.ecosystem.pactstream.link}
              </div>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <p className="text-sm text-[#5A6B7F] mb-6">
            <strong className="text-[#1A2332]">{t.ecosystem.advantage.label}</strong> {t.ecosystem.advantage.text}
          </p>
          <a href="#waitlist" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0121DC] text-white text-sm font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)]">
            {t.nav.cta} <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── HITO 0 ASEGURADO ─── */
function Hito0Section({ t }: { t: Dict }) {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <motion.div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#F2FAF8] to-[#E6F5F2] flex items-center justify-center shrink-0" whileHover={{ scale: 1.05, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Hito0Seal size={104} className="w-[88px] h-[88px] lg:w-[104px] lg:h-[104px]" />
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.hito0.tag}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.hito0.heading}</h2>
              <p className="text-lg text-[#5A6B7F] leading-relaxed mb-6">{t.hito0.desc}</p>
              <div className="flex flex-wrap gap-4">
                {t.hito0.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F5F2] text-[#095A4E] text-sm font-medium rounded-full">
                    <CheckCircle2 className="w-4 h-4" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── VALIDACIÓN REAL ─── */
function ValidationSection({ t }: { t: Dict }) {
  return (
    <section className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.validation.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.validation.heading}</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {t.validation.stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="p-6 card-surface text-center">
                <div className="text-3xl font-black font-display text-[#0B6E5F]">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-[#1A2332] mb-1">{stat.label}</div>
                <div className="text-xs text-[#8896A6]">{stat.sub}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMPARATIVA ─── */
type Support = "yes" | "no" | "partial" | "roadmap";

function SupportBadge({ support }: { support: Support }) {
  switch (support) {
    case "yes": return <span className="inline-flex items-center text-emerald-600"><CheckCircle2 className="w-[18px] h-[18px]" /></span>;
    case "no": return <span className="inline-flex items-center text-slate-300"><X className="w-[18px] h-[18px]" /></span>;
    case "partial": return <span className="inline-flex items-center text-amber-500"><span className="w-[18px] h-[2.5px] bg-amber-500 rounded-full block" /></span>;
    case "roadmap": return <span className="inline-flex items-center text-blue-400 text-xs font-medium">2027</span>;
  }
}

function CompetitorCard({ comp, t }: { comp: (typeof t.comparison.competitors)[number]; t: Dict }) {
  const [open, setOpen] = useState(false);
  const features = t.comparison.features;
  const pactstream = t.comparison.pactstream as Record<string, Support>;
  const compFeatures = comp.features as Record<string, Support>;

  const psWins = features.filter(f => {
    const p = pactstream[f.key], c = compFeatures[f.key];
    return (p === "yes" && (c === "no" || c === "partial")) || (p === "yes" && c === "roadmap");
  }).length;
  const compWins = features.filter(f => {
    const p = pactstream[f.key], c = compFeatures[f.key];
    return (c === "yes" && (p === "no" || p === "partial" || p === "roadmap"));
  }).length;

  return (
    <AnimatedSection>
      <div className="card-surface card-surface-hover overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#0B6E5F]/20 focus:ring-inset"
          aria-expanded={open}
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: (comp as any).color }}>
              {comp.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-lg text-[#1A2332]">{comp.name}</h3>
                <span className="text-xs text-[#8896A6]">{(comp as any).country}</span>
              </div>
              <p className="text-sm text-[#8896A6] truncate">{(comp as any).tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">{t.comparison.wins} {psWins}</span>
              {compWins > 0 && <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{comp.name.split(" ")[0]} {compWins}</span>}
            </div>
            <ChevronDown className={`w-5 h-5 text-[#8896A6] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
        </button>

        {open && (
          <div className="card-row">
            <div className="overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="grid grid-cols-[1fr_90px_90px] bg-[#F5F7FA] text-xs font-semibold text-[#8896A6] uppercase tracking-wider">
                  <div className="px-6 py-3">Funcionalidad</div>
                  <div className="px-3 py-3 text-center text-[#0121DC]">PactStream</div>
                  <div className="px-3 py-3 text-center" style={{ color: (comp as any).color }}>{comp.name.split("(")[0].trim()}</div>
                </div>
                {features.map((f, i) => (
                  <div key={f.key} className={`grid grid-cols-[1fr_90px_90px] card-row ${i % 2 === 0 ? "bg-white" : "bg-[#F5F7FA]/30"}`}>
                    <div className="px-6 py-2.5 text-sm text-[#4A5568]">{f.label}</div>
                    <div className="px-3 py-2.5 flex justify-center"><SupportBadge support={pactstream[f.key]} /></div>
                    <div className="px-3 py-2.5 flex justify-center"><SupportBadge support={compFeatures[f.key]} /></div>
                  </div>
                ))}
                <div className="grid grid-cols-[1fr_90px_90px] card-row bg-emerald-50/30">
                  <div className="px-6 py-3 text-sm font-semibold text-[#1A2332]">Precio</div>
                  <div className="px-3 py-3 text-center text-xs font-bold text-[#0121DC]">Gratis<br/><span className="font-normal text-[#8896A6]">2,4% tx</span></div>
                  <div className="px-3 py-3 text-center text-xs font-bold" style={{ color: (comp as any).color }}>{(comp as any).pricing}</div>
                </div>
              </div>
            </div>

            <div className="p-6 grid sm:grid-cols-2 gap-6 card-row">
              <div>
                <h4 className="text-sm font-semibold text-emerald-700 mb-2">Donde {comp.name.split("(")[0].trim()} destaca</h4>
                <ul className="space-y-1.5">
                  {(comp as any).strengths.map((s: string, i: number) => <li key={i} className="text-sm text-[#4A5568] flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />{s}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-600 mb-2">Donde {comp.name.split("(")[0].trim()} flaquea</h4>
                <ul className="space-y-1.5">
                  {(comp as any).weaknesses.map((w: string, i: number) => <li key={i} className="text-sm text-[#4A5568] flex items-start gap-2"><X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />{w}</li>)}
                </ul>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="p-4 rounded-[14px] bg-[#080D42] text-white">
                <p className="text-sm font-semibold mb-1">Nuestro veredicto honesto</p>
                <p className="text-sm text-slate-300 leading-relaxed">{(comp as any).verdict}</p>
              </div>
              <p className="text-xs text-[#8896A6] mt-3">{(comp as any).pricingDetail}</p>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

function GlobalComparisonMatrix({ t }: { t: Dict }) {
  const features = t.comparison.features;
  const pactstream = t.comparison.pactstream as Record<string, Support>;
  const competitors = t.comparison.competitors;

  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <div className="min-w-[800px]">
        <div className="card-surface overflow-hidden">
          <div className="grid grid-cols-[180px_repeat(6,1fr)] bg-[#080D42] text-white text-[11px] font-semibold">
            <div className="px-4 py-3 sticky left-0 bg-[#080D42] z-10">Funcionalidad</div>
            <div className="px-2 py-3 text-center text-[#A9F3FF]">PactStream</div>
            {competitors.map((c) => <div key={(c as any).id} className="px-2 py-3 text-center truncate">{c.name.split("(")[0].trim()}</div>)}
          </div>
          {features.map((f, i) => (
            <div key={f.key} className={`grid grid-cols-[180px_repeat(6,1fr)] card-row ${i % 2 === 0 ? "bg-white" : "bg-[#F5F7FA]/30"}`}>
              <div className="px-4 py-2 text-xs text-[#4A5568] sticky left-0 bg-inherit z-10">{f.label}</div>
              <div className="px-2 py-2 flex justify-center bg-emerald-50/30"><SupportBadge support={pactstream[f.key]} /></div>
              {competitors.map((c) => <div key={(c as any).id} className="px-2 py-2 flex justify-center"><SupportBadge support={(c.features as Record<string, Support>)[f.key]} /></div>)}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-[#8896A6] mt-3 text-center">{t.comparison.scrollHint}</p>
    </div>
  );
}

function ComparisonSection({ t }: { t: Dict }) {
  return (
    <section id="comparativa" className="py-20 md:py-28 bg-[#F5F7FA]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Hero */}
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-[#0B6E5F] text-sm font-medium mb-6">
            {t.comparison.tag}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-2">
            {t.comparison.heading}
          </h2>
          <p className="font-display text-3xl md:text-4xl font-bold text-[#0B6E5F] mb-5">
            {t.comparison.headingAccent}
          </p>
          <p className="text-[#4A5568] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            {t.comparison.sub}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {t.comparison.competitors.map((c) => (
              <span key={(c as any).id} className="text-sm px-4 py-2 rounded-full bg-[#EFEFEA] text-[#565B66] select-none">
                {c.name.split("(")[0].trim()}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Global Matrix */}
        <AnimatedSection className="mb-16">
          <h3 className="text-xl font-display font-bold text-[#1A2332] mb-6 text-center">{t.comparison.matrixTitle}</h3>
          <GlobalComparisonMatrix t={t} />
        </AnimatedSection>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#8896A6] mb-16">
          <span className="flex items-center gap-1.5"><span className="text-emerald-600"><CheckCircle2 className="w-4 h-4" /></span> {t.comparison.legend.yes}</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-[2.5px] bg-amber-500 rounded-full block" /> {t.comparison.legend.partial}</span>
          <span className="flex items-center gap-1.5"><span className="text-slate-300"><X className="w-4 h-4" /></span> {t.comparison.legend.no}</span>
          <span className="flex items-center gap-1.5"><span className="text-blue-400 text-xs font-medium">2027</span> {t.comparison.legend.roadmap}</span>
        </div>

        {/* Individual Comparisons */}
        <AnimatedSection className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1A2332] text-center mb-4">
            {t.comparison.detailTitle}
          </h3>
          <p className="text-[#8896A6] text-center max-w-xl mx-auto mb-10">
            {t.comparison.detailSub}
          </p>
          <div className="space-y-4">
            {t.comparison.competitors.map((c) => <CompetitorCard key={(c as any).id} comp={c} t={t} />)}
          </div>
        </AnimatedSection>

        {/* Why PactStream Wins */}
        <div className="rounded-[28px] bg-[#080D42] p-8 md:p-12 mb-16">
          <AnimatedSection className="text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
              {t.comparison.whyTitle}
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {t.comparison.whyReasons.map((r, i) => (
                <div key={i} className="p-6 card-surface-navy text-left">
                  <h4 className="text-white font-bold mb-2">{r.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-semibold text-[#A9F3FF] mb-4">{t.comparison.gapsTitle}</h4>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {t.comparison.gaps.map((g, i) => (
                <div key={i} className="p-4 card-surface-navy text-left">
                  <p className="text-white text-sm font-medium">{g.gap}</p>
                  <p className="text-slate-500 text-xs mt-1">Quién lo tiene: {g.who}</p>
                  <p className="text-[#A9F3FF] text-xs mt-0.5">{g.when}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#0121DC] to-[#080D42] p-8 md:p-12 text-center">
          <AnimatedSection>
            <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mb-6">
              {t.comparison.ctaTitle}
            </h3>
            <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto">
              {t.comparison.ctaSub}
            </p>
            <a href="#waitlist" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-[#0121DC] font-bold text-lg hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl hover:shadow-2xl">
              {t.comparison.ctaButton} <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-emerald-200/60 text-sm mt-4">{t.comparison.ctaNote}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── PRECIOS ─── */
const profileIcons: Record<string, React.ReactNode> = {
  building: <Building2 className="w-6 h-6" />,
  hammer: <Paintbrush className="w-6 h-6" />,
  ruler: <Ruler className="w-6 h-6" />,
};
const profileColors: Record<string, { bg: string; text: string; border: string }> = {
  building: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  hammer: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  ruler: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
};

function PricingSection({ t }: { t: Dict }) {
  return (
    <section id="precios" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-[#0B6E5F] uppercase tracking-wider mb-3">{t.pricing.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.pricing.heading}</h2>
          <p className="text-lg text-[#5A6B7F]">{t.pricing.sub}</p>
        </AnimatedSection>
        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.profiles.map((p: any, i: number) => {
            const colors = profileColors[p.icon] || profileColors.building;
            return (
              <AnimatedSection key={p.role} delay={i * 0.1}>
                <motion.div
                  className="h-full p-8 card-surface card-surface-hover flex flex-col"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center`}>
                      {profileIcons[p.icon]}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#1A2332]">{p.role}</h3>
                    </div>
                    {p.badge && (
                      <span className={`ml-auto text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#5A6B7F] mb-5">{p.pain}</p>
                  <div className="mb-1">
                    <span className="font-display text-3xl font-black text-[#1A2332]">{p.price}</span>
                  </div>
                  <p className="text-xs text-[#5A6B7F] mb-1">{p.priceNote}</p>
                  <p className="text-xs font-medium text-[#0B6E5F] mb-5">{p.priceSub}</p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {p.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6E5F] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#3A4D65]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#waitlist" className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all ${i === 0 ? "bg-[#0121DC] text-white hover:bg-[#0019B3] hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)]" : "bg-[#F0F4F8] text-[#1A2332] hover:bg-[#E2E8F0]"}`}>
                    {t.pricing.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-6 -mx-6" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {t.pricing.profiles.map((p: any, i: number) => {
            const colors = profileColors[p.icon] || profileColors.building;
            return (
              <div key={p.role} className="flex-none w-[80vw] snap-center">
                <div className="h-full p-6 card-surface flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center`}>
                      {profileIcons[p.icon]}
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1A2332]">{p.role}</h3>
                    {p.badge && (
                      <span className={`ml-auto text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#5A6B7F] mb-4">{p.pain}</p>
                  <div className="mb-1">
                    <span className="font-display text-3xl font-black text-[#1A2332]">{p.price}</span>
                  </div>
                  <p className="text-xs text-[#5A6B7F] mb-1">{p.priceNote}</p>
                  <p className="text-xs font-medium text-[#0B6E5F] mb-4">{p.priceSub}</p>
                  <ul className="space-y-2.5 mb-5 flex-1">
                    {p.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6E5F] shrink-0 mt-0.5" />
                        <span className="text-sm text-[#3A4D65]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#waitlist" className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all ${i === 0 ? "bg-[#0121DC] text-white" : "bg-[#F0F4F8] text-[#1A2332]"}`}>
                    {t.pricing.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <AnimatedSection className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F5F2]">
            <Sparkles className="w-3.5 h-3.5 text-[#095A4E]" />
            <p className="text-xs text-[#095A4E] font-medium">{t.pricing.founderNote}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── BUNDLES ECOSISTEMA ─── */
const bundleIcons: Record<string, React.ReactNode> = {
  starter: <Zap className="w-5 h-5" />,
  professional: <TrendingUp className="w-5 h-5" />,
  enterprise: <Building2 className="w-5 h-5" />,
};

function BundleCard({ b, t, isDesktop }: { b: any; t: Dict; isDesktop: boolean }) {
  const pad = isDesktop ? "p-8" : "p-6";
  return (
    <motion.div
      className={`h-full ${pad} card-surface card-surface-hover flex flex-col relative`}
      whileHover={isDesktop ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {b.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase px-3 py-1 rounded-full bg-[#0B6E5F] text-white tracking-wide">
          ★ Popular
        </span>
      )}
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          b.popular ? "bg-[#E6F5F2] text-[#0B6E5F]" : "bg-[#F0F4F8] text-[#5A6B7F]"
        }`}>
          {bundleIcons[b.icon]}
        </div>
        <h3 className="font-display text-lg font-bold text-[#1A2332]">{b.tier}</h3>
        {b.badge && (
          <span className="ml-auto text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
            {b.badge}
          </span>
        )}
      </div>
      <p className="text-sm text-[#5A6B7F]">{b.target}</p>
      <p className="text-xs text-[#8A99AB] mb-4">{b.range}</p>

      <div className="mb-1">
        <span className="font-display text-3xl font-black text-[#1A2332]">{b.price}</span>
      </div>
      <p className="text-xs text-[#0B6E5F] font-medium mb-5">{b.priceNote}</p>

      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A99AB] mb-2">CostPact</p>
        <ul className="space-y-2">
          {b.costpact.map((f: string) => (
            <li key={f} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFC] shrink-0 mt-0.5" />
              <span className="text-xs text-[#3A4D65]">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A99AB] mb-2">PactStream</p>
        <ul className="space-y-2">
          {b.pactstream.map((f: string) => (
            <li key={f} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6E5F] shrink-0 mt-0.5" />
              <span className="text-xs text-[#3A4D65]">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={b.icon === "enterprise" ? "mailto:hello@pactstream.io?subject=Enterprise%20Demo" : "#waitlist"}
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all ${
          b.popular
            ? "bg-[#0121DC] text-white hover:bg-[#0019B3] hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)]"
            : "bg-[#F0F4F8] text-[#1A2332] hover:bg-[#E2E8F0]"
        }`}
      >
        {b.icon === "enterprise" ? t.bundles.ctaEnterprise : t.bundles.cta} <ArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

function BundlesSection({ t }: { t: Dict }) {
  return (
    <section id="bundles" className="py-20 md:py-28 bg-[#F8FAFB]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-[#7C5CFC] uppercase tracking-wider mb-3">{t.bundles.tag}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A2332] mb-5">{t.bundles.heading}</h2>
          <p className="text-lg text-[#5A6B7F]">{t.bundles.sub}</p>
        </AnimatedSection>
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.bundles.plans.map((b: any, i: number) => (
            <AnimatedSection key={b.tier} delay={i * 0.1}>
              <BundleCard b={b} t={t} isDesktop />
            </AnimatedSection>
          ))}
        </div>
        {/* Mobile */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-6 -mx-6" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {t.bundles.plans.map((b: any) => (
            <div key={b.tier} className="flex-none w-[80vw] snap-center">
              <BundleCard b={b} t={t} isDesktop={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
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
          {t.faq.items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div className="card-surface overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm font-semibold text-[#1A2332]">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#8896A6] shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-[#5A6B7F] leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA FINAL ─── */
function CTASection({ t }: { t: Dict }) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#080D42] via-[#080D42] to-[#080D42] text-white">
      <AnimatedSection className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-black mb-6">
          {t.cta.heading[0]}
          <span className="text-[#A9F3FF]">{t.cta.heading[1]}</span>
          {t.cta.heading[2]}
        </h2>
        <p className="text-lg text-[#8896A6] leading-relaxed mb-10 max-w-xl mx-auto">{t.cta.sub}</p>
        <a href="#waitlist" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0121DC] text-white text-base font-semibold rounded-full hover:bg-[#0019B3] transition-all hover:shadow-[0_8px_30px_rgba(1,33,220,0.4)]">
          <Lock className="w-5 h-5" /> {t.cta.button}
        </a>
      </AnimatedSection>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer({ t, locale, setLocale }: { t: Dict; locale: Locale; setLocale: (l: Locale) => void }) {
  const footerColumns = (t.footer as any).columns as { product: { title: string; links: string[] }; audience: { title: string; links: string[] }; company: { title: string; links: string[] } };
  const tagline = (t.footer as any).tagline as string;
  const productHrefs = ["#funcionalidades", "#como-funciona", "#precios", "#ecosistema"];
  const audienceHrefs = ["#para-quien", "#para-quien", "#para-quien", "#casos-de-uso"];
  // "Sobre nosotros" y "Blog" no existen aún — solo se renderizan enlaces con destino real
  const companyHrefs = ["https://costpact.io", "mailto:hello@pactstream.io"];

  return (
    <footer className="py-16 bg-[#080D42] text-white/60">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="col-span-2">
            <PactStreamLogo size="sm" />
            <p className="text-sm text-white/30 mt-4 max-w-xs leading-relaxed">{tagline}</p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://linkedin.com/company/pactstream" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors text-xs font-bold" aria-label="LinkedIn">
                in
              </a>
              <a href="https://x.com/pactstream" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors text-xs font-bold" aria-label="X / Twitter">
                X
              </a>
              <a href="mailto:hello@pactstream.io" className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* Product column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{footerColumns.product.title}</h4>
            <ul className="space-y-3">
              {footerColumns.product.links.map((link, i) => (
                <li key={link}><a href={productHrefs[i]} className="text-sm hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          {/* Audience column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{footerColumns.audience.title}</h4>
            <ul className="space-y-3">
              {footerColumns.audience.links.map((link, i) => (
                <li key={link}><a href={audienceHrefs[i]} className="text-sm hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          {/* Company column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{footerColumns.company.title}</h4>
            <ul className="space-y-3">
              {footerColumns.company.links.map((link, i) => (
                <li key={link}><a href={companyHrefs[i]} className="text-sm hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 py-6">
          <img src="/security-badge.svg" alt="Seguridad Verificada" width="36" height="44" />
          <span className="text-xs text-[#8896A6]">Datos cifrados y protegidos · Seguridad verificada 2026</span>
        </div>
        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />
        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs mt-8">
          <p>{t.footer.copy}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="/legal" className="hover:text-white transition-colors">{t.footer.legal}</a>
            <a href="/privacidad" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="/cookies" className="hover:text-white transition-colors">{t.footer.cookies}</a>
            <button
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === "es" ? "English" : "Español"}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Page() {
  const [t, locale, setLocale] = useLang();
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#0B6E5F] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
        Ir al contenido principal
      </a>
      <Navbar t={t} locale={locale} setLocale={setLocale} />
      <main id="main-content">
        <HeroSection t={t} />
        <ProblemSection t={t} />
        <HowItWorksSection t={t} />
        <StickyPhoneSection t={t} />
        <RolesSection t={t} />
        <UseCasesSection t={t} />
        <AISection t={t} />
        <ValidationSection t={t} />
        <ComparisonSection t={t} />
        <EcosystemSection t={t} />
        <Hito0Section t={t} />
        <PricingSection t={t} />
        <BundlesSection t={t} />
        <FAQSection t={t} />
        <CTASection t={t} />
        <WaitlistSection t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} setLocale={setLocale} />
    </>
  );
}
