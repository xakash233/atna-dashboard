"use client";

import { useState } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { FadeIn } from "@/components/ui/Motion";
import { cn } from "@/lib/cn";

type PlaceholderProps = {
  title: string;
  description: string;
};

type ActionId = "configure" | "docs";

export function PlaceholderPage({ title, description }: PlaceholderProps) {
  const [activeAction, setActiveAction] = useState<ActionId>("configure");
  const [hoveredAction, setHoveredAction] = useState<ActionId | null>(null);

  const actions: { id: ActionId; label: string }[] = [
    { id: "configure", label: "Configure API Settings" },
    { id: "docs", label: "Read Integration Docs" },
  ];

  return (
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col font-sans text-[#0f172a] antialiased">
      <FadeIn className="flex min-h-0 flex-1 flex-col">
        <section className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] sm:p-12">
          <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-[#e2e8f0] bg-[#E8F4FF] text-[#1E90FF]">
            <span className="absolute inset-0 rounded-2xl border border-[#1E90FF]/20 opacity-60" />
            <svg className="relative size-8" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
            {title}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-[10px] font-medium leading-relaxed text-[#475569] sm:text-[12px]">
            {description}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
            {actions.map((action) => {
              const showHoverActive = hoveredAction === action.id;
              const suppressSelectedActive =
                hoveredAction !== null && hoveredAction !== activeAction;
              const active = activeAction === action.id && !suppressSelectedActive;
              const highlighted = showHoverActive || active;
              return (
                <AnimatedButton
                  key={action.id}
                  type="button"
                  onClick={() => setActiveAction(action.id)}
                  onMouseEnter={() => setHoveredAction(action.id)}
                  onMouseLeave={() => setHoveredAction(null)}
                  className={cn(
                    "inline-flex items-center rounded-full px-5 py-2.5 text-[10px] font-semibold shadow-sm transition-all duration-200",
                    highlighted
                      ? "border-0 bg-[#1E90FF] text-white shadow-md"
                      : "border border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#1E90FF] hover:bg-[#1E90FF] hover:text-white",
                  )}
                >
                  {action.label}
                </AnimatedButton>
              );
            })}
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-[9px] font-medium text-[#94a3b8]">
            <span className="size-1.5 rounded-full bg-amber-500" />
            Standby status — listening for initial payload connection
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
