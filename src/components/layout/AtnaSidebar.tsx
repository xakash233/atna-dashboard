"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ORGANIZATION } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useAccent } from "@/providers/AccentProvider";

const HYRE_LINKS = [
  { href: "/hyre/resume-agent", label: "Resume Agent" },
  { href: "/hyre/fraud", label: "AI Fraud" },
  { href: "/hyre/deepfake", label: "Deepfake" },
  { href: "/hyre/documents", label: "TRU. Doc" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isHyrePath(pathname: string) {
  return pathname === "/hyre" || pathname.startsWith("/hyre/");
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M3.8 14.8c1.1-2.3 2.9-3.4 5.2-3.4s4.1 1.1 5.2 3.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavIcon({ name, className }: { name: string; className?: string }) {
  const c = cn("size-4 shrink-0", className);
  switch (name) {
    case "Tracker":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="3" y="3" width="14" height="14" rx="2" />
          <path d="M9 17V3M3 10h14" />
        </svg>
      );
    case "Customers":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 8a7 7 0 0 1 14 0" strokeLinecap="round" />
        </svg>
      );
    case "Cases":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 5a2 2 0 0 1 2-2h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z" />
        </svg>
      );
    case "Workflows":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="5" cy="5" r="2.5" />
          <circle cx="15" cy="15" r="2.5" />
          <path d="M7.5 5h3a4 4 0 0 1 4 4v3.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="10" cy="10" r="7" />
        </svg>
      );
  }
}

function NavLink({
  href,
  label,
  pathname,
  collapsed,
}: {
  href: string;
  label: string;
  pathname: string;
  collapsed: boolean;
}) {
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      title={label}
      className={cn(
        "relative flex items-center gap-2.5 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
        active
          ? "bg-[var(--sidebar-active)] text-white dark:bg-white dark:text-[#111827]"
          : "text-[var(--sidebar-fg)] hover:bg-[var(--sidebar-hover)]",
        collapsed && "justify-center px-2",
      )}
      aria-current={active ? "page" : undefined}
    >
      <NavIcon name={label} className={active ? "text-white dark:text-[#111827]" : "text-[var(--sidebar-muted)]"} />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

export function AtnaSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { accent, setAccent, sidebarCollapsed, setSidebarCollapsed } = useAccent();
  const [mounted, setMounted] = useState(false);
  const [hyreOpen, setHyreOpen] = useState(true);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (isHyrePath(pathname)) setHyreOpen(true);
  }, [pathname]);

  const isDark = mounted && theme === "dark";

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-width)] flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] md:flex"
    >
      <div
        className={cn(
          "flex items-center border-b border-[var(--sidebar-border)] py-4",
          sidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-4",
        )}
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft">
          <Image src="/assets/logo-hex.svg" alt="Atna" width={18} height={16} unoptimized />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold text-pastel-text">Atna</p>
            <p className="truncate text-[11px] text-pastel-muted">{ORGANIZATION.name}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="Main">
        <div>
          {!sidebarCollapsed && (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-pastel-muted">
              Tracker
            </p>
          )}
          <NavLink href="/" label="Tracker" pathname={pathname} collapsed={sidebarCollapsed} />
        </div>

        <div>
          {!sidebarCollapsed && (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-pastel-muted">
              General
            </p>
          )}
          <NavLink href="/customers" label="Customers" pathname={pathname} collapsed={sidebarCollapsed} />
        </div>

        <div>
          {!sidebarCollapsed && (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-pastel-muted">
              Intelli Suite
            </p>
          )}

          <div className={cn(!sidebarCollapsed && "rounded-2xl bg-surface-muted p-1.5")}>
            {sidebarCollapsed ? (
              <Link
                href="/hyre/resume-agent"
                title="Intelli Hire"
                className={cn(
                  "flex items-center justify-center rounded-full px-2 py-2",
                  pathname.startsWith("/hyre")
                    ? "bg-[var(--sidebar-active)] text-white dark:bg-white dark:text-[#111827]"
                    : "text-[var(--sidebar-fg)] hover:bg-[var(--sidebar-hover)]",
                )}
              >
                <PersonIcon className="size-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setHyreOpen((o) => !o)}
                className="flex w-full items-center gap-2 rounded-full px-3 py-2 text-left text-[13px] font-semibold text-pastel-text hover:bg-white/80"
                aria-expanded={hyreOpen}
              >
                <PersonIcon className="size-4 shrink-0 text-accent" />
                <span className="flex-1 truncate">Intelli Hire</span>
                <svg
                  className={cn("size-3.5 text-pastel-muted transition", hyreOpen && "rotate-180")}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}

            {hyreOpen && !sidebarCollapsed && (
              <ul className="mt-1 space-y-0.5">
                {HYRE_LINKS.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={item.label}
                        className={cn(
                          "block rounded-full px-3 py-2 text-[12.5px] font-medium transition-colors",
                          active
                            ? "bg-[var(--sidebar-active)] text-white dark:bg-white dark:text-[#111827]"
                            : "text-[var(--sidebar-fg)] hover:bg-white/90",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <ul className="mt-2 space-y-0.5">
            <li>
              <NavLink href="/cases" label="Cases" pathname={pathname} collapsed={sidebarCollapsed} />
            </li>
            <li>
              <NavLink href="/workflows" label="Workflows" pathname={pathname} collapsed={sidebarCollapsed} />
            </li>
            <li>
              <NavLink href="/support" label="Support" pathname={pathname} collapsed={sidebarCollapsed} />
            </li>
          </ul>
        </div>
      </nav>

      {!sidebarCollapsed && (
        <div className="space-y-2 border-t border-[var(--sidebar-border)] p-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-pastel-muted">Accent</span>
            <div className="flex gap-1.5">
              {(["teal", "indigo", "purple", "rose", "amber"] as const).map((color) => {
                const bgClass = {
                  teal: "bg-[#0d9488]",
                  indigo: "bg-[#1e75ff]",
                  purple: "bg-[#7c3aed]",
                  rose: "bg-[#e11d48]",
                  amber: "bg-[#d97706]",
                }[color];
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setAccent(color)}
                    className={cn(
                      "size-3.5 rounded-full border transition",
                      bgClass,
                      accent === color ? "border-pastel-text scale-110" : "border-transparent opacity-70",
                    )}
                    title={color}
                  />
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex w-full items-center justify-between rounded-full px-3 py-2 text-[12px] font-medium text-pastel-muted hover:bg-surface-muted"
            aria-label="Toggle theme"
          >
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      )}

      <div className="border-t border-[var(--sidebar-border)] p-2">
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex w-full items-center justify-center rounded-full px-3 py-2 text-[11px] font-medium text-pastel-muted hover:bg-surface-muted"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? "→" : "← Collapse"}
        </button>
      </div>
    </aside>
  );
}
