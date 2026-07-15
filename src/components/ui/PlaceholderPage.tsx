"use client";

import { motion } from "motion/react";

type PlaceholderProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pastel-card mx-auto max-w-2xl p-8 sm:p-12 text-center"
    >
      <div className="relative mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-accent-soft/30 text-accent">
        {/* Animated Scanning Wave */}
        <span className="absolute inset-0 rounded-2xl border border-accent/20 animate-ping opacity-75" />
        <span className="absolute -inset-2 rounded-3xl border border-accent/10 animate-pulse opacity-40" />
        
        <svg className="size-10" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-pastel-text">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-pastel-muted mx-auto max-w-md">{description}</p>
      
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button type="button" className="btn-premium px-6 py-2.5 text-xs font-semibold">
          Configure API Settings
        </button>
        <button type="button" className="rounded-xl border border-border bg-white/20 px-6 py-2.5 text-xs font-semibold text-pastel-text backdrop-blur-sm transition hover:bg-surface-muted dark:bg-white/5 dark:hover:bg-white/10">
          Read Integration Docs
        </button>
      </div>

      <p className="mt-6 text-xs text-pastel-muted flex items-center justify-center gap-1.5">
        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
        Standby status — listening for initial payload connection
      </p>
    </motion.section>
  );
}
