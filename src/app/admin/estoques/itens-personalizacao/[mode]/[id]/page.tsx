import { notFound } from "next/navigation";
import { 
  getCachedCustomizationItemsAction, 
  getCachedCustomizationItemsCategoriesAction 
} from "@/app/actions/cache.actions";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
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
  const cachedItems = await getCachedCustomizationItemsAction();
  const cachedCategories = await getCachedCustomizationItemsCategoriesAction();

  const itemToEdit = mode === 'editar' 
    ? cachedItems.find((item: CustomizationItemsModel) => item.id === id)
    : undefined;

  if (mode !== 'editar' && !itemToEdit) {
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
          initialData={itemToEdit}
          customizationItems={cachedItems}
          categories={cachedCategories}
        />
      </main>
    </div>
  );
};