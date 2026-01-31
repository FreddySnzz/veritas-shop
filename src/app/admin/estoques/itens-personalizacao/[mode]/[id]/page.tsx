import { notFound } from "next/navigation";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Header } from "@/components/Header";
import { getCachedCustomizationItemsAction } from "@/app/actions/cache.actions";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { CustomizationItemForm } from "@/components/admin/CustomizationItemForm";

interface PageProps {
  params: Promise<{
    mode: string;
    id: string;
  }>;
};

export default async function AddProductCatalogPage({ params }: PageProps) {
  const { id, mode } = await params;
  const items = await getCachedCustomizationItemsAction();

  if (mode !== 'editar') {
    notFound();
  };
  
  if (!items.some((item: CustomizationItemsModel) => item.id === id)) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
        </div>
        <CustomizationItemForm 
          mode={mode}
          itemId={id}
        />
      </main>
    </div>
  );
};