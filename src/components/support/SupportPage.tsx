"use client";

import AnimatedButton from "@/components/ui/AnimatedButton";
import { useState, type FormEvent } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";
import { cardShell as baseCardShell } from "@/lib/ui";

type SupportTab = "center" | "nps" | "help" | "tickets";

const TABS: { id: SupportTab; label: string }[] = [
  { id: "center", label: "Support center" },
  { id: "nps", label: "Net promoter score" },
  { id: "help", label: "Help center" },
  { id: "tickets", label: "Raised tickets" },
];

const PRIORITIES = ["Low", "Medium", "High", "Critical"] as const;

const cardShell = cn(
  baseCardShell,
  "hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)]",
);

const fieldClass =
  "w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-[10px] font-medium text-[#0f172a] outline-none placeholder:text-[#94a3b8] transition focus:border-[#1E90FF]/40 focus:ring-2 focus:ring-[#1E90FF]/20 dark:border-[var(--border)] dark:bg-[var(--pastel-card)] dark:text-pastel-text";

function EmptyPanel({ title, hint }: { title: string; hint: string }) {
  return (
    <section className={cn(cardShell, "flex min-h-[calc(100vh-16rem)] flex-1 flex-col items-center justify-center p-10 text-center")}>
      <h2 className="text-[12px] font-semibold uppercase tracking-wider text-[#0f172a]">{title}</h2>
      <p className="mt-2 max-w-md text-[10px] font-medium text-[#64748b]">{hint}</p>
    </section>
  );
}

function RaisedTicketsPanel() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>("Medium");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 xl:grid-cols-12">
      <section className={cn(cardShell, "flex flex-col p-4 sm:p-5 xl:col-span-7")}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
            Create new ticket
          </h2>
          <span className="text-[9px] font-medium uppercase tracking-wide text-[#94a3b8]">
            Create ticket
          </span>
        </div>

        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-3">
          <label className="block space-y-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">
              Subject
            </span>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject here"
              required
              className={fieldClass}
            />
          </label>

          <label className="flex flex-1 flex-col space-y-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">
              Describe the issue
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter in detail"
              required
              rows={8}
              className={cn(fieldClass, "min-h-[160px] flex-1 resize-y")}
            />
          </label>

          <label className="block max-w-xs space-y-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#64748b]">
              Priority
            </span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as (typeof PRIORITIES)[number])}
              className={fieldClass}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <AnimatedButton
              type="submit"
              className="rounded-full border-0 bg-[#1E90FF] px-5 py-2.5 text-[10px] font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Submit
            </AnimatedButton>
            {submitted ? (
              <p className="text-[10px] font-medium text-[#64748b]">
                Ticket form captured locally — API wiring pending.
              </p>
            ) : null}
          </div>
        </form>
      </section>

      <section className={cn(cardShell, "flex min-h-[280px] flex-col overflow-hidden xl:col-span-5")}>
        <div className="border-b border-[#e2e8f0] px-4 py-3 sm:px-5">
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">
            Ticket history
          </h2>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
          <p className="text-[10px] font-semibold text-[#0f172a]">No tickets found.</p>
          <p className="mt-1 text-[10px] font-medium text-[#64748b]">
            Raised tickets will appear here when available.
          </p>
        </div>
      </section>
    </div>
  );
}

export function SupportPage() {
  const [tab, setTab] = useState<SupportTab>("tickets");
  const [hoveredTab, setHoveredTab] = useState<SupportTab | null>(null);

  return (
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col gap-3 font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Intelli Suite
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
              Support
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#475569]">
              Manage support queries, explore guides, and share feedback.
            </p>
          </div>
          <div role="tablist" aria-label="Support sections" className="flex flex-wrap gap-2">
            {TABS.map((item) => {
              const showHoverActive = hoveredTab === item.id;
              const suppressSelectedActive = hoveredTab !== null && hoveredTab !== tab;
              const active = tab === item.id && !suppressSelectedActive;
              const highlighted = showHoverActive || active;
              return (
                <AnimatedButton
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  onClick={() => setTab(item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "inline-flex items-center rounded-full px-5 py-2.5 text-[10px] font-semibold shadow-sm transition-all duration-200",
                    highlighted
                      ? "border-0 bg-[#1E90FF] text-white shadow-md"
                      : "border border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#1E90FF] hover:bg-[#1E90FF] hover:text-white",
                  )}
                >
                  {item.label}
                </AnimatedButton>
              );
            })}
          </div>
        </div>
      </FadeIn>

      <Stagger className="flex min-h-0 flex-1 flex-col gap-3" delay={0.04}>
        <StaggerItem className="flex min-h-0 flex-1 flex-col">
          {tab === "tickets" ? <RaisedTicketsPanel /> : null}
          {tab === "center" ? (
            <EmptyPanel
              title="Support center"
              hint="Guides and support links will appear here when content is connected."
            />
          ) : null}
          {tab === "nps" ? (
            <EmptyPanel
              title="Net promoter score"
              hint="NPS feedback collection is empty until survey data is provided."
            />
          ) : null}
          {tab === "help" ? (
            <EmptyPanel
              title="Help center"
              hint="Help articles and FAQs — placeholder ready for integration."
            />
          ) : null}
        </StaggerItem>
      </Stagger>
    </div>
  );
}
