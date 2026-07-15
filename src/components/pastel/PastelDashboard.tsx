"use client";

import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import { PastelMetricCards } from "@/components/pastel/PastelMetricCards";
import { PastelOverviewChart } from "@/components/pastel/PastelOverviewChart";
import { PastelAnalytics } from "@/components/pastel/PastelAnalytics";
import { PastelActivities } from "@/components/pastel/PastelActivities";
import { PastelOrderTable } from "@/components/pastel/PastelOrderTable";

export function PastelDashboard() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
      <FadeIn>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-pastel-muted">
              Tracker
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-pastel-text sm:text-[28px]">
              Tracker
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              defaultValue="10 Oct 2023"
              className="rounded-xl border border-[rgba(180,168,204,0.4)] bg-pastel-card px-3 py-2 text-sm text-pastel-text shadow-sm outline-none focus:ring-2 focus:ring-pastel-lavender/50"
            >
              <option>10 Oct 2023</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
            <span className="text-sm text-pastel-muted">to</span>
            <select
              defaultValue="10 Oct 2023"
              className="rounded-xl border border-[rgba(180,168,204,0.4)] bg-pastel-card px-3 py-2 text-sm text-pastel-text shadow-sm outline-none focus:ring-2 focus:ring-pastel-lavender/50"
            >
              <option>10 Oct 2023</option>
              <option>Today</option>
            </select>
          </div>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-5" delay={0.06}>
        <StaggerItem>
          <PastelMetricCards />
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <div className="xl:col-span-8">
              <PastelOverviewChart />
            </div>
            <div className="xl:col-span-4">
              <PastelAnalytics />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <div className="xl:col-span-4">
              <PastelActivities />
            </div>
            <div className="xl:col-span-8">
              <PastelOrderTable />
            </div>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
