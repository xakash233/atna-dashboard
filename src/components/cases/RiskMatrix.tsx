"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import type { RiskSlice } from "@/lib/types";

const DARK_COLORS: Record<string, string> = {
  Critical: "#ff4081",
  Elevated: "#ff9100",
  Standard: "#00e5ff",
};

const LIGHT_COLORS: Record<string, string> = {
  Critical: "#e91e63",
  Elevated: "#f57c00",
  Standard: "#00b8d4",
};

type RiskMatrixProps = {
  data: RiskSlice[];
  totalLabel: string;
  empty?: boolean;
};

export function RiskMatrix({ data, totalLabel, empty }: RiskMatrixProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === "dark";

  const themed = useMemo(
    () =>
      data.map((slice) => ({
        ...slice,
        color: (isDark ? DARK_COLORS : LIGHT_COLORS)[slice.name] ?? slice.color,
      })),
    [data, isDark],
  );

  return (
    <section className="glass-card h-full p-[25px]">
      <div className="relative mb-4">
        <h2 className="text-base font-medium text-fg">Risk Matrix</h2>
        <p className="mt-1 text-sm text-fg-muted">Current open case distribution</p>
      </div>

      {empty || themed.length === 0 ? (
        <div className="relative flex h-[276px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-fg-muted">
          No risk distribution available.
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <div className="relative size-40">
            <div
              aria-hidden
              className="absolute inset-4 rounded-full opacity-40 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 180deg, var(--critical), var(--elevated), var(--standard), var(--critical))",
              }}
            />
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={themed}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                  stroke="none"
                  isAnimationActive
                  animationDuration={1100}
                  animationEasing="ease-out"
                >
                  {themed.map((slice) => (
                    <Cell
                      key={slice.name}
                      fill={slice.color}
                      style={{ filter: `drop-shadow(0 0 8px ${slice.color})` }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-lg font-semibold tracking-tight text-fg">{totalLabel}</p>
              <p className="text-[10px] uppercase tracking-[1px] text-fg-muted">Total</p>
            </div>
          </div>

          <ul className="mt-8 flex w-full flex-col gap-3">
            {themed.map((slice) => (
              <li
                key={slice.name}
                className="group flex items-center justify-between rounded-xl px-2 py-1.5 transition hover:bg-overlay"
              >
                <span className="flex items-center gap-2 text-sm text-fg">
                  <span
                    className="size-2 rounded-xl transition group-hover:scale-125"
                    style={{
                      backgroundColor: slice.color,
                      boxShadow: `0 0 12px ${slice.color}`,
                    }}
                  />
                  {slice.name}
                </span>
                <span className="font-mono text-sm text-fg-muted">{slice.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
