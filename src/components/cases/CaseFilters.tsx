"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const FILTERS = ["All Cases", "High Risk", "Pending Review"] as const;

type CaseFiltersProps = {
  onFilterChange?: (filter: (typeof FILTERS)[number]) => void;
};

export function CaseFilters({ onFilterChange }: CaseFiltersProps) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All Cases");

  return (
    <div className="flex flex-col items-stretch gap-3 sm:items-end">
      <div
        className="inline-flex rounded-xl border border-border bg-surface-muted p-[5px] shadow-sm backdrop-blur dark:bg-surface-solid"
        role="tablist"
        aria-label="Case filters"
      >
        {FILTERS.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                "relative rounded-xl px-4 py-1.5 text-base transition duration-300",
                selected
                  ? "bg-surface-elevated text-fg shadow-[0_4px_16px_-6px_var(--glow-accent)]"
                  : "text-fg-muted hover:text-fg",
              )}
              onClick={() => {
                setActive(filter);
                onFilterChange?.(filter);
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="btn-premium inline-flex items-center gap-2 self-start rounded-xl border border-border-strong bg-surface-solid px-[17px] py-[9px] text-base text-fg shadow-sm transition hover:border-accent/35 hover:shadow-[0_8px_24px_-12px_var(--glow-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:self-end"
      >
        <svg className="h-[9px] w-[13.5px]" viewBox="0 0 14 9" fill="none" aria-hidden>
          <path d="M1 1.5h12M3 4.5h8M5 7.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Advanced Filters
      </button>
    </div>
  );
}
