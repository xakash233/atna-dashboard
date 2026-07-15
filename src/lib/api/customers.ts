import type { CustomerDashboardData } from "@/lib/types";

/** Design fixtures from Figma Customer Management (light) */
export const FIGMA_CUSTOMER_FIXTURE: CustomerDashboardData = {
  metrics: {
    activeCustomers: { value: "1,248", delta: "+12%", tone: "slate" },
    mrr: { value: "$84.5k", delta: "+5.4%", tone: "indigo" },
    churn: { value: "1.2%", delta: "-2.1%", tone: "zinc" },
  },
  orgDistribution: {
    total: 324,
    slices: [
      { name: "Tech", value: 45, colorKey: "indigo" },
      { name: "Fin", value: 30, colorKey: "slate" },
      { name: "Health", value: 25, colorKey: "zinc" },
    ],
  },
  growth: [
    { day: "1", users: 420, engagement: 280 },
    { day: "5", users: 510, engagement: 340 },
    { day: "10", users: 480, engagement: 390 },
    { day: "15", users: 620, engagement: 450 },
    { day: "20", users: 710, engagement: 520 },
    { day: "25", users: 780, engagement: 610 },
    { day: "30", users: 860, engagement: 700 },
  ],
  customers: [
    {
      name: "Acme Corp",
      domain: "acme.io",
      initial: "A",
      status: "Healthy",
      lastInteraction: "2 hours ago",
      riskLabel: "Low",
      riskPercent: 18,
      avatarTone: "indigo",
    },
    {
      name: "Globex Inc",
      domain: "globex.com",
      initial: "G",
      status: "At Risk",
      lastInteraction: "1 day ago",
      riskLabel: "Medium",
      riskPercent: 52,
      avatarTone: "slate",
    },
    {
      name: "Soylent Corp",
      domain: "soylent.net",
      initial: "S",
      status: "Critical",
      lastInteraction: "3 days ago",
      riskLabel: "High",
      riskPercent: 88,
      avatarTone: "zinc",
    },
  ],
};

export async function fetchCustomerDashboard(): Promise<CustomerDashboardData> {
  // TODO: GET /api/customers/dashboard
  await new Promise((r) => setTimeout(r, 0));
  return FIGMA_CUSTOMER_FIXTURE;
}
