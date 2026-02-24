import { Header } from "@/components/Header";
import Cart from "@/components/Cart";
import Footer from "@/components/Footer";
import { 
  getCachedAdminInfoAction, 
  getCachedProductsAction 
} from "../actions/cache.actions";
import ProductModel from "@/data/models/Product.model";

export default async function CartPage() {
  const { user } = await getCachedAdminInfoAction();
  const products = await getCachedProductsAction();
  const availableProducts = products?.filter((product: ProductModel) => product.available);

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header mode="cart" />
      <main className="flex-1 flex flex-col px-6 mt-20 md:mt-24 sm:px-14 lg:px-16">
        <Cart 
          whatsappNumber={user?.phone || '5586994379414'}
          catalogProducts={availableProducts} 
        />
      </main>
      <div className="hidden md:block">
        <Footer 
        whatsappNumber={user?.phone || '5586994379414'}
      />
      </div>
    </div>
  );
};