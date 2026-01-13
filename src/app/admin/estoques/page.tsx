import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Header } from "@/components/Header";
import AdminInventory from "@/components/admin/Inventory";

export default function AdminInvetoryPage() {
  return (
    <>
      <Header mode="admin" />
      <main className="w-full h-screen bg-background-alternative">
        <DynamicBreadcrumb 
          className="mt-12 p-6" 
          listClassName="" 
        />
        <AdminInventory />
      </main>
    </>
  )
}