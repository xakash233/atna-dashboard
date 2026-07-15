import { ResumeAgentPage } from "@/components/hyre/ResumeAgentPage";
import { fetchResumeAgent } from "@/lib/api/hyre";

export const metadata = {
  title: "Resume Agent | Intelli Hire",
  description: "Create jobs, upload résumés in bulk, and shortlist with AI.",
};

export default async function ResumeAgentRoute() {
  const data = await fetchResumeAgent();
  return <ResumeAgentPage data={data} />;
}
