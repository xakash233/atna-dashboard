"use client";

import { useEffect, useState } from "react";
import type { RiskSlice } from "@/lib/types";

const RISK_META: Record<
  string,
  { color: string; border: string; dot: string }
> = {
  Critical: {
    color: "#ef4444",
    border: "border-[#ef4444] bg-[#fee2e2]",
    dot: "bg-[#ef4444]",
  },
  Elevated: {
    color: "#d97706",
    border: "border-[#d97706] bg-[#fffbeb]",
    dot: "bg-[#d97706]",
  },
  Standard: {
    color: "#00d8a6",
    border: "border-[#00d8a6] bg-[#f0fdf4]",
    dot: "bg-[#00d8a6]",
  },
};

type RiskMatrixProps = {
  data: RiskSlice[];
  totalLabel: string;
  empty?: boolean;
};

export function RiskMatrix({ data, totalLabel, empty }: RiskMatrixProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  const slices = data.map((slice, index, arr) => {
    const pct = slice.value / 100;
    const prevPct = arr.slice(0, index).reduce((sum, s) => sum + s.value / 100, 0);
    const meta = RISK_META[slice.name] ?? {
      color: slice.color,
      border: "border-[#e2e8f0] bg-[#f8fafc]",
      dot: "bg-[#64748b]",
    };
    return {
      key: slice.name,
      name: slice.name,
      value: slice.value,
      pct,
      color: meta.color,
      border: meta.border,
      dot: meta.dot,
      startDeg: 360 * prevPct,
      endDeg: 360 * (prevPct + pct),
    };
  });

  const radius = 50;
  const circ = 2 * Math.PI * radius;
  let dashOffset = 0;
  const ringSlices = slices.map((slice) => {
    const length = circ * slice.pct;
    const offset = dashOffset;
    dashOffset += length;
    return { ...slice, length, offset };
  });

  const active = hoveredSlice ? slices.find((s) => s.key === hoveredSlice) : null;

  const resolveSliceFromPoint = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = e.clientX - cx;
    const y = e.clientY - cy;
    const dist = Math.hypot(x, y);
    const outer = rect.width / 2;
    const inner = outer * 0.58;
    if (dist < inner || dist > outer * 0.98) {
      setHoveredSlice(null);
      return;
    }
    let deg = (Math.atan2(y, x) * 180) / Math.PI;
    deg = (deg + 90 + 360) % 360;
    const hit = slices.find((s) => deg >= s.startDeg && deg < s.endDeg);
    setHoveredSlice(hit?.key ?? null);
  };

  return (
    <section className="flex h-full min-h-[360px] flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] sm:p-5">
      <div className="shrink-0">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">Risk matrix</h2>
        <p className="mt-0.5 text-[8px] font-medium text-[#475569]">Current open case distribution</p>
      </div>

      {empty || slices.length === 0 ? (
        <div className="mt-3 flex flex-1 items-center justify-center rounded-xl border border-dashed border-[#e2e8f0] text-sm text-[#64748b]">
          No risk distribution available.
        </div>
      ) : (
        <div
          className="mt-3 flex min-h-0 flex-1 items-center justify-center gap-2"
          onMouseLeave={() => setHoveredSlice(null)}
        >
          <div className="relative size-44 shrink-0 sm:size-48">
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
              {ringSlices.map((slice) => {
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
                className="font-sans text-xl font-semibold leading-none tracking-normal transition-colors duration-300"
                style={{ color: active?.color ?? "#0f172a" }}
              >
                {active ? `${active.value}%` : totalLabel}
              </span>
              <span className="mt-1 text-[7px] font-medium uppercase tracking-wide text-[#475569]">
                {active ? active.name : "Total"}
              </span>
            </div>
          </div>

          <div className="flex h-44 w-[148px] shrink-0 flex-col justify-evenly gap-1.5 sm:h-48 sm:w-[156px]">
            {slices.map((item) => (
              <div
                key={item.key}
                onMouseEnter={() => setHoveredSlice(item.key)}
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-2 py-2 transition-all duration-300 ${
                  hoveredSlice === item.key ? item.border : "border-transparent"
                }`}
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className={`size-2.5 shrink-0 rounded-full ${item.dot}`} />
                  <span className="truncate text-[10px] font-semibold text-[#0f172a]">
                    {item.name} ({item.value}%)
                  </span>
                </div>
                <span className="shrink-0 pl-1.5 text-[10px] font-medium text-[#475569]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
