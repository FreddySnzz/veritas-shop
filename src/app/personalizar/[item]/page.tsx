import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import ProductCustomizerWizard from "@/components/ProductCustomizationWizard";
import ProductModel from "@/data/models/Product.model";
import { 
  getCachedCustomizationItemsAction, 
  getCachedCustomizationItemsCategoriesAction, 
  getCachedProductsAction 
} from "@/app/actions/cache.actions";
import { removeAccentsAndSpacesToURL } from "@/data/functions/removeAccentsAndSpaces";

interface PageProps {
  params: Promise<{
    item: string;
  }>;
};

export default async function Customization({ params }: PageProps) {
  const { item } = await params;
  const products = await getCachedProductsAction();
  const customizationItems = await getCachedCustomizationItemsAction();
  const categories = await getCachedCustomizationItemsCategoriesAction();
  const product = products?.find((p: ProductModel) => removeAccentsAndSpacesToURL(p.name) === item);
  
  if (!product || !product.customizable || !product.available) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="user" />
      <main className="flex-1 flex flex-col mt-16 bg-background-alternative overflow-hidden">
        <ProductCustomizerWizard 
          baseProduct={product} 
          customizationItems={customizationItems} 
          categories={categories}
        />
      </main>
    </div>
  );
};
