"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { ResumeAgentData, ResumeAgentTab } from "@/lib/api/hyre";
import { cn } from "@/lib/cn";
import { cardShell, glassHover, glassHoverSoft } from "@/lib/ui";

const TABS: { id: ResumeAgentTab; label: string }[] = [
  { id: "open-jobs", label: "Open Jobs" },
  { id: "jobs", label: "Jobs" },
  { id: "candidates", label: "Candidates" },
  { id: "shortlisting", label: "Shortlisting Agent" },
  { id: "pipeline", label: "Hiring Pipeline" },
];

const indigoHover = glassHover;
const indigoHoverShadowSoft = glassHoverSoft;
const indigoBar = "bg-[#1E90FF]";
const indigoLabelHover = "group-hover:text-[#1E90FF]";
const indigoActiveBorder = "border-[#1E90FF]/40 bg-white dark:bg-[var(--pastel-card)]";

function SummaryCards({ metrics }: { metrics: ResumeAgentData["metrics"] }) {
  const items = [
    { id: "jobs", label: "Jobs", value: String(metrics.jobs), hint: "Active postings" },
    { id: "candidates", label: "Candidates", value: String(metrics.candidates), hint: "Résumés received" },
    { id: "shortlisted", label: "Shortlisted", value: String(metrics.shortlisted), hint: "AI-selected" },
  ];

  return (
    <Stagger className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.id}>
          <article
            className={cn(
              cardShell,
              "group relative h-full w-full overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1",
              indigoHoverShadowSoft,
            )}
          >
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                indigoBar,
              )}
            />
            <p className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">{item.label}</p>
            <p className="mt-2 font-sans text-[22px] font-semibold leading-none text-[#0f172a] transition-transform duration-300 group-hover:scale-105">
              {item.value}
            </p>
            <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-[#94a3b8]">{item.hint}</p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function OpenJobsPanel({ job }: { job: ResumeAgentData["openJob"] }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const preview = job.description.slice(0, 280);

  const metaFields = [
    { key: "jobId", label: "Job ID", value: job.jobId },
    { key: "owner", label: "Owner", value: job.owner },
    { key: "created", label: "Created", value: job.createdDate },
    { key: "resumes", label: "Résumés", value: String(job.resumes) },
    { key: "selected", label: "Selected", value: String(job.selected) },
  ];

  return (
    <section className={cn(cardShell, "flex min-h-0 flex-1 flex-col overflow-hidden")}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e2e8f0] px-4 py-4 sm:px-5 sm:py-5">
        <div>
          <h2 className="text-[12px] font-semibold text-[#0f172a]">{job.title}</h2>
          <p className="mt-1 text-[9px] font-medium text-[#64748b]">
            {job.jobId} · {job.owner} · {job.createdDate}
          </p>
        </div>
        <p className="text-[10px] font-medium text-[#64748b]">
          <span className="font-semibold text-[#0f172a]">{job.resumes}</span> résumés ·{" "}
          <span className="font-semibold text-[#0f172a]">{job.selected}</span> selected
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {metaFields.map((field) => (
            <div
              key={field.key}
              onMouseEnter={() => setHovered(field.key)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "group cursor-default rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5",
                indigoHover,
                hovered === field.key && indigoActiveBorder,
              )}
            >
              <p className={cn("text-[9px] font-semibold uppercase tracking-wide text-[#94a3b8] transition-colors", indigoLabelHover)}>
                {field.label}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold text-[#0f172a]">{field.value}</p>
            </div>
          ))}
        </div>

        <div className="min-h-0 flex-1 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 transition-all duration-300 hover:border-[#1E90FF]/30">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#94a3b8]">Job description</p>
          <p className="mt-3 whitespace-pre-wrap text-[11px] font-medium leading-relaxed text-[#475569]">
            {expanded ? job.description : `${preview}…`}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-3 text-[10px] font-semibold text-[#1E90FF] transition-colors hover:underline"
          >
            {expanded ? "Show less" : "Show full description"}
          </button>
        </div>
      </div>
    </section>
  );
}

function EmptyTabPanel({ label }: { label: string }) {
  return (
    <section className={cn(cardShell, "flex min-h-[200px] flex-1 flex-col items-center justify-center p-10 text-center")}>
      <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">{label}</h2>
      <p className="mt-2 text-[10px] font-medium text-[#64748b]">
        Empty until API data is connected for this tab.
      </p>
    </section>
  );
}

export function ResumeAgentPage({ data }: { data: ResumeAgentData }) {
  const [tab, setTab] = useState<ResumeAgentTab>("open-jobs");
  const [hoveredTab, setHoveredTab] = useState<ResumeAgentTab | null>(null);

  return (
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col gap-3 font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">Intelli Hire</p>
            <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
              Resume Agent
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#64748b]">
              Create jobs, upload résumés in bulk, and shortlist with AI
            </p>
          </div>
          <button
            type="button"
            className="inline-flex self-start items-center overflow-hidden rounded-full border-0 bg-[#1E90FF] px-5 py-2.5 text-[10px] font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-95 sm:self-center"
          >
            Create Job
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.04}>
        <SummaryCards metrics={data.metrics} />
      </FadeIn>

      <FadeIn delay={0.08} className="flex min-h-0 flex-1 flex-col gap-3">
        <div
          role="tablist"
          aria-label="Resume agent sections"
          className="grid w-full grid-cols-2 gap-1 rounded-xl border border-[#e2e8f0] bg-white/60 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md sm:grid-cols-3 lg:grid-cols-5"
        >
          {TABS.map((item) => {
            const showHoverActive = hoveredTab === item.id;
            const suppressSelectedActive = hoveredTab !== null && hoveredTab !== tab;
            const active = tab === item.id && !suppressSelectedActive;
            const highlighted = showHoverActive || active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative z-10 w-full rounded-lg px-3 py-2.5 text-center text-[11px] font-semibold shadow-sm transition-all duration-200",
                  highlighted
                    ? "border-0 bg-[#1E90FF] text-white shadow-md"
                    : "border border-transparent bg-transparent text-[#475569] hover:border-[#1E90FF]/30 hover:bg-[#E8F4FF] hover:text-[#1E90FF] dark:hover:border-[var(--hover-glass-border)] dark:hover:bg-[var(--hover-glass)] dark:hover:text-[#7ec8ff]",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            {tab === "open-jobs" && <OpenJobsPanel job={data.openJob} />}
            {tab === "jobs" && <EmptyTabPanel label="Jobs" />}
            {tab === "candidates" && <EmptyTabPanel label="Candidates" />}
            {tab === "shortlisting" && <EmptyTabPanel label="Shortlisting Agent" />}
            {tab === "pipeline" && <EmptyTabPanel label="Hiring Pipeline" />}
          </motion.div>
        </AnimatePresence>
      </FadeIn>
    </div>
  );
}
