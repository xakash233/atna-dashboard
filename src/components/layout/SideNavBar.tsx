"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP, CURRENT_USER, SIDE_NAV } from "@/lib/constants";
import { cn } from "@/lib/cn";

function NavIcon({ name }: { name: string }) {
  const common = "size-[18px] shrink-0";
  switch (name) {
    case "overview":
      return (
        <svg className={common} viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "neural":
      return (
        <svg className={common} viewBox="0 0 19 20" fill="none" aria-hidden>
          <circle cx="9.5" cy="4" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="4" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="15" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9.5" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9.5 6.2V9M7.5 11.2 5.8 10.3M11.5 11.2l1.7-.9M8.2 15.2 5.8 13.5M10.8 15.2l2.4-1.7" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "pipeline":
      return (
        <svg className={common} viewBox="0 0 24 23" fill="none" aria-hidden>
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="6" r="2" fill="currentColor" />
          <circle cx="16" cy="12" r="2" fill="currentColor" />
          <circle cx="10" cy="18" r="2" fill="currentColor" />
        </svg>
      );
    case "compute":
      return (
        <svg className={common} viewBox="0 0 18 18" fill="none" aria-hidden>
          <rect x="2" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 15h6M9 13v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "logs":
      return (
        <svg className={common} viewBox="0 0 20 16" fill="none" aria-hidden>
          <path d="M2 2h16M2 8h12M2 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function SideNavBar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed bottom-4 left-4 top-20 z-30 hidden w-64 flex-col rounded-[22px] border border-border bg-surface p-[17px] backdrop-blur-2xl lg:flex"
      style={{ boxShadow: "var(--sidebar-shadow)" }}
    >
      <div className="px-4 pb-6">
        <p className="text-2xl font-black leading-7 text-[#6366f1] dark:bg-gradient-to-r dark:from-fg dark:to-accent dark:bg-clip-text dark:text-transparent">
          {APP.product}
        </p>
        <p className="mt-0.5 text-sm font-normal leading-5 text-fg-muted">
          {APP.tier}
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2" aria-label="Sidebar">
        {SIDE_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className={cn(
                "sidebar-link-premium relative flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-semibold tracking-wide transition",
                active
                  ? "border-r-4 border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1] dark:border-accent dark:bg-accent-soft dark:text-accent-active"
                  : "text-fg-muted hover:bg-overlay hover:text-fg",
              )}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border-subtle pt-4">
        <Link
          href="/docs"
          className="flex items-center gap-3 px-4 py-2 text-xs font-semibold tracking-wide text-fg-muted transition hover:translate-x-0.5 hover:text-fg"
        >
          <svg className="size-3.5" viewBox="0 0 12 15" fill="none" aria-hidden>
            <path d="M2 1.5h5.5L10 4v9.5H2v-12Z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          Documentation
        </Link>
        <Link
          href="/support"
          className="mb-2 flex items-center gap-3 px-4 py-2 text-xs font-semibold tracking-wide text-fg-muted transition hover:translate-x-0.5 hover:text-fg"
        >
          <svg className="size-3.5" viewBox="0 0 15 15" fill="none" aria-hidden>
            <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5.5 6a2 2 0 1 1 3.2 1.6C8.2 8 7.5 8.4 7.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="7.5" cy="11" r="0.7" fill="currentColor" />
          </svg>
          Support
        </Link>

        <AnimatedButton
          type="button"
          className="btn-premium mb-3 w-full rounded-sm bg-[#6366f1] px-4 py-3 text-xs font-semibold tracking-wide text-white shadow-[0_10px_15px_-3px_rgba(109,93,246,0.25)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366f1] dark:bg-accent dark:text-accent-fg"
        >
          Upgrade Node
        </AnimatedButton>

        <div className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-overlay">
          <div className="flex size-8 items-center justify-center rounded-full border border-border-strong bg-surface-elevated">
            <svg className="size-4 text-fg-muted" viewBox="0 0 15 17" fill="none" aria-hidden>
              <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1.5 15.5c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs text-fg">{CURRENT_USER.displayName}</p>
            <p className="truncate text-[10px] text-fg-muted">{CURRENT_USER.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
