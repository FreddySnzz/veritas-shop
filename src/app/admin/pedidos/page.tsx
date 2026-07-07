import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { getCachedAdminInfoAction, getCachedProductsAction } from "@/app/actions/cache.actions";
import { getAllOrdersAdminAction } from "@/app/actions/orders.action";
import OrdersAdminLayout from "@/components/admin/OrdersAdminLayout";
import ProductModel from "@/data/models/Product.model";
import OrderModel from "@/data/models/Orders.model";

export default async function CartPage() {
  const { user } = await getCachedAdminInfoAction();
  const products = await getCachedProductsAction();
  const orders = await getAllOrdersAdminAction();

  const ordersRemapped: OrderModel[] = [];
  orders.forEach((order: OrderModel) => {
    const product = products.find((product: ProductModel) => product.id === order.product_id);
    if (product) {
      ordersRemapped.push({
        ...order,
        product: product,
      });
    }
  });

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <div className="flex flex-col shrink-0 h-dvh">
        <Header mode="admin" />
        <main className={`flex-1 flex flex-col px-4 pb-4 mt-18
          md:px-12 md:mt-0 lg:px-16 overflow-hidden`}
        >
          <OrdersAdminLayout orders={ordersRemapped} />
        </main>
      </div>
      <div className="hidden lg:block shrink-0">
        <Footer 
          whatsappNumber={ user?.role === 'admin' ? user?.phone || '5586994379414' : '5586994379414'}
        />
      </div>
    </div>
  );
};