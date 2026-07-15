"use client";

import { CaseFilters } from "@/components/cases/CaseFilters";
import { CaseVolumeChart } from "@/components/cases/CaseVolumeChart";
import { RiskMatrix } from "@/components/cases/RiskMatrix";
import { PriorityQueue } from "@/components/cases/PriorityQueue";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/Motion";
import type { CasesDashboardData } from "@/lib/types";

type CaseManagementHubProps = {
  data: CasesDashboardData;
};

export function CaseManagementHub({ data }: CaseManagementHubProps) {
  return (
    <>
      <FadeIn>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              Intelligence Operations
            </p>
            <h1 className="bg-gradient-to-r from-fg via-fg to-accent bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-[28px]">
              Case Management Hub
            </h1>
            <p className="mt-2 text-base leading-6 text-fg-muted">
              Active monitoring and triage of intelligence reports.
            </p>
          </div>
          <CaseFilters />
        </div>
      </FadeIn>

      <Stagger className="grid grid-cols-12 gap-6 pt-2" delay={0.12}>
        <StaggerItem className="col-span-12 lg:col-span-8">
          <CaseVolumeChart data={data.volume} />
        </StaggerItem>
        <StaggerItem className="col-span-12 lg:col-span-4">
          <RiskMatrix data={data.risk} totalLabel={data.totalLabel} />
        </StaggerItem>
      </Stagger>

      <FadeIn delay={0.28} y={20}>
        <PriorityQueue cases={data.cases} />
      </FadeIn>
    </>
  );
}
