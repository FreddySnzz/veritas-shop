import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Header } from "@/components/Header";
import ManageCatalogInventory from "@/components/admin/CatalogInventory";

export default function ManageInvertoryCatalogPage() {
  return (
    <>
      <Header mode="admin" />
      <main className="w-full h-screen bg-background-alternative">
        <DynamicBreadcrumb 
          className="mt-12 p-6" 
          listClassName="" 
        />
        <ManageCatalogInventory />
      </main>
    </>
  )
}