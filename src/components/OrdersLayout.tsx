'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/data/context/AuthContext";
import OrderModel from "@/data/models/Orders.model";
import ProductModel from "@/data/models/Product.model";
import UserModel from "@/data/models/User.model";
import OrderCard from "./OrderCard";
import { getAllOrdersByUserAction } from "@/app/actions/orders.action";
import { OrderStatusType, statusMap } from "@/data/types/orders-status.type";
import SeeMoreProducts from "./SeeMoreProducts";
import { LucidePackageOpen } from "lucide-react";
import { SupportButton } from "./buttons/SupportButton";

interface OrdersLayoutProps extends React.HTMLAttributes<HTMLElement> {
  catalogProducts: ProductModel[];
  adminInfo?: UserModel;
};

export default function OrdersLayout({ catalogProducts, adminInfo }: OrdersLayoutProps) {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login?redirect=/carrinho');
    };

    if (user) {
      async function getOrdersByUser() {
        if (!user) return;
        const orders = await getAllOrdersByUserAction(user.id);

        const orderProducts = catalogProducts.filter(
          (product) => orders.some((order: OrderModel) => order.product_id === product.id)
        );

        setOrders(orders.map((order: OrderModel) => ({
          ...order,
          status: statusMap[order.status as OrderStatusType],
          product: orderProducts.find((product) => product.id === order.product_id)
        })));
      };

      getOrdersByUser();
    };
  }, [isAuthenticated, user, router, catalogProducts]);

  setTimeout(() => {
    router.refresh();
  }, 1000 * 60 * 3);

  return (
    <div className="flex-1 flex flex-col w-full min-h-0 font-sans">
      <div className="flex flex-col">
        <div className="flex items-baseline justify-between">
          <p className="text-xl lg:text-3xl font-bold text-secondary dark:text-zinc-50">
            Meus Pedidos
          </p>
          <p className="text-sm text-secondary dark:text-muted-foreground">
            {orders.length} {orders.length > 1 || orders.length === 0 ? "pedidos" : "pedido"}
          </p>
        </div>
        <hr className="border-muted-foreground/50 my-2" />
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide mb-6">
        <div className="flex flex-col h-full space-y-4">
          {orders.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center py-12 text-center">
              <LucidePackageOpen className="w-16 h-16 text-secondary dark:text-muted-foreground mb-4" />
              <p className="text-secondary dark:text-muted-foreground font-bold">
                Você ainda não fez nenhum pedido
              </p>
              <p className="text-sm text-secondary dark:text-muted-foreground">
                Confira nossos produtos e finalize sua compra
              </p>
            </div>
          ) : (
            <>
              {orders.map((order) => (
                <OrderCard 
                  key={order.order_number} 
                  mode="user"
                  order={order} 
                  adminInfo={adminInfo}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <SupportButton 
        title="Relatar problema ou cancelar pedido?"
        messageToSupport="Olá, gostaria de relatar um problema com meu pedido na Veritas Ateliê." 
        className="mb-4 text-secondary dark:text-zinc-400 underline"
      />

      {catalogProducts.length > 1 && (
        <div className="flex flex-col">
          <p className="font-bold uppercase">
            Confira também
          </p>
          <div className="overflow-hidden">
            <SeeMoreProducts 
              cachedProducts={catalogProducts}
              motionDivClassName="mx-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};