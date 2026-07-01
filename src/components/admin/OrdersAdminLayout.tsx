'use client';

import { useMemo, useState } from "react";
import { LucidePackageOpen, X } from "lucide-react";
import OrderModel from "@/data/models/Orders.model";
import { BackButton } from "../buttons/BackButton";
import OrderCard from "../OrderCard";
import { SearchbarInput } from "../inputs/SearchbarInput";

interface OrdersAdminLayoutProps extends React.HTMLAttributes<HTMLElement> {
  orders: OrderModel[];
};

const statusMap: Record<string, OrderModel["status"]> = {
  awaiting_payment: "Aguardando Pagamento",
  production: "Em Produção",
  crafted: "Confeccionado",
  completed: "Entregue",
  cancelled: "Cancelado"
};

export default function OrdersAdminLayout({ 
  orders,
 }: OrdersAdminLayoutProps) {
  const [searchText, setSearchText] = useState<string>('');
  
  const ordersRemapped = orders.map((order: OrderModel) => ({
    ...order,
    status: statusMap[order.status as OrderModel["status"]],
  }));

  const filteredOrders = useMemo(() => {
    if (searchText.length === 0) {
      return ordersRemapped;
    }

    const lowerSearch = searchText.toLowerCase();
    return ordersRemapped.filter((order) => 
      order.id.toLowerCase().includes(lowerSearch)
    );
  }, [searchText, ordersRemapped]);

  return (
    <div className="flex-1 flex flex-col w-full min-h-0 font-sans md:mt-20">
      <div className="flex flex-col">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl lg:text-3xl font-bold text-secondary dark:text-zinc-50">
            Pedidos
          </p>
          <p className="text-sm text-secondary dark:text-muted-foreground">
            {ordersRemapped.length} {ordersRemapped.length > 1 || ordersRemapped.length === 0 ? "pedidos" : "pedido"}
          </p>
        </div>
        <hr className="border-muted-foreground/50 my-2" />
      </div>

      <div className="relative flex w-full items-center justify-center mb-2 md:gap-3">
        <SearchbarInput
          searchbarPlaceholder="Busque por ID do pedido"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="bg-white dark:bg-input/30 shadow-xs"
        />
        
        {searchText.length > 0 && (
          <button
            aria-label="Limpar pesquisa"
            title="Limpar pesquisa"
            className="absolute right-2 cursor-pointer"
            onClick={() => setSearchText('')}
          >
            <X className="w-6 h-6 text-secondary cursor-pointer" />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide mb-6">
        <div className="flex flex-col h-full space-y-4">
          {ordersRemapped.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center py-12 text-center">
              <LucidePackageOpen className="w-16 h-16 text-secondary dark:text-muted-foreground mb-4" />
              <p className="text-secondary dark:text-muted-foreground font-bold">
                Nenhum pedido encontrado
              </p>
            </div>
          ) : (
            <>
              {filteredOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  mode="admin"
                  order={order} 
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="md:hidden shrink-0 mt-auto bg-background-alternative dark:bg-input/0 mb-4">
        <hr className="border-muted-foreground/50 mb-2" />
        <div className="flex flex-col">
          <BackButton pushRoute="/admin" />
        </div>
      </div>
    </div>
  );
};