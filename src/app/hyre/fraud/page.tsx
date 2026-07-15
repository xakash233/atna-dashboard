import { FraudDetectorPage } from "@/components/hyre/FraudDetectorPage";
import { fetchFraudDetector } from "@/lib/api/fraud";

export const metadata = {
  title: "AI Fraud Detector | Intelli Hire",
  description: "Forensic resume screening · 6-stage validation.",
};

export default async function FraudRoute() {
  const data = await fetchFraudDetector();
  return <FraudDetectorPage data={data} />;
}
