import { 
  getCachedAdminInfoAction, 
  getCachedCustomizationItemsCategoriesAction 
} from "@/app/actions/cache.actions";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { ProductForm } from "@/components/admin/ProductCatalogForm";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ mode: 'adicionar' }, { mode: 'editar' }];
};

export default async function AddProductCatalogPage({ params }: { 
  params: Promise<{ mode: string }> 
}) {
  const { user } = await getCachedAdminInfoAction();
  const { mode } = await params;
  const categories = await getCachedCustomizationItemsCategoriesAction();

  if (mode !== 'adicionar' && mode !== 'editar') {
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
            <hr className="border-muted-foreground/50 mb-4" />
          </div>
          <ProductForm 
            initialData={null} 
            customizationOptions={categories}
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