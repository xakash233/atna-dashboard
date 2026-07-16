"use client";
import AnimatedButton from "@/components/ui/AnimatedButton";

import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { CustomerDashboardData } from "@/lib/types";
import { MetricCards } from "@/components/customers/MetricCards";
import { OrgDistribution } from "@/components/customers/OrgDistribution";
import { GrowthChart } from "@/components/customers/GrowthChart";
import { CustomerActivityTable } from "@/components/customers/CustomerActivityTable";

type CustomerDashboardProps = {
  data: CustomerDashboardData;
};

export function CustomerDashboard({ data }: CustomerDashboardProps) {
  return (
    <>
      <FadeIn>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-sm">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-fg">
              Customer Dashboard
            </h1>
            <p className="mt-1 text-sm leading-5 text-fg-muted">
              Real-time metrics and organization overview.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <AnimatedButton
              type="button"
              className="rounded-xl border border-neutral-300/80 bg-slate-50/50 px-6 py-2 text-xs font-semibold tracking-wide text-[#1E90FF] backdrop-blur-[2px] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E90FF] dark:border-border dark:bg-surface-elevated dark:text-accent"
            >
              Export Data
            </AnimatedButton>
            <AnimatedButton
              type="button"
              className="btn-premium rounded-xl bg-[#1E90FF] px-6 py-2.5 text-xs font-semibold tracking-wide text-white shadow-[0_10px_15px_-3px_rgba(30,144,255,0.30),0_4px_6px_-4px_rgba(30,144,255,0.30)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E90FF] dark:bg-accent dark:text-accent-fg"
            >
              + New Customer
            </AnimatedButton>
          </div>
        </div>
      </FadeIn>

      <Stagger className="flex flex-col gap-3" delay={0.08}>
        <StaggerItem>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCards metrics={data.metrics} />
            <OrgDistribution
              total={data.orgDistribution.total}
              slices={data.orgDistribution.slices}
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <GrowthChart data={data.growth} />
        </StaggerItem>

        <StaggerItem>
          <CustomerActivityTable customers={data.customers} />
        </StaggerItem>
      </Stagger>
    </>
  );
}
