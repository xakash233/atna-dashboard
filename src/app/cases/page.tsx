import { CaseManagementHub } from "@/components/cases/CaseManagementHub";
import { fetchCasesDashboard } from "@/lib/api/cases";

export const metadata = {
  title: "Case Management Hub | Aether Intelligence",
  description: "Active monitoring and triage of intelligence reports.",
};

export default async function CasesPage() {
  const data = await fetchCasesDashboard();
  return <CaseManagementHub data={data} />;
}
