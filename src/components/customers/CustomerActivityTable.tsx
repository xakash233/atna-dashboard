"use client";

import Link from "next/link";
import type { CustomerActivity, MetricTone } from "@/lib/types";
import { cn } from "@/lib/cn";

const AVATAR: Record<MetricTone, string> = {
  indigo: "bg-[#6366f1]/10 text-[#6366f1]",
  slate: "bg-slate-600/10 text-slate-600",
  zinc: "bg-zinc-500/10 text-zinc-500",
};

const BAR: Record<MetricTone, string> = {
  indigo: "bg-[#6366f1]",
  slate: "bg-slate-600",
  zinc: "bg-zinc-500",
};

type CustomerActivityTableProps = {
  customers: CustomerActivity[];
};

export function CustomerActivityTable({ customers }: CustomerActivityTableProps) {
  return (
    <section className="glass-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-neutral-300/30 px-6 py-6 dark:border-border-subtle">
        <h2 className="text-xl font-medium leading-6 text-fg">Recent Customer Activity</h2>
        <Link
          href="/customers"
          className="group inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-[#6366f1] transition hover:brightness-110 dark:text-accent"
        >
          View All
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral-300/30 bg-zinc-200/30 dark:border-border-subtle dark:bg-surface-muted">
              {["CUSTOMER", "STATUS", "LAST INTERACTION", "RISK SCORE", "ACTION"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-fg-muted"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {customers.map((row) => (
              <tr
                key={row.domain}
                className="table-row-premium border-b border-neutral-300/20 dark:border-border-subtle"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "grid size-8 place-items-center rounded-xl text-sm font-bold",
                        AVATAR[row.avatarTone],
                      )}
                    >
                      {row.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-5 text-fg">{row.name}</p>
                      <p className="text-xs leading-4 text-fg-muted">{row.domain}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-fg">{row.status}</td>
                <td className="px-4 py-4 text-sm text-fg-muted">{row.lastInteraction}</td>
                <td className="px-4 py-4">
                  <div className="flex max-w-[140px] flex-col gap-1">
                    <div className="relative h-1.5 w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-surface-elevated">
                      <div
                        className={cn("absolute inset-y-0 left-0 rounded-xl", BAR[row.avatarTone])}
                        style={{ width: `${row.riskPercent}%` }}
                      />
                    </div>
                    <span className="text-xs text-fg-muted">{row.riskLabel}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-fg-muted transition hover:bg-overlay hover:text-fg"
                    aria-label={`Actions for ${row.name}`}
                  >
                    <svg className="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                      <circle cx="8" cy="3" r="1.3" />
                      <circle cx="8" cy="8" r="1.3" />
                      <circle cx="8" cy="13" r="1.3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
