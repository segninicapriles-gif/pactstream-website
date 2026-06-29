"use client";

import {
  Shield,
  Camera,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  CreditCard,
  Star,
  Home,
  Folder,
  Bell,
  User,
  Send,
} from "lucide-react";

/* ─── Real app colors (from Flutter theme) ─── */
const C = {
  headerGradient: "linear-gradient(135deg, #0121DC 0%, #080D42 100%)",
  headerGradientTecnico: "linear-gradient(135deg, #080D42 0%, #A56423 100%)",
  heroCard: "linear-gradient(135deg, #080D42 0%, #14193D 100%)",
  scaffold: "#F3F4F9",
  surface: "#FFFFFF",
  border: "#E7E9F1",
  borderDark: "#2E3460",
  textPrimary: "#080D42",
  textSecondary: "#767BA3",
  blue: "#0121DC",
  blueBg: "rgba(1, 33, 220, 0.10)",
  success: "#00C389",
  successBg: "rgba(0, 195, 137, 0.12)",
  amber: "#F59E0B",
  amberBg: "rgba(245, 158, 11, 0.12)",
  red: "#FF4D6D",
  cyan: "#A9F3FF",
  gold: "#F59E0B",
  tecnico: "#C97A2B",
  tecnicoBg: "rgba(201, 122, 43, 0.12)",
  navActive: "#0121DC",
  navInactive: "#767BA3",
  shadow: "0 2px 8px rgba(8, 13, 66, 0.06)",
};

/* ─── Shared: AppBar (real gradient + status bar) ─── */
function AppHeader({
  children,
  gradient = C.headerGradient,
}: {
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <div className="relative" style={{ background: gradient }}>
      {/* Status bar icons */}
      <div className="flex justify-between items-center px-5 pt-[6px] pb-0 text-white text-[8px] font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[3px] rounded-[0.5px] bg-white" style={{ height: 4 + i * 2, opacity: i < 4 ? 0.5 : 1 }} />
            ))}
          </div>
          <span className="text-[7px]">5G</span>
          <div className="w-[16px] h-[7px] rounded-[2px] border border-white/60 relative">
            <div className="absolute inset-[1px] rounded-[1px] bg-white" style={{ width: "70%" }} />
          </div>
        </div>
      </div>
      <div className="px-5 pb-4 pt-2 text-white">{children}</div>
    </div>
  );
}

/* ─── Shared: BottomNav (real app style) ─── */
function BottomNav({ active }: { active: number }) {
  const tabs = [
    { icon: Home, label: "Inicio" },
    { icon: Folder, label: "Obras" },
    { icon: Bell, label: "Avisos", badge: 3 },
    { icon: User, label: "Perfil" },
  ];
  return (
    <div
      className="flex justify-around items-center py-2 bg-white"
      style={{
        borderTop: `0.5px solid ${C.border}`,
        boxShadow: "0 -2px 8px rgba(8, 13, 66, 0.06)",
      }}
    >
      {tabs.map((t, i) => (
        <div key={t.label} className="flex flex-col items-center gap-[2px] relative">
          <div
            className="flex items-center justify-center relative"
            style={{
              background: i === active ? C.blueBg : "transparent",
              borderRadius: 999,
              padding: i === active ? "3px 12px" : "3px 6px",
            }}
          >
            <t.icon
              className="w-[14px] h-[14px]"
              style={{ color: i === active ? C.navActive : C.navInactive }}
              strokeWidth={i === active ? 2.5 : 1.8}
            />
            {t.badge && (
              <div className="absolute -top-[2px] -right-[2px] w-[12px] h-[12px] rounded-full bg-[#FF4D6D] border border-white flex items-center justify-center">
                <span className="text-[6px] font-extrabold text-white">{t.badge}</span>
              </div>
            )}
          </div>
          <span
            className="text-[8px]"
            style={{
              color: i === active ? C.navActive : C.navInactive,
              fontWeight: i === active ? 700 : 500,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── KPI Mini Card ─── */
function MiniKpi({
  label,
  value,
  accent = C.blue,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-[12px] p-2.5 relative overflow-hidden"
      style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[12px]" style={{ background: accent }} />
      <div className="pl-1.5">
        <div className="text-[8px] font-medium" style={{ color: C.textSecondary }}>{label}</div>
        <div className="text-[14px] font-bold" style={{ color: C.textPrimary, fontFamily: "'Nunito', sans-serif" }}>{value}</div>
      </div>
    </div>
  );
}

/* ─── Status Pill (real app) ─── */
function StatusPill({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span
      className="inline-flex px-[7px] py-[2px] rounded-full text-[7px] font-extrabold tracking-wider uppercase"
      style={{ color, background: bg }}
    >
      {label}
    </span>
  );
}

/* ═════════════════════════════════════════════ */
/* ─── 1. Dashboard Constructor ─── */
/* ═════════════════════════════════════════════ */
export function ScreenDashboardConstructor() {
  return (
    <div className="h-full flex flex-col" style={{ background: C.scaffold, fontFamily: "'Nunito', 'Inter', sans-serif", fontSize: 11 }}>
      <AppHeader>
        <div className="text-[9px] font-medium" style={{ opacity: 0.7 }}>Buenos días</div>
        <div className="text-[15px] font-bold mt-[1px]">Carlos Martínez</div>
        {/* Hero KPI */}
        <div className="mt-3 rounded-[12px] p-3 flex items-center justify-between" style={{ background: C.heroCard }}>
          <div>
            <div className="text-[8px] font-medium" style={{ opacity: 0.6 }}>Facturación acumulada</div>
            <div className="text-[22px] font-extrabold leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>142.800€</div>
          </div>
          {/* Trust Score ring */}
          <div className="flex flex-col items-center gap-[2px]">
            <div className="relative w-[38px] h-[38px]">
              <svg viewBox="0 0 38 38" className="w-full h-full -rotate-90">
                <circle cx="19" cy="19" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                <circle cx="19" cy="19" r="16" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={`${87 * 100.53 / 100} 100.53`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold text-white">87</div>
            </div>
            <div className="text-[6px] font-bold uppercase tracking-wider" style={{ color: C.gold }}>Gold</div>
          </div>
        </div>
      </AppHeader>

      <div className="flex-1 px-3 py-3 space-y-2.5 overflow-hidden">
        <div className="grid grid-cols-3 gap-2">
          <MiniKpi label="Obras activas" value="7" accent={C.blue} />
          <MiniKpi label="Pte. cobro" value="24.500€" accent={C.amber} />
          <MiniKpi label="Cobrado mes" value="18.200€" accent={C.success} />
        </div>

        {/* Bar chart */}
        <div className="rounded-[12px] p-3" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <div className="text-[9px] font-bold mb-2" style={{ color: C.textPrimary }}>Facturación mensual</div>
          <div className="flex items-end gap-[3px] h-[48px]">
            {[35, 50, 42, 65, 55, 72, 80, 60, 75, 90, 70, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[3px]"
                style={{
                  height: `${h}%`,
                  background: C.success,
                  opacity: i >= 9 ? 1 : 0.35 + (i * 0.05),
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[6px]" style={{ color: C.textSecondary }}>
            <span>Ene</span><span>Jun</span><span>Dic</span>
          </div>
        </div>

        {/* Work card */}
        <div className="rounded-[12px] p-3 flex items-start gap-2.5" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <div className="w-[3px] h-[36px] rounded-full" style={{ background: C.success }} />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold" style={{ color: C.textPrimary }}>Chalet Pozuelo Norte</span>
              <StatusPill label="En curso" color={C.blue} bg={C.blueBg} />
            </div>
            <div className="flex items-center gap-1 mt-[2px] text-[7px]" style={{ color: C.textSecondary }}>
              <MapPin className="w-[8px] h-[8px]" /> Pozuelo de Alarcón
            </div>
            <div className="mt-2 rounded-full h-[5px]" style={{ background: C.border }}>
              <div className="h-full rounded-full" style={{ width: "68%", background: C.blue }} />
            </div>
            <div className="flex justify-between mt-[3px] text-[7px]" style={{ color: C.textSecondary }}>
              <span>Hito 3 de 5</span>
              <span className="font-bold" style={{ color: C.textPrimary }}>345.000€</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active={0} />
    </div>
  );
}

/* ═════════════════════════════════════════════ */
/* ─── 2. Detalle de obra ─── */
/* ═════════════════════════════════════════════ */
export function ScreenObraDetail() {
  const milestones = [
    { name: "Cimentación", amount: "42.000€", status: "paid" as const, pct: 100 },
    { name: "Estructura", amount: "78.000€", status: "validated" as const, pct: 100 },
    { name: "Cerramientos", amount: "55.000€", status: "in_progress" as const, pct: 68 },
    { name: "Instalaciones", amount: "38.000€", status: "pending" as const, pct: 0 },
    { name: "Acabados", amount: "32.000€", status: "pending" as const, pct: 0 },
  ];

  const cfg = {
    paid: { label: "Pagado", color: C.success, bg: C.successBg, bar: C.success },
    validated: { label: "Validado", color: C.blue, bg: C.blueBg, bar: C.blue },
    in_progress: { label: "En curso", color: C.amber, bg: C.amberBg, bar: C.amber },
    pending: { label: "Pendiente", color: C.textSecondary, bg: "rgba(118,123,163,0.08)", bar: C.border },
  };

  return (
    <div className="h-full flex flex-col" style={{ background: C.scaffold, fontFamily: "'Nunito', 'Inter', sans-serif", fontSize: 11 }}>
      <AppHeader>
        <div className="flex items-center gap-1 text-[9px] font-medium" style={{ opacity: 0.7 }}>
          <ChevronRight className="w-3 h-3 rotate-180" /> Mis obras
        </div>
        <div className="text-[15px] font-bold mt-1">Chalet Pozuelo Norte</div>
        <div className="flex items-center gap-1 mt-[2px] text-[9px]" style={{ opacity: 0.6 }}>
          <MapPin className="w-[10px] h-[10px]" /> Pozuelo de Alarcón · 245.000€
        </div>
      </AppHeader>

      <div className="flex-1 px-3 py-3 space-y-2 overflow-hidden">
        {/* Escrow card */}
        <div className="rounded-[12px] p-3 flex items-center gap-3" style={{ background: C.heroCard }}>
          <div className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center" style={{ background: "rgba(169,243,255,0.15)" }}>
            <Shield className="w-4 h-4" style={{ color: C.cyan }} />
          </div>
          <div className="text-white">
            <div className="text-[9px] font-bold">Escrow protegido</div>
            <div className="text-[8px]" style={{ opacity: 0.6 }}>55.000€ depositados · Hito 3</div>
          </div>
          <StatusPill label="Activo" color="#080D42" bg={C.cyan} />
        </div>

        <div className="text-[9px] font-bold mt-1" style={{ color: C.textPrimary }}>Hitos de obra</div>

        {milestones.map((m) => {
          const s = cfg[m.status];
          return (
            <div key={m.name} className="rounded-[12px] p-2.5 flex items-center gap-2" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
              <div className="w-[3px] h-[32px] rounded-full" style={{ background: s.bar }} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold" style={{ color: C.textPrimary }}>{m.name}</span>
                  <StatusPill label={s.label} color={s.color} bg={s.bg} />
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <div className="flex-1 rounded-full h-[5px] mr-2" style={{ background: C.border }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${m.pct}%`, background: s.bar }} />
                  </div>
                  <span className="text-[8px] font-bold" style={{ color: C.textPrimary }}>{m.amount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <BottomNav active={1} />
    </div>
  );
}

/* ═════════════════════════════════════════════ */
/* ─── 3. Verificación IA ─── */
/* ═════════════════════════════════════════════ */
export function ScreenAIVerification() {
  const findings = [
    { ok: true, label: "Estructura completada según plano" },
    { ok: true, label: "Cerramientos exteriores al 100%" },
    { ok: false, label: "Tabiquería interior parcial (~70%)" },
    { ok: true, label: "Cubierta impermeabilizada" },
  ];

  return (
    <div className="h-full flex flex-col" style={{ background: C.scaffold, fontFamily: "'Nunito', 'Inter', sans-serif", fontSize: 11 }}>
      <AppHeader>
        <div className="flex items-center gap-1 text-[9px] font-medium" style={{ opacity: 0.7 }}>
          <ChevronRight className="w-3 h-3 rotate-180" /> Hito 3 · Cerramientos
        </div>
        <div className="text-[15px] font-bold mt-1">Verificación IA</div>
      </AppHeader>

      <div className="flex-1 px-3 py-3 space-y-2.5 overflow-hidden">
        {/* Score card */}
        <div className="rounded-[12px] p-4 text-center" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <div className="relative w-[70px] h-[70px] mx-auto mb-2">
            <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
              <circle cx="35" cy="35" r="30" fill="none" stroke={C.border} strokeWidth="4" />
              <circle cx="35" cy="35" r="30" fill="none" stroke={C.success} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={`${94 * 188.5 / 100} 188.5`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[22px] font-extrabold" style={{ color: C.success, fontFamily: "'Nunito', sans-serif" }}>94</span>
              <span className="text-[7px] -mt-1" style={{ color: C.textSecondary }}>de 100</span>
            </div>
          </div>
          <div className="text-[10px] font-bold" style={{ color: C.textPrimary }}>Score de cumplimiento</div>
        </div>

        {/* Evidence photos — real construction images */}
        <div className="text-[9px] font-bold" style={{ color: C.textPrimary }}>Evidencias analizadas (6)</div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Fachada", ok: true, src: "/evidence/facade.jpg" },
            { label: "Estructura", ok: true, src: "/evidence/structure.jpg" },
            { label: "Cubierta", ok: true, src: "/evidence/roofing.jpg" },
            { label: "Interior", ok: false, src: "/evidence/interior.jpg" },
            { label: "Fontanería", ok: true, src: "/evidence/plumbing.jpg" },
            { label: "Carpintería", ok: true, src: "/evidence/carpentry.jpg" },
          ].map((c, n) => (
            <div key={n} className="aspect-square rounded-[8px] relative overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
              <img src={c.src} alt={c.label} className="w-full h-full object-cover" />
              {/* Geo tag */}
              <div className="absolute bottom-[3px] left-[3px] flex items-center gap-[2px] px-[4px] py-[1px] rounded-[3px]" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}>
                <MapPin className="w-[6px] h-[6px] text-white/90" />
                <span className="text-[5px] text-white/90 font-bold">{c.label}</span>
              </div>
              {/* Status badge */}
              <div className="absolute top-[3px] right-[3px]">
                <div className="w-[14px] h-[14px] rounded-full flex items-center justify-center" style={{ background: c.ok ? C.success : C.amber, boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>
                  {c.ok ? <CheckCircle2 className="w-[8px] h-[8px] text-white" /> : <AlertTriangle className="w-[7px] h-[7px] text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Findings */}
        <div className="text-[9px] font-bold" style={{ color: C.textPrimary }}>Hallazgos</div>
        {findings.map((f, i) => (
          <div key={i} className="flex items-center gap-2 rounded-[8px] px-2.5 py-2" style={{ background: f.ok ? C.successBg : C.amberBg }}>
            {f.ok ? (
              <CheckCircle2 className="w-[12px] h-[12px] shrink-0" style={{ color: C.success }} />
            ) : (
              <AlertTriangle className="w-[12px] h-[12px] shrink-0" style={{ color: C.amber }} />
            )}
            <span className="text-[8px] font-semibold" style={{ color: f.ok ? C.success : C.amber }}>{f.label}</span>
          </div>
        ))}
      </div>
      <BottomNav active={1} />
    </div>
  );
}

/* ═════════════════════════════════════════════ */
/* ─── 4. Chat asistente ─── */
/* ═════════════════════════════════════════════ */
export function ScreenAssistant() {
  return (
    <div className="h-full flex flex-col" style={{ background: C.scaffold, fontFamily: "'Nunito', 'Inter', sans-serif", fontSize: 11 }}>
      <AppHeader>
        <div className="text-[15px] font-bold">Asistente PactStream</div>
        <div className="text-[9px] mt-[1px]" style={{ opacity: 0.6 }}>Chalet Pozuelo Norte</div>
      </AppHeader>

      <div className="flex-1 px-3 py-3 space-y-2 overflow-hidden">
        {/* User */}
        <div className="flex justify-end">
          <div className="rounded-[12px] rounded-tr-[3px] px-3 py-2 max-w-[80%]" style={{ background: C.blue }}>
            <div className="text-[10px] text-white">¿Cuánto llevamos gastado en fontanería?</div>
          </div>
        </div>
        {/* AI */}
        <div className="flex justify-start">
          <div className="rounded-[12px] rounded-tl-[3px] px-3 py-2 max-w-[85%]" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
            <div className="text-[10px] leading-relaxed" style={{ color: C.textPrimary }}>
              El capítulo de fontanería lleva <strong>12.450€</strong> ejecutados de <strong>18.200€</strong> (68,4%).
            </div>
            <div className="text-[10px] leading-relaxed mt-1" style={{ color: C.textPrimary }}>
              Quedan 3 partidas pendientes. Próxima certificación: <strong>viernes 28</strong>.
            </div>
          </div>
        </div>
        {/* User */}
        <div className="flex justify-end">
          <div className="rounded-[12px] rounded-tr-[3px] px-3 py-2 max-w-[80%]" style={{ background: C.blue }}>
            <div className="text-[10px] text-white">Valida la certificación del hito 3</div>
          </div>
        </div>
        {/* AI with action */}
        <div className="flex justify-start">
          <div className="rounded-[12px] rounded-tl-[3px] px-3 py-2.5 max-w-[85%]" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="w-[12px] h-[12px]" style={{ color: C.success }} />
              <span className="text-[9px] font-bold" style={{ color: C.success }}>Certificación #3 validada</span>
            </div>
            <div className="text-[10px]" style={{ color: C.textPrimary }}>
              Score IA: <strong style={{ color: C.success }}>94/100</strong>
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: C.textPrimary }}>
              Pago de <strong>8.750€</strong> liberado al constructor.
            </div>
            {/* Action card */}
            <div className="mt-2 rounded-[8px] px-2.5 py-2 flex items-center gap-2" style={{ background: C.successBg }}>
              <CreditCard className="w-[12px] h-[12px]" style={{ color: C.success }} />
              <span className="text-[7px] font-bold" style={{ color: C.success }}>
                Transferencia procesada · Ref: PS-2026-0847
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-3 pb-[52px] pt-2">
        <div className="rounded-[12px] px-3 py-2.5 flex items-center gap-2" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
          <span className="text-[10px] flex-1" style={{ color: C.textSecondary }}>Escribe un mensaje...</span>
          <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center" style={{ background: C.blue }}>
            <Send className="w-[10px] h-[10px] text-white" />
          </div>
        </div>
      </div>
      <BottomNav active={0} />
    </div>
  );
}

/* ═════════════════════════════════════════════ */
/* ─── 5. Dashboard Promotor ─── */
/* ═════════════════════════════════════════════ */
export function ScreenDashboardPromotor() {
  return (
    <div className="h-full flex flex-col" style={{ background: C.scaffold, fontFamily: "'Nunito', 'Inter', sans-serif", fontSize: 11 }}>
      <AppHeader>
        <div className="text-[9px] font-medium" style={{ opacity: 0.7 }}>Buenos días</div>
        <div className="text-[15px] font-bold mt-[1px]">María López Vidal</div>
        {/* Hero KPI */}
        <div className="mt-3 rounded-[12px] p-3 grid grid-cols-2 gap-3" style={{ background: C.heroCard }}>
          <div>
            <div className="text-[8px] font-medium" style={{ opacity: 0.5 }}>En escrow</div>
            <div className="text-[18px] font-extrabold leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>124.500€</div>
          </div>
          <div>
            <div className="text-[8px] font-medium" style={{ opacity: 0.5 }}>Liberado hoy</div>
            <div className="text-[18px] font-extrabold leading-tight" style={{ color: C.cyan, fontFamily: "'Nunito', sans-serif" }}>8.750€</div>
          </div>
        </div>
      </AppHeader>

      <div className="flex-1 px-3 py-3 space-y-2 overflow-hidden">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-1.5">
          <MiniKpi label="Obras activas" value="2" accent={C.blue} />
          <MiniKpi label="Pte. validar" value="1" accent={C.amber} />
          <MiniKpi label="Completadas" value="3" accent={C.success} />
        </div>

        {/* Flow chart */}
        <div className="rounded-[12px] p-3" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <div className="flex justify-between items-center mb-2">
            <div className="text-[9px] font-bold" style={{ color: C.textPrimary }}>Flujo de fondos</div>
            <span className="text-[7px] font-semibold" style={{ color: C.textSecondary }}>Últimos 6 meses</span>
          </div>
          <div className="flex items-end gap-[3px]" style={{ height: 50 }}>
            {[
              { d: 30, l: 20 }, { d: 22, l: 17 }, { d: 35, l: 25 },
              { d: 28, l: 22 }, { d: 40, l: 15 }, { d: 32, l: 27 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex gap-[1px] items-end">
                <div className="flex-1 rounded-t-[3px]" style={{ height: bar.d, background: C.blue, opacity: i === 5 ? 1 : 0.5 }} />
                <div className="flex-1 rounded-t-[3px]" style={{ height: bar.l, background: "#6B8CFF", opacity: i === 5 ? 1 : 0.5 }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["Ene","Feb","Mar","Abr","May","Jun"].map(m => <span key={m} className="text-[6px]" style={{ color: C.textSecondary }}>{m}</span>)}
          </div>
          <div className="flex gap-3 mt-1 text-[7px]" style={{ color: C.textSecondary }}>
            <div className="flex items-center gap-1"><div className="w-[5px] h-[5px] rounded-[2px]" style={{ background: C.blue }} /> Depositado</div>
            <div className="flex items-center gap-1"><div className="w-[5px] h-[5px] rounded-[2px]" style={{ background: "#6B8CFF" }} /> Liberado</div>
          </div>
        </div>

        <div className="text-[9px] font-bold" style={{ color: C.textPrimary }}>Mis obras</div>

        {[
          { name: "Chalet Pozuelo Norte", builder: "C. Martínez", hito: "3/5", pct: 60, status: "En curso" },
          { name: "Reforma Salamanca 14", builder: "J. Fernández", hito: "2/4", pct: 45, status: "Validación" },
        ].map((obra) => (
          <div key={obra.name} className="rounded-[12px] p-2.5" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[9px] font-bold" style={{ color: C.textPrimary }}>{obra.name}</div>
                <div className="text-[7px] mt-[1px]" style={{ color: C.textSecondary }}>Constructor: {obra.builder} · Hito {obra.hito}</div>
              </div>
              <StatusPill label={obra.status} color={obra.status === "En curso" ? C.blue : C.amber} bg={obra.status === "En curso" ? C.blueBg : C.amberBg} />
            </div>
            <div className="mt-1.5 rounded-full h-[5px]" style={{ background: C.border }}>
              <div className="h-full rounded-full" style={{ width: `${obra.pct}%`, background: C.blue }} />
            </div>
          </div>
        ))}

        {/* Recent activity */}
        <div className="text-[9px] font-bold" style={{ color: C.textPrimary }}>Actividad reciente</div>
        <div className="rounded-[12px] p-2.5 space-y-2" style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          {[
            { icon: CreditCard, text: "Pago 8.750€ liberado a C. Martínez", time: "Hace 2h", color: C.success },
            { icon: CheckCircle2, text: "Hito 3 validado · Score IA: 94", time: "Hace 3h", color: C.blue },
            { icon: Camera, text: "6 evidencias subidas · Cerramientos", time: "Ayer", color: C.textSecondary },
          ].map((act, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0 mt-[1px]" style={{ background: `${act.color}15` }}>
                <act.icon className="w-[9px] h-[9px]" style={{ color: act.color }} />
              </div>
              <div className="flex-1">
                <div className="text-[8px] font-semibold leading-tight" style={{ color: C.textPrimary }}>{act.text}</div>
                <div className="text-[7px]" style={{ color: C.textSecondary }}>{act.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={0} />
    </div>
  );
}
