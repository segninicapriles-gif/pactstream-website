"use client";

import { ReactNode } from "react";

export default function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 280, height: 600 }}>
      {/* Phone body */}
      <div
        className="absolute inset-0 rounded-[44px]"
        style={{
          background: "linear-gradient(145deg, #2A2D35 0%, #1A1D25 50%, #0F1115 100%)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      />
      {/* Metallic edge */}
      <div
        className="absolute inset-[1px] rounded-[43px]"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)" }}
      />
      {/* Screen bezel */}
      <div className="absolute inset-[4px] rounded-[40px] bg-black overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-black rounded-full z-20" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }}>
          <div className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full" style={{ background: "radial-gradient(circle at 40% 40%, #1a1a2e, #000)", boxShadow: "inset 0 0 2px rgba(100,100,255,0.15)" }} />
        </div>
        {/* Screen */}
        <div className="relative w-full h-full overflow-hidden">{children}</div>
      </div>
      {/* Side buttons */}
      <div className="absolute right-[-2px] top-[120px] w-[3px] h-[36px] rounded-r-[2px]" style={{ background: "linear-gradient(180deg, #3A3D45, #2A2D35)" }} />
      <div className="absolute left-[-2px] top-[100px] w-[3px] h-[24px] rounded-l-[2px]" style={{ background: "linear-gradient(180deg, #3A3D45, #2A2D35)" }} />
      <div className="absolute left-[-2px] top-[140px] w-[3px] h-[42px] rounded-l-[2px]" style={{ background: "linear-gradient(180deg, #3A3D45, #2A2D35)" }} />
      <div className="absolute left-[-2px] top-[190px] w-[3px] h-[42px] rounded-l-[2px]" style={{ background: "linear-gradient(180deg, #3A3D45, #2A2D35)" }} />
    </div>
  );
}
