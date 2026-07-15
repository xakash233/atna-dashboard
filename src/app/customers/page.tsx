import { CustomerManagementPage } from "@/components/customers/CustomerManagementPage";
import { fetchCustomerManagement } from "@/lib/api/customerManagement";

export const metadata = {
  title: "Customer Management | Atna",
  description: "Manage organization, users, and roles.",
};

export default async function CustomersPage() {
  const data = await fetchCustomerManagement();
  return <CustomerManagementPage data={data} />;
}
