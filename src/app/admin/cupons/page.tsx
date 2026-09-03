import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { getCachedProductsAction } from "@/app/actions/cache.actions";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ManageCouponsLayout from "@/components/admin/ManageCouponsLayout";
import { getAllCouponsAction } from "@/app/actions/coupons.action";

export default async function CouponsPage() {
  const coupons = await getAllCouponsAction();
  const products = await getCachedProductsAction();

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <div className="flex flex-col shrink-0 h-dvh">
        <Header mode="admin" />
        <main className={`flex-1 flex flex-col px-4 pb-4 mt-20
          md:px-12 md:mt-0 lg:px-16 overflow-hidden`}
        >
          <div className="hidden md:block shrink-0 md:mb-2">
            <DynamicBreadcrumb className="mt-16 py-4" />
            <hr className="border-muted-foreground/50 mb-4" />
          </div>
          <ManageCouponsLayout 
            coupons={coupons} 
            products={products}
          />
        </main>
      </div>
      <div className="hidden lg:block shrink-0">
        <Footer />
      </div>
    </div>
  );
};