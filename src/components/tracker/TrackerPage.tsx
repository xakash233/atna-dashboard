"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type {
  TrackerCredit,
  TrackerDashboardData,
  TrackerMetrics,
  TrackerOrgDetails,
  TrackerTab,
} from "@/lib/api/tracker";
import { cn } from "@/lib/cn";

const TABS: { id: TrackerTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "sub-orgs", label: "Sub-Organizations" },
  { id: "users", label: "Users" },
  { id: "usage", label: "Usage" },
  { id: "credits", label: "Credits" },
];

const USAGE_DATA = [
  { date: "Jul 08", apiCalls: 240, latency: 120 },
  { date: "Jul 09", apiCalls: 380, latency: 110 },
  { date: "Jul 10", apiCalls: 450, latency: 135 },
  { date: "Jul 11", apiCalls: 390, latency: 95 },
  { date: "Jul 12", apiCalls: 480, latency: 105 },
  { date: "Jul 13", apiCalls: 620, latency: 115 },
  { date: "Jul 14", apiCalls: 540, latency: 110 },
];

function MetricIcon({ name }: { name: string }) {
  const c = "size-[18px]";
  if (name === "users") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="7.5" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 16c.6-2.4 2.4-3.6 5-3.6s4.4 1.2 5 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13.2 12.6c1.5.2 2.8 1 3.3 2.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "txns") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M4 7h12M4 13h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14 4.5 16.5 7 14 9.5M6 10.5 3.5 13 6 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "today") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 8h14M7 2.5v3M13 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11.5" y="4" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function MetricCard({
  label,
  value,
  icon,
  isHighlighted = false,
}: {
  label: string;
  value: number;
  icon: string;
  isHighlighted?: boolean;
}) {
  const growth = {
    users: "+8.3%",
    txns: "+14.2%",
    today: "+24.5%",
    orgs: "+0%",
  }[icon] || "";

  const growthPositive = icon !== "orgs";

  return (
    <div
      className={cn(
        "relative flex min-h-[132px] flex-col justify-between gap-4 p-5 sm:p-6",
        isHighlighted ? "pastel-metric-hero" : "pastel-card",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-medium",
              isHighlighted ? "text-white/85" : "text-pastel-muted",
            )}
          >
            {label}
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-2">
            <p
              className={cn(
                "text-[28px] font-bold leading-none tracking-tight sm:text-[32px]",
                isHighlighted ? "text-white" : "text-pastel-text",
              )}
            >
              {value}
            </p>
            <span
              className={cn(
                "mb-0.5 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
                isHighlighted
                  ? "bg-white/20 text-white"
                  : growthPositive
                    ? "bolt-pill-positive"
                    : "bg-surface-muted text-pastel-muted",
              )}
            >
              {growth}
            </span>
          </div>
        </div>
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full",
            isHighlighted
              ? "bg-white/20 text-white"
              : "bg-[#111827] text-white dark:bg-white/10 dark:text-pastel-text",
          )}
        >
          <MetricIcon name={icon} />
        </span>
      </div>
    </div>
  );
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-surface-muted/70 px-4 py-3.5 dark:bg-white/[0.03]">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-pastel-muted">{label}</p>
      <div className="mt-1.5 text-sm font-semibold text-pastel-text">{children}</div>
    </div>
  );
}

const OPERATIONAL_TASKS = [
  { id: 1, text: "Validate KYC OCR API", time: "Today - 10:30 AM", status: "done", priority: "high" },
  { id: 2, text: "Resolve AML Sync Lag", time: "Today - 1:45 PM", status: "pending", priority: "critical" },
  { id: 3, text: "Update Deepfake Models", time: "Today - 4:00 PM", status: "pending", priority: "medium" },
  { id: 4, text: "Generate SLA Report", time: "Today - 6:30 PM", status: "done", priority: "low" },
];

function OverviewPanel({
  org,
  credits,
}: {
  org: TrackerOrgDetails;
  credits: TrackerCredit[];
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Column 1: Organization Details (5 columns) */}
        <section className="pastel-card p-5 sm:p-6 xl:col-span-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
            <h2 className="text-base font-semibold text-pastel-text">Organization Details</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {org.status}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <DetailField label="Organization Name">{org.name}</DetailField>
            </div>
            <DetailField label="Code">
              <span className="font-mono text-[13px]">{org.code}</span>
            </DetailField>
            <DetailField label="Level">{org.level}</DetailField>
            <div className="sm:col-span-2">
              <DetailField label="Plan">
                <span className="inline-flex rounded-lg bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent-active">
                  {org.plan}
                </span>
              </DetailField>
            </div>
            <DetailField label="Country">{org.country}</DetailField>
            <DetailField label="City">{org.city}</DetailField>
            <div className="sm:col-span-2">
              <DetailField label="Created by">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                    {org.createdByName.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[13px]">{org.createdByName}</p>
                    <p className="truncate text-xs font-normal text-pastel-muted">{org.createdByEmail}</p>
                  </div>
                </div>
              </DetailField>
            </div>
          </div>
        </section>

        {/* Column 2: Operational Tasks (3 columns) */}
        <section className="pastel-card p-5 sm:p-6 xl:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
            <h2 className="text-base font-semibold text-pastel-text">Tasks</h2>
            <span className="text-[10px] text-pastel-muted uppercase font-bold tracking-wider">Today</span>
          </div>
          <ul className="space-y-3">
            {OPERATIONAL_TASKS.map((task) => {
              const badgeColor = {
                critical: "bg-rose-500/10 text-rose-500",
                high: "bg-amber-500/10 text-amber-500",
                medium: "bg-purple-500/10 text-purple-500",
                low: "bg-gray-500/10 text-gray-500/80",
              }[task.priority];

              return (
                <li key={task.id} className="flex items-start justify-between gap-2 rounded-xl bg-white/60 p-3 shadow-sm border border-border/10 dark:bg-black/20 group hover:border-accent/40 transition-colors">
                  <div className="flex gap-2 min-w-0">
                    <span className={cn(
                      "mt-0.5 size-3.5 rounded-full border flex items-center justify-center text-[8px] font-bold shrink-0 transition-colors",
                      task.status === "done"
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-600"
                        : "border-border text-transparent"
                    )}>
                      ✓
                    </span>
                    <div className="min-w-0 leading-tight">
                      <p className={cn(
                        "truncate text-xs font-semibold text-pastel-text",
                        task.status === "done" && "line-through opacity-60"
                      )}>
                        {task.text}
                      </p>
                      <p className="text-[9px] text-pastel-muted mt-0.5">{task.time}</p>
                    </div>
                  </div>
                  <span className={cn("text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0", badgeColor)}>
                    {task.priority}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Column 3: Available Credits (4 columns) */}
        <section className="pastel-card p-5 sm:p-6 xl:col-span-4">
          <h2 className="text-base font-semibold text-pastel-text">Available Credits</h2>
          <p className="mt-0.5 text-xs text-pastel-muted">Product balances for this org</p>
          <ul className="mt-4 space-y-3.5">
            {credits.map((credit) => {
              const maxQuota = credit.key === "AML" ? 1000 : credit.key === "KYC" ? 500 : 2500;
              const percentage = Math.min(100, Math.max(0, (credit.balance / maxQuota) * 100));
              return (
                <li
                  key={credit.key}
                  className="flex flex-col gap-2 rounded-xl bg-white/60 px-4 py-3.5 shadow-sm border border-border/10 dark:bg-black/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-pastel-muted">{credit.label}</span>
                    <span className="text-base font-bold tabular-nums text-accent">{credit.balance}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-muted rounded-full overflow-hidden dark:bg-white/5">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-pastel-muted font-mono">
                    <span>Usage: {Math.round(100 - percentage)}%</span>
                    <span>Quota: {maxQuota}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section className="pastel-card p-5 sm:p-6">
        <UsagePanel />
      </section>
    </div>
  );
}

function EmptyTab({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="px-2 py-12 text-center">
      <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
        <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-pastel-text">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-pastel-muted">{hint}</p>
    </div>
  );
}

function CreditsTab({ credits }: { credits: TrackerCredit[] }) {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-border">
      <table className="w-full min-w-[420px] text-left">
        <thead>
          <tr className="bg-surface-muted">
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-pastel-muted">
              Product
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-pastel-muted">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {credits.map((credit) => (
            <tr key={credit.key} className="border-t border-border">
              <td className="px-5 py-3.5 text-sm font-medium text-pastel-text">{credit.label}</td>
              <td className="px-5 py-3.5 text-right text-sm font-bold tabular-nums text-accent">
                {credit.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsagePanel() {
  const [metric, setMetric] = useState<"apiCalls" | "latency">("apiCalls");

  const BAR_DATA = [
    { name: "May", apiCalls: 240, latency: 120, active: false },
    { name: "Jun", apiCalls: 380, latency: 110, active: false },
    { name: "Jul", apiCalls: 450, latency: 135, active: false },
    { name: "Aug", apiCalls: 620, latency: 115, active: true }, // Highlighted active bar
    { name: "Sep", apiCalls: 480, latency: 105, active: false },
    { name: "Oct", apiCalls: 540, latency: 110, active: false },
    { name: "Nov", apiCalls: 590, latency: 125, active: false },
    { name: "Dec", apiCalls: 570, latency: 118, active: false }
  ];

  // Segmented speed dial gauge data (18 segments total, ~70% active = 13 sectors active)
  const GAUGE_SECTORS = 18;
  const activeSectors = 13;
  const gaugeData = Array.from({ length: GAUGE_SECTORS }).map((_, i) => ({
    value: 1,
    isActive: i < activeSectors
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Performance Overview BarChart (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-pastel-text">Performance Overview</h2>
              <p className="text-xs text-pastel-muted">Overview of system operations and throughput logs</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select className="glass-input text-[11px] px-3 py-1 pr-7 appearance-none cursor-pointer">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-pastel-muted text-[8px]">▼</span>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full rounded-2xl border border-border/40 bg-white/10 p-2 dark:bg-white/[0.01]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(180, 168, 204, 0.15)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--pastel-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--pastel-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--pastel-card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    color: "var(--pastel-text)",
                    fontSize: "12px",
                    boxShadow: "0 8px 24px -4px rgba(0,0,0,0.15)"
                  }}
                  cursor={{ fill: "rgba(180, 168, 204, 0.05)" }}
                />
                <Bar dataKey={metric === "apiCalls" ? "apiCalls" : "latency"} radius={[6, 6, 0, 0]} maxBarSize={30}>
                  {BAR_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.active ? "var(--accent)" : "rgba(180, 168, 204, 0.22)"}
                      className={entry.active ? "shadow-[0_0_12px_rgba(var(--accent-rgb),0.3)] animate-pulse" : ""}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Operations Growth Radial Gauge (4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-base font-semibold text-pastel-text">Operations Growth</h2>
            <p className="text-xs text-pastel-muted">Real-time status rate indicators</p>
          </div>

          {/* Segmented Speedometer Arch Container */}
          <div className="relative h-[160px] w-full flex items-center justify-center overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="90%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {gaugeData.map((entry, index) => {
                    const fill = entry.isActive ? "var(--accent)" : "rgba(180, 168, 204, 0.15)";
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={fill}
                        opacity={entry.isActive ? 1 : 0.4}
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center metric text inside speed gauge */}
            <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-center">
              <p className="text-[28px] font-black leading-none tracking-tight text-pastel-text">70.8%</p>
              <p className="text-[10px] text-pastel-muted font-bold tracking-wide uppercase mt-1">Growth rate</p>
            </div>
          </div>

          {/* Boltshift-style stats blocks */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-white/40 p-3 dark:bg-black/15">
              <p className="text-[10px] font-semibold text-pastel-muted">Verification Txns</p>
              <div className="mt-1 flex items-center justify-between gap-1.5">
                <span className="text-sm font-bold text-pastel-text">3,142</span>
                <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-full">
                  +4.5%
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-white/40 p-3 dark:bg-black/15">
              <p className="text-[10px] font-semibold text-pastel-muted">Total Volume</p>
              <div className="mt-1 flex items-center justify-between gap-1.5">
                <span className="text-sm font-bold text-pastel-text">12.4k</span>
                <span className="text-[9px] font-bold text-pastel-text bg-pastel-lilac px-1.5 py-0.5 rounded-full border border-white/5">
                  +4.5%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-4 border-t border-border/10">
        <div className="rounded-xl bg-surface-muted/30 p-4 border border-border/10 dark:bg-white/[0.02]">
          <p className="text-xs text-pastel-muted">Peak Usage</p>
          <p className="mt-1 text-lg font-bold text-pastel-text">620 requests/hr</p>
        </div>
        <div className="rounded-xl bg-surface-muted/30 p-4 border border-border/10 dark:bg-white/[0.02]">
          <p className="text-xs text-pastel-muted">Average Latency</p>
          <p className="mt-1 text-lg font-bold text-pastel-text">112.8 ms</p>
        </div>
        <div className="rounded-xl bg-surface-muted/30 p-4 border border-border/10 dark:bg-white/[0.02]">
          <p className="text-xs text-pastel-muted">Uptime (SLA)</p>
          <p className="mt-1 text-lg font-bold text-emerald-500 dark:text-emerald-400 font-semibold">99.98%</p>
        </div>
      </div>
    </div>
  );
}

function SubOrgsPanel() {
  const data = [
    { name: "Atna Mumbai Hub", code: "ATNA-BOM-01", plan: "Enterprise", users: 12, txns: 4230, status: "Active" },
    { name: "Atna Pune Labs", code: "ATNA-PNQ-02", plan: "Standard", users: 5, txns: 1280, status: "Active" },
    { name: "Atna Delhi Ops", code: "ATNA-DEL-03", plan: "Standard", users: 8, txns: 2410, status: "Active" },
    { name: "Atna Chennai Dev", code: "ATNA-MAA-04", plan: "Free Trial", users: 2, txns: 180, status: "Pending" }
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-pastel-text">Sub-Organizations</h2>
          <p className="text-xs text-pastel-muted">Manage child branches and operational nodes.</p>
        </div>
        <button type="button" className="btn-premium px-4 py-2 text-xs font-semibold cursor-pointer self-start sm:self-auto">
          + Create Sub-Org
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((org) => (
          <div key={org.code} className="pastel-card p-5 flex flex-col justify-between h-[160px] hover:border-accent/40 transition-colors">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-sm text-pastel-text truncate max-w-[130px]">{org.name}</h3>
                <span className={cn(
                  "text-[9px] font-bold px-2.5 py-0.5 rounded-full",
                  org.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {org.status}
                </span>
              </div>
              <p className="font-mono text-[10px] text-pastel-muted mt-1">{org.code}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/10 grid grid-cols-2 gap-2 text-[11px] text-pastel-muted">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-pastel-muted/70">Users</p>
                <p className="font-semibold text-pastel-text mt-0.5">{org.users}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-pastel-muted/70">Txns</p>
                <p className="font-semibold text-pastel-text mt-0.5">{org.txns}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersPanel({ totalUsers }: { totalUsers: number }) {
  const users = [
    { name: "Santhosh Kumar", email: "santhoshatna@yopmail.com", role: "QA SuperAdmin", lastActive: "Active now", status: "Active" },
    { name: "Akash S", email: "akash@atna.com", role: "Auditor", lastActive: "2 hrs ago", status: "Active" },
    { name: "Rohan K.", email: "rohan@yopmail.com", role: "Developer", lastActive: "1 day ago", status: "Active" },
    { name: "Sneha A.", email: "sneha@yopmail.com", role: "Operations", lastActive: "3 days ago", status: "Active" },
    { name: "Amit S.", email: "amit@yopmail.com", role: "Viewer", lastActive: "Never", status: "Pending" }
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-pastel-text">User Directory ({totalUsers})</h2>
          <p className="text-xs text-pastel-muted">Manage system users, roles, and access credentials.</p>
        </div>
        <button type="button" className="btn-premium px-4 py-2 text-xs font-semibold cursor-pointer self-start sm:self-auto">
          + Invite User
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border/15">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/15 bg-surface-muted/40 text-pastel-muted">
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">User</th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">Last Active</th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10 bg-white/10 dark:bg-black/5">
            {users.map((u) => (
              <tr key={u.email} className="table-row-premium">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                      {u.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-pastel-text">{u.name}</p>
                      <p className="text-xs text-pastel-muted">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-pastel-text">{u.role}</td>
                <td className="px-5 py-3.5 text-pastel-muted">{u.lastActive}</td>
                <td className="px-5 py-3.5">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    u.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-amber-500/10 text-amber-500"
                  )}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function metricsList(metrics: TrackerMetrics) {
  return [
    { label: "Total Users", value: metrics.totalUsers, icon: "users" },
    { label: "Transactions", value: metrics.transactions, icon: "txns" },
    { label: "Today's Txns", value: metrics.todaysTxns, icon: "today" },
    { label: "Sub-Organizations", value: metrics.subOrganizations, icon: "orgs" },
  ];
}

export function TrackerPage({ data }: { data: TrackerDashboardData }) {
  const [tab, setTab] = useState<TrackerTab>("overview");
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 450));
    setRefreshing(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6">
      <FadeIn>
        <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-active">
                Tracker
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {data.org.status}
              </span>
            </div>

            <div>
              <p className="text-xs text-pastel-muted font-medium">Hello, Operator! Welcome back to Operations Command.</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-pastel-text sm:text-[32px] mt-0.5">
                {data.org.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-pastel-card px-2.5 py-1 text-xs font-medium text-pastel-muted">
                  <svg className="size-3.5 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M8 2.5 13 5v6l-5 2.5L3 11V5l5-2.5Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {data.org.level}
                </span>
                <span className="inline-flex items-center rounded-lg border border-border bg-pastel-card px-2.5 py-1 font-mono text-xs font-semibold text-pastel-text">
                  {data.org.code}
                </span>
                <span className="text-xs text-pastel-muted">· {data.org.plan.replaceAll("_", " ")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search operations..."
                className="glass-input pl-8 pr-4 py-1.5 text-xs w-[160px] sm:w-[200px] focus:w-[240px] focus:border-accent transition-all duration-300"
              />
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-pastel-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-pastel-card border border-border text-pastel-muted hover:text-pastel-text transition cursor-pointer"
              title="Recent Notifications"
            >
              <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-1 ring-white dark:ring-black animate-pulse" />
            </button>

            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-pastel-card px-4 py-2 text-sm font-semibold text-pastel-text transition hover:bg-surface-muted disabled:opacity-60 cursor-pointer h-9"
            >
              <svg
                className={cn("size-4 text-accent", refreshing && "animate-spin")}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M13.5 8A5.5 5.5 0 1 1 8 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 1v3l2-1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </header>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.04}>
        <StaggerItem>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2 mb-1">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-pastel-text">Operations Overview</h2>
              <p className="text-xs text-pastel-muted">Your current operations summary and activity logs</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select className="glass-input text-xs px-3 py-1.5 pr-8 appearance-none cursor-pointer">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>All Time</option>
                </select>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-pastel-muted text-[10px]">▼</span>
              </div>
              <button type="button" className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-pastel-card px-3.5 py-1.5 text-xs font-semibold text-pastel-text transition hover:bg-surface-muted cursor-pointer">
                <span>Export</span>
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-3.5 py-1.5 text-xs font-semibold text-white transition hover:opacity-90 cursor-pointer">
                <span>Filter</span>
              </button>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metricsList(data.metrics).map((m, idx) => (
              <MetricCard key={m.label} label={m.label} value={m.value} icon={m.icon} isHighlighted={idx === 0} />
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="pastel-card overflow-hidden">
            <div
              role="tablist"
              aria-label="Organization sections"
              className="flex gap-1 overflow-x-auto border-b border-border px-3"
            >
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "relative shrink-0 px-4 py-3.5 text-sm font-medium transition cursor-pointer",
                    tab === item.id ? "text-accent font-semibold" : "text-pastel-muted hover:text-pastel-text",
                  )}
                >
                  {item.label}
                  {tab === item.id && (
                    <motion.span
                      layoutId="tracker-tab-pill"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="p-5 sm:p-6" role="tabpanel">
              {tab === "overview" && <OverviewPanel org={data.org} credits={data.credits} />}
              {tab === "sub-orgs" && <SubOrgsPanel />}
              {tab === "users" && <UsersPanel totalUsers={data.metrics.totalUsers} />}
              {tab === "usage" && <UsagePanel />}
              {tab === "credits" && <CreditsTab credits={data.credits} />}
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
