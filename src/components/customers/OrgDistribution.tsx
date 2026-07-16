"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { OrgSlice } from "@/lib/types";

const COLORS = {
  indigo: "#1E90FF",
  slate: "#64748b",
  zinc: "#71717a",
} as const;

type OrgDistributionProps = {
  total: number;
  slices: OrgSlice[];
};

export function OrgDistribution({ total, slices }: OrgDistributionProps) {
  const data = slices.map((s) => ({
    name: s.name,
    value: s.value,
    color: COLORS[s.colorKey],
  }));

  return (
    <article className="glass-card flex h-40 flex-col p-4 sm:col-span-2 xl:col-span-1">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-fg">
          Org Distribution
        </h2>
        <p className="text-xl font-medium leading-6 text-[#1E90FF] dark:text-accent">
          {total}
        </p>
      </div>

      <div className="flex flex-1 items-center gap-4">
        <div className="relative size-16 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={18}
                outerRadius={28}
                stroke="none"
                isAnimationActive
                animationDuration={900}
              >
                {data.map((slice) => (
                  <Cell key={slice.name} fill={slice.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex flex-1 flex-col gap-1">
          {data.map((slice) => (
            <li key={slice.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-fg-muted">
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                {slice.name}
              </span>
              <span className="font-semibold text-fg">{slice.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
