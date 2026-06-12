import { notFound } from "next/navigation";
import { 
  getCachedAdminInfoAction,
  getCachedCustomizationItemsAction, 
  getCachedCustomizationItemsCategoriesAction 
} from "@/app/actions/cache.actions";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { CustomizationItemForm } from "@/components/admin/CustomizationItemForm";
import Footer from "@/components/Footer";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";

interface PageProps {
  params: Promise<{
    mode: string;
  }>;
};

export default async function AddProductCatalogPage({ params }: PageProps) {
  const { user } = await getCachedAdminInfoAction();
  const { mode } = await params;
  const items = await getCachedCustomizationItemsAction();
  const cachedCategories = await getCachedCustomizationItemsCategoriesAction();
  const filtered = cachedCategories.filter(
    (category: CustomizationItemsCategoryModel) => category.available === true
  );

  if (mode !== 'adicionar') {
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
            customizationItems={items}
            categories={filtered}
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