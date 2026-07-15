"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { FraudDetectorData } from "@/lib/api/fraud";
import { cn } from "@/lib/cn";

export function FraudDetectorPage({ data }: { data: FraudDetectorData }) {
  const metrics = [
    {
      label: "CVs Ingested",
      value: data.metrics.cvsIngested.value,
      delta: data.metrics.cvsIngested.delta,
      hero: true,
    },
    {
      label: "Shortlisted",
      value: data.metrics.shortlisted.value,
      delta: data.metrics.shortlisted.delta,
      hero: false,
    },
    {
      label: "Fraud Flagged",
      value: data.metrics.fraudFlagged.value,
      delta: data.metrics.fraudFlagged.delta,
      hero: false,
    },
    {
      label: "Final Hires",
      value: data.metrics.finalHires.value,
      delta: data.metrics.finalHires.delta,
      hero: false,
    },
  ];

  const maxFunnel = Math.max(...data.funnel.map((f) => f.value), 1);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-pastel-muted">
              Intelli Hire · ATS
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
              AI Fraud Detector
            </h1>
            <p className="mt-1 text-sm text-pastel-muted">
              Forensic resume screening · 6-stage validation
            </p>
          </div>
          <button
            type="button"
            className="inline-flex rounded-xl bg-pastel-lavender-deep px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Create Job
          </button>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.03}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className={cn(
                  "flex min-h-[120px] flex-col justify-between p-5 sm:p-6",
                  m.hero ? "pastel-metric-hero" : "pastel-card",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("text-sm font-medium", m.hero ? "text-white/85" : "text-pastel-muted")}>
                    {m.label}
                  </p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      m.hero ? "bg-white/20 text-white" : "bolt-pill-positive",
                    )}
                  >
                    {m.delta}
                  </span>
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
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <section className="pastel-card p-5 xl:col-span-4">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h2 className="text-base font-semibold text-pastel-text">Pipeline Funnel</h2>
                  <p className="text-xs text-pastel-muted">Drop-off across stages</p>
                </div>
                <span className="text-xs font-medium text-pastel-muted">5 stages</span>
              </div>
              <ul className="space-y-3">
                {data.funnel.map((stage) => (
                  <li key={stage.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-pastel-muted">{stage.label}</span>
                      <span className="font-semibold text-pastel-text">{stage.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[rgba(180,168,204,0.2)]">
                      <div
                        className="h-full rounded-full bg-pastel-lavender-deep"
                        style={{ width: `${(stage.value / maxFunnel) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pastel-card p-5 xl:col-span-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-pastel-text">Volume & Flag Trend</h2>
                  <p className="text-xs text-pastel-muted">Last 14 days</p>
                </div>
                <span className="rounded-full bg-pastel-mint/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-pastel-mint">
                  Live
                </span>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.volumeTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,168,204,0.35)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="volume" stroke="#a78bdb" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="flags" stroke="#f0b6c8" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <section className="pastel-card p-5">
              <h2 className="text-base font-semibold text-pastel-text">Fraud Signal Distribution</h2>
              <p className="mb-4 text-xs text-pastel-muted">Across flagged candidates</p>
              <ul className="space-y-3">
                {data.fraudSignals.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between rounded-xl bg-[rgba(180,168,204,0.12)] px-4 py-3"
                  >
                    <span className="text-sm text-pastel-muted">{s.label}</span>
                    <span className="font-bold text-pastel-text">{s.value}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pastel-card p-5">
              <h2 className="text-base font-semibold text-pastel-text">Fake-Media Risk</h2>
              <p className="mb-2 text-xs text-pastel-muted">Score distribution across screenings</p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.fakeMediaBins}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,168,204,0.35)" />
                    <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#c5b6e8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="pastel-card p-5">
              <h2 className="text-base font-semibold text-pastel-text">Geo Risk Matrix</h2>
              <p className="mb-2 text-xs text-pastel-muted">Clean vs flagged by region</p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.geoRisk}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(180,168,204,0.35)" />
                    <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clean" stackId="a" fill="#9fd9c8" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="flagged" stackId="a" fill="#f0b6c8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <section className="pastel-card overflow-hidden xl:col-span-7">
              <div className="flex items-center justify-between border-b border-[rgba(180,168,204,0.25)] px-5 py-4">
                <h2 className="text-base font-semibold text-pastel-text">
                  Jobs <span className="text-pastel-muted">· {data.jobs.length}</span>
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left">
                  <thead>
                    <tr className="border-b border-[rgba(180,168,204,0.2)] bg-[rgba(180,168,204,0.08)]">
                      {["Job Title", "Status", "Resumes", "Selected", "Created", "Actions"].map(
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
                    {data.jobs.map((job) => (
                      <tr key={job.title} className="border-b border-[rgba(180,168,204,0.15)]">
                        <td className="px-4 py-3 text-sm font-medium text-pastel-text">{job.title}</td>
                        <td className="px-4 py-3 text-sm text-pastel-text">{job.status}</td>
                        <td className="px-4 py-3 text-sm text-pastel-text">{job.resumes}</td>
                        <td className="px-4 py-3 text-sm text-pastel-text">{job.selected}</td>
                        <td className="px-4 py-3 text-sm text-pastel-muted">{job.created}</td>
                        <td className="px-4 py-3 text-sm text-pastel-muted">—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="px-5 py-3 text-xs text-pastel-muted">1–1 of 1</p>
            </section>

            <section className="pastel-card overflow-hidden xl:col-span-5">
              <div className="border-b border-[rgba(180,168,204,0.25)] px-5 py-4">
                <h2 className="text-base font-semibold text-pastel-text">
                  Verification Queue{" "}
                  <span className="text-pastel-muted">· {data.verificationQueue.length} active</span>
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] text-left">
                  <thead>
                    <tr className="border-b border-[rgba(180,168,204,0.2)] bg-[rgba(180,168,204,0.08)]">
                      {["Candidate", "JD Match", "Risk Level", "Atna Score", "Action"].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-pastel-muted"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.verificationQueue.map((row) => (
                      <tr key={row.ref} className="border-b border-[rgba(180,168,204,0.15)]">
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <div className="grid size-8 place-items-center rounded-full bg-pastel-lavender/40 text-xs font-bold">
                              {row.initials}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-pastel-text">{row.name}</p>
                              <p className="text-[11px] text-pastel-muted">
                                {row.ref} · {row.level}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm text-pastel-text">{row.jdMatch}</td>
                        <td className="px-3 py-3">
                          <span className="rounded-lg bg-pastel-rose/40 px-2 py-1 text-xs font-bold text-rose-800 dark:text-pastel-rose">
                            {row.riskLevel}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm font-semibold text-pastel-text">
                          {row.atnaScore}
                        </td>
                        <td className="px-3 py-3 text-sm text-pastel-muted">—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
