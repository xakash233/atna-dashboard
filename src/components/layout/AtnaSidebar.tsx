"use client";

import AnimatedButton from "@/components/ui/AnimatedButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CURRENT_USER, ORGANIZATION } from "@/lib/constants";
import { cn } from "@/lib/cn";

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

function navLinkClass(active: boolean, collapsed: boolean) {
  return cn(
    "group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12.5px] font-semibold transition-all duration-200",
    active
      ? "bg-white text-[#0f172a] shadow-sm dark:bg-[#1a1d27] dark:text-white"
      : "text-[#475569] hover:translate-x-0.5 hover:bg-[#E8F4FF] hover:text-[#1E90FF] dark:text-pastel-muted dark:hover:bg-[var(--hover-glass)] dark:hover:text-[#7ec8ff]",
    collapsed && "justify-center px-2 hover:translate-x-0",
  );
}

function navIconClass(active: boolean) {
  return cn(
    "transition-colors duration-200",
    active ? "text-[#1E90FF] dark:text-[#1E90FF]" : "text-[#94a3b8] group-hover:text-[#1E90FF]",
  );
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
      className={navLinkClass(active, collapsed)}
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-[#1E90FF]" />
      )}
      <NavIcon name={icon} className={navIconClass(active)} />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

function HyreGroupToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <AnimatedButton
      type="button"
      onClick={onToggle}
      className={cn(navLinkClass(false, false), "w-full text-left")}
      aria-expanded={open}
    >
      <NavIcon name="hire" className={navIconClass(false)} />
      <span className="flex-1 truncate">Intelli Hire</span>
      <svg
        className={cn(
          "size-3.5 shrink-0 text-[#94a3b8] transition-transform duration-200",
          open && "rotate-180",
        )}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </AnimatedButton>
  );
}

export function AtnaSidebar() {
  const pathname = usePathname();
  const [hyreOpen, setHyreOpen] = useState(true);
  const [hoverExpanded, setHoverExpanded] = useState(false);

  useEffect(() => {
    if (isHyrePath(pathname)) setHyreOpen(true);
  }, [pathname]);

  // Keep main content padding in sync with sidebar width
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("sidebar-expanded", hoverExpanded);
    return () => root.classList.remove("sidebar-expanded");
  }, [hoverExpanded]);

  const collapsed = !hoverExpanded;

  return (
    <aside
      onMouseEnter={() => setHoverExpanded(true)}
      onMouseLeave={() => setHoverExpanded(false)}
      className={cn(
        "fixed bottom-2 left-2 top-2 z-40 hidden flex-col overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white/95 shadow-[0_10px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-[width,box-shadow] duration-300 ease-out md:flex dark:border-[var(--sidebar-border)] dark:bg-[var(--sidebar-bg)]/95",
        collapsed ? "w-[72px]" : "w-[220px] shadow-[0_16px_48px_rgba(15,23,42,0.16)]",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center border-b border-[#e2e8f0] py-3.5 dark:border-[var(--sidebar-border)]",
          collapsed ? "justify-center px-2" : "gap-2.5 px-4",
        )}
      >
        {collapsed ? (
          <div
            className="grid size-9 place-items-center rounded-xl text-[#475569]"
            aria-label="Expand sidebar"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : (
          <>
            <div className="grid size-9 shrink-0 place-items-center transition-transform duration-200 hover:scale-105">
              <Image
                src="/assets/logo-atna.svg"
                alt="Atna"
                width={28}
                height={28}
                className="size-7"
                unoptimized
              />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold tracking-wide text-[#0f172a] dark:text-pastel-text">
                Atna
              </p>
              <p className="truncate text-[10px] font-medium text-[#64748b]">{ORGANIZATION.name}</p>
            </div>
          </>
        )}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-2.5 py-4" aria-label="Main">
        <div className="space-y-1">
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Overview
            </p>
          )}
          <NavLink
            href="/"
            label="Dashboard"
            icon="dashboard"
            pathname={pathname}
            collapsed={collapsed}
          />
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              General
            </p>
          )}
          <NavLink
            href="/customers"
            label="Customer Management"
            icon="customers"
            pathname={pathname}
            collapsed={collapsed}
          />
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Intelli Suite
            </p>
          )}

          {!collapsed && (
            <HyreGroupToggle open={hyreOpen} onToggle={() => setHyreOpen((o) => !o)} />
          )}

          {(collapsed || hyreOpen) && (
            <ul className="space-y-0.5">
              {HYRE_LINKS.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    pathname={pathname}
                    collapsed={collapsed}
                  />
                </li>
              ))}
            </ul>
          )}

          <ul className="space-y-0.5">
            {MAIN_LINKS.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-[#e2e8f0] p-2.5 dark:border-[var(--sidebar-border)]",
          collapsed && "flex justify-center",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-0.5 pl-0.5 dark:border-[var(--sidebar-border)] dark:bg-white/5",
            collapsed ? "pr-0.5" : "pr-2.5",
          )}
          title={`${CURRENT_USER.displayName} · ${CURRENT_USER.email}`}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#1E90FF] text-[10px] font-bold text-white">
            {CURRENT_USER.firstName.charAt(0)}
            {CURRENT_USER.lastName.charAt(0)}
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold leading-tight text-[#0f172a] dark:text-pastel-text">
                {CURRENT_USER.displayName}
              </p>
              <p className="truncate text-[9px] font-medium leading-tight text-[#64748b]">
                {CURRENT_USER.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
