"use client";

import Link from "next/link";
import type { CaseRecord } from "@/lib/types";
import { cn } from "@/lib/cn";

type PriorityQueueProps = {
  cases: CaseRecord[];
  empty?: boolean;
  error?: string | null;
};

export function PriorityQueue({ cases, empty, error }: PriorityQueueProps) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)]">
      <div className="relative flex items-center justify-between border-b border-[#e2e8f0] bg-[#f8fafc] px-5 py-4">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-[#0f172a]">Priority Queue</h2>
          <p className="mt-0.5 text-[8px] font-medium text-[#475569]">High-signal cases requiring triage</p>
        </div>
        <Link
          href="/cases"
          className="group inline-flex items-center gap-1 text-[10px] font-semibold text-[#1E90FF] transition hover:brightness-110"
        >
          View All
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="bg-[#f8fafc]">
            <tr>
              {["CASE ID", "SUBJECT", "RISK LEVEL", "ASSIGNED ENTITY", "LAST UPDATED"].map(
                (heading, i) => (
                  <th
                    key={heading}
                    className={cn(
                      "px-5 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#475569]",
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
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#ef4444]">
                  {error}
                </td>
              </tr>
            ) : empty || cases.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#64748b]">
                  No cases in the queue. API placeholder ready for integration.
                </td>
              </tr>
            ) : (
              cases.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn(
                      "group transition-colors hover:bg-[#E8F4FF]/50",
                      index > 0 && "border-t border-[#e2e8f0]",
                    )}
                  >
                    <td className="px-5 py-3 font-mono text-[10px] font-medium text-[#1E90FF]">
                      {item.id}
                    </td>
                    <td className="px-5 py-3 text-[10px] font-semibold text-[#0f172a]">{item.subject}</td>
                    <td className="px-5 py-3 text-[10px] font-medium text-[#475569]">{item.risk}</td>
                    <td className="px-5 py-3 text-[10px] font-medium text-[#475569]">{item.assignedEntity}</td>
                    <td className="px-5 py-3 text-right font-mono text-[10px] font-medium text-[#475569]">
                      {item.lastUpdated}
                    </td>
                  </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
