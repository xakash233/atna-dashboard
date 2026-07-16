"use client";

import AnimatedButton from "@/components/ui/AnimatedButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ORGANIZATION } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useAccent } from "@/providers/AccentProvider";

const HYRE_LINKS = [
  { href: "/hyre/resume-agent", label: "Resume Agent", icon: "resume" },
  { href: "/hyre/fraud", label: "AI Fraud", icon: "fraud" },
  { href: "/hyre/deepfake", label: "Deepfake", icon: "deepfake" },
  { href: "/hyre/documents", label: "TRU. Doc", icon: "docs" },
] as const;

const MAIN_LINKS = [
  { href: "/cases", label: "Case Management", icon: "cases" },
  { href: "/workflows", label: "Workflow Builder", icon: "workflows" },
  { href: "/support", label: "Support", icon: "support" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isHyrePath(pathname: string) {
  return pathname === "/hyre" || pathname.startsWith("/hyre/");
}

function NavIcon({ name, className }: { name: string; className?: string }) {
  const c = cn("size-4 shrink-0", className);
  switch (name) {
    case "dashboard":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="3" y="3" width="6" height="6" rx="1.5" />
          <rect x="11" y="3" width="6" height="4" rx="1.5" />
          <rect x="11" y="9" width="6" height="8" rx="1.5" />
          <rect x="3" y="11" width="6" height="6" rx="1.5" />
        </svg>
      );
    case "customers":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 8a7 7 0 0 1 14 0" strokeLinecap="round" />
        </svg>
      );
    case "hire":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="10" cy="6.5" r="2.5" />
          <path d="M4.5 16c1.2-2.4 3-3.5 5.5-3.5s4.3 1.1 5.5 3.5" strokeLinecap="round" />
        </svg>
      );
    case "resume":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="5" y="3" width="10" height="14" rx="1.5" />
          <path d="M8 7h4M8 10h4M8 13h2" strokeLinecap="round" />
        </svg>
      );
    case "fraud":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M10 2.5 16 5v4.5c0 3.4-2.4 5.8-6 7-3.6-1.2-6-3.6-6-7V5l6-2.5Z" />
        </svg>
      );
    case "deepfake":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="10" cy="10" r="7" />
          <circle cx="10" cy="10" r="2.5" />
          <path d="M10 3v2.5M10 14.5V17M3 10h2.5M14.5 10H17" strokeLinecap="round" />
        </svg>
      );
    case "docs":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M6 3.5h5l3 3V16a1.5 1.5 0 0 1-1.5 1.5h-6.5A1.5 1.5 0 0 1 4.5 16V5A1.5 1.5 0 0 1 6 3.5Z" />
          <path d="M11 3.5V7h3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "cases":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 5a2 2 0 0 1 2-2h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z" />
        </svg>
      );
    case "workflows":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="5" cy="5" r="2.5" />
          <circle cx="15" cy="15" r="2.5" />
          <path d="M7.5 5h3a4 4 0 0 1 4 4v3.5" strokeLinecap="round" />
        </svg>
      );
    case "support":
      return (
        <svg className={c} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="10" cy="10" r="7" />
          <path d="M8 8a2 2 0 1 1 2.6 1.9c-.5.2-.9.6-.9 1.1V12M10 14.5v.5" strokeLinecap="round" />
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
  icon,
  pathname,
  collapsed,
}: {
  href: string;
  label: string;
  icon: string;
  pathname: string;
  collapsed: boolean;
}) {
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      title={label}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12.5px] font-semibold transition-all duration-200",
        active
          ? "bg-white text-[#0f172a] shadow-sm dark:bg-[#1a1d27] dark:text-white"
          : "text-[#475569] hover:translate-x-0.5 hover:bg-[#E8F4FF] hover:text-[#1E90FF]",
        collapsed && "justify-center px-2 hover:translate-x-0",
      )}
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-[#1E90FF]" />
      )}
      <NavIcon
        name={icon}
        className={cn(
          "transition-colors duration-200",
          active
            ? "text-[#1E90FF] dark:text-[#1E90FF]"
            : "text-[#94a3b8] group-hover:text-[#1E90FF]",
        )}
      />
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
  const hyreActive = isHyrePath(pathname);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-width)] flex-col border-r border-[#e2e8f0] bg-white/90 backdrop-blur-md md:flex dark:border-[var(--sidebar-border)] dark:bg-[var(--sidebar-bg)]">
      {/* Brand */}
      <div
        className={cn(
          "flex items-center border-b border-[#e2e8f0] py-4 dark:border-[var(--sidebar-border)]",
          sidebarCollapsed ? "justify-center px-2" : "gap-2.5 px-4",
        )}
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#1E90FF]/15 ring-1 ring-[#e2e8f0] transition-transform duration-200 hover:scale-105">
          <Image src="/assets/logo-hex.svg" alt="Atna" width={18} height={16} unoptimized />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold tracking-wide text-[#0f172a] dark:text-pastel-text">
              Atna
            </p>
            <p className="truncate text-[10px] font-medium text-[#64748b]">{ORGANIZATION.name}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2.5 py-4" aria-label="Main">
        {/* Overview */}
        <div className="space-y-1">
          {!sidebarCollapsed && (
            <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Overview
            </p>
          )}
          <NavLink
            href="/"
            label="Dashboard"
            icon="dashboard"
            pathname={pathname}
            collapsed={sidebarCollapsed}
          />
        </div>

        {/* General */}
        <div className="space-y-1">
          {!sidebarCollapsed && (
            <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              General
            </p>
          )}
          <NavLink
            href="/customers"
            label="Customer Management"
            icon="customers"
            pathname={pathname}
            collapsed={sidebarCollapsed}
          />
        </div>

        {/* Intelli Suite */}
        <div className="space-y-1">
          {!sidebarCollapsed && (
            <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Intelli Suite
            </p>
          )}

          <div
            className={cn(
              "transition-all duration-200",
              !sidebarCollapsed && "rounded-2xl border border-transparent bg-[#f8fafc] p-1.5 hover:border-[#e2e8f0] dark:bg-surface-muted",
            )}
          >
            {sidebarCollapsed ? (
              <Link
                href="/hyre/resume-agent"
                title="Intelli Hire"
                className={cn(
                  "group relative flex items-center justify-center rounded-xl px-2 py-2 transition-all duration-200",
                  hyreActive
                    ? "bg-white text-[#0f172a] shadow-sm dark:bg-[#1a1d27] dark:text-white"
                    : "text-[#475569] hover:bg-[#E8F4FF] hover:text-[#1E90FF]",
                )}
              >
                {hyreActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-[#1E90FF]" />
                )}
                <NavIcon
                  name="hire"
                  className={cn(
                    "size-4",
                    hyreActive ? "text-[#1E90FF]" : "text-[#94a3b8] group-hover:text-[#1E90FF]",
                  )}
                />
              </Link>
            ) : (
              <AnimatedButton
                type="button"
                onClick={() => setHyreOpen((o) => !o)}
                className={cn(
                  "group relative flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[12.5px] font-semibold transition-all duration-200",
                  hyreActive
                    ? "bg-white text-[#0f172a] shadow-sm dark:bg-[#1a1d27] dark:text-white"
                    : "text-[#475569] hover:bg-[#E8F4FF] hover:text-[#1E90FF]",
                )}
                aria-expanded={hyreOpen}
              >
                {hyreActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-[#1E90FF]" />
                )}
                <NavIcon
                  name="hire"
                  className={cn(
                    "size-4 shrink-0 transition-colors duration-200",
                    hyreActive ? "text-[#1E90FF]" : "text-[#94a3b8] group-hover:text-[#1E90FF]",
                  )}
                />
                <span className="flex-1 truncate">Intelli Hire</span>
                <svg
                  className={cn(
                    "size-3.5 text-[#94a3b8] transition-transform duration-200",
                    hyreOpen && "rotate-180",
                  )}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </AnimatedButton>
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
                          "group relative flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium transition-all duration-200",
                          active
                            ? "bg-white text-[#0f172a] shadow-sm dark:bg-[#1a1d27] dark:text-white"
                            : "text-[#64748b] hover:translate-x-0.5 hover:bg-[#E8F4FF] hover:text-[#1E90FF]",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-[#1E90FF]" />
                        )}
                        <NavIcon
                          name={item.icon}
                          className={cn(
                            "size-3.5 transition-colors duration-200",
                            active
                              ? "text-[#1E90FF]"
                              : "text-[#94a3b8] group-hover:text-[#1E90FF]",
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <ul className="mt-1.5 space-y-0.5">
            {MAIN_LINKS.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  pathname={pathname}
                  collapsed={sidebarCollapsed}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {!sidebarCollapsed && (
        <div className="space-y-2 border-t border-[#e2e8f0] p-3 dark:border-[var(--sidebar-border)]">
          <div className="flex items-center justify-between px-1">
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
              Accent
            </span>
            <div className="flex gap-1.5">
              {(["teal", "indigo", "purple", "rose", "amber"] as const).map((color) => {
                const bgClass = {
                  teal: "bg-[#0d9488]",
                  indigo: "bg-[#1E90FF]",
                  purple: "bg-[#7c3aed]",
                  rose: "bg-[#e11d48]",
                  amber: "bg-[#d97706]",
                }[color];
                return (
                  <AnimatedButton
                    key={color}
                    type="button"
                    onClick={() => setAccent(color)}
                    className={cn(
                      "size-3.5 rounded-full border transition-all duration-200 hover:scale-125",
                      bgClass,
                      accent === color
                        ? "scale-110 border-[#0f172a] ring-2 ring-[#0f172a]/10"
                        : "border-transparent opacity-70 hover:opacity-100",
                    )}
                    title={color}
                  />
                );
              })}
            </div>
          </div>
          <AnimatedButton
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[11px] font-semibold text-[#64748b] transition-all duration-200 hover:bg-[#E8F4FF] hover:text-[#1E90FF] dark:hover:bg-surface-muted"
            aria-label="Toggle theme"
          >
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
            <span className="text-[10px] text-[#94a3b8]">{isDark ? "☀" : "☾"}</span>
          </AnimatedButton>
        </div>
      )}

      <div className="border-t border-[#e2e8f0] p-2 dark:border-[var(--sidebar-border)]">
        <AnimatedButton
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold text-[#64748b] transition-all duration-200 hover:bg-[#E8F4FF] hover:text-[#1E90FF] dark:hover:bg-surface-muted"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <span>→</span>
          ) : (
            <>
              <span>←</span>
              <span>Collapse</span>
            </>
          )}
        </AnimatedButton>
      </div>
    </aside>
  );
}
