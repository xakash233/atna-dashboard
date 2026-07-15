import { AtnaSidebar } from "@/components/layout/AtnaSidebar";
import { AtnaTopBar } from "@/components/layout/AtnaTopBar";
import { MobileNavBar } from "@/components/layout/MobileNavBar";

export function PastelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full bg-transparent">
      <AtnaSidebar />
      <div className="flex min-h-full flex-col md:pl-[var(--sidebar-width)]">
        <AtnaTopBar />
        <main className="relative z-10 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 pb-28 md:pb-8">
          {children}
        </main>
      </div>
      <MobileNavBar />
    </div>
  );
}
