import { DeepfakePage } from "@/components/hyre/DeepfakePage";
import { fetchDeepfake } from "@/lib/api/fraud";

export const metadata = {
  title: "Deepfake Detection | Intelli Hire",
  description: "Detect AI-generated and manipulated candidate videos.",
};

export default async function DeepfakeRoute() {
  const data = await fetchDeepfake();
  return <DeepfakePage data={data} />;
}
