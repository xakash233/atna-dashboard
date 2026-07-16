"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { GrowthPoint } from "@/lib/types";

type GrowthChartProps = {
  data: GrowthPoint[];
};

export function GrowthChart({ data }: GrowthChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";

  const indigo = isDark ? "#7ec8ff" : "#1E90FF";
  const slate = isDark ? "#94a3b8" : "#64748b";
  const tick = isDark ? "#c9c4d7" : "#52525b";
  const grid = isDark ? "rgba(71,69,85,0.35)" : "rgba(212,212,216,0.55)";
  const tooltipBg = isDark ? "#171b26" : "#fff";
  const tooltipBorder = isDark ? "rgba(71,69,85,0.45)" : "rgba(212,212,216,0.9)";
  const tooltipColor = isDark ? "#dfe2f1" : "#18181b";

  return (
    <section className="glass-card flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-medium leading-6 text-fg">
          User Growth &amp; Engagement
        </h2>
        <label className="relative inline-flex items-center">
          <span className="sr-only">Time range</span>
          <select
            defaultValue="30"
            className="appearance-none rounded-md border border-neutral-300 bg-slate-50/80 py-2 pl-4 pr-10 text-sm text-fg outline-none transition focus:border-[#1E90FF]/50 focus:ring-2 focus:ring-[#1E90FF]/25 dark:border-border dark:bg-surface-elevated"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3 size-4 text-fg-muted"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </label>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={indigo} stopOpacity={0.28} />
                <stop offset="100%" stopColor={indigo} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="engageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={slate} stopOpacity={0.18} />
                <stop offset="100%" stopColor={slate} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="day" hide />
            <YAxis hide domain={["dataMin - 40", "dataMax + 40"]} />
            <Tooltip
              contentStyle={{
                background: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 12,
                color: tooltipColor,
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              }}
            />
            <Area
              type="monotone"
              dataKey="users"
              name="Users"
              stroke={indigo}
              strokeWidth={2.5}
              fill="url(#usersFill)"
              isAnimationActive
              animationDuration={1200}
            />
            <Area
              type="monotone"
              dataKey="engagement"
              name="Engagement"
              stroke={slate}
              strokeWidth={1.8}
              fill="url(#engageFill)"
              isAnimationActive
              animationDuration={1200}
              animationBegin={120}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
