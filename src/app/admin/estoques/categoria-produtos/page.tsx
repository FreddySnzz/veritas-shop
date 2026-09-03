import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { getCachedProductCategoriesAction } from "@/app/actions/cache.actions";
import Footer from "@/components/Footer";
import { ProductCategoryModel } from "@/data/models/ProductCategory.model";
import { ManageProductCategoryLayout } from "@/components/admin/ManageProductCategory";

export default async function ManageProductCategoryPage() {
  const categories = await getCachedProductCategoriesAction();
  categories.map((category: ProductCategoryModel) => category);

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
          <ManageProductCategoryLayout categories={categories} />
        </main>
      </div>
      <div className="hidden lg:block shrink-0">
        <Footer />
      </div>
    </div>
  )
}