import { Suspense } from "react";
import { 
  getCachedProductCategoriesAction,
  getCachedProductsAction,
} from "@/app/actions/cache.actions";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Footer from "@/components/Footer";
import ProductsPageLayout from "@/components/ProductsLayout";
import ProductModel from "@/data/models/Product.model";

export default async function ProductsPage() {
  const products = await getCachedProductsAction();
  const availableProducts = products?.filter((product: ProductModel) => product.available);
  const categories = await getCachedProductCategoriesAction();

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <div className="flex flex-col shrink-0 h-dvh">
        <Header mode="user" />
        <main className={`flex-1 flex flex-col px-4 pb-4 mt-16
          md:px-12 md:mt-0 lg:px-16 overflow-hidden`}
        >
          <div className="hidden md:block shrink-0 md:mb-2">
            <DynamicBreadcrumb className="mt-16 py-4" />
            <hr className="border-muted-foreground/50 mb-4" />
          </div>
          <Suspense fallback={
            <div className="p-4">Carregando itens...</div>
          }>
            <ProductsPageLayout 
              products={availableProducts} 
              categories={categories}
            />
          </Suspense>
        </main>
      </div>
      <div className="hidden lg:block shrink-0">
        <Footer />
      </div>
    </div>
  )
}