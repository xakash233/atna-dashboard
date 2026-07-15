"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { VolumePoint } from "@/lib/types";

type CaseVolumeChartProps = {
  data: VolumePoint[];
  empty?: boolean;
};

export function CaseVolumeChart({ data, empty }: CaseVolumeChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";
  const tick = isDark ? "#c9c4d7" : "#47464f";
  const tooltipBg = isDark ? "#171b26" : "#ffffff";
  const tooltipBorder = isDark ? "rgba(71,69,85,0.4)" : "rgba(200,197,208,0.6)";
  const tooltipColor = isDark ? "#dfe2f1" : "#1b1b1f";

  return (
    <section className="glass-card min-h-[360px] p-[25px]">
      <div className="relative mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-medium text-fg">Case Volume Dynamics</h2>
          <p className="mt-1 text-sm text-fg-muted">
            7-Day Rolling Average vs Real-time Intake
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface-muted/60 px-3 py-1 text-xs text-fg-muted backdrop-blur">
          <span className="live-indicator" />
          Live Stream
        </div>
      </div>

      <div className="relative h-[252px] w-full">
        {empty || data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border text-sm text-fg-muted">
            No volume data yet. Connect the cases API to populate this chart.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#c8bfff" : "#614ce4"} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={isDark ? "#00e5ff" : "#00b8d4"} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="volumeStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={isDark ? "#7bd0ff" : "#5b8def"} />
                  <stop offset="50%" stopColor={isDark ? "#c8bfff" : "#614ce4"} />
                  <stop offset="100%" stopColor={isDark ? "#ffafd3" : "#e91e63"} />
                </linearGradient>
                <filter id="glowStroke" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: tick, fontSize: 10, fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: tick, fontSize: 10, fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                domain={[0, 2400]}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  background: tooltipBg,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: 12,
                  color: tooltipColor,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="url(#volumeStroke)"
                strokeWidth={2.8}
                fill="url(#volumeFill)"
                filter="url(#glowStroke)"
                dot={{ r: 3.5, fill: isDark ? "#ffafd3" : "#e91e63", strokeWidth: 0 }}
                activeDot={{
                  r: 6,
                  stroke: isDark ? "#c8bfff" : "#614ce4",
                  strokeWidth: 2,
                  fill: isDark ? "#0f131d" : "#fff",
                }}
                isAnimationActive
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
