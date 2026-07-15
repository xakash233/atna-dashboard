import { AtnaSidebar } from "@/components/layout/AtnaSidebar";
import { AtnaTopBar } from "@/components/layout/AtnaTopBar";
import { MobileNavBar } from "@/components/layout/MobileNavBar";

export function PastelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full bg-transparent">
      <AtnaSidebar />
      <div className="flex min-h-full flex-col md:pl-[var(--sidebar-width)]">
        <AtnaTopBar />
        <main className="relative z-10 flex-1 px-3 py-3 sm:px-4 lg:px-5 lg:py-4 pb-24 md:pb-4">
          {children}
        </main>
      </div>
      <MobileNavBar />
    </div>
  );
}
