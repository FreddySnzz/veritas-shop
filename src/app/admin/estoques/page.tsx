import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Header } from "@/components/Header";
import AdminInventoryLayout from "@/components/admin/AdminInventoryLayout";

export default function AdminInvetoryPage() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
        </div>
        <AdminInventoryLayout />
      </main>
    </div>
  );
};