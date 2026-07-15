"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";

// Dynamically import InteractiveMap to disable SSR for Leaflet.js
const InteractiveMap = dynamic(
  () => import("@/components/ui/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="relative mt-4 h-[380px] rounded-2xl bg-white border border-[#e2e8f0] animate-pulse flex items-center justify-center">
        <span className="text-xs text-[#475569] font-medium">Loading interactive map...</span>
      </div>
    ),
  }
);

const METRICS = [
  {
    label: "Total look ups",
    value: "1,248",
    delta: "+12.4%",
    direction: "up" as const,
    tone: "positive" as const,
    color: "indigo" as const,
  },
  {
    label: "Safe signals found",
    value: "912",
    delta: "+8.2%",
    direction: "up" as const,
    tone: "positive" as const,
    color: "mint" as const,
  },
  {
    label: "Mid signals found",
    value: "215",
    delta: "-3.1%",
    direction: "down" as const,
    tone: "negative" as const,
    color: "amber" as const,
  },
  {
    label: "Risk signals found",
    value: "121",
    delta: "+1.8%",
    direction: "up" as const,
    tone: "positive" as const,
    color: "rose" as const,
  },
] as const;

const ACTIVITIES = [
  {
    title: "Tru-Doc look up completed",
    description: "Document look up processed successfully in US-East Node.",
    kind: "success" as const,
  },
  {
    title: "API Credentials rotation",
    description: "System rotated access keys for global operations client.",
    kind: "user" as const,
  },
  {
    title: "Tru-Doc look up completed",
    description: "Document look up processed successfully in EU-West Node.",
    kind: "success" as const,
  },
  {
    title: "System parameters update",
    description: "Updated threshold configurations for email parser checks.",
    kind: "user" as const,
  },
  {
    title: "Tru-Doc look up completed",
    description: "Document look up processed successfully in AP-South Node.",
    kind: "success" as const,
  },
  {
    title: "New user added",
    description: "santhoshatna@yopmail.com added to workspace dashboard.",
    kind: "user" as const,
  },
] as const;

const RULES = [
  "When email_is_disposable is equal to true",
  "When email_parsed_name_is_valid is false",
  "When email_parsed_name_is_valid is equal to",
  "When email_has_company is equal to true",
  "When email_education is equal to true",
] as const;

const BRANCHES = [
  { name: "QAAA QA Testing", count: 12, delta: "-4", direction: "down" },
  { name: "Global Operations Hub", count: 85, delta: "+12", direction: "up" },
  { name: "EU Compliance Node", count: 34, delta: "+3", direction: "up" },
  { name: "AP-South Gateway", count: 48, delta: "-2", direction: "down" },
];

const MONTHLY_DATA = [
  { month: "Jan", total: 850, safe: 610, risk: 90 },
  { month: "Feb", total: 920, safe: 680, risk: 110 },
  { month: "Mar", total: 1050, safe: 790, risk: 120 },
  { month: "Apr", total: 980, safe: 710, risk: 100 },
  { month: "May", total: 1150, safe: 860, risk: 130 },
  { month: "Jun", total: 1248, safe: 912, risk: 121 },
  { month: "Jul", total: 1310, safe: 970, risk: 140 },
];

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h10M10 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14M7 2.5v3M13 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TrendBadge({
  delta,
  direction,
  tone,
}: {
  delta: string;
  direction: "up" | "down";
  tone: "positive" | "negative";
}) {
  const isPos = tone === "positive";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold border ${
        isPos 
          ? "bg-[#e6fbf7] text-[#0f766e] border-[#a7f3d0]" 
          : "bg-[#fee2e2] text-[#b91c1c] border-[#fecaca]"
      }`}
    >
      {delta} {direction === "up" ? "↑" : "↓"}
    </span>
  );
}

// Interactive mini-bar sparkline for metrics cards (similar to Image 3 reference)
function Sparkline({ color, active }: { color: "indigo" | "mint" | "amber" | "rose"; active: boolean }) {
  const values = 
    color === "indigo" ? [30, 45, 35, 60, 50, 75, 90] :
    color === "mint" ? [40, 30, 55, 45, 65, 80, 85] :
    color === "amber" ? [60, 50, 40, 35, 30, 45, 25] :
    [20, 30, 25, 40, 35, 50, 45];

  const barColor = 
    color === "indigo" ? "bg-[#6366f1]" :
    color === "mint" ? "bg-[#00d8a6]" :
    color === "amber" ? "bg-[#d97706]" :
    "bg-[#ef4444]";

  return (
    <div className="flex items-end gap-1.5 h-11 w-20 px-1">
      {values.map((v, i) => (
        <div 
          key={i} 
          className={`w-1 rounded-t-sm transition-all duration-700 ease-out ${barColor}`}
          style={{ 
            height: active ? `${v}%` : "15%",
            transitionDelay: `${i * 30}ms`
          }}
        />
      ))}
    </div>
  );
}

export function LookupDashboard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // States to hold hover info on metric cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Custom Chart States
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<"safe" | "mid" | "risk" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Safe: 73%, Mid: 17%, Risk: 10%
  const totalLookups = 1248;
  const safeCount = 912;
  const midCount = 215;
  const riskCount = 121;

  return (
    <div className="flex w-full flex-col gap-6 bg-transparent font-sans text-[#0f172a] antialiased min-h-screen">
      <FadeIn>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-2">
          <div>
            <h1 className="text-3xl font-semibold tracking-wide text-[#0f172a] sm:text-[42px] font-sans">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-[#475569] font-medium">
              Monitor your system performance and key metrics
            </p>
          </div>
          <AnimatedButton
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#e2e8f0] bg-white px-5 py-2.5 text-xs font-semibold text-[#0f172a] shadow-sm hover:bg-[#f8fafc] active:scale-95 transition-all duration-200"
          >
            <CalendarIcon className="size-4 text-[#475569]" />
            Current month
          </AnimatedButton>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative overflow-hidden rounded-2xl bg-white border border-[#e2e8f0] p-8 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_rgba(0,0,0,0.02)] hover:border-[#00d8a6] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300"
        >
          {/* Interactive minimalist dot grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

          {/* Interactive mouse follow spotlight with Atna brand neon color */}
          <div
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 216, 166, 0.12), transparent 80%)`,
            }}
          />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-wide text-[#0f172a] sm:text-3xl font-sans">
              Start your digital look up
            </h2>
            <p className="mt-3 text-base text-[#475569] font-medium leading-relaxed">
              Simplify bulk queries or execute precision individual audits.{" "}
              <span className="cursor-pointer font-semibold text-[#475569] hover:text-[#00d8a6] hover:underline underline-offset-2 transition-colors">
                Click here
              </span>{" "}
              to download the spreadsheet template for bulk upload.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AnimatedButton
                type="button"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#00d8a6] hover:opacity-95 hover:scale-[1.02] active:scale-95 text-white px-6 py-3.5 text-sm font-semibold transition-all duration-200 shadow-md"
              >
                Single look up
                <span className="grid size-5.5 place-items-center rounded-full bg-white/15">
                  <ArrowRightIcon className="size-3.5" />
                </span>
              </AnimatedButton>
              <AnimatedButton
                type="button"
                className="inline-flex items-center gap-2.5 rounded-full bg-white hover:bg-[#f8fafc] hover:scale-[1.02] active:scale-95 text-[#0f172a] border border-[#e2e8f0] hover:border-[#00d8a6] hover:text-[#00d8a6] px-6 py-3.5 text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                Bulk look up
                <ArrowRightIcon className="size-4" />
              </AnimatedButton>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.08}>
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((m, index) => {
            const cardTheme = 
              m.color === "indigo" ? "hover:border-[#6366f1]/50 hover:shadow-[0_12px_24px_rgba(99,102,241,0.08),0_4px_12px_rgba(99,102,241,0.04)] hover:bg-gradient-to-b hover:from-white hover:to-[#eeeffe]/15" :
              m.color === "mint" ? "hover:border-[#00d8a6]/50 hover:shadow-[0_12px_24px_rgba(0,216,166,0.08),0_4px_12px_rgba(0,216,166,0.04)] hover:bg-gradient-to-b hover:from-white hover:to-[#e6fbf7]/15" :
              m.color === "amber" ? "hover:border-[#d97706]/50 hover:shadow-[0_12px_24px_rgba(217,119,6,0.08),0_4px_12px_rgba(217,119,6,0.04)] hover:bg-gradient-to-b hover:from-white hover:to-[#fffbeb]/15" :
              "hover:border-[#ef4444]/50 hover:shadow-[0_12px_24px_rgba(239,68,68,0.08),0_4px_12px_rgba(239,68,68,0.04)] hover:bg-gradient-to-b hover:from-white hover:to-[#fee2e2]/15";

            return (
              <StaggerItem key={m.label}>
                <article 
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative overflow-hidden rounded-2xl p-6 border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer ${cardTheme}`}
                >
                  {/* Atna Brand Gradient Highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6366f1] to-[#00d8a6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-semibold text-[#475569] tracking-wider uppercase">{m.label}</p>
                    {/* Interactive Sparkline Chart (persistent full height) */}
                    <Sparkline color={m.color} active={mounted} />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <p className="text-[38px] sm:text-[42px] font-semibold tracking-normal text-[#0f172a] font-sans leading-none">{m.value}</p>
                    <TrendBadge delta={m.delta} direction={m.direction} tone={m.tone} />
                  </div>
                  <p className="mt-3 text-[10px] text-[#475569] font-medium uppercase tracking-wider">Compared to last month</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-6">
          {/* Row 1: Look up by Region & Recent activities */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <article className="xl:col-span-8 flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#6366f1] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[460px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold tracking-wider text-[#0f172a] uppercase">Look up by region</h3>
                <span className="text-[10px] text-[#475569] font-semibold uppercase tracking-widest">Real-Time Geo Map</span>
              </div>
              <div className="grow w-full">
                <InteractiveMap />
              </div>
            </article>

            <article className="xl:col-span-4 flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#6366f1] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[460px]">
              <h3 className="text-sm font-semibold tracking-wider text-[#0f172a] uppercase mb-4">Recent activities</h3>
              <div className="grow overflow-y-auto pr-1 max-h-[350px]">
                <Stagger className="relative flex flex-col gap-5 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#f1f5f9]">
                  {ACTIVITIES.map((a, i) => {
                    const kindColor = 
                      a.kind === "success" 
                        ? "bg-[#e6fbf7] text-[#00d8a6] border-[#e2e8f0] group-hover:border-[#00d8a6] group-hover:scale-110" 
                        : "bg-[#eeeffe] text-[#6366f1] border-[#e2e8f0] group-hover:border-[#6366f1] group-hover:scale-110";
                    return (
                      <StaggerItem key={`${a.title}-${i}`}>
                        <li className="group flex gap-3 relative z-10 hover:translate-x-1.5 transition-transform duration-300 list-none cursor-pointer">
                          <span
                            className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${kindColor}`}
                          >
                            {a.kind === "success" ? (
                              <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                                <path
                                  d="M5 10.5 8.5 14 15 6.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                                <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                                <path
                                  d="M4.5 16.5c1.5-3 9.5-3 11 0"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-[#0f172a] transition-colors group-hover:text-black">{a.title}</p>
                            <p className="mt-0.5 text-[10px] text-[#475569] leading-normal font-semibold">{a.description}</p>
                          </div>
                        </li>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </article>
          </div>

          {/* Row 2: Monthly Volume Chart & Signal Distribution Donut (NEW Interactive Graphs) */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* Monthly Volume & Signals Bar Chart */}
            <article className="xl:col-span-8 flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#6366f1] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[420px] relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-[#0f172a] uppercase">Monthly look up volume</h3>
                  <p className="text-[10px] text-[#475569] font-medium mt-0.5">Year-to-date lookups comparing Safe signals</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-semibold text-[#475569] uppercase">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#6366f1]" />
                    <span>Total Vol</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#00d8a6]" />
                    <span>Safe Signals</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="grow flex items-end justify-between gap-4 h-64 border-b border-[#e2e8f0] pb-2 relative mt-4">
                {MONTHLY_DATA.map((d, index) => {
                  const isMonthActive = hoveredMonth === index;
                  // Compute bar heights (relative to max total volume of 1310)
                  const totalHeight = (d.total / 1400) * 100;
                  const safeHeight = (d.safe / 1400) * 100;

                  return (
                    <div 
                      key={d.month}
                      onMouseEnter={() => setHoveredMonth(index)}
                      onMouseLeave={() => setHoveredMonth(null)}
                      className="grow flex flex-col items-center h-full justify-end cursor-pointer group/bar relative"
                    >
                      {/* Double bars container */}
                      <div className="flex items-end gap-1.5 grow w-full justify-center">
                        {/* Total Volume Bar */}
                        <div 
                          className="w-4 sm:w-5 bg-[#6366f1]/20 group-hover/bar:bg-[#6366f1]/35 rounded-t transition-all duration-700 ease-out relative overflow-hidden"
                          style={{ height: mounted ? `${totalHeight}%` : "0%" }}
                        >
                          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#6366f1]/40 to-transparent" />
                        </div>
                        {/* Safe Signals Bar */}
                        <div 
                          className="w-4 sm:w-5 bg-[#00d8a6] group-hover/bar:bg-[#00f5d4] rounded-t transition-all duration-700 ease-out"
                          style={{ height: mounted ? `${safeHeight}%` : "0%" }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-[#475569] mt-2 group-hover/bar:text-[#0f172a] transition-colors">{d.month}</span>
                    </div>
                  );
                })}

                {/* Floating Tooltip */}
                {hoveredMonth !== null && (
                  <div 
                    className="absolute z-20 bg-[#0f172a]/95 text-white p-3 rounded-xl shadow-2xl text-[11px] font-semibold border border-slate-700/50 pointer-events-none transition-all duration-300"
                    style={{
                      left: hoveredMonth > 4 ? "auto" : `${(hoveredMonth / MONTHLY_DATA.length) * 100 + 4}%`,
                      right: hoveredMonth > 4 ? `${100 - (hoveredMonth / (MONTHLY_DATA.length - 1)) * 100 + 2}%` : "auto",
                      bottom: "55%"
                    }}
                  >
                    <p className="text-[#00d8a6] text-[10px] uppercase font-semibold tracking-wider">{MONTHLY_DATA[hoveredMonth].month} Audit</p>
                    <p className="mt-1 text-slate-300 font-medium">Total volume: <span className="text-white font-semibold">{MONTHLY_DATA[hoveredMonth].total}</span></p>
                    <p className="text-slate-300 font-medium">Safe signals: <span className="text-[#00d8a6] font-semibold">{MONTHLY_DATA[hoveredMonth].safe}</span></p>
                    <p className="text-slate-300 font-medium">Risk flags: <span className="text-rose-400 font-semibold">{MONTHLY_DATA[hoveredMonth].risk}</span></p>
                  </div>
                )}
              </div>
            </article>

            {/* Signal Distribution Donut Chart */}
            <article className="xl:col-span-4 flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#6366f1] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[420px]">
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-[#0f172a] uppercase">Signal distribution</h3>
                <p className="text-[10px] text-[#475569] font-medium mt-0.5">Classification breakdown of processed records</p>
              </div>

              <div className="grow flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
                {/* SVG Donut */}
                <div className="relative size-36 shrink-0">
                  <svg className="size-full -rotate-90" viewBox="0 0 120 120">
                    {/* Background Track */}
                    <circle cx="60" cy="60" r="50" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />

                    {/* Glowing dotted inner circle matching hovered item */}
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="41" 
                      fill="transparent" 
                      stroke={
                        hoveredSlice === "safe" ? "#00d8a6" :
                        hoveredSlice === "mid" ? "#d97706" :
                        hoveredSlice === "risk" ? "#ef4444" :
                        "transparent"
                      } 
                      strokeWidth="1.5" 
                      strokeDasharray="4 2" 
                      className="transition-all duration-500 ease-out opacity-60" 
                    />

                    {/* Active Solid Hover Ring */}
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="transparent" 
                      stroke={
                        hoveredSlice === "safe" ? "#00d8a6" :
                        hoveredSlice === "mid" ? "#d97706" :
                        hoveredSlice === "risk" ? "#ef4444" :
                        "transparent"
                      }
                      strokeWidth="12"
                      className="transition-all duration-300 ease-out"
                      style={{ opacity: hoveredSlice !== null ? 1 : 0 }}
                    />

                    {/* Safe slice (73% of 314 = 229) */}
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="transparent" 
                      stroke="#00d8a6" 
                      strokeWidth={hoveredSlice === "safe" ? "15" : "12"}
                      opacity={hoveredSlice === null ? 1 : 0.01} 
                      strokeDasharray="314" 
                      strokeDashoffset={mounted ? "85" : "314"} // (1 - 0.73) * 314
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out cursor-pointer"
                      onMouseEnter={() => setHoveredSlice("safe")}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                    
                    {/* Mid slice (17% of 314 = 53.4) */}
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="transparent" 
                      stroke="#d97706" 
                      strokeWidth={hoveredSlice === "mid" ? "15" : "12"}
                      opacity={hoveredSlice === null ? 1 : 0.01} 
                      strokeDasharray="314" 
                      strokeDashoffset={mounted ? "31.4" : "314"} 
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out cursor-pointer"
                      onMouseEnter={() => setHoveredSlice("mid")}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />

                    {/* Risk slice (10% of 314 = 31.4) */}
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="50" 
                      fill="transparent" 
                      stroke="#ef4444" 
                      strokeWidth={hoveredSlice === "risk" ? "15" : "12"}
                      opacity={hoveredSlice === null ? 1 : 0.01} 
                      strokeDasharray="314" 
                      strokeDashoffset={mounted ? "0" : "314"} 
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out cursor-pointer"
                      onMouseEnter={() => setHoveredSlice("risk")}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  </svg>

                  {/* Center Text Panel */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className={`text-2xl font-semibold tracking-normal leading-none font-sans transition-colors duration-300 ${
                      hoveredSlice === "safe" ? "text-[#00d8a6]" :
                      hoveredSlice === "mid" ? "text-[#d97706]" :
                      hoveredSlice === "risk" ? "text-[#ef4444]" :
                      "text-[#0f172a]"
                    }`}>
                      {hoveredSlice === "safe" ? safeCount :
                       hoveredSlice === "mid" ? midCount :
                       hoveredSlice === "risk" ? riskCount :
                       totalLookups.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-medium text-[#475569] uppercase tracking-wide mt-1">
                      {hoveredSlice === "safe" ? "Safe" :
                       hoveredSlice === "mid" ? "Mid" :
                       hoveredSlice === "risk" ? "Risk" :
                       "Processed"}
                    </span>
                  </div>
                </div>

                {/* Custom Interactive Legend */}
                <div className="flex flex-col gap-2.5 grow">
                  <div 
                    onMouseEnter={() => setHoveredSlice("safe")}
                    onMouseLeave={() => setHoveredSlice(null)}
                    className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                      hoveredSlice === "safe" ? "border-[#00d8a6] bg-[#f0fdf4]" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-[#00d8a6] shrink-0" />
                      <span className="text-xs font-semibold text-[#0f172a]">Safe (73%)</span>
                    </div>
                    <span className="text-xs font-medium text-[#475569]">{safeCount}</span>
                  </div>

                  <div 
                    onMouseEnter={() => setHoveredSlice("mid")}
                    onMouseLeave={() => setHoveredSlice(null)}
                    className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                      hoveredSlice === "mid" ? "border-[#d97706] bg-[#fffbeb]" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-[#d97706] shrink-0" />
                      <span className="text-xs font-semibold text-[#0f172a]">Mid (17%)</span>
                    </div>
                    <span className="text-xs font-medium text-[#475569]">{midCount}</span>
                  </div>

                  <div 
                    onMouseEnter={() => setHoveredSlice("risk")}
                    onMouseLeave={() => setHoveredSlice(null)}
                    className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                      hoveredSlice === "risk" ? "border-[#ef4444] bg-[#fee2e2]" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-[#ef4444] shrink-0" />
                      <span className="text-xs font-semibold text-[#0f172a]">Risk (10%)</span>
                    </div>
                    <span className="text-xs font-medium text-[#475569]">{riskCount}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Row 3: Look up by type, Look up by Branch, Rules list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#00d8a6] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[350px]">
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-[#0f172a] uppercase mb-4">Look up by type</h3>
                <div className="grid gap-3.5">
                  <div className="group flex items-center gap-3.5 rounded-xl bg-[#f8fafc] px-4 py-3.5 border border-[#e2e8f0] shadow-sm hover:border-[#6366f1] hover:scale-[1.01] transition-all duration-300 border-l-4 border-l-[#6366f1]">
                    <span className="grid size-8 place-items-center rounded-full bg-white text-[#6366f1] transition-transform duration-300 group-hover:scale-110">
                      <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="m3.5 6.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                    <p className="text-xs text-[#0f172a] font-semibold">
                      Email has <span className="font-semibold text-[#6366f1]">811</span> look ups
                    </p>
                  </div>
                  <div className="group flex items-center gap-3.5 rounded-xl bg-[#f8fafc] px-4 py-3.5 border border-[#e2e8f0] shadow-sm hover:border-[#00d8a6] hover:scale-[1.01] transition-all duration-300 border-l-4 border-l-[#00d8a6]">
                    <span className="grid size-8 place-items-center rounded-full bg-white text-[#00d8a6] transition-transform duration-300 group-hover:scale-110">
                      <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path
                          d="M6.5 3.5h2l1 4-2 1.5a10 10 0 0 0 4.5 4.5l1.5-2 4 1v2a2 2 0 0 1-2 2A12.5 12.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-xs text-[#0f172a] font-semibold">
                      Phone has <span className="font-semibold text-[#00d8a6]">437</span> look ups
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimalist Brand Style Ratio Bar */}
              <div className="mt-6 pt-4 border-t border-[#e2e8f0]">
                <div className="flex justify-between text-[10px] font-semibold text-[#475569] mb-1.5 uppercase tracking-wide">
                  <span>Email (65%)</span>
                  <span>Phone (35%)</span>
                </div>
                <div className="w-full bg-[#e2e8f0] rounded-full h-1.5 overflow-hidden flex">
                  {/* Brand Gradient flow splits */}
                  <div className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] h-full transition-all duration-1000 ease-out" style={{ width: mounted ? "65%" : "0%" }} />
                  <div className="bg-gradient-to-r from-[#4f46e5] to-[#00d8a6] h-full transition-all duration-1000 ease-out" style={{ width: mounted ? "35%" : "0%" }} />
                </div>
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#00d8a6] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[350px]">
              <h3 className="text-sm font-semibold tracking-wider text-[#0f172a] uppercase mb-4">Look up by Branch</h3>
              <div className="mt-4 flex flex-col gap-4 grow justify-center">
                {BRANCHES.map((branch) => {
                  const isUp = branch.direction === "up";
                  return (
                    <div key={branch.name} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold text-[#0f172a]">{branch.name}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-[#0f172a]">{branch.count}</span>
                          <span className="inline-flex items-center rounded px-1.5 py-0.25 text-[9px] font-semibold bg-[#f8fafc] text-[#475569] border border-[#e2e8f0]">
                            {branch.delta} {isUp ? "↑" : "↓"}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-[#f1f5f9] rounded-full h-1.5 overflow-hidden">
                        {/* Active branch bars use the Atna brand gradient */}
                        <div className="bg-gradient-to-r from-[#6366f1] to-[#00d8a6] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: mounted ? `${Math.min(branch.count * 1.1, 100)}%` : "0%" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#00d8a6] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300 min-h-[350px]">
              <h3 className="text-sm font-semibold tracking-wider text-[#0f172a] uppercase mb-4">Rules list</h3>
              <div className="grow overflow-y-auto mt-2 pr-0.5 max-h-[250px]">
                <Stagger className="flex flex-col gap-2">
                  {RULES.map((rule, i) => (
                    <StaggerItem key={`${rule}-${i}`}>
                      <li
                        className="group flex items-center justify-between gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 hover:bg-white hover:border-[#00d8a6] hover:translate-x-1.5 transition-all duration-300 list-none cursor-pointer"
                      >
                        <p className="truncate text-xs text-[#475569] font-semibold group-hover:text-[#0f172a] transition-colors">{rule}</p>
                        <span className="shrink-0 text-xs font-semibold text-[#475569] group-hover:text-[#00d8a6] transition-transform duration-300 group-hover:translate-x-0.5">↓</span>
                      </li>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </article>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
