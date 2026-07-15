"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { APP, CURRENT_USER } from "@/lib/constants";

export function AtnaTopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between border-b border-border bg-pastel-card px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-accent-soft">
          <Image src="/assets/logo-hex.svg" alt="" width={18} height={16} unoptimized />
        </span>
        <span className="text-lg font-bold tracking-tight text-pastel-text">{APP.name}</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <AnimatedButton
          type="button"
          className="grid size-10 place-items-center rounded-full text-pastel-muted transition hover:bg-surface-muted hover:text-pastel-text"
          aria-label="Notifications"
        >
          <Image src="/assets/icon-bell.svg" alt="" width={16} height={20} className="opacity-70" unoptimized />
        </AnimatedButton>
        <AnimatedButton
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="grid size-10 place-items-center rounded-full text-pastel-muted transition hover:bg-surface-muted hover:text-pastel-text"
          aria-label="Toggle theme"
        >
          <svg className="size-[18px]" viewBox="0 0 20 20" fill="none" aria-hidden>
            {isDark ? (
              <path d="M15.8 11A6 6 0 0 1 9 4.2 6.1 6.1 0 1 0 15.8 11Z" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <>
                <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 2.5v1.5M10 16v1.5M2.5 10h1.5M16 10h1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </>
            )}
          </svg>
        </AnimatedButton>

        <div className="ml-1 flex items-center gap-2.5 rounded-full border border-border bg-surface-muted/60 py-1 pl-1 pr-3">
          <span className="grid size-9 place-items-center rounded-full bg-accent text-xs font-bold text-white">
            {CURRENT_USER.firstName.charAt(0)}
            {CURRENT_USER.lastName.charAt(0)}
          </span>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold text-pastel-text">{CURRENT_USER.displayName}</p>
            <p className="truncate text-xs text-pastel-muted">{CURRENT_USER.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
