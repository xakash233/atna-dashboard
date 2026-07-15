"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";
import { useAccent } from "@/providers/AccentProvider";

const MOBILE_LINKS = [
  { href: "/", label: "Tracker", icon: "tracker" },
  { href: "/customers", label: "Customers", icon: "customers" },
  { href: "/cases", label: "Cases", icon: "cases" },
  { href: "/workflows", label: "Workflows", icon: "workflows" },
] as const;

function MobileIcon({ name, className }: { name: string; className?: string }) {
  const c = cn("size-5", className);
  if (name === "tracker") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "customers") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 15c0-2.8 2.2-5 6-5s6 2.2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "cases") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 8h6M7 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "workflows") {
    return (
      <svg className={c} viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M4 5h12M4 10h12M4 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="5" r="1.5" fill="currentColor" />
        <circle cx="13" cy="10" r="1.5" fill="currentColor" />
        <circle cx="9" cy="15" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  return null;
}

export function MobileNavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccent();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  // Close menu when pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const activeIndex = MOBILE_LINKS.findIndex((link) => {
    if (link.href === "/") return pathname === "/";
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  });

  return (
    <>
      {/* Floating glass pill at bottom */}
      <div className="fixed bottom-5 inset-x-4 z-50 flex justify-center md:hidden">
        <nav className="flex w-full max-w-[400px] items-center justify-between rounded-full border border-border bg-pastel-card px-3 py-2 shadow-[var(--pastel-shadow-soft)]">
          {MOBILE_LINKS.map((link, idx) => {
            const active = idx === activeIndex;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex flex-col items-center justify-center rounded-full p-2.5 text-pastel-muted transition hover:text-pastel-text"
              >
                {active && (
                  <motion.span
                    layoutId="active-mobile-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--sidebar-active)] dark:bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <MobileIcon
                  name={link.icon}
                  className={cn(active ? "text-white dark:text-[#111827]" : "text-pastel-muted")}
                />
                <span className={cn("mt-0.5 text-[10px] font-medium", active ? "text-white dark:text-[#111827]" : "text-pastel-muted")}>
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* Menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center rounded-full p-2.5 text-pastel-muted transition hover:text-pastel-text"
            aria-expanded={menuOpen}
          >
            <div className="relative size-5 flex flex-col items-center justify-center">
              <span
                className={cn(
                  "block h-0.5 w-4 rounded-full bg-current transition-transform duration-300",
                  menuOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-4 rounded-full bg-current transition-opacity duration-300 my-0.5",
                  menuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-4 rounded-full bg-current transition-transform duration-300",
                  menuOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
                )}
              />
            </div>
            <span className="mt-0.5 text-[10px] font-medium">Menu</span>
          </button>
        </nav>
      </div>

      {/* Slide-up Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 inset-x-0 z-40 rounded-t-[28px] border-t border-border bg-pastel-card p-6 pb-28 shadow-[0_-8px_32px_rgba(17,24,39,0.08)] md:hidden"
            >
              <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-pastel-muted/30" />
              
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-pastel-muted">
                Intelli Hire
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { href: "/hyre/resume-agent", label: "Resume Agent" },
                  { href: "/hyre/fraud", label: "AI Fraud" },
                  { href: "/hyre/deepfake", label: "Deepfake" },
                  { href: "/hyre/documents", label: "TRU. Doc" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/20 p-3 text-sm font-medium text-pastel-text backdrop-blur-sm transition hover:bg-white/40 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <span className="size-2 rounded-full bg-accent" />
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-2 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-pastel-muted">
                    Accent Color
                  </span>
                  <div className="flex gap-2">
                    {(["teal", "indigo", "purple", "rose", "amber"] as const).map((color) => {
                      const bgClass = {
                        teal: "bg-[#0d9f8f]",
                        indigo: "bg-[#6366f1]",
                        purple: "bg-[#a855f7]",
                        rose: "bg-[#f43f5e]",
                        amber: "bg-[#d97706]",
                      }[color];

                      const isSelected = accent === color;

                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setAccent(color)}
                          className={cn(
                            "size-4 rounded-full border transition cursor-pointer hover:scale-110",
                            bgClass,
                            isSelected
                              ? "border-white scale-110 ring-1 ring-white/30"
                              : "border-transparent opacity-65"
                          )}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-pastel-muted">
                    Appearance
                  </span>
                  <button
                    type="button"
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="flex items-center gap-2 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-pastel-text backdrop-blur-sm dark:bg-white/5 cursor-pointer"
                  >
                    <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
                    {isDark ? (
                      <svg className="size-3.5" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="M15.8 11A6 6 0 0 1 9 4.2 6.1 6.1 0 1 0 15.8 11Z" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    ) : (
                      <svg className="size-3.5" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </button>
                </div>

                <Link
                  href="/support"
                  className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-pastel-text transition hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span>Support</span>
                  <svg className="size-4 text-pastel-muted" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
