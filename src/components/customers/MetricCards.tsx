"use client";

import type { CustomerDashboardData, MetricTone } from "@/lib/types";
import { cn } from "@/lib/cn";

const TONE: Record<
  MetricTone,
  { icon: string; badge: string; badgeText: string; badgeBorder: string }
> = {
  slate: {
    icon: "text-slate-600",
    badge: "bg-slate-600/10",
    badgeText: "text-slate-600",
    badgeBorder: "border-slate-600/20",
  },
  indigo: {
    icon: "text-[#1E90FF]",
    badge: "bg-[#1E90FF]/10",
    badgeText: "text-[#1E90FF]",
    badgeBorder: "border-[#1E90FF]/20",
  },
  zinc: {
    icon: "text-zinc-500",
    badge: "bg-zinc-500/10",
    badgeText: "text-zinc-500",
    badgeBorder: "border-zinc-500/20",
  },
};

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-5", className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 11a3 3 0 1 0-2.83-4M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.5 19a4.5 4.5 0 0 1 9 0M14 15.5a4.5 4.5 0 0 1 5.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-5", className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 15v-3M12 15V9M16 15v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-5", className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 16c2.5-1 4-4 6-4s3.5 5 6 5 4-3 4-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
    </svg>
  );
}

type MetricCardsProps = {
  metrics: CustomerDashboardData["metrics"];
};

export function MetricCards({ metrics }: MetricCardsProps) {
  const cards = [
    {
      key: "customers",
      label: (
        <>
          Total Active
          <br />
          Customers
        </>
      ),
      metric: metrics.activeCustomers,
      icon: UsersIcon,
    },
    {
      key: "mrr",
      label: "Monthly Recurring Rev",
      metric: metrics.mrr,
      icon: ChartIcon,
    },
    {
      key: "churn",
      label: "Average Churn Rate",
      metric: metrics.churn,
      icon: TrendIcon,
    },
  ] as const;

  return (
    <>
      {cards.map((card) => {
        const tone = TONE[card.metric.tone];
        const Icon = card.icon;
        return (
          <article
            key={card.key}
            className="glass-card flex h-40 flex-col justify-between p-4"
          >
            <div className="flex items-start justify-between">
              <Icon className={tone.icon} />
              <span
                className={cn(
                  "rounded-xl border px-2 py-1 text-xs font-semibold tracking-wide",
                  tone.badge,
                  tone.badgeText,
                  tone.badgeBorder,
                )}
              >
                {card.metric.delta}
              </span>
            </div>
            <div className="flex flex-col gap-[3px]">
              <p className="text-sm leading-5 text-fg-muted">{card.label}</p>
              <p className="text-2xl font-semibold leading-7 text-fg">{card.metric.value}</p>
            </div>
          </article>
        );
      })}
    </>
  );
}
