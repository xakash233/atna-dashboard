/** Shared surface styles that respect light/dark theme tokens */
export const cardShell =
  "rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01),0_8px_16px_rgba(0,0,0,0.01)] transition-all duration-300 dark:border-[var(--border)] dark:bg-[var(--pastel-card)] dark:shadow-[var(--pastel-shadow-soft)]";

export const cardHover =
  "hover:border-[#1E90FF]/40 hover:shadow-[0_4px_12px_rgba(30,144,255,0.18),0_12px_24px_rgba(30,144,255,0.08)] dark:hover:border-[var(--hover-glass-border)] dark:hover:bg-[var(--hover-glass)] dark:hover:shadow-none";

/**
 * Light mode: soft blue wash.
 * Dark mode: same glass panel colour as Organization code fields (#222633).
 */
export const glassHover =
  "hover:border-[#1E90FF]/40 hover:bg-[#E8F4FF] hover:shadow-[0_8px_20px_-10px_rgba(30,144,255,0.35)] dark:hover:border-[var(--hover-glass-border)] dark:hover:bg-[var(--hover-glass)] dark:hover:shadow-none";

export const glassHoverSoft =
  "hover:border-[#1E90FF]/40 hover:shadow-[0_12px_24px_rgba(30,144,255,0.16)] dark:hover:border-[var(--hover-glass-border)] dark:hover:bg-[var(--hover-glass)] dark:hover:shadow-none";

export const pageTitle = "text-2xl font-bold tracking-tight text-[#0f172a] dark:text-pastel-text sm:text-[28px]";
export const pageSubtitle = "mt-1 text-[11px] font-medium text-[#475569] dark:text-pastel-muted sm:text-xs";
export const sectionLabel =
  "text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8] dark:text-pastel-muted";
