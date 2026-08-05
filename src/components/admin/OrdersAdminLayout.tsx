'use client';

import { useMemo, useState } from "react";
import { LucidePackageOpen, X } from "lucide-react";
import OrderModel from "@/data/models/Orders.model";
import { BackButton } from "../buttons/BackButton";
import OrderCard from "../OrderCard";
import { CustomInput } from "../inputs/CustomInput";
import { statusMap } from "@/data/types/orders-status.type";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { cn } from "@/lib/utils";

interface OrdersAdminLayoutProps extends React.HTMLAttributes<HTMLElement> {
  orders: OrderModel[];
};

export default function OrdersAdminLayout({ 
  orders,
}: OrdersAdminLayoutProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const uppercaseSearch = searchText.trim().toUpperCase();
      const orderNumber = order.order_number.trim().toUpperCase();
      const orderProductName = order.product?.name.trim().toUpperCase() || '';
      
      const matchesSearch = searchText.length === 0 || 
        orderNumber.includes(uppercaseSearch) || 
        orderProductName.includes(uppercaseSearch);

      const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchText, selectedStatus, orders]);

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex flex-col w-full md:gap-3 mb-2 md:mb-4">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl lg:text-3xl font-bold text-secondary dark:text-zinc-50">
            Pedidos
          </p>
          <p className="text-sm text-secondary dark:text-muted-foreground">
            {filteredOrders.length} {filteredOrders.length > 1 || filteredOrders.length === 0 ? "pedidos" : "pedido"}
          </p>
        </div>
      </div>

      <div className="relative flex w-full items-center justify-center mb-2 gap-3">
        <CustomInput
          searchbarPlaceholder="Busque pelo nome do produto, número do pedido..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-white dark:bg-input/30 shadow-xs"
        />
        
        {searchText.length > 0 && (
          <button
            aria-label="Limpar pesquisa"
            title="Limpar pesquisa"
            className="absolute right-30 sm:right-38 cursor-pointer"
            onClick={() => setSearchText('')}
          >
            <X className="w-6 h-6 text-secondary cursor-pointer" />
          </button>
        )}

        <Select 
          value={selectedStatus} 
          onValueChange={setSelectedStatus}
        >
          <SelectTrigger 
            title="Filtrar por status do pedido"
            aria-label="Filtrar por status do pedido"
            className={cn("border-none hover:border-none w-full cursor-pointer",
              "focus:outline-none focus:ring-0 focus:ring-offset-0",
              "bg-white hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 text-secondary",
              "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700 max-w-24 md:max-w-32",
            )}
          >
            <SelectValue placeholder={"Status"} />
          </SelectTrigger>
          <SelectContent className="transition-all font-sans">
            <SelectGroup>
              <SelectItem value="ALL" className="cursor-pointer">
                Todos
              </SelectItem>
              {Object.entries(statusMap).map(([key, displayValue]) => (
                <SelectItem key={key} value={key} className="cursor-pointer">
                  {displayValue}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide mb-6">
        <div className="flex flex-col h-full space-y-4">
          {filteredOrders.length === 0 ? (
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
                  order={{
                    ...order,
                    status: statusMap[order.status as OrderModel["status"]],
                  }} 
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="md:hidden shrink-0 mt-auto bg-background-alternative dark:bg-input/0 z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton pushRoute="/admin" />
        </div>
      </div>
    </div>
  );
};