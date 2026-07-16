"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { useState } from "react";
import { cn } from "@/lib/cn";

const FILTERS = ["All Cases", "High Risk", "Pending Review"] as const;

type CaseFiltersProps = {
  onFilterChange?: (filter: (typeof FILTERS)[number]) => void;
};

export function CaseFilters({ onFilterChange }: CaseFiltersProps) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All Cases");
  const [hovered, setHovered] = useState<(typeof FILTERS)[number] | null>(null);

  return (
    <div className="flex flex-col items-stretch gap-3 sm:items-end">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Case filters">
        {FILTERS.map((filter) => {
          const showHoverActive = hovered === filter;
          const suppressSelectedActive = hovered !== null && hovered !== active;
          const selected = filter === active && !suppressSelectedActive;
          const highlighted = showHoverActive || selected;
          return (
            <AnimatedButton
              key={filter}
              type="button"
              role="tab"
              aria-selected={filter === active}
              onMouseEnter={() => setHovered(filter)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "inline-flex items-center rounded-full px-5 py-2.5 text-[10px] font-semibold shadow-sm transition-all duration-200",
                highlighted
                  ? "border-0 bg-[#1E90FF] text-white shadow-md"
                  : "border border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#1E90FF] hover:bg-[#1E90FF] hover:text-white",
              )}
              onClick={() => {
                setActive(filter);
                onFilterChange?.(filter);
              }}
            >
              {filter}
            </AnimatedButton>
          );
        })}
      </div>

      <AnimatedButton
        type="button"
        className="inline-flex items-center gap-2 self-start rounded-full border border-[#e2e8f0] bg-white px-5 py-2.5 text-[10px] font-semibold text-[#0f172a] shadow-sm transition-all duration-200 hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF] hover:text-[#1E90FF] sm:self-end"
      >
        <svg className="h-[9px] w-[13.5px]" viewBox="0 0 14 9" fill="none" aria-hidden>
          <path d="M1 1.5h12M3 4.5h8M5 7.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Advanced Filters
      </AnimatedButton>
    </div>
  );
}
