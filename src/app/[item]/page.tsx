import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import ProductModel from "@/data/models/Product.model";
import ProductPageLayout from "@/components/ProductPageLayout";
import { getCachedProductsAction } from "../actions/cache.actions";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";

interface PageProps {
  params: Promise<{
    item: string;
  }>;
};

export default async function AddProductCatalogPage({ params }: PageProps) {
  const { item } = await params;
  const getProducts = await getCachedProductsAction();
  const availableProducts = getProducts?.filter((product: ProductModel) => product.available);
  const product = getProducts.find((product: ProductModel) => mountProductUrl(product) === item);

  if (!product) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header 
        mode="user" 
        search 
        data={availableProducts}
      />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <ProductPageLayout 
          product={product} 
          cachedProducts={getProducts}
        />
      </main>
    </div>
  );
};