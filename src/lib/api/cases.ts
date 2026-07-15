import type { CasesDashboardData } from "@/lib/types";

/**
 * Design fixtures from Figma Case Management Hub (node 3:678).
 * Replace with real API responses via fetchCasesDashboard().
 */
export const FIGMA_CASES_FIXTURE: CasesDashboardData = {
  totalLabel: "1.2k",
  volume: [
    { day: "Mon", volume: 900 },
    { day: "Tue", volume: 1200 },
    { day: "Wed", volume: 1050 },
    { day: "Thu", volume: 1500 },
    { day: "Fri", volume: 1800 },
    { day: "Sat", volume: 1600 },
    { day: "Sun", volume: 2100 },
  ],
  risk: [
    { name: "Critical", value: 15, color: "var(--critical)" },
    { name: "Elevated", value: 30, color: "var(--elevated)" },
    { name: "Standard", value: 55, color: "var(--standard)" },
  ],
  cases: [
    {
      id: "#AX-992-B",
      subject: "Anomalous Data Pattern Detected in Node 4",
      risk: "Critical",
      assignedEntity: "Neural Net Alpha",
      lastUpdated: "2 mins ago",
    },
    {
      id: "#CX-104-A",
      subject: "Bandwidth Spikes in Sector 7G",
      risk: "Elevated",
      assignedEntity: "Data Pipeline",
      lastUpdated: "14 mins ago",
    },
    {
      id: "#MN-402-X",
      subject: "Routine Protocol Verification",
      risk: "Standard",
      assignedEntity: "System Auth",
      lastUpdated: "1 hr ago",
    },
    {
      id: "#MN-401-X",
      subject: "User Access Audit Log Generation",
      risk: "Standard",
      assignedEntity: "Compliance Bot",
      lastUpdated: "3 hrs ago",
    },
  ],
};

/**
 * API integration placeholder.
 * Wire to your backend: GET /api/cases/dashboard
 */
export async function fetchCasesDashboard(): Promise<CasesDashboardData> {
  // TODO: replace with real fetch
  // const res = await fetch("/api/cases/dashboard", { next: { revalidate: 30 } });
  // if (!res.ok) throw new Error("Failed to load cases");
  // return res.json();

  await new Promise((r) => setTimeout(r, 0));
  return FIGMA_CASES_FIXTURE;
}
