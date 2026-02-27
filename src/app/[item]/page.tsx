import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import ProductModel from "@/data/models/Product.model";
import ProductPageLayout from "@/components/ProductPageLayout";
import { 
  getCachedAdminInfoAction, 
  getCachedProductsAction 
} from "../actions/cache.actions";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{
    item: string;
  }>;
};

export default async function AddProductCatalogPage({ params }: PageProps) {
  const { user } = await getCachedAdminInfoAction();
  const { item } = await params;
  const getProducts = await getCachedProductsAction();
  const availableProducts = getProducts?.filter((product: ProductModel) => product.available);
  const product = getProducts.find(
    (product: ProductModel) => mountProductUrl(product.name, product.available) === item
  );

  if (!product) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header 
        mode="user" 
        search 
        data={availableProducts}
      />
      <main className="flex-1 flex flex-col">
        <ProductPageLayout 
          product={product} 
          cachedProducts={getProducts}
        />
      </main>
      <Footer 
        whatsappNumber={user?.phone || '5586994379414'}
      />
    </div>
  );
};