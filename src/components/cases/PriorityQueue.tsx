"use client";

import Link from "next/link";
import type { CaseRecord, RiskLevel } from "@/lib/types";
import { cn } from "@/lib/cn";

const RISK_STYLES: Record<
  RiskLevel,
  { text: string; bg: string; border: string; dot: string }
> = {
  Critical: {
    text: "text-critical",
    bg: "bg-critical/10",
    border: "border-critical/20",
    dot: "bg-critical shadow-[0_0_10px_var(--critical)]",
  },
  Elevated: {
    text: "text-elevated",
    bg: "bg-elevated/10",
    border: "border-elevated/20",
    dot: "bg-elevated shadow-[0_0_10px_var(--elevated)]",
  },
  Standard: {
    text: "text-standard",
    bg: "bg-standard/10",
    border: "border-standard/20",
    dot: "bg-standard shadow-[0_0_10px_var(--standard)]",
  },
};

type PriorityQueueProps = {
  cases: CaseRecord[];
  empty?: boolean;
  error?: string | null;
};

export function PriorityQueue({ cases, empty, error }: PriorityQueueProps) {
  return (
    <section className="glass-card w-full overflow-hidden">
      <div className="relative flex items-center justify-between border-b border-border-subtle bg-surface-muted/80 px-6 py-5">
        <div>
          <h2 className="text-base font-medium text-fg">Priority Queue</h2>
          <p className="mt-0.5 text-xs text-fg-muted">High-signal cases requiring triage</p>
        </div>
        <Link
          href="/cases"
          className="group inline-flex items-center gap-1 text-sm text-accent transition hover:brightness-110"
        >
          View All
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="bg-surface-muted/50">
            <tr>
              {["CASE ID", "SUBJECT", "RISK LEVEL", "ASSIGNED ENTITY", "LAST UPDATED"].map(
                (heading, i) => (
                  <th
                    key={heading}
                    className={cn(
                      "px-6 py-4 text-xs font-normal uppercase tracking-[0.6px] text-fg-muted",
                      i === 4 && "text-right",
                    )}
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-critical">
                  {error}
                </td>
              </tr>
            ) : empty || cases.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-fg-muted">
                  No cases in the queue. API placeholder ready for integration.
                </td>
              </tr>
            ) : (
              cases.map((item, index) => {
                const risk = RISK_STYLES[item.risk];
                return (
                  <tr
                    key={item.id}
                    className={cn(
                      "table-row-premium group",
                      index > 0 && "border-t border-border-subtle",
                    )}
                  >
                    <td className="px-6 py-4 font-mono text-sm text-accent transition group-hover:drop-shadow-[0_0_8px_var(--glow-accent)]">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-fg">{item.subject}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl border px-[11px] py-[5px] text-xs transition group-hover:scale-[1.03]",
                          risk.bg,
                          risk.border,
                          risk.text,
                        )}
                      >
                        <span className={cn("size-2 rounded-xl", risk.dot)} />
                        {item.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-fg-muted">{item.assignedEntity}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-fg-muted">
                      {item.lastUpdated}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
