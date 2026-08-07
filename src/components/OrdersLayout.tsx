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
import { Skeleton } from "./ui/skeleton";

interface OrdersLayoutProps extends React.HTMLAttributes<HTMLElement> {
  catalogProducts: ProductModel[];
  adminInfo?: UserModel;
};

export default function OrdersLayout({ catalogProducts, adminInfo }: OrdersLayoutProps) {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login?redirect=/carrinho');
    };

    if (user) {
      async function getOrdersByUser() {
        setIsLoading(true);

        try {
          const fetchedOrders = await getAllOrdersByUserAction(user!.id);

          const orderProducts = catalogProducts.filter(
            (product) => fetchedOrders.some((order: OrderModel) => order.product_id === product.id)
          );

          setOrders(fetchedOrders.map((order: OrderModel) => ({
            ...order,
            status: statusMap[order.status as OrderStatusType],
            product: orderProducts.find((product) => product.id === order.product_id)
          })));
        } catch (error) {
          console.error("Erro ao buscar pedidos:", error);
        } finally {
          setIsLoading(false);
        }
      }

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
            {!isLoading && (
              <>{orders.length} {orders.length > 1 || orders.length === 0 ? "pedidos" : "pedido"}</>
            )}
          </p>
        </div>
        <hr className="border-muted-foreground/50 my-2" />
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide mb-6">
        <div className="flex flex-col space-y-4">
          {isLoading ? (
            <>
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className="flex flex-col p-4 border border-muted/20 rounded-xl space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/4 rounded-full" />
                  </div>
                  <div className="flex gap-4 mt-2">
                    <Skeleton className="h-20 w-20 rounded-md" />
                    <div className="flex flex-col space-y-2 flex-1 justify-center">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : orders.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center py-12 text-center">
              <LucidePackageOpen className="w-16 h-16 text-gray-300 dark:text-zinc-700 mb-4" />
              <p className="text-muted-foreground/40 font-bold">
                Você ainda não fez nenhum pedido
              </p>
              <p className="text-sm text-muted-foreground/40">
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

      <div className="flex justify-center">
        <SupportButton 
          title="Relatar problema ou cancelar pedido?"
          messageToSupport="Olá, gostaria de relatar um problema com meu pedido na Veritas Ateliê." 
          className="mb-4 text-secondary dark:text-zinc-400 underline"
        />
      </div>

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