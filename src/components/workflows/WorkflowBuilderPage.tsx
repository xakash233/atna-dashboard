"use client";

import { useState } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";

const METRICS = [
  { id: "active", label: "Active workflows", hint: "Currently deployed", value: "12" },
  { id: "templates", label: "Templates", hint: "Ready to clone", value: "8" },
  { id: "runs", label: "Runs this week", hint: "+18% vs last week", value: "1,284" },
  { id: "success", label: "Success rate", hint: "Pipeline completion", value: "96.4%" },
] as const;

const WORKFLOWS = [
  {
    id: "wf-001",
    name: "Identity verification pipeline",
    type: "KYC",
    steps: 6,
    status: "Active",
    updated: "2 hrs ago",
  },
  {
    id: "wf-002",
    name: "Document authenticity check",
    type: "TRU. Doc",
    steps: 4,
    status: "Active",
    updated: "Yesterday",
  },
  {
    id: "wf-003",
    name: "Candidate deepfake screen",
    type: "Deepfake",
    steps: 5,
    status: "Draft",
    updated: "3 days ago",
  },
  {
    id: "wf-004",
    name: "Fraud signal escalation",
    type: "AI Fraud",
    steps: 7,
    status: "Active",
    updated: "5 days ago",
  },
] as const;

const TEMPLATES = [
  { name: "Standard KYC", description: "ID + face match + document check", steps: 5 },
  { name: "Hire screening", description: "Resume + deepfake + doc verify", steps: 6 },
  { name: "Risk escalation", description: "Fraud flags → case triage", steps: 4 },
] as const;

type ViewId = "workflows" | "templates" | "settings";

export function WorkflowBuilderPage() {
  const [activeView, setActiveView] = useState<ViewId>("workflows");
  const [hoveredView, setHoveredView] = useState<ViewId | null>(null);

  const actionButtons: { id: ViewId; label: string }[] = [
    { id: "workflows", label: "My Workflows" },
    { id: "templates", label: "Templates" },
    { id: "settings", label: "API Settings" },
  ];

  return (
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col gap-3 font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Intelli Suite
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
              Workflow Builder
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#475569]">
              Design and configure verification pipelines
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

      <Stagger className="flex flex-col gap-3" delay={0.04}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {METRICS.map((m) => (
              <article
                key={m.id}
                className="group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1E90FF]/40 hover:shadow-[0_12px_24px_rgba(30,144,255,0.16)]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-[#1E90FF] transition-transform duration-500 group-hover:scale-x-100" />
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">{m.label}</p>
                <p className="mt-2 font-sans text-[22px] font-semibold leading-none text-[#0f172a]">{m.value}</p>
                <p className="mt-2 text-[9px] font-medium uppercase tracking-wide text-[#94a3b8]">{m.hint}</p>
              </article>
            ))}
          </div>
        </StaggerItem>

        {activeView === "workflows" ? (
          <StaggerItem>
            <section className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)]">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] px-4 py-3 sm:px-5">
                <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                  Workflows <span className="text-[#475569]">· {WORKFLOWS.length}</span>
                </h2>
                <AnimatedButton
                  type="button"
                  className="rounded-full border-0 bg-[#1E90FF] px-4 py-1.5 text-[10px] font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  + New workflow
                </AnimatedButton>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                      {["ID", "Workflow Name", "Type", "Steps", "Status", "Last Updated"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#475569]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {WORKFLOWS.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-[#e2e8f0] transition-colors hover:bg-[#E8F4FF]/50"
                      >
                        <td className="px-4 py-3 font-mono text-[10px] font-medium text-[#1E90FF]">{row.id}</td>
                        <td className="px-4 py-3 text-[10px] font-semibold text-[#0f172a]">{row.name}</td>
                        <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{row.type}</td>
                        <td className="px-4 py-3 text-[10px] font-medium text-[#0f172a]">{row.steps}</td>
                        <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{row.status}</td>
                        <td className="px-4 py-3 text-[10px] font-medium text-[#475569]">{row.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </StaggerItem>
        ) : null}

        {activeView === "templates" ? (
          <StaggerItem>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {TEMPLATES.map((template) => (
                <article
                  key={template.name}
                  className="group flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] sm:p-5"
                >
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-[10px] font-medium text-[#475569]">{template.description}</p>
                  <p className="mt-4 text-[9px] font-medium uppercase tracking-wide text-[#94a3b8]">
                    {template.steps} steps
                  </p>
                  <AnimatedButton
                    type="button"
                    className="mt-3 self-start rounded-full border border-[#e2e8f0] bg-white px-4 py-1.5 text-[10px] font-semibold text-[#0f172a] transition-all duration-200 hover:border-[#1E90FF] hover:bg-[#1E90FF] hover:text-white"
                  >
                    Use template
                  </AnimatedButton>
                </article>
              ))}
            </div>
          </StaggerItem>
        ) : null}

        {activeView === "settings" ? (
          <StaggerItem>
            <section className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
                API Settings
              </p>
              <p className="mt-2 max-w-md text-[10px] font-medium text-[#475569]">
                Configure webhook endpoints, API keys, and pipeline callbacks. Integration docs and
                connection status will appear here.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <AnimatedButton
                  type="button"
                  className="rounded-full border-0 bg-[#1E90FF] px-5 py-2.5 text-[10px] font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Configure API Settings
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  className="rounded-full border border-[#e2e8f0] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#0f172a] transition-all duration-200 hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF] hover:text-[#1E90FF]"
                >
                  Read Integration Docs
                </AnimatedButton>
              </div>
              <p className="mt-5 flex items-center gap-1.5 text-[9px] font-medium text-[#94a3b8]">
                <span className="size-1.5 rounded-full bg-amber-500" />
                Standby — listening for initial payload connection
              </p>
            </section>
          </StaggerItem>
        ) : null}
      </Stagger>
    </div>
  );
}
