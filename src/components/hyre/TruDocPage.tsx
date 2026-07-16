"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { TruDocData } from "@/lib/api/fraud";
import { cn } from "@/lib/cn";

export function TruDocPage({ data }: { data: TruDocData }) {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [query, setQuery] = useState("");

  const filtered = data.documents.filter(
    (d) =>
      !query ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.id.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <FadeIn>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-pastel-muted">
            Intelli Hire
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
            TRU. Doc
          </h1>
          <p className="mt-1 text-sm text-pastel-muted">
            Payslips, experience letters, degrees — verified, not trusted.
          </p>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.04}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="pastel-metric-hero flex min-h-[120px] flex-col justify-between p-5 sm:p-6">
              <p className="text-sm font-medium text-white/85">Total Checked</p>
              <div>
                <p className="text-[28px] font-bold tracking-tight text-white sm:text-[32px]">
                  {data.metrics.totalChecked.value}
                </p>
                <p className="mt-1 text-xs text-white/70">{data.metrics.totalChecked.delta}</p>
              </div>
            </div>
            <div className="pastel-card flex min-h-[120px] flex-col justify-between p-5 sm:p-6">
              <p className="text-sm font-medium text-pastel-muted">Verification Pass Rate</p>
              <div>
                <p className="text-[28px] font-bold tracking-tight text-pastel-text sm:text-[32px]">
                  {data.metrics.passRate.value}
                </p>
                <p className="mt-1 text-xs text-pastel-muted">{data.metrics.passRate.delta}</p>
              </div>
            </div>
            <div className="pastel-card flex min-h-[120px] flex-col justify-between p-5 sm:p-6">
              <p className="text-sm font-medium text-pastel-muted">Flagged Documents</p>
              <div>
                <p className="text-[28px] font-bold tracking-tight text-pastel-text sm:text-[32px]">
                  {data.metrics.flagged.value}
                </p>
                <p className="mt-1 text-xs text-pastel-muted">{data.metrics.flagged.delta}</p>
              </div>
            </div>
            <div className="pastel-card flex min-h-[120px] flex-col justify-between p-5 sm:p-6">
              <p className="text-sm font-medium text-pastel-muted">Avg Verification Time</p>
              <p className="text-[28px] font-bold tracking-tight text-pastel-text sm:text-[32px]">
                {data.metrics.avgTime}
              </p>
            </div>
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
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-medium transition",
                    mode === id
                      ? "bg-[#e8eaed] text-[#1e293b] dark:bg-white/10 dark:text-pastel-text"
                      : "bg-pastel-card text-pastel-muted",
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
              className="w-full rounded-xl border border-[rgba(180,168,204,0.4)] bg-pastel-card px-4 py-2.5 text-sm text-pastel-text outline-none focus:ring-2 focus:ring-pastel-lavender/50 sm:max-w-xs"
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <section className="pastel-card overflow-hidden">
            <div className="border-b border-[rgba(180,168,204,0.25)] px-5 py-4">
              <h2 className="text-base font-semibold text-pastel-text">
                Document Records{" "}
                <span className="text-pastel-muted">{filtered.length} shown</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-[rgba(180,168,204,0.2)] bg-[rgba(180,168,204,0.08)]">
                    {["ID", "Document Name", "ATNA Score", "Verdict", "Upload Date", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-pastel-muted"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((doc) => (
                    <tr key={doc.id} className="border-b border-[rgba(180,168,204,0.15)]">
                      <td className="px-4 py-3 font-mono text-xs text-pastel-muted">{doc.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-pastel-text">{doc.name}</td>
                      <td className="px-4 py-3 text-sm text-pastel-text">{doc.atnaScore}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-lg bg-pastel-peach/40 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:text-pastel-peach">
                          {doc.verdict}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-pastel-muted">{doc.uploadDate}</td>
                      <td className="px-4 py-3 text-sm text-pastel-text">{doc.status}</td>
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
