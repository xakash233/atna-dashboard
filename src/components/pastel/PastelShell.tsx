import { AtnaSidebar } from "@/components/layout/AtnaSidebar";
import { AtnaTopBar } from "@/components/layout/AtnaTopBar";
import { MobileNavBar } from "@/components/layout/MobileNavBar";

export function PastelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full bg-pastel-bg text-pastel-text">
      <AtnaSidebar />
      <div className="flex min-h-full flex-col transition-[padding] duration-300 ease-out md:pl-[calc(var(--sidebar-width)+0.75rem)]">
        <AtnaTopBar />
        <main className="relative z-10 flex-1 bg-transparent px-2 pb-20 pt-2 text-pastel-text sm:px-3 md:pb-3 lg:px-3 lg:pt-2">
          {children}
        </main>
      </div>
      <MobileNavBar />
    </div>
  );
}
