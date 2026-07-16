"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { ChartTooltip, chartTooltipShell } from "@/components/ui/ChartTooltip";
import type { FraudDetectorData } from "@/lib/api/fraud";
import { cn } from "@/lib/cn";
import { cardShell as baseCardShell, glassHoverSoft } from "@/lib/ui";

const cardShell = baseCardShell;
const cardHover = cn(
  "hover:-translate-y-0.5",
  glassHoverSoft,
);
const metricCardHover =
  "hover:border-[#1E90FF]/40 hover:shadow-[0_12px_24px_rgba(30,144,255,0.16),0_4px_12px_rgba(30,144,255,0.08)] hover:bg-gradient-to-b hover:from-white hover:to-[#E8F4FF]/50 dark:hover:border-[var(--hover-glass-border)] dark:hover:bg-[var(--hover-glass)] dark:hover:from-transparent dark:hover:to-transparent dark:hover:shadow-none";

function sparklineFromDelta(delta: string, direction: "up" | "down"): number[] {
  const pct = Math.abs(parseFloat(delta.replace(/[%+]/g, ""))) || 0;
  const MAX_PCT = 15;
  const end = Math.max(28, Math.min(92, (pct / MAX_PCT) * 92));
  const rising = [30, 45, 35, 60, 50, 75, 90];
  const falling = [90, 75, 60, 50, 45, 35, 28];
  const base = direction === "up" ? rising : falling;
  const last = base[base.length - 1];
  return base.map((v) => (v / last) * end);
}

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
}) {
  const isUp = direction === "up";
  const barColor = isUp ? "bg-[#00d8a6]" : "bg-[#ef4444]";
  const glow = isUp ? "rgba(0,216,166,0.45)" : "rgba(239,68,68,0.45)";

  return (
    <div className="flex h-7 w-12 items-end gap-[3px]">
      {values.map((v, i) => (
        <div
          key={i}
          className={cn(
            "w-[2.5px] origin-bottom rounded-[1px] transition-all ease-out",
            barColor,
            hovered ? "duration-300" : "duration-500",
          )}
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
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        isUp
          ? "border-[#a7f3d0] bg-[#e6fbf7] text-[#0f766e]"
          : "border-[#fecaca] bg-[#fee2e2] text-[#b91c1c]",
      )}
    >
      {delta} {isUp ? "↑" : "↓"}
    </span>
  );
}

function parseMetricDelta(delta: string): { direction: "up" | "down" } {
  const numeric = parseFloat(delta.replace(/[%+]/g, ""));
  const direction = delta.startsWith("-") || numeric === 0 ? "down" : "up";
  return { direction };
}

export function FraudDetectorPage({ data }: { data: FraudDetectorData }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const metrics = [
    {
      label: "CVs ingested",
      value: String(data.metrics.cvsIngested.value),
      delta: data.metrics.cvsIngested.delta,
      ...parseMetricDelta(data.metrics.cvsIngested.delta),
    },
    {
      label: "Shortlisted",
      value: String(data.metrics.shortlisted.value),
      delta: data.metrics.shortlisted.delta,
      direction: "down" as const,
    },
    {
      label: "Fraud flagged",
      value: String(data.metrics.fraudFlagged.value),
      delta: data.metrics.fraudFlagged.delta,
      direction: "up" as const,
    },
    {
      label: "Final hires",
      value: String(data.metrics.finalHires.value),
      delta: data.metrics.finalHires.delta,
      direction: "down" as const,
    },
  ];

  const maxFunnel = Math.max(...data.funnel.map((f) => f.value), 1);

  return (
    <div className="flex w-full min-h-screen flex-col gap-3 bg-transparent font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Intelli Hire
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
              AI Fraud Detector
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#475569]">
              Forensic resume screening · 6-stage validation
            </p>
          </div>
          <button
            type="button"
            className="inline-flex self-start items-center overflow-hidden rounded-full border-0 bg-[#1E90FF] px-5 py-2.5 text-[10px] font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-95 sm:self-center"
          >
            Create Job
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.04}>
        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m, index) => {
            const sparkValues = sparklineFromDelta(m.delta, m.direction);
            return (
              <StaggerItem key={m.label}>
                <article
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 ease-out hover:-translate-y-1 active:scale-[0.99]",
                    metricCardHover,
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/40 to-transparent opacity-0 transition-opacity duration-300",
                      hoveredCard === index && "opacity-100",
                    )}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[#1E90FF] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#475569] transition-colors duration-300 group-hover:text-[#1E90FF]">
                      {m.label}
                    </p>
                    <MiniTrendGraph
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

      <FadeIn delay={0.08}>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
          <section className={cn(cardShell, cardHover, "flex flex-col p-4 sm:p-5 xl:col-span-4")}>
            <div className="mb-2.5 flex shrink-0 items-end justify-between">
              <div>
                <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                  Pipeline funnel
                </h2>
                <p className="mt-0.5 text-[8px] font-medium text-[#475569]">Drop-off across stages</p>
              </div>
              <span className="text-[8px] font-semibold uppercase tracking-widest text-[#475569]">5 stages</span>
            </div>
            <ul className="mt-1 space-y-3">
              {data.funnel.map((stage) => (
                <li key={stage.label} className="group">
                  <div className="mb-1.5 flex justify-between gap-3">
                    <span className="text-[10px] font-semibold text-[#0f172a] transition-colors group-hover:text-[#1E90FF]">
                      {stage.label}
                    </span>
                    <span className="text-[10px] font-semibold text-[#475569]">{stage.value}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
                    <div
                      className="h-full rounded-full bg-[#1E90FF] transition-all duration-700 ease-out"
                      style={{ width: mounted ? `${(stage.value / maxFunnel) * 100}%` : "0%" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={cn(cardShell, cardHover, "flex flex-col p-4 sm:p-5 xl:col-span-8")}>
            <div className="mb-2.5 flex shrink-0 items-center justify-between">
              <div>
                <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                  Volume & flag trend
                </h2>
                <p className="mt-0.5 text-[8px] font-medium text-[#475569]">Last 14 days</p>
              </div>
            </div>
            <div className="h-[230px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.volumeTrend} margin={{ top: 6, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#475569" }} axisLine={false} tickLine={false} padding={{ left: 0, right: 0 }} />
                  <YAxis domain={[0, 1]} width={28} tick={{ fontSize: 9, fill: "#475569" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    {...chartTooltipShell}
                    content={
                      <ChartTooltip
                        labelFormatter={(day) => `${day} Audit`}
                        valueColors={{ Volume: "#34d399", Flags: "#ef4444" }}
                      />
                    }
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="volume" name="Volume" fill="#34d399" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="flags" name="Flags" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <section className={cn(cardShell, cardHover, "flex flex-col p-4 sm:p-5")}>
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
              Fraud signal distribution
            </h2>
            <p className="mt-0.5 text-[8px] font-medium text-[#475569]">Across flagged candidates</p>
            <ul className="mt-3 space-y-2">
              {data.fraudSignals.map((s) => (
                <li
                  key={s.label}
                  className="group flex cursor-default items-center justify-between gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2.5 transition-all duration-300 hover:translate-x-1.5 hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF]"
                >
                  <span className="truncate text-[10px] font-semibold text-[#475569] transition-colors group-hover:text-[#1E90FF]">
                    {s.label}
                  </span>
                  <span className="text-[10px] font-semibold text-[#0f172a]">{s.value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={cn(cardShell, cardHover, "flex flex-col p-4 sm:p-5")}>
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">Fake-media risk</h2>
            <p className="mt-0.5 text-[8px] font-medium text-[#475569]">Score distribution across screenings</p>
            <div className="mt-3 h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.fakeMediaBins} margin={{ top: 6, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 8, fill: "#475569" }} axisLine={false} tickLine={false} padding={{ left: 0, right: 0 }} />
                  <YAxis domain={[0, 1]} width={28} tick={{ fontSize: 9, fill: "#475569" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    {...chartTooltipShell}
                    content={<ChartTooltip labelFormatter={(label) => `${label} Range`} />}
                  />
                  <Bar dataKey="value" name="Risk score" fill="#1E90FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className={cn(cardShell, cardHover, "flex flex-col p-4 sm:p-5")}>
            <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">Geo risk matrix</h2>
            <p className="mt-0.5 text-[8px] font-medium text-[#475569]">Clean vs flagged by region</p>
            <div className="mt-3 h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.geoRisk} margin={{ top: 6, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="region" tick={{ fontSize: 8, fill: "#475569" }} axisLine={false} tickLine={false} padding={{ left: 0, right: 0 }} />
                  <YAxis domain={[0, 1]} width={28} tick={{ fontSize: 9, fill: "#475569" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    {...chartTooltipShell}
                    content={<ChartTooltip labelFormatter={(region) => `${region} Region`} />}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="clean" name="Clean" stackId="a" fill="#00d8a6" />
                  <Bar dataKey="flagged" name="Flagged" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </FadeIn>

      <FadeIn delay={0.12}>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
          <section className={cn(cardShell, cardHover, "overflow-hidden xl:col-span-7")}>
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-4 py-3 sm:px-5">
              <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                Jobs <span className="text-[#475569]">· {data.jobs.length}</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                    {["Job Title", "Status", "Resumes", "Selected", "Created", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#475569]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.jobs.map((job) => (
                    <tr
                      key={job.title}
                      className="border-b border-[#e2e8f0] transition-colors hover:bg-[#E8F4FF]/50"
                    >
                      <td className="px-4 py-3 text-[10px] font-semibold text-[#0f172a]">{job.title}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{job.status}</td>
                      <td className="px-4 py-3 text-[10px] font-semibold text-[#0f172a]">{job.resumes}</td>
                      <td className="px-4 py-3 text-[10px] font-semibold text-[#0f172a]">{job.selected}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{job.created}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#94a3b8]">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-4 py-2.5 text-[8px] font-medium text-[#475569] sm:px-5">1–1 of 1</p>
          </section>

          <section className={cn(cardShell, cardHover, "overflow-hidden xl:col-span-5")}>
            <div className="border-b border-[#e2e8f0] px-4 py-3 sm:px-5">
              <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                Verification queue{" "}
                <span className="text-[#475569]">· {data.verificationQueue.length} active</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                    {["Candidate", "JD Match", "Risk Level", "Atna Score", "Action"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#475569]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.verificationQueue.map((row) => (
                    <tr
                      key={row.ref}
                      className="group border-b border-[#e2e8f0] transition-colors hover:bg-[#E8F4FF]/50"
                    >
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="grid size-8 place-items-center rounded-full bg-[#1E90FF] text-[10px] font-bold text-white transition-transform duration-200 group-hover:scale-110">
                            {row.initials}
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#0f172a]">{row.name}</p>
                            <p className="text-[8px] font-medium text-[#475569]">
                              {row.ref} · {row.level}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[10px] font-semibold text-[#0f172a]">{row.jdMatch}</td>
                      <td className="px-3 py-3 text-[10px] font-medium text-[#475569]">{row.riskLevel}</td>
                      <td className="px-3 py-3 text-[10px] font-semibold text-[#0f172a]">{row.atnaScore}</td>
                      <td className="px-3 py-3 text-[10px] font-medium text-[#94a3b8]">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </FadeIn>
    </div>
  );
}
