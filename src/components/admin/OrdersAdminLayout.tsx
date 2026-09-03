'use client';

import { useMemo, useState } from "react";
import { ListFilter, LucidePackageOpen } from "lucide-react";
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
import CustomModal from "../modals/CustomModal";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";

type SortField = 'created_at' | 'updated_at' | 'final_price';
type SortOrder = 'asc' | 'desc';

interface OrdersAdminLayoutProps extends React.HTMLAttributes<HTMLElement> {
  orders: OrderModel[];
};

export default function OrdersAdminLayout({ orders }: OrdersAdminLayoutProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [searchText, setSearchText] = useState<string>(search || '');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [sortField, setSortField] = useState<SortField>('updated_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const router = useRouter();
  
  const filteredAndSortedOrders = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = orders.filter((order: any) => {
      const uppercaseSearch = searchText.trim().toUpperCase();
      const orderNumber = order.order_number.trim().toUpperCase();
      const orderProductName = order.product?.name.trim().toUpperCase() || '';
      const orderUserName = order.user?.name.trim().toUpperCase() || '';
      
      const matchesSearch = searchText.length === 0 || 
        orderNumber.includes(uppercaseSearch) || 
        orderProductName.includes(uppercaseSearch) ||
        orderUserName.includes(uppercaseSearch);

      const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (sortField === 'created_at' || sortField === 'updated_at') {
        valueA = new Date(valueA as string | number).getTime();
        valueB = new Date(valueB as string | number).getTime();
      }

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      
      return 0;
    });
  }, [searchText, selectedStatus, sortField, sortOrder, orders]);

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="relative flex w-full items-center justify-center mb-4 gap-2">
        <CustomInput
          searchbarPlaceholder="Busque pelo nome do produto, número do pedido, cliente..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-white dark:bg-input/30 shadow-xs"
          withClearButton
          clearButtonAction={() => {
            setSearchText('');
            router.replace('/admin/pedidos');
          }}
        />

        <button
          type="button"
          aria-label="Filtrar"
          title="Filtrar"
          onClick={() => setIsOpenFilterModal(true)}
          className={`bg-white hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 
            rounded-lg shadow-xs cursor-pointer h-9 w-12 flex items-center justify-center transition-all
            lg:w-auto lg:px-4 lg:gap-2
          `}
        >
          <p className={"hidden lg:block font-medium text-secondary"}>Filtros</p>
          <ListFilter className="w-6 h-6 text-secondary" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide md:scrollbar-thin md:pr-2">
        <div className="flex flex-col h-full">
          {filteredAndSortedOrders.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center py-12 text-center">
              <LucidePackageOpen className="w-16 h-16 text-zinc-400 dark:text-muted-foreground mb-4" />
              <p className="text-zinc-400 dark:text-muted-foreground font-bold">
                Nenhum pedido encontrado com os filtros atuais.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3">
              {filteredAndSortedOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  mode="admin"
                  order={{
                    ...order,
                    status: statusMap[order.status as OrderModel["status"]],
                  }} 
                  filter={sortField}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CustomModal
        title="Ordenar Pedidos"
        modalOpen={isOpenFilterModal}
        onClose={() => setIsOpenFilterModal(false)}
      >
        <div className="flex w-full items-center justify-between">
          <Label className="text-nowrap w-full">
            Status do pedido: 
          </Label>
          <Select 
            value={selectedStatus} 
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger 
              title="Filtrar por status do pedido"
              aria-label="Filtrar por status do pedido"
              className={cn("border-none hover:border-none w-full cursor-pointer",
                "focus:outline-none focus:ring-0 focus:ring-offset-0",
                "bg-zinc-100 hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 text-secondary",
                "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700",
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

        <div className="flex w-full items-center justify-between">
          <Label className="text-nowrap w-full">
            Filtrar por: 
          </Label>
          <Select 
            value={sortField} 
            onValueChange={(value) => setSortField(value as SortField)}
          >
            <SelectTrigger 
              title="Filtro dos pedidos"
              aria-label="Filtro dos pedidos"
              className={cn("border-none hover:border-none w-full cursor-pointer",
                "focus:outline-none focus:ring-0 focus:ring-offset-0",
                "bg-zinc-100 hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 text-secondary",
                "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700",
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="transition-all font-sans">
              <SelectGroup>
                <SelectItem value="created_at" className="cursor-pointer">
                  Data de criação
                </SelectItem>
                <SelectItem value="updated_at" className="cursor-pointer">
                  Última atualização
                </SelectItem>
                <SelectItem value="final_price" className="cursor-pointer">
                  Valor do pedido
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full items-center justify-between">
          <Label className="text-nowrap w-full">
            Ordenar por: 
          </Label>
          <Select 
            value={sortOrder} 
            onValueChange={(value) => setSortOrder(value as SortOrder)}
          >
            <SelectTrigger 
              title="Ordem dos pedidos"
              aria-label="Ordem dos pedidos"
              className={cn("border-none hover:border-none w-full cursor-pointer",
                "focus:outline-none focus:ring-0 focus:ring-offset-0",
                "bg-zinc-100 hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 text-secondary",
                "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700",
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="transition-all font-sans">
              <SelectGroup>
                <SelectItem value="asc" className="cursor-pointer">
                  Crescente
                </SelectItem>
                <SelectItem value="desc" className="cursor-pointer">
                  Decrescente
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex mt-4 w-full">
          <button 
            type="button"
            aria-label="Fechar"
            onClick={() => setIsOpenFilterModal(false)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-gray-100 text-secondary dark:text-zinc-200 hover:bg-gray-200 transition-colors font-medium
              dark:bg-zinc-900/70 dark:border-0 dark:hover:bg-zinc-950/15 disabled:opacity-50 w-full
            `}
          >
            <span>Fechar</span>
          </button>
        </div>
      </CustomModal>

      <div className="md:hidden shrink-0 mt-auto bg-background-alternative dark:bg-input/0 z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton pushRoute="/admin" />
        </div>
      </div>
    </div>
  );
};