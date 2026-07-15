import { fetchTrackerDashboard } from "@/lib/api/tracker";

export type CustomerMgmtTab = "overview" | "branch" | "users" | "roles";

export interface CustomerMgmtOrg {
  name: string;
  code: string;
  level: string;
  parentOrganization: string;
  address: string;
  createdByInitial: string;
  createdByName: string;
  createdByEmail: string;
  createdDate: string;
}

export interface CustomerMgmtData {
  org: CustomerMgmtOrg;
}

/** Reuse tracker org fixture — same source content, no invented values */
export async function fetchCustomerManagement(): Promise<CustomerMgmtData> {
  const tracker = await fetchTrackerDashboard();
  return {
    org: {
      name: tracker.org.name,
      code: tracker.org.code,
      level: tracker.org.level,
      parentOrganization: tracker.org.parentOrganization,
      address: tracker.org.address,
      createdByInitial: tracker.org.createdByName.charAt(0).toUpperCase(),
      createdByName: tracker.org.createdByName,
      createdByEmail: tracker.org.createdByEmail,
      createdDate: tracker.org.createdDate,
    },
  };
}
