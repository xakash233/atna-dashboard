"use client";

import AnimatedButton from "@/components/ui/AnimatedButton";
import Image from "next/image";
import Link from "next/link";
import { APP, CURRENT_USER } from "@/lib/constants";

export function AtnaTopBar() {
  return (
    <div className="sticky top-0 z-30 shrink-0 px-2 pt-2 sm:px-3">
      <header className="mx-auto flex h-11 max-w-[1440px] items-center justify-between rounded-2xl border border-[#e2e8f0] bg-white/95 px-3 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:h-12 sm:px-3.5 dark:border-[var(--sidebar-border)] dark:bg-[var(--sidebar-bg)]/95">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src="/assets/logo-atna.svg"
            alt=""
            width={22}
            height={22}
            className="size-5 shrink-0 sm:size-6"
            unoptimized
          />
          <span className="truncate text-[15px] font-bold tracking-tight text-[#0f172a] sm:text-base dark:text-pastel-text">
            {APP.name}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <AnimatedButton
            type="button"
            className="grid size-8 place-items-center rounded-full text-[#64748b] transition hover:bg-[#E8F4FF] hover:text-[#1E90FF] dark:hover:bg-[var(--hover-glass)] dark:hover:text-[#7ec8ff]"
            aria-label="Notifications"
          >
            <svg className="size-[15px]" viewBox="0 0 16 20" fill="none" aria-hidden>
              <path
                d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0V17M8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20V20M4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15V15"
                fill="currentColor"
              />
            </svg>
          </AnimatedButton>

          <div className="ml-0.5 flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-0.5 pl-0.5 pr-2.5 dark:border-[var(--sidebar-border)] dark:bg-white/5">
            <span className="grid size-7 place-items-center rounded-full bg-[#1E90FF] text-[10px] font-bold text-white transition-transform duration-200 hover:scale-110">
              {CURRENT_USER.firstName.charAt(0)}
              {CURRENT_USER.lastName.charAt(0)}
            </span>
            <div className="hidden min-w-0 max-w-[140px] sm:block lg:max-w-[180px]">
              <p className="truncate text-[11px] font-semibold leading-tight text-[#0f172a] dark:text-pastel-text">
                {CURRENT_USER.displayName}
              </p>
              <p className="truncate text-[9px] font-medium leading-tight text-[#64748b] dark:text-pastel-muted">
                {CURRENT_USER.email}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
