import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  getCachedAdminInfoAction, 
  getCachedProductsAction 
} from "../actions/cache.actions";
import ProductModel from "@/data/models/Product.model";
import OrdersLayout from "@/components/OrdersLayout";

export default async function OrdersPage() {
  const { user } = await getCachedAdminInfoAction();
  const products = await getCachedProductsAction();
  const availableProducts = products?.filter((product: ProductModel) => product.available);

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <Header mode="user" />
      <main className="flex-1 flex flex-col px-6 mt-20 md:mt-24 sm:px-14 lg:px-16">
        <OrdersLayout 
          catalogProducts={availableProducts} 
          adminInfo={user}
        />
      </main>
      <Footer 
        whatsappNumber={ user?.role === 'admin' ? user?.phone || '5586994379414' : '5586994379414'}
      />
    </div>
  );
};