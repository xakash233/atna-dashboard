import { TrackerPage } from "@/components/tracker/TrackerPage";
import { fetchTrackerDashboard } from "@/lib/api/tracker";

export default async function HomePage() {
  const data = await fetchTrackerDashboard();
  return <TrackerPage data={data} />;
}
