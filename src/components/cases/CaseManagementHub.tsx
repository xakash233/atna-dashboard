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
    <div className="flex w-full min-h-[calc(100vh-7rem)] flex-col gap-3 font-sans text-[#0f172a] antialiased">
      <FadeIn>
        <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]">
              Intelligence Operations
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold tracking-wide text-[#0f172a] sm:text-[28px]">
              Case Management Hub
            </h1>
            <p className="mt-1 text-[10px] font-medium text-[#475569]">
              Active monitoring and triage of intelligence reports.
            </p>
          </div>
          <CaseFilters />
        </div>
      </FadeIn>

      <Stagger className="grid grid-cols-12 gap-3 lg:items-stretch" delay={0.12}>
        <StaggerItem className="col-span-12 min-h-0 lg:col-span-8">
          <CaseVolumeChart data={data.volume} />
        </StaggerItem>
        <StaggerItem className="col-span-12 min-h-0 lg:col-span-4">
          <RiskMatrix data={data.risk} totalLabel={data.totalLabel} />
        </StaggerItem>
      </Stagger>

      <FadeIn delay={0.28} y={20}>
        <PriorityQueue cases={data.cases} />
      </FadeIn>
    </div>
  );
}
