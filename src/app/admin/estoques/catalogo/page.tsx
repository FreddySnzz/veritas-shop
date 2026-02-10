import { getCachedProductsAction } from "@/app/actions/cache.actions";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Header } from "@/components/Header";
import ManageCatalogInventory from "@/components/admin/CatalogInventory";

export default async function ManageInvertoryCatalogPage() {
  const products = await getCachedProductsAction();

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
          <hr className="border-muted-foreground/50 mb-4 mx-6" />
        </div>
        <ManageCatalogInventory products={products} />
      </main>
    </div>
  );
};