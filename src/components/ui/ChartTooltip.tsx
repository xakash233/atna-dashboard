"use client";

import type { TooltipProps } from "recharts";

type ChartTooltipProps = TooltipProps<number | string, string> & {
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number | string, name: string) => string;
  valueColors?: Record<string, string>;
  hideLabel?: boolean;
};

const SERIES_VALUE_COLORS: Record<string, string> = {
  Flags: "#ef4444",
  Flagged: "#ef4444",
  Clean: "#00d8a6",
  "Safe signals": "#00d8a6",
  "Risk flags": "#f43f5e",
  Critical: "#ef4444",
  Elevated: "#f59e0b",
  Standard: "#00d8a6",
};

function resolveValueColor(name: string, valueColors?: Record<string, string>) {
  return valueColors?.[name] ?? SERIES_VALUE_COLORS[name] ?? "#ffffff";
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  valueColors,
  hideLabel,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const rawLabel = label != null ? String(label) : "";
  const header = hideLabel
    ? ""
    : labelFormatter
      ? labelFormatter(rawLabel)
      : rawLabel.toUpperCase();

  return (
    <div className="pointer-events-none rounded-xl border border-slate-700/50 bg-[#0f172a]/95 p-3 text-[9px] font-semibold shadow-2xl">
      {header ? (
        <p className="text-[8px] font-semibold uppercase tracking-wider text-[#1E90FF]">{header}</p>
      ) : null}
      <div className={header ? "mt-1 space-y-0.5" : "space-y-0.5"}>
        {payload.map((entry, index) => {
          const name = String(entry.name ?? entry.dataKey ?? "Value");
          const raw = entry.value ?? 0;
          const value = valueFormatter
            ? valueFormatter(typeof raw === "number" || typeof raw === "string" ? raw : 0, name)
            : String(raw);
          const color = resolveValueColor(name, valueColors);

          return (
            <p key={`${name}-${index}`} className="font-medium text-slate-300">
              {name}:{" "}
              <span className="font-semibold" style={{ color }}>
                {value}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

export const chartTooltipShell = {
  cursor: { fill: "rgba(226, 232, 240, 0.35)" },
  wrapperStyle: { outline: "none", zIndex: 50 },
  contentStyle: {
    background: "transparent",
    border: "none",
    padding: 0,
    boxShadow: "none",
  },
} as const;
