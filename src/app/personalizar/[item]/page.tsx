import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import ProductCustomizerWizard from "@/components/ProductCustomizationWizard";
import ProductModel from "@/data/models/Product.model";
import { 
  getCachedAdminInfoAction,
  getCachedCustomizationItemsCategoriesAction, 
  getCachedProductsAction 
} from "@/app/actions/cache.actions";
import { 
  removeAccentsAndSpacesToURL 
} from "@/data/functions/removeAccentsAndSpaces";
import Footer from "@/components/Footer";
import { getAllCustomizationItemsAction } from "@/app/actions/customizationItems.action";

interface PageProps {
  params: Promise<{
    item: string;
  }>;
};

export default async function Customization({ params }: PageProps) {
  const { item } = await params;

  const [
    { user },
    products,
    customizationItems,
    categories
  ] = await Promise.all([
    getCachedAdminInfoAction(),
    getCachedProductsAction(),
    getAllCustomizationItemsAction(),
    getCachedCustomizationItemsCategoriesAction(),
  ]);

  const product = products?.find(
    (p: ProductModel) => removeAccentsAndSpacesToURL(p.name) === item
  );
  
  if (!product || !product.customizable || !product.available) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <div className="flex flex-col shrink-0 h-dvh">
        <Header mode="user" />
        <main className={`flex-1 flex flex-col px-4 pt-16 pb-4 
          md:px-12 lg:px-16 overflow-hidden`}
        >
          <ProductCustomizerWizard 
            baseProduct={product} 
            customizationItems={customizationItems} 
            categories={categories}
          />
        </main>
      </div>
      <div className="hidden md:block shrink-0">
        <Footer 
          whatsappNumber={user?.phone || '5586994379414'}
        />
      </div>
    </div>
  );
};
