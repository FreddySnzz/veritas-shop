import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { ProductForm } from "@/components/admin/ProductCatalogForm";
import { getProductByIdAction } from "@/app/actions/products.action";
import { getCachedCustomizationItemsCategoriesAction } from "@/app/actions/cache.actions";

export default async function AddProductCatalogPage({ params }: {
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = await getProductByIdAction(id);
  const categories = await getCachedCustomizationItemsCategoriesAction();

  if (!product) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
          <hr className="border-muted-foreground/50 mb-4 mx-6" />
        </div>
        <ProductForm 
          initialData={product} 
          customizationOptions={categories}
        />
      </main>
    </div>
  );
};