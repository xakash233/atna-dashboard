"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const SLICES = [
  { name: "Sale", value: 48, color: "#c5b6e8" },
  { name: "Distribute", value: 22, color: "#f8e8c8" },
  { name: "Return", value: 30, color: "#f0b6c8" },
];

export function PastelAnalytics() {
  return (
    <section className="pastel-card flex h-full flex-col p-6">
      <h2 className="text-base font-semibold text-pastel-text">Analytics</h2>

      <div className="relative mx-auto mt-6 size-48">
        <div
          aria-hidden
          className="absolute inset-6 rounded-full opacity-50 blur-2xl"
          style={{
            background:
              "conic-gradient(from 200deg, #c5b6e8, #f8e8c8, #f0b6c8, #c5b6e8)",
          }}
        />
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={SLICES}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={3}
              stroke="none"
              isAnimationActive
              animationDuration={1000}
            >
              {SLICES.map((s) => (
                <Cell key={s.name} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-pastel-text">80%</p>
          <p className="text-xs font-medium text-pastel-muted">Transactions</p>
        </div>
      </div>

      <ul className="mt-auto flex flex-wrap justify-center gap-4 pt-4">
        {SLICES.map((s) => (
          <li key={s.name} className="flex items-center gap-2 text-xs text-pastel-muted">
            <span className="size-2.5 rounded-full" style={{ background: s.color }} />
            {s.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
