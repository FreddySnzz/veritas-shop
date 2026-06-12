import { notFound } from "next/navigation";
import { 
  getCachedAdminInfoAction,
  getCachedCustomizationItemsAction, 
  getCachedCustomizationItemsCategoriesAction 
} from "@/app/actions/cache.actions";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { CustomizationItemForm } from "@/components/admin/CustomizationItemForm";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{
    mode: string;
    id: string;
  }>;
};

export default async function AddProductCatalogPage({ params }: PageProps) {
  const { user } = await getCachedAdminInfoAction();
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
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <div className="flex flex-col shrink-0 h-dvh">
        <Header mode="admin" />
        <main className={`flex-1 flex flex-col px-4 pb-4 mt-16
          md:px-12 md:mt-0 lg:px-16 overflow-hidden`}
        >
          <div className="hidden md:block shrink-0 md:mb-2">
            <DynamicBreadcrumb className="mt-16 py-4" />
          </div>
          <CustomizationItemForm 
            mode={mode}
            initialData={itemToEdit}
            customizationItems={cachedItems}
            categories={cachedCategories}
          />
        </main>
      </div>
      <div className="hidden lg:block shrink-0">
        <Footer 
          whatsappNumber={user?.phone || '5586994379414'}
        />
      </div>
    </div>
  );
};