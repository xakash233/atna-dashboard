"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VolumePoint } from "@/lib/types";
import { ChartTooltip, chartTooltipShell } from "@/components/ui/ChartTooltip";

type CaseVolumeChartProps = {
  data: VolumePoint[];
  empty?: boolean;
};

export function CaseVolumeChart({ data, empty }: CaseVolumeChartProps) {
  return (
    <section className="flex h-full min-h-[360px] flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] sm:p-5">
      <div className="relative mb-3 shrink-0">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">Case volume dynamics</h2>
        <p className="mt-0.5 text-[8px] font-medium text-[#475569]">
          7-Day Rolling Average vs Real-time Intake
        </p>
      </div>

      <div className="relative min-h-[252px] w-full flex-1">
        {empty || data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#e2e8f0] text-sm text-[#64748b]">
            No volume data yet. Connect the cases API to populate this chart.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 6, right: 4, left: -24, bottom: 0 }} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 9, fill: "#475569" }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 0, right: 0 }}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#475569" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                domain={[0, 2400]}
                width={28}
              />
              <Tooltip
                {...chartTooltipShell}
                content={<ChartTooltip labelFormatter={(day) => `${day} Snapshot`} />}
              />
              <Bar dataKey="volume" name="Volume" fill="#1E90FF" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
