export type RiskLevel = "Critical" | "Elevated" | "Standard";

export type AsyncState = "idle" | "loading" | "success" | "empty" | "error";

export interface CaseRecord {
  id: string;
  subject: string;
  risk: RiskLevel;
  assignedEntity: string;
  lastUpdated: string;
}

export interface VolumePoint {
  day: string;
  volume: number;
}

export interface RiskSlice {
  name: RiskLevel;
  value: number;
  color: string;
}

export interface CasesDashboardData {
  volume: VolumePoint[];
  risk: RiskSlice[];
  totalLabel: string;
  cases: CaseRecord[];
}

export type MetricTone = "indigo" | "slate" | "zinc";

export interface CustomerMetric {
  value: string;
  delta: string;
  tone: MetricTone;
}

export interface OrgSlice {
  name: string;
  value: number;
  colorKey: MetricTone;
}

export interface GrowthPoint {
  day: string;
  users: number;
  engagement: number;
}

export interface CustomerActivity {
  name: string;
  domain: string;
  initial: string;
  status: "Healthy" | "At Risk" | "Critical";
  lastInteraction: string;
  riskLabel: string;
  riskPercent: number;
  avatarTone: MetricTone;
}

export interface CustomerDashboardData {
  metrics: {
    activeCustomers: CustomerMetric;
    mrr: CustomerMetric;
    churn: CustomerMetric;
  };
  orgDistribution: {
    total: number;
    slices: OrgSlice[];
  };
  growth: GrowthPoint[];
  customers: CustomerActivity[];
}
