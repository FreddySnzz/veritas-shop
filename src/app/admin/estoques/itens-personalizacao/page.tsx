import { getCachedCustomizationItemsAction } from "@/app/actions/cache.actions";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ManageCustomizationItemsInventoryLayout from "@/components/admin/ManageCustomizationItemsLayout";

export default async function ManageInvertoryCatalogPage() {
  const items = await getCachedCustomizationItemsAction()

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
          <hr className="border-muted-foreground/50 mb-4 mx-6" />
        </div>
        <ManageCustomizationItemsInventoryLayout
          customizationItems={items}
        />
      </main>
    </div>
  );
};