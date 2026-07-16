"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { ResumeAgentData, ResumeAgentTab } from "@/lib/api/hyre";
import { cn } from "@/lib/cn";

const TABS: { id: ResumeAgentTab; label: string }[] = [
  { id: "open-jobs", label: "Open Jobs" },
  { id: "jobs", label: "Jobs" },
  { id: "candidates", label: "Candidates" },
  { id: "shortlisting", label: "Shortlisting Agent" },
  { id: "pipeline", label: "Hiring Pipeline" },
];

export function ResumeAgentPage({ data }: { data: ResumeAgentData }) {
  const [tab, setTab] = useState<ResumeAgentTab>("open-jobs");
  const [expanded, setExpanded] = useState(false);
  const job = data.openJob;
  const preview = job.description.slice(0, 280);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-pastel-muted">
              Intelli Hire
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
              Resume Agent
            </h1>
            <p className="mt-1 max-w-xl text-sm text-pastel-muted">
              Intelli Hire · create jobs, upload résumés in bulk, and shortlist with AI
            </p>
          </div>
          <AnimatedButton
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-pastel-lavender-deep px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Create Job
          </AnimatedButton>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.04}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Jobs", value: data.metrics.jobs, hero: true },
              { label: "Candidates", value: data.metrics.candidates, hero: false },
              { label: "Shortlisted", value: data.metrics.shortlisted, hero: false },
            ].map((m) => (
              <div
                key={m.label}
                className={cn(
                  "flex min-h-[120px] flex-col justify-between p-5 sm:p-6",
                  m.hero ? "pastel-metric-hero" : "pastel-card",
                )}
              >
                <p className={cn("text-sm font-medium", m.hero ? "text-white/85" : "text-pastel-muted")}>
                  {m.label}
                </p>
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
          <div className="flex flex-wrap gap-2">
            {TABS.map((item) => (
              <AnimatedButton
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-medium transition",
                  tab === item.id
                    ? "bg-[#e8eaed] text-[#1e293b] dark:bg-white/10 dark:text-pastel-text"
                    : "bg-pastel-card text-pastel-muted hover:text-pastel-text",
                )}
              >
                {item.label}
              </AnimatedButton>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          {tab === "open-jobs" ? (
            <article className="pastel-card overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[rgba(180,168,204,0.25)] px-6 py-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-pastel-text">{job.title}</h2>
                    <span className="rounded-full bg-pastel-mint/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-pastel-mint">
                      {job.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-pastel-muted">
                    {job.jobId} · {job.owner} · {job.createdDate}
                  </p>
                </div>
                <p className="text-sm text-pastel-muted">
                  <span className="font-semibold text-pastel-text">{job.resumes}</span> résumés ·{" "}
                  <span className="font-semibold text-pastel-text">{job.selected}</span> selected
                </p>
              </div>
              <div className="px-6 py-5">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-pastel-text/90">
                  {expanded ? job.description : `${preview}…`}
                </p>
                <AnimatedButton
                  type="button"
                  onClick={() => setExpanded((e) => !e)}
                  className="mt-3 text-sm font-semibold text-pastel-lavender-deep hover:underline dark:text-pastel-lavender"
                >
                  {expanded ? "Show less" : "Show full description"}
                </AnimatedButton>
              </div>
            </article>
          ) : (
            <section className="pastel-card p-10 text-center">
              <h2 className="text-base font-semibold text-pastel-text">
                {TABS.find((t) => t.id === tab)?.label}
              </h2>
              <p className="mt-2 text-sm text-pastel-muted">
                Empty until API data is connected for this tab.
              </p>
            </section>
          )}
        </StaggerItem>
      </Stagger>
    </div>
  );
}
