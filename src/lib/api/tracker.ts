import type { AsyncState } from "@/lib/types";

export type TrackerTab = "overview" | "sub-orgs" | "users" | "usage" | "credits";

export interface TrackerMetrics {
  totalUsers: number;
  transactions: number;
  todaysTxns: number;
  subOrganizations: number;
}

export interface TrackerOrgDetails {
  name: string;
  code: string;
  level: string;
  plan: string;
  country: string;
  city: string;
  status: "Active" | "Inactive";
  parentOrganization: string;
  address: string;
  createdByName: string;
  createdByEmail: string;
  createdDate: string;
}

export interface TrackerCredit {
  key: string;
  label: string;
  balance: number;
}

export interface TrackerDashboardData {
  state: AsyncState;
  metrics: TrackerMetrics;
  org: TrackerOrgDetails;
  credits: TrackerCredit[];
}

/** Fixture from product content — no invented business values */
export async function fetchTrackerDashboard(): Promise<TrackerDashboardData> {
  return {
    state: "success",
    metrics: {
      totalUsers: 2,
      transactions: 0,
      todaysTxns: 0,
      subOrganizations: 0,
    },
    org: {
      name: "QA Testing",
      code: "QAAA1121121",
      level: "Central",
      plan: "FREE_TRIAL",
      country: "India",
      city: "Pandharpur",
      status: "Active",
      parentOrganization: "Atna",
      address: "West Coast, Pandharpur - 121221, Maharashtra, India",
      createdByName: "Santhosh Kumar",
      createdByEmail: "santhoshatna@yopmail.com",
      createdDate: "08-07-2026",
    },
    credits: [
      { key: "tru_vu", label: "tru_vu", balance: 9 },
      { key: "tru_doc", label: "Tru. Doc", balance: 96 },
      { key: "hyre_fraud", label: "hyre_fraud", balance: 7 },
    ],
  };
}
