"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/cn";
import { ChartTooltip, chartTooltipShell } from "@/components/ui/ChartTooltip";

const DATA = [
  { m: "Jan", sales: 28, earnings: 42 },
  { m: "Feb", sales: 35, earnings: 38 },
  { m: "Mar", sales: 30, earnings: 48 },
  { m: "Apr", sales: 48, earnings: 55 },
  { m: "May", sales: 42, earnings: 50 },
  { m: "Jun", sales: 58, earnings: 62 },
  { m: "Jul", sales: 52, earnings: 70 },
  { m: "Aug", sales: 65, earnings: 68 },
  { m: "Sep", sales: 55, earnings: 78 },
  { m: "Oct", sales: 72, earnings: 85 },
];

const TABS = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"] as const;

const FOOTER = [
  { label: "Wallet", color: "bg-[#f0b6c8] text-[#c97a92]" },
  { label: "Referral", color: "bg-[#d4c4f0] text-[#8b6fc2]" },
  { label: "Sales", color: "bg-[#c5b6e8] text-[#7a65b8]" },
  { label: "Earnings", color: "bg-[#9fd9c8] text-[#4f9a86]" },
] as const;

export function PastelOverviewChart() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("MONTHLY");

  return (
    <section className="pastel-card flex h-full flex-col p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-base font-semibold text-pastel-text">
            Dashboard - Overview of latest Month
          </h2>
          <div className="mt-3 flex flex-wrap gap-1 rounded-full bg-[#f3eef9] p-1 dark:bg-white/5">
            {TABS.map((t) => (
              <AnimatedButton
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide transition",
                  tab === t
                    ? "bg-[#9fd9c8] text-[#2f6f60] shadow-sm"
                    : "text-pastel-muted hover:text-pastel-text",
                )}
              >
                {t}
              </AnimatedButton>
            ))}
          </div>
        </div>
        <AnimatedButton
          type="button"
          className="shrink-0 rounded-full bg-[#d4c4f0] px-4 py-2 text-xs font-semibold text-[#6b4fa8] shadow-sm transition hover:brightness-105"
        >
          Last Month Summary
        </AnimatedButton>
      </div>

      <div className="mt-5 flex flex-wrap gap-8">
        <div>
          <p className="text-2xl font-bold tracking-tight text-pastel-text">$6468.96</p>
          <p className="text-sm text-pastel-muted">Current Month Earnings</p>
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight text-pastel-text">82</p>
          <p className="text-sm text-pastel-muted">Current Month Sales</p>
        </div>
      </div>

      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="pastelSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0b6c8" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#f0b6c8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pastelEarn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5c4a8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f5c4a8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(180,168,204,0.25)" vertical={false} />
            <XAxis dataKey="m" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip
              {...chartTooltipShell}
              content={<ChartTooltip labelFormatter={(month) => `${month} Overview`} />}
            />
            <Area
              type="monotone"
              dataKey="earnings"
              name="Earnings"
              stroke="#f5c4a8"
              strokeWidth={2.4}
              fill="url(#pastelEarn)"
              isAnimationActive
              animationDuration={1100}
            />
            <Area
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke="#f0b6c8"
              strokeWidth={2.4}
              fill="url(#pastelSales)"
              isAnimationActive
              animationDuration={1100}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-[rgba(180,168,204,0.25)] pt-4">
        {FOOTER.map((f) => (
          <div key={f.label} className="flex items-center gap-2 text-xs font-medium text-pastel-muted">
            <span className={cn("grid size-8 place-items-center rounded-full", f.color)}>
              <span className="size-2 rounded-full bg-current opacity-70" />
            </span>
            {f.label}
          </div>
        ))}
      </div>
    </section>
  );
}
