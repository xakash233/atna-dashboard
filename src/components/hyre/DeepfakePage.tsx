"use client";

import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { DeepfakeData } from "@/lib/api/fraud";
import { cn } from "@/lib/cn";

export function DeepfakePage({ data }: { data: DeepfakeData }) {
  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-pastel-muted">
              Intelli Hire
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
              Deepfake Detection
            </h1>
            <p className="mt-1 text-sm text-pastel-muted">
              Detect AI-generated and manipulated candidate videos
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl bg-pastel-lavender-deep px-4 py-2.5 text-sm font-semibold text-white"
            >
              Analyze Video
            </button>
            <button
              type="button"
              className="rounded-xl border border-[rgba(180,168,204,0.45)] bg-pastel-card px-4 py-2.5 text-sm font-semibold text-pastel-text"
            >
              Recorded Video
            </button>
            <button
              type="button"
              className="rounded-xl border border-[rgba(180,168,204,0.45)] bg-pastel-card px-4 py-2.5 text-sm font-semibold text-pastel-text"
            >
              Live Interview
            </button>
          </div>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.04}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                label: "Videos Analyzed",
                sub: "Total deepfake scans",
                value: data.metrics.videosAnalyzed,
                hero: true,
              },
              {
                label: "Authentic",
                sub: "Passed as genuine",
                value: data.metrics.authentic,
                hero: false,
              },
              {
                label: "AI-Generated",
                sub: "Flagged as deepfake",
                value: data.metrics.aiGenerated,
                hero: false,
              },
            ].map((m) => (
              <div
                key={m.label}
                className={cn(
                  "flex min-h-[120px] flex-col justify-between p-5 sm:p-6",
                  m.hero ? "pastel-metric-hero" : "pastel-card",
                )}
              >
                <div>
                  <p className={cn("text-sm font-medium", m.hero ? "text-white/85" : "text-pastel-muted")}>
                    {m.label}
                  </p>
                  <p className={cn("mt-1 text-xs", m.hero ? "text-white/70" : "text-pastel-muted")}>{m.sub}</p>
                </div>
                <p
                  className={cn(
                    "text-[28px] font-bold tracking-tight sm:text-[32px]",
                    m.hero ? "text-white" : "text-pastel-text",
                  )}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <section className="pastel-card overflow-hidden">
            <div className="border-b border-[rgba(180,168,204,0.25)] px-5 py-4">
              <h2 className="text-base font-semibold text-pastel-text">
                Analyzed Videos ({data.videos.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-[rgba(180,168,204,0.2)] bg-[rgba(180,168,204,0.08)]">
                    {["File", "Fake Probability", "Reason", "Verdict", "Date", "Actions"].map(
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
                  {data.videos.map((row) => (
                    <tr key={row.file} className="border-b border-[rgba(180,168,204,0.15)]">
                      <td className="px-4 py-3 text-sm font-medium text-pastel-text">{row.file}</td>
                      <td className="px-4 py-3 text-sm text-pastel-text">{row.fakeProbability}</td>
                      <td className="px-4 py-3 text-sm text-pastel-muted">{row.reason}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-lg bg-pastel-mint/40 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-pastel-mint">
                          {row.verdict}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-pastel-muted">{row.date}</td>
                      <td className="px-4 py-3 text-sm text-pastel-muted">—</td>
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
