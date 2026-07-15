import { TruDocPage } from "@/components/hyre/TruDocPage";
import { fetchTruDoc } from "@/lib/api/fraud";

export const metadata = {
  title: "Document Tampering | Intelli Hire",
  description: "Payslips, experience letters, degrees — verified, not trusted.",
};

export default async function DocumentsRoute() {
  const data = await fetchTruDoc();
  return <TruDocPage data={data} />;
}
