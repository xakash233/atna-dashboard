"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useState, type FormEvent } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";

type SupportTab = "center" | "nps" | "help" | "tickets";

const TABS: { id: SupportTab; label: string }[] = [
  { id: "center", label: "Support center" },
  { id: "nps", label: "Net promoter score" },
  { id: "help", label: "Help center" },
  { id: "tickets", label: "Raised tickets" },
];

const PRIORITIES = ["Low", "Medium", "High", "Critical"] as const;

function EmptyPanel({ title, hint }: { title: string; hint: string }) {
  return (
    <section className="pastel-card p-10 text-center">
      <h2 className="text-base font-semibold text-pastel-text">{title}</h2>
      <p className="mt-2 text-sm text-pastel-muted">{hint}</p>
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
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
      <section className="pastel-card p-6 xl:col-span-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-pastel-text">Create new ticket</h2>
          <span className="text-xs font-medium text-pastel-muted">Create ticket</span>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-pastel-text">Subject</span>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject here"
              required
              className="w-full rounded-xl border border-[rgba(180,168,204,0.4)] bg-pastel-bg/60 px-4 py-2.5 text-sm text-pastel-text outline-none placeholder:text-pastel-muted focus:ring-2 focus:ring-pastel-lavender/50"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-pastel-text">Describe the issue</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter in detail"
              required
              rows={6}
              className="w-full resize-y rounded-xl border border-[rgba(180,168,204,0.4)] bg-pastel-bg/60 px-4 py-2.5 text-sm text-pastel-text outline-none placeholder:text-pastel-muted focus:ring-2 focus:ring-pastel-lavender/50"
            />
          </label>

          <label className="block max-w-xs space-y-1.5">
            <span className="text-sm font-medium text-pastel-text">Priority</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as (typeof PRIORITIES)[number])}
              className="w-full rounded-xl border border-[rgba(180,168,204,0.4)] bg-pastel-bg/60 px-4 py-2.5 text-sm text-pastel-text outline-none focus:ring-2 focus:ring-pastel-lavender/50"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <AnimatedButton
              type="submit"
              className="rounded-xl bg-pastel-lavender-deep px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Submit
            </AnimatedButton>
            {submitted && (
              <p className="text-sm text-pastel-muted">
                Ticket form captured locally — API wiring pending.
              </p>
            )}
          </div>
        </form>
      </section>

      <section className="pastel-card overflow-hidden xl:col-span-5">
        <div className="border-b border-[rgba(180,168,204,0.25)] px-5 py-4">
          <h2 className="text-base font-semibold text-pastel-text">Ticket history</h2>
        </div>
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-pastel-muted">No tickets found.</p>
          <p className="mt-1 text-xs text-pastel-muted">
            Raised tickets will appear here when available.
          </p>
        </div>
      </section>
    </div>
  );
}

export function SupportPage() {
  const [tab, setTab] = useState<SupportTab>("tickets");

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <FadeIn>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-pastel-muted">
            Intelli Suite
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
            Support
          </h1>
          <p className="mt-1 text-sm text-pastel-muted">
            Manage support queries, explore guides, and share feedback.
          </p>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.04}>
        <StaggerItem>
          <div role="tablist" aria-label="Support sections" className="flex flex-wrap gap-2">
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <AnimatedButton
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-[#e8eaed] text-[#1e293b] shadow-sm dark:bg-white/10 dark:text-pastel-text"
                      : "bg-pastel-card text-pastel-muted hover:bg-[rgba(180,168,204,0.18)] hover:text-pastel-text",
                  )}
                >
                  {item.label}
                </AnimatedButton>
              );
            })}
          </div>
        </StaggerItem>

        <StaggerItem>
          {tab === "tickets" && <RaisedTicketsPanel />}
          {tab === "center" && (
            <EmptyPanel
              title="Support center"
              hint="Guides and support links will appear here when content is connected."
            />
          )}
          {tab === "nps" && (
            <EmptyPanel
              title="Net promoter score"
              hint="NPS feedback collection is empty until survey data is provided."
            />
          )}
          {tab === "help" && (
            <EmptyPanel
              title="Help center"
              hint="Help articles and FAQs — placeholder ready for integration."
            />
          )}
        </StaggerItem>
      </Stagger>
    </div>
  );
}
