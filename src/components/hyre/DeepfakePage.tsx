"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useState } from "react";

import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { DeepfakeData } from "@/lib/api/fraud";
import { cn } from "@/lib/cn";

export function DeepfakePage({ data }: { data: DeepfakeData }) {
  const [activeView, setActiveView] = useState<"analyze" | "recorded" | "live">("analyze");
  const [hoveredView, setHoveredView] = useState<"analyze" | "recorded" | "live" | null>(null);

  const metrics = [
    {
      id: "videos",
      label: "Videos analyzed",
      hint: "Total deepfake scans",
      value: data.metrics.videosAnalyzed,
    },
    {
      id: "authentic",
      label: "Authentic",
      hint: "Passed as genuine",
      value: data.metrics.authentic,
    },
    {
      id: "ai-generated",
      label: "AI-generated",
      hint: "Flagged as deepfake",
      value: data.metrics.aiGenerated,
    },
  ];
  const actionButtons = [
    { id: "analyze" as const, label: "Analyze Video" },
    { id: "recorded" as const, label: "Recorded Video" },
    { id: "live" as const, label: "Live Interview" },
  ];

  return (
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col gap-3 font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Intelli Hire
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
              Deepfake Detection
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#475569]">
              Detect AI-generated and manipulated candidate videos
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {actionButtons.map((button) => {
              const showHoverActive = hoveredView === button.id;
              const suppressSelectedActive = hoveredView !== null && hoveredView !== activeView;
              const active = activeView === button.id && !suppressSelectedActive;
              const highlighted = showHoverActive || active;
              return (
                <AnimatedButton
                  key={button.id}
                  type="button"
                  onClick={() => setActiveView(button.id)}
                  onMouseEnter={() => setHoveredView(button.id)}
                  onMouseLeave={() => setHoveredView(null)}
                  className={cn(
                    "inline-flex items-center rounded-full px-5 py-2.5 text-[10px] font-semibold shadow-sm transition-all duration-200",
                    highlighted
                      ? "border-0 bg-[#1E90FF] text-white shadow-md"
                      : "border border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#1E90FF] hover:bg-[#1E90FF] hover:text-white",
                  )}
                >
                  {button.label}
                </AnimatedButton>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {activeView === "analyze" ? (
        <Stagger className="flex flex-col gap-3" delay={0.04}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {metrics.map((m) => (
              <article
                key={m.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E90FF]/40 hover:shadow-[0_12px_24px_rgba(30,144,255,0.16)]",
                )}
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[#1E90FF] transition-transform duration-500 group-hover:scale-x-100" />
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">{m.label}</p>
                <p className="mt-2 font-sans text-[22px] font-semibold leading-none text-[#0f172a]">{m.value}</p>
                <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-[#94a3b8]">{m.hint}</p>
              </article>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)]">
            <div className="border-b border-[#e2e8f0] px-4 py-3 sm:px-5">
              <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                Analyzed Videos ({data.videos.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                    {["File", "Fake Probability", "Reason", "Verdict", "Date", "Actions"].map(
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
                  {data.videos.map((row) => (
                    <tr key={row.file} className="border-b border-[#e2e8f0] transition-colors hover:bg-[#E8F4FF]/50">
                      <td className="px-4 py-3 text-[10px] font-semibold text-[#0f172a]">{row.file}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#0f172a]">{row.fakeProbability}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{row.reason}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{row.verdict}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{row.date}</td>
                      <td className="px-4 py-3 text-[10px] font-medium text-[#94a3b8]">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </StaggerItem>
        </Stagger>
      ) : (
        <FadeIn delay={0.06}>
          <section className="flex min-h-[calc(100vh-14rem)] flex-1 items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)]">
            <div className="text-center">
              <h2 className="text-[12px] font-semibold uppercase tracking-wider text-[#0f172a]">
                {activeView === "recorded" ? "Recorded Video" : "Live Interview"}
              </h2>
              <p className="mt-2 text-[10px] font-medium text-[#64748b]">
                Empty until API data is connected for this section.
              </p>
            </div>
          </section>
        </FadeIn>
      )}
    </div>
  );
}
