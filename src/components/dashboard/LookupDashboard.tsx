"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";

const InteractiveMap = dynamic(
  () => import("@/components/ui/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="relative mt-2 h-full min-h-[300px] rounded-2xl bg-white border border-[#e2e8f0] animate-pulse flex items-center justify-center">
        <span className="text-[10px] text-[#475569] font-medium">Loading interactive map...</span>
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
  },
  {
    label: "Safe signals found",
    value: "912",
    delta: "+8.2%",
    direction: "up" as const,
  },
  {
    label: "Mid signals found",
    value: "215",
    delta: "-3.1%",
    direction: "down" as const,
  },
  {
    label: "Risk signals found",
    value: "121",
    delta: "+1.8%",
    direction: "up" as const,
  },
] as const;

/** Classic sparkline profile — last bar = current % */
function sparklineFromMetric(delta: string, direction: "up" | "down"): number[] {
  const pct = Math.abs(parseFloat(delta.replace(/[%+]/g, ""))) || 0;
  const MAX_PCT = 15;
  const end = Math.max(28, Math.min(92, (pct / MAX_PCT) * 92));

  const rising = [30, 45, 35, 60, 50, 75, 90];
  const falling = [90, 75, 60, 50, 45, 35, 28];
  const base = direction === "up" ? rising : falling;
  const last = base[base.length - 1];

  return base.map((v) => (v / last) * end);
}

/** Original thin-bar sparkline (initial metric card style) */
function MiniTrendGraph({
  values,
  direction,
  active,
  hovered,
}: {
  values: number[];
  direction: "up" | "down";
  active: boolean;
  hovered: boolean;
  id?: string;
}) {
  const isUp = direction === "up";
  const barColor = isUp ? "bg-[#00d8a6]" : "bg-[#ef4444]";
  const glow = isUp ? "rgba(0,216,166,0.45)" : "rgba(239,68,68,0.45)";

  return (
    <div className="flex h-7 w-12 items-end gap-[3px]">
      {values.map((v, i) => (
        <div
          key={i}
          className={`w-[2.5px] origin-bottom rounded-[1px] transition-all ease-out ${barColor} ${
            hovered ? "duration-300" : "duration-500"
          }`}
          style={{
            height: active ? `${Math.max(16, v * 0.85)}%` : "12%",
            transitionDelay: hovered ? `${i * 35}ms` : `${i * 25}ms`,
            transform: hovered ? "scaleY(1.12)" : "scaleY(1)",
            opacity: hovered ? 1 : 0.8,
            boxShadow: hovered ? `0 0 5px ${glow}` : "none",
          }}
        />
      ))}
    </div>
  );
}

const ACTIVITIES = [
  {
    title: "Tru-Doc look up completed",
    description: "Document look up processed successfully in US-East Node.",
    icon: "document" as const,
  },
  {
    title: "API Credentials rotation",
    description: "System rotated access keys for global operations client.",
    icon: "key" as const,
  },
  {
    title: "Tru-Doc look up completed",
    description: "Document look up processed successfully in EU-West Node.",
    icon: "document" as const,
  },
  {
    title: "System parameters update",
    description: "Updated threshold configurations for email parser checks.",
    icon: "settings" as const,
  },
  {
    title: "Tru-Doc look up completed",
    description: "Document look up processed successfully in AP-South Node.",
    icon: "document" as const,
  },
  {
    title: "New user added",
    description: "santhoshatna@yopmail.com added to workspace dashboard.",
    icon: "userPlus" as const,
  },
] as const;

const ACTIVITY_ICON_STYLES = {
  document: "bg-[#e6fbf7] text-[#00d8a6]",
  key: "bg-[#fff7ed] text-[#ea580c]",
  settings: "bg-[#f5f3ff] text-[#7c3aed]",
  userPlus: "bg-[#fdf2f8] text-[#db2777]",
} as const;

function ActivityIcon({
  type,
  className,
}: {
  type: (typeof ACTIVITIES)[number]["icon"];
  className?: string;
}) {
  const common = "size-3.5";
  switch (type) {
    case "document":
      return (
        <svg className={className ?? common} viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M6 3.5h5.5L15 7v9.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M11.5 3.5V7H15M7.5 10.5h5M7.5 13.5h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "key":
      return (
        <svg className={className ?? common} viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="7.5" cy="10" r="3" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M10.2 10H16.5v2.2M14.2 10v2.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "settings":
      return (
        <svg className={className ?? common} viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M10 3.5v1.6M10 14.9v1.6M3.5 10h1.6M14.9 10h1.6M5.4 5.4l1.1 1.1M13.5 13.5l1.1 1.1M14.6 5.4l-1.1 1.1M6.5 13.5l-1.1 1.1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "userPlus":
      return (
        <svg className={className ?? common} viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="8.5" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M3.8 15.5c.9-2.4 8.5-2.4 9.4 0M14.2 7.2v4.2M12.1 9.3h4.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

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
}: {
  delta: string;
  direction: "up" | "down";
}) {
  const isUp = direction === "up";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
        isUp
          ? "bg-[#e6fbf7] text-[#0f766e] border-[#a7f3d0]"
          : "bg-[#fee2e2] text-[#b91c1c] border-[#fecaca]"
      }`}
    >
      {delta} {isUp ? "↑" : "↓"}
    </span>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5l10 10M15 5 5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LookupDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showLookupPromo, setShowLookupPromo] = useState(true);
  const [hoveredLookupBtn, setHoveredLookupBtn] = useState<"single" | "bulk" | null>(null);

  // States to hold hover info on metric cards
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Custom Chart States
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<"safe" | "mid" | "risk" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismissLookupPromo = () => {
    setShowLookupPromo(false);
  };

  // Safe: 73%, Mid: 17%, Risk: 10%
  const totalLookups = 1248;
  const safeCount = 912;
  const midCount = 215;
  const riskCount = 121;

  return (
    <div className="flex min-h-screen w-full flex-col gap-3 bg-transparent font-sans text-[#0f172a] antialiased dark:text-pastel-text">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-sans text-xl font-semibold tracking-wide text-[#0f172a] dark:text-pastel-text sm:text-[28px]">
              Dashboard
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#475569] dark:text-pastel-muted">
              Monitor your system performance and key metrics
            </p>
          </div>
          <AnimatedButton
            type="button"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#e2e8f0] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#0f172a] shadow-sm hover:bg-[#E8F4FF] active:scale-95 transition-all duration-200"
          >
            <CalendarIcon className="size-4 text-[#475569]" />
            Current month
          </AnimatedButton>
        </div>
      </FadeIn>

      <AnimatePresence initial={false}>
        {showLookupPromo && (
          <motion.div
            key="lookup-promo"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <section
              className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_10px_20px_rgba(0,0,0,0.02)] sm:p-6"
              role="dialog"
              aria-label="Start your digital look up"
            >
              {/* Close */}
              <button
                type="button"
                onClick={dismissLookupPromo}
                aria-label="Close look up promo"
                className="absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full border border-[#e2e8f0] bg-white text-[#64748b] shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF] hover:text-[#1E90FF] active:scale-95"
              >
                <CloseIcon className="size-3.5" />
              </button>

              {/* Interactive minimalist dot grid background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] opacity-60 [background-size:16px_16px]" />

              <div className="relative z-10 max-w-2xl pr-8">
                <h2 className="font-sans text-lg font-semibold tracking-wide text-[#0f172a] sm:text-xl">
                  Start your digital look up
                </h2>
                <p className="mt-2 text-[11px] font-medium leading-relaxed text-[#475569]">
                  Simplify bulk queries or execute precision individual audits.{" "}
                  <span className="cursor-pointer font-semibold text-[#475569] underline-offset-2 transition-colors hover:text-[#1E90FF] hover:underline">
                    Click here
                  </span>{" "}
                  to download the spreadsheet template for bulk upload.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {(() => {
                    // When Bulk is hovered, Single swaps to outline; otherwise Single stays primary
                    const singleIsPrimary = hoveredLookupBtn !== "bulk";
                    const bulkIsPrimary = hoveredLookupBtn === "bulk";
                    const primaryClass =
                      "overflow-hidden border-0 bg-[#1E90FF] text-white shadow-md";
                    const outlineClass =
                      "overflow-hidden border border-[#e2e8f0] bg-white text-[#0f172a] shadow-sm";

                    return (
                      <>
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredLookupBtn("single")}
                          onMouseLeave={() => setHoveredLookupBtn(null)}
                          className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[10px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                            singleIsPrimary ? primaryClass : outlineClass
                          }`}
                        >
                          Single look up
                          <span
                            className={`grid size-5.5 place-items-center rounded-full transition-colors duration-200 ${
                              singleIsPrimary ? "bg-white/15" : "bg-transparent"
                            }`}
                          >
                            <ArrowRightIcon className="size-3.5" />
                          </span>
                        </button>
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredLookupBtn("bulk")}
                          onMouseLeave={() => setHoveredLookupBtn(null)}
                          className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[10px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                            bulkIsPrimary ? primaryClass : outlineClass
                          }`}
                        >
                          Bulk look up
                          <span
                            className={`grid size-5.5 place-items-center rounded-full transition-colors duration-200 ${
                              bulkIsPrimary ? "bg-white/15" : "bg-transparent"
                            }`}
                          >
                            <ArrowRightIcon className="size-3.5" />
                          </span>
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <FadeIn delay={0.08}>
        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {METRICS.map((m, index) => {
            const cardTheme =
              "hover:border-[#1E90FF]/40 hover:shadow-[0_12px_24px_rgba(30,144,255,0.16),0_4px_12px_rgba(30,144,255,0.08)] hover:bg-gradient-to-b hover:from-white hover:to-[#E8F4FF]/50";
            const sparkValues = sparklineFromMetric(m.delta, m.direction);

            return (
              <StaggerItem key={m.label}>
                <article
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_-10px_rgba(15,23,42,0.14)] active:scale-[0.99] ${cardTheme}`}
                >
                  {/* Soft spotlight sweep on hover */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/40 to-transparent opacity-0 transition-opacity duration-300 ${
                      hoveredCard === index ? "opacity-100" : ""
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[#1E90FF] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#475569] transition-colors duration-300 group-hover:text-[#1E90FF]">
                      {m.label}
                    </p>
                    <MiniTrendGraph
                      id={`metric-${index}`}
                      values={sparkValues}
                      direction={m.direction}
                      active={mounted}
                      hovered={hoveredCard === index}
                    />
                  </div>
                  <div className="relative z-10 mt-2.5 flex items-center gap-2">
                    <p className="font-sans text-[20px] font-semibold leading-none tracking-normal text-[#0f172a] sm:text-[22px]">
                      {m.value}
                    </p>
                    <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                      <TrendBadge delta={m.delta} direction={m.direction} />
                    </span>
                  </div>
                  <p className="relative z-10 mt-2 text-[8px] font-medium uppercase tracking-wider text-[#475569] transition-colors duration-300 group-hover:text-[#1E90FF]">
                    Compared to last month
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-3">
          {/* Row 1: Look up by Region & Recent activities */}
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
            <article className="xl:col-span-8 flex h-full min-h-[340px] flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] transition-all duration-300">
              <div className="mb-2.5 flex shrink-0 items-center justify-between">
                <h3 className="text-[10px] font-semibold tracking-wider text-[#0f172a] uppercase">Look up by region</h3>
                <span className="text-[8px] text-[#475569] font-semibold uppercase tracking-widest">Real-Time Geo Map</span>
              </div>
              <div className="min-h-0 w-full flex-1">
                <InteractiveMap />
              </div>
            </article>

            <article className="xl:col-span-4 flex h-full min-h-[340px] flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] transition-all duration-300">
              <h3 className="mb-2.5 shrink-0 text-[10px] font-semibold tracking-wider text-[#0f172a] uppercase">Recent activities</h3>
              <div className="relative flex min-h-0 flex-1 flex-col justify-between gap-2 before:absolute before:bottom-2 before:left-3 before:top-2 before:w-0.5 before:bg-[#f1f5f9]">
                {ACTIVITIES.map((a, i) => {
                  const iconStyle = ACTIVITY_ICON_STYLES[a.icon];
                  return (
                    <div
                      key={`${a.title}-${i}`}
                      className="group relative z-10 flex flex-1 items-center gap-3 list-none cursor-pointer transition-transform duration-300 hover:translate-x-1.5"
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full border border-[#e2e8f0] transition-all duration-300 group-hover:border-[#1E90FF]/40 group-hover:scale-110 ${iconStyle}`}
                      >
                        <ActivityIcon type={a.icon} />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold text-[#0f172a] transition-colors group-hover:text-black">
                          {a.title}
                        </p>
                        <p className="mt-0.5 text-[8px] font-semibold leading-normal text-[#475569]">
                          {a.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>

          {/* Row 2: Monthly Volume Chart & Signal Distribution Donut */}
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
            {/* Monthly Volume & Signals Bar Chart */}
            <article className="relative xl:col-span-8 flex h-full min-h-[300px] flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] transition-all duration-300">
              <div className="mb-2.5 flex shrink-0 items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-semibold tracking-wider text-[#0f172a] uppercase">Monthly look up volume</h3>
                  <p className="mt-0.5 text-[8px] font-medium text-[#475569]">Year-to-date lookups comparing Safe signals</p>
                </div>
                <div className="flex items-center gap-3 text-[8px] font-semibold uppercase text-[#475569]">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#1E90FF]" />
                    <span>Total Vol</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#00d8a6]" />
                    <span>Safe Signals</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Container — fills remaining card height */}
              <div className="relative mt-1 flex min-h-[220px] flex-1 items-end justify-between gap-2 border-b border-[#e2e8f0] pb-1">
                {MONTHLY_DATA.map((d, index) => {
                  const maxTotal = Math.max(...MONTHLY_DATA.map((m) => m.total));
                  const totalHeight = (d.total / maxTotal) * 100;
                  const safeHeight = (d.safe / maxTotal) * 100;

                  return (
                    <div
                      key={d.month}
                      onMouseEnter={() => setHoveredMonth(index)}
                      onMouseLeave={() => setHoveredMonth(null)}
                      className="group/bar relative flex h-full grow cursor-pointer flex-col items-center justify-end"
                    >
                      <div className="flex w-full grow items-end justify-center gap-1.5">
                        <div
                          className="relative w-4 overflow-hidden rounded-t bg-[#1E90FF]/20 transition-all duration-700 ease-out group-hover/bar:bg-[#1E90FF]/35 sm:w-5"
                          style={{ height: mounted ? `${totalHeight}%` : "0%" }}
                        >
                          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#1E90FF]/40 to-transparent" />
                        </div>
                        <div
                          className="w-4 rounded-t bg-[#00d8a6] transition-all duration-700 ease-out group-hover/bar:bg-[#00f5d4] sm:w-5"
                          style={{ height: mounted ? `${safeHeight}%` : "0%" }}
                        />
                      </div>
                      <span className="mt-2 text-[8px] font-semibold text-[#475569] transition-colors group-hover/bar:text-[#0f172a]">
                        {d.month}
                      </span>
                    </div>
                  );
                })}

                {hoveredMonth !== null && (
                  <div
                    className="pointer-events-none absolute z-20 rounded-xl border border-slate-700/50 bg-[#0f172a]/95 p-3 text-[9px] font-semibold text-white shadow-2xl transition-all duration-300"
                    style={{
                      left:
                        hoveredMonth > 4
                          ? "auto"
                          : `${(hoveredMonth / MONTHLY_DATA.length) * 100 + 4}%`,
                      right:
                        hoveredMonth > 4
                          ? `${100 - (hoveredMonth / (MONTHLY_DATA.length - 1)) * 100 + 2}%`
                          : "auto",
                      bottom: "55%",
                    }}
                  >
                    <p className="text-[8px] font-semibold uppercase tracking-wider text-[#1E90FF]">
                      {MONTHLY_DATA[hoveredMonth].month} Audit
                    </p>
                    <p className="mt-1 font-medium text-slate-300">
                      Total volume:{" "}
                      <span className="font-semibold text-white">{MONTHLY_DATA[hoveredMonth].total}</span>
                    </p>
                    <p className="font-medium text-slate-300">
                      Safe signals:{" "}
                      <span className="font-semibold text-[#00d8a6]">{MONTHLY_DATA[hoveredMonth].safe}</span>
                    </p>
                    <p className="font-medium text-slate-300">
                      Risk flags:{" "}
                      <span className="font-semibold text-rose-400">{MONTHLY_DATA[hoveredMonth].risk}</span>
                    </p>
                  </div>
                )}
              </div>
            </article>

            {/* Signal Distribution Donut Chart */}
            <article className="xl:col-span-4 flex h-full min-h-[300px] flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] transition-all duration-300">
              <div className="shrink-0">
                <h3 className="text-[10px] font-semibold tracking-wider text-[#0f172a] uppercase">Signal distribution</h3>
                <p className="mt-0.5 text-[8px] font-medium text-[#475569]">
                  Classification breakdown of processed records
                </p>
              </div>

              <div
                className="mt-3 flex min-h-0 flex-1 flex-col items-center justify-center gap-4 sm:flex-row"
                onMouseLeave={() => setHoveredSlice(null)}
              >
                {(() => {
                  const radius = 50;
                  const circ = 2 * Math.PI * radius;
                  const safePct = 0.73;
                  const midPct = 0.17;
                  const riskPct = 0.1;
                  const slices = [
                    {
                      key: "safe" as const,
                      color: "#00d8a6",
                      length: circ * safePct,
                      offset: 0,
                      startDeg: 0,
                      endDeg: 360 * safePct,
                    },
                    {
                      key: "mid" as const,
                      color: "#d97706",
                      length: circ * midPct,
                      offset: circ * safePct,
                      startDeg: 360 * safePct,
                      endDeg: 360 * (safePct + midPct),
                    },
                    {
                      key: "risk" as const,
                      color: "#ef4444",
                      length: circ * riskPct,
                      offset: circ * (safePct + midPct),
                      startDeg: 360 * (safePct + midPct),
                      endDeg: 360,
                    },
                  ];

                  const resolveSliceFromPoint = (
                    e: React.MouseEvent<SVGSVGElement>
                  ) => {
                    const svg = e.currentTarget;
                    const rect = svg.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const x = e.clientX - cx;
                    const y = e.clientY - cy;
                    const dist = Math.hypot(x, y);
                    const outer = rect.width / 2;
                    const inner = outer * 0.58;
                    // Only react on the ring area
                    if (dist < inner || dist > outer * 0.98) {
                      setHoveredSlice(null);
                      return;
                    }
                    // Match SVG `-rotate-90`: 0° at top, clockwise
                    let deg = (Math.atan2(y, x) * 180) / Math.PI;
                    deg = (deg + 90 + 360) % 360;
                    if (deg < slices[0].endDeg) setHoveredSlice("safe");
                    else if (deg < slices[1].endDeg) setHoveredSlice("mid");
                    else setHoveredSlice("risk");
                  };

                  return (
                    <div className="relative size-36 shrink-0 sm:size-40">
                      <svg
                        className="size-full -rotate-90 cursor-pointer"
                        viewBox="0 0 120 120"
                        onMouseMove={resolveSliceFromPoint}
                        onMouseLeave={() => setHoveredSlice(null)}
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r={radius}
                          fill="transparent"
                          stroke="#f1f5f9"
                          strokeWidth="12"
                          className="pointer-events-none"
                        />
                        {slices.map((slice) => {
                          const isActive = hoveredSlice === slice.key;
                          const isDimmed = hoveredSlice !== null && !isActive;
                          return (
                            <circle
                              key={slice.key}
                              cx="60"
                              cy="60"
                              r={radius}
                              fill="transparent"
                              stroke={slice.color}
                              strokeWidth={isActive ? 15 : 12}
                              strokeLinecap="butt"
                              strokeDasharray={`${mounted ? slice.length : 0} ${circ}`}
                              strokeDashoffset={-slice.offset}
                              pointerEvents="none"
                              className={`transition-all duration-300 ease-out ${
                                isDimmed ? "opacity-30" : "opacity-100"
                              }`}
                            />
                          );
                        })}
                      </svg>

                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span
                          className={`font-sans text-xl font-semibold leading-none tracking-normal transition-colors duration-300 ${
                            hoveredSlice === "safe"
                              ? "text-[#00d8a6]"
                              : hoveredSlice === "mid"
                                ? "text-[#d97706]"
                                : hoveredSlice === "risk"
                                  ? "text-[#ef4444]"
                                  : "text-[#0f172a]"
                          }`}
                        >
                          {hoveredSlice === "safe"
                            ? safeCount
                            : hoveredSlice === "mid"
                              ? midCount
                              : hoveredSlice === "risk"
                                ? riskCount
                                : totalLookups.toLocaleString()}
                        </span>
                        <span className="mt-1 text-[7px] font-medium uppercase tracking-wide text-[#475569]">
                          {hoveredSlice === "safe"
                            ? "Safe"
                            : hoveredSlice === "mid"
                              ? "Mid"
                              : hoveredSlice === "risk"
                                ? "Risk"
                                : "Processed"}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex w-full grow flex-col justify-evenly gap-2 self-stretch">
                  {(
                    [
                      {
                        key: "safe" as const,
                        label: "Safe (73%)",
                        count: safeCount,
                        border: "border-[#00d8a6] bg-[#f0fdf4]",
                        dot: "bg-[#00d8a6]",
                      },
                      {
                        key: "mid" as const,
                        label: "Mid (17%)",
                        count: midCount,
                        border: "border-[#d97706] bg-[#fffbeb]",
                        dot: "bg-[#d97706]",
                      },
                      {
                        key: "risk" as const,
                        label: "Risk (10%)",
                        count: riskCount,
                        border: "border-[#ef4444] bg-[#fee2e2]",
                        dot: "bg-[#ef4444]",
                      },
                    ] as const
                  ).map((item) => (
                    <div
                      key={item.key}
                      onMouseEnter={() => setHoveredSlice(item.key)}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border px-2 py-2.5 transition-all duration-300 ${
                        hoveredSlice === item.key ? item.border : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`size-2.5 shrink-0 rounded-full ${item.dot}`} />
                        <span className="text-[10px] font-semibold text-[#0f172a]">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-medium text-[#475569]">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Row 3: Look up by type, Look up by Branch, Rules list */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:min-h-[280px]">
            <article className="flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] transition-all duration-300">
              <h3 className="mb-2.5 shrink-0 text-[10px] font-semibold tracking-wider text-[#0f172a] uppercase">
                Look up by type
              </h3>
              <div className="flex min-h-0 flex-1 flex-col justify-between gap-3">
                <div className="flex flex-1 flex-col justify-evenly gap-2">
                  <div className="group flex flex-1 items-center gap-2.5 rounded-xl border border-[#e2e8f0] border-l-4 border-l-transparent bg-[#f8fafc] px-3 py-3 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-[#1E90FF]/40 hover:border-l-[#1E90FF] hover:bg-[#E8F4FF]">
                    <span className="grid size-8 place-items-center rounded-full bg-white text-[#1E90FF] transition-transform duration-300 group-hover:scale-110">
                      <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="m3.5 6.5 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                    <p className="text-[10px] font-semibold text-[#0f172a]">
                      Email has <span className="font-semibold text-[#1E90FF]">811</span> look ups
                    </p>
                  </div>
                  <div className="group flex flex-1 items-center gap-2.5 rounded-xl border border-[#e2e8f0] border-l-4 border-l-transparent bg-[#f8fafc] px-3 py-3 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-[#1E90FF]/40 hover:border-l-[#1E90FF] hover:bg-[#E8F4FF]">
                    <span className="grid size-8 place-items-center rounded-full bg-white text-[#1E90FF] transition-transform duration-300 group-hover:scale-110">
                      <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path
                          d="M6.5 3.5h2l1 4-2 1.5a10 10 0 0 0 4.5 4.5l1.5-2 4 1v2a2 2 0 0 1-2 2A12.5 12.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-[10px] font-semibold text-[#0f172a]">
                      Phone has <span className="font-semibold text-[#1E90FF]">437</span> look ups
                    </p>
                  </div>
                </div>

                <div className="shrink-0 border-t border-[#e2e8f0] pt-2.5">
                  <div className="mb-1.5 flex justify-between text-[8px] font-semibold uppercase tracking-wide text-[#475569]">
                    <span>Email (65%)</span>
                    <span>Phone (35%)</span>
                  </div>
                  <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
                    <div
                      className="h-full bg-[#1E90FF] transition-all duration-1000 ease-out"
                      style={{ width: mounted ? "65%" : "0%" }}
                    />
                    <div
                      className="h-full bg-[#94a3b8] transition-all duration-1000 ease-out"
                      style={{ width: mounted ? "35%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            </article>

            <article className="flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] transition-all duration-300">
              <h3 className="mb-2.5 shrink-0 text-[10px] font-semibold tracking-wider text-[#0f172a] uppercase">
                Look up by Branch
              </h3>
              <div className="flex min-h-0 flex-1 flex-col justify-evenly gap-2">
                {BRANCHES.map((branch) => {
                  const isUp = branch.direction === "up";
                  return (
                    <div key={branch.name} className="flex flex-1 flex-col justify-center gap-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-semibold text-[#0f172a]">{branch.name}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-[#0f172a]">{branch.count}</span>
                          <span
                            className={`inline-flex items-center rounded border px-1.5 py-0.25 text-[7px] font-semibold ${
                              isUp
                                ? "border-[#a7f3d0] bg-[#e6fbf7] text-[#0f766e]"
                                : "border-[#fecaca] bg-[#fee2e2] text-[#b91c1c]"
                            }`}
                          >
                            {branch.delta} {isUp ? "↑" : "↓"}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
                        <div
                          className="h-full rounded-full bg-[#1E90FF] transition-all duration-1000 ease-out"
                          style={{
                            width: mounted ? `${Math.min(branch.count * 1.1, 100)}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="flex h-full flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] transition-all duration-300">
              <h3 className="mb-2.5 shrink-0 text-[10px] font-semibold tracking-wider text-[#0f172a] uppercase">
                Rules list
              </h3>
              <div className="flex min-h-0 flex-1 flex-col justify-evenly gap-1.5">
                {RULES.map((rule, i) => (
                  <div
                    key={`${rule}-${i}`}
                    className="group flex flex-1 cursor-pointer list-none items-center justify-between gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 transition-all duration-300 hover:translate-x-1.5 hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF]"
                  >
                    <p className="truncate text-[10px] font-semibold text-[#475569] transition-colors group-hover:text-[#1E90FF]">
                      {rule}
                    </p>
                    <span className="shrink-0 text-[10px] font-semibold text-[#475569] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#1E90FF]">
                      ↓
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
