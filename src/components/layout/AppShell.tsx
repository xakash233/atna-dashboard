import { TopNavBar } from "@/components/layout/TopNavBar";
import { SideNavBar } from "@/components/layout/SideNavBar";

type AppShellProps = {
  children: React.ReactNode;
  activeTopHref?: string;
};

export function AppShell({ children, activeTopHref = "/" }: AppShellProps) {
  return (
    <div className="relative min-h-full overflow-x-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/assets/bg-circuit.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "var(--bg-pattern-opacity)",
        }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-orb ambient-orb--accent -left-24 -top-32 h-[420px] w-[420px]" />
        <div className="ambient-orb ambient-orb--teal -bottom-40 right-[-80px] h-[480px] w-[480px]" />
        <div className="bg-grid-premium absolute inset-0 opacity-60 dark:opacity-40" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 45%), radial-gradient(ellipse at 80% 100%, color-mix(in srgb, var(--standard) 10%, transparent), transparent 40%)",
        }}
      />

      <TopNavBar activeHref={activeTopHref} />
      <SideNavBar />

      <main className="relative z-10 min-h-[calc(100vh-64px)] w-full px-4 pb-10 pt-8 sm:px-8 lg:pl-[296px] lg:pr-16">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}
