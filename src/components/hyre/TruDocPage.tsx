"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { TruDocData } from "@/lib/api/fraud";
import { cn } from "@/lib/cn";

export function TruDocPage({ data }: { data: TruDocData }) {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [hoveredMode, setHoveredMode] = useState<"single" | "bulk" | null>(null);
  const [query, setQuery] = useState("");

  const filtered = data.documents.filter(
    (d) =>
      !query ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.id.toLowerCase().includes(query.toLowerCase()),
  );
  const metrics = [
    {
      id: "checked",
      label: "Total checked",
      hint: data.metrics.totalChecked.delta,
      value: data.metrics.totalChecked.value,
    },
    {
      id: "pass",
      label: "Verification pass rate",
      hint: data.metrics.passRate.delta,
      value: data.metrics.passRate.value,
    },
    {
      id: "flagged",
      label: "Flagged documents",
      hint: data.metrics.flagged.delta,
      value: data.metrics.flagged.value,
    },
    {
      id: "avg",
      label: "Avg verification time",
      hint: "Current SLA",
      value: data.metrics.avgTime === "—" ? 0 : data.metrics.avgTime,
    },
  ];

  return (
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col gap-3 font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
            Intelli Hire
          </p>
          <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
            TRU. Doc
          </h1>
          <p className="mt-1 text-[10px] font-medium text-[#475569]">
            Payslips, experience letters, degrees — verified, not trusted.
          </p>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-3" delay={0.04}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((m) => (
              <article
                key={m.id}
                className="group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E90FF]/40 hover:shadow-[0_12px_24px_rgba(30,144,255,0.16)]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[#1E90FF] transition-transform duration-500 group-hover:scale-x-100" />
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">{m.label}</p>
                <p className="mt-2 font-sans text-[22px] font-semibold leading-none text-[#0f172a]">
                  {m.value}
                </p>
                <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-[#94a3b8]">{m.hint}</p>
              </article>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {(
                [
                  ["single", "Single Document check"],
                  ["bulk", "Bulk Upload"],
                ] as const
              ).map(([id, label]) => (
                <AnimatedButton
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  onMouseEnter={() => setHoveredMode(id)}
                  onMouseLeave={() => setHoveredMode(null)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-[10px] font-semibold shadow-sm transition-all duration-200",
                    (hoveredMode === id || (mode === id && !(hoveredMode && hoveredMode !== mode)))
                      ? "border-0 bg-[#1E90FF] text-white shadow-md"
                      : "border border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF] hover:text-[#1E90FF]",
                  )}
                >
                  {label}
                </AnimatedButton>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or filename…"
              className="w-full rounded-full border border-[#e2e8f0] bg-white px-4 py-2.5 text-[10px] font-medium text-[#0f172a] outline-none transition focus:border-[#1E90FF]/40 focus:ring-2 focus:ring-[#1E90FF]/20 sm:max-w-xs"
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)]">
            <div className="border-b border-[#e2e8f0] px-4 py-3 sm:px-5">
              <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                Document Records{" "}
                <span className="text-[#475569]">{filtered.length} shown</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                    {["ID", "Document Name", "ATNA Score", "Verdict", "Upload Date", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#475569]"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((doc) => (
                    <tr key={doc.id} className="border-b border-[#e2e8f0] transition-colors hover:bg-[#E8F4FF]/50">
                      <td className="px-4 py-3 font-mono text-[10px] font-medium text-[#1E90FF]">{doc.id}</td>
                      <td className="px-4 py-3 text-[10px] font-semibold text-[#0f172a]">{doc.name}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#0f172a]">{doc.atnaScore}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{doc.verdict}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{doc.uploadDate}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#0f172a]">{doc.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
