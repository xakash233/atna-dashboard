import Image from "next/image";
import Link from "next/link";
import { APP, CURRENT_USER, TOP_NAV } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

type TopNavBarProps = {
  activeHref?: string;
};

export function TopNavBar({ activeHref = "/" }: TopNavBarProps) {
  return (
    <header
      className="relative z-40 flex h-16 w-full items-center justify-between border-b border-border-subtle bg-bg-nav px-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:px-8 lg:px-16"
      data-node-id="3:679"
    >
      <div className="flex h-full items-center gap-4 lg:gap-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="relative grid place-items-center">
            <span className="absolute inset-0 rounded-full bg-accent/20 opacity-0 blur-md transition group-hover:opacity-100" />
            <Image
              src="/assets/logo-hex.svg"
              alt=""
              width={21}
              height={18}
              className="relative h-[18px] w-[21px] transition duration-300 group-hover:scale-110 dark:invert-0 invert-[0.35] hue-rotate-[220deg] saturate-150 brightness-75"
              unoptimized
            />
          </span>
          <span className="text-lg font-bold tracking-[-0.6px] text-brand transition group-hover:text-accent sm:text-2xl">
            {APP.name}
          </span>
        </Link>

        <nav
          className="hidden h-full items-end gap-6 pl-4 md:flex lg:pl-8"
          aria-label="Primary"
        >
          {TOP_NAV.map((item) => {
            const active = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={cn(
                  "nav-link-premium pb-[18px] text-sm",
                  active
                    ? "font-bold text-accent"
                    : "font-normal text-fg-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <label className="relative hidden sm:block">
          <span className="sr-only">Search parameters</span>
          <Image
            src="/assets/icon-search.svg"
            alt=""
            width={11}
            height={11}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70 dark:opacity-100"
            unoptimized
          />
          <input
            type="search"
            placeholder="Search parameters..."
            className="h-8 w-40 rounded-xl border border-border-subtle bg-surface-elevated py-2 pl-10 pr-4 text-sm text-fg placeholder:text-fg-muted outline-none transition focus:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/40 lg:w-64"
          />
        </label>

        <button
          type="button"
          className="btn-premium rounded-xl bg-accent px-3 py-1.5 text-sm text-accent-fg shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--accent)_70%,transparent)] transition hover:brightness-110 hover:shadow-[0_12px_28px_-8px_color-mix(in_srgb,var(--accent)_80%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-base"
        >
          Ask AI
        </button>

        <ThemeToggle />

        <button
          type="button"
          className="relative rounded-xl p-2 text-fg-muted transition hover:bg-overlay hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Notifications"
        >
          <Image
            src="/assets/icon-bell.svg"
            alt=""
            width={16}
            height={20}
            className="h-5 w-4 opacity-80 dark:opacity-100"
            unoptimized
          />
          <span className="absolute right-2 top-2 size-1.5 animate-pulse rounded-full bg-critical shadow-[0_0_8px_var(--critical)]" />
        </button>

        <button
          type="button"
          className="rounded-xl p-2 text-fg-muted transition hover:bg-overlay hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`${CURRENT_USER.displayName} profile`}
        >
          <Image
            src="/assets/icon-user.svg"
            alt=""
            width={20}
            height={20}
            className="size-5 opacity-80 dark:opacity-100"
            unoptimized
          />
        </button>
      </div>
    </header>
  );
}
