'use client';

import { useMemo, useState } from "react";
import { BadgePercent, Plus, RefreshCw, Trash2 } from "lucide-react";
import { BackButton } from "../buttons/BackButton";
import { CustomInput } from "../inputs/CustomInput";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { cn } from "@/lib/utils";
import CouponModel from "@/data/models/Coupon.model";
import { formatDateWithTime } from "@/data/functions/formatDate";
import CustomModal from "../modals/CustomModal";
import { CustomButton } from "../buttons/CustomButton";
import { FloatAddButton } from "../buttons/AddButton";
import { toast } from "sonner";
import { deleteCouponAction } from "@/app/actions/coupons.action";
import CouponModal from "../modals/CouponModal";
import ProductModel from "@/data/models/Product.model";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";

interface ManageCouponsLayoutProps extends React.HTMLAttributes<HTMLElement> {
  coupons: CouponModel[];
  products: ProductModel[];
};

export default function ManageCouponsLayout({
  coupons,
  products,
}: ManageCouponsLayoutProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [mode, setMode] = useState<'editar' | 'adicionar'>('adicionar');
  const [selectedCoupon, setSelectedCoupon] = useState<CouponModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const filteredData = useMemo(() => {    
    const upperSearch = searchText.toUpperCase();
    return coupons.filter((coupon) => 
      coupon.code.toUpperCase().includes(upperSearch)
      && (selectedStatus === 'ALL' || coupon.status === selectedStatus)
    );
  }, [searchText, coupons, selectedStatus]);

  const handleSelectCoupon = (coupon: CouponModel) => {
    setSelectedCoupon(coupon);
    setMode('editar');
    setIsOpenModal(true);
  };

  const handleAddCoupon = () => {
    setMode('adicionar');
    setIsOpenModal(true);
  };

  const handleOpenDeleteModalCoupon = (coupon: CouponModel, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCoupon(coupon);
    setIsOpenDeleteModal(true);
  };

  const handleDeleteCoupon = async () => {
    if (!selectedCoupon) return;
    
    setIsLoading(true);
    try {
      await deleteCouponAction(selectedCoupon.id);
      toast.success("Cupom removido com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Erro ao deletar cupom.");
      }
    } finally {
      setIsLoading(false);
      setIsOpenDeleteModal(false);
      setSelectedCoupon(null);
    };
  };
  
  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="relative flex w-full items-center justify-center gap-3">
        <div className="relative flex w-full items-center gap-2">
          <CustomInput
            searchbarPlaceholder="Busque pelo código do cupom..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white dark:bg-input/30 shadow-xs"
            clearButtonAction={() => setSearchText('')}
            withClearButton
          />

          <Select 
            value={selectedStatus} 
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger 
              title="Filtrar por status do cupom"
              aria-label="Filtrar por status do cupom"
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
                <SelectItem value={'active'} className="cursor-pointer">
                  Ativos
                </SelectItem>
                <SelectItem value={'expired'} className="cursor-pointer">
                  Expirados
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <CustomButton 
            title="Atualizar"
            aria-label="Atualizar"
            onClick={() => router.refresh()}
            className={`flex py-1.5 px-2 rounded-lg shadow-xs
              bg-white text-secondary hover:bg-zinc-50 font-bold text-base
              dark:bg-details dark:hover:bg-details/80 text-nowrap w-fit
            `}
          >
            <RefreshCw className="w-6 h-6" />
          </CustomButton>

          <CustomButton 
            onClick={handleAddCoupon}
            className={`hidden md:flex lg:flex-row py-1.5 md:px-4 lg:px-8 rounded-lg shadow-xs
              bg-primary text-white hover:bg-primary/90 font-bold text-base
              dark:bg-details dark:hover:bg-details/80 text-nowrap w-fit
            `}
          >
            <Plus className="w-6 h-6" />
            <span>Criar Cupom</span>
          </CustomButton>

          <div className={`fixed md:hidden bottom-22 right-5 z-15`}>
            <FloatAddButton
              pushRoute={''}
              onClick={handleAddCoupon}
              className="p-3"
            />
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide mt-4">
        <div className="flex flex-col space-y-4">
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BadgePercent className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground/50 font-bold">
                Nenhum cupom encontrado
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-4 overflow-y-auto">
              {filteredData.map((coupon, index) => (
                <div 
                  key={index}
                  onClick={() => handleSelectCoupon(coupon)}
                  className={`flex p-4 rounded-lg cursor-pointer transition-all
                    bg-white hover:bg-zinc-50 dark:bg-input/30 dark:hover:bg-input/50 
                  `}
                >
                  <div className="grow">
                    <div className={`flex ${coupon.code.length > 15 ? 'flex-col text-sm' : 'flex-row gap-1'}`}>
                      <p className="font-black">{coupon.code}</p>
                      <p>{`${coupon.code.length <= 15 ? '• ' : ''}`} 
                        {coupon.type === 'percentage' ? `${coupon.percentage}% de desconto` : 
                        `${coupon.type === 'fixed' ? `${formatCurrency(Number(coupon.fixed_value))} de desconto` : 
                        'Frete Grátis'}`}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p className={`text-sm font-medium ${coupon.status === 'active' ? 'text-green-600' : 'text-red-500 dark:text-red-400'}`}>
                        {coupon.status === 'active' ? 'Ativo' : 'Expirado'}
                      </p>
                      <p className="text-sm font-medium">• {coupon.quantity} {coupon.quantity === 1 ? 'cupom disponível' : 'cupons disponíveis'}</p>
                    </div>
                    <div className="flex flex-col mt-1 text-xs">
                      <p>• Aplicável à <span className="font-bold">
                          {coupon.product_id === null || coupon.product_id === undefined ? 'Todos os produtos' : `${products.find((product) => product.id === coupon.product_id)?.name}`}
                        </span>
                      </p>
                      <p>
                        • {coupon.apply_to_category ? 'Aplicável à categoria relacionada' : 'Não aplicável à categoria'}
                      </p>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <p className="text-sm font-bold">Válido até:</p>
                      <p className="text-sm">{formatDateWithTime(coupon.valid_until)}</p>
                    </div>
                  </div>

                  <div className="relative flex justify-center items-center transition-all">
                    <button
                      type="button"
                      aria-label="Excluir Cupom"
                      title="Excluir Cupom"
                      onClick={(e) => handleOpenDeleteModalCoupon(coupon, e)}
                      className="absolute cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CouponModal
        key={selectedCoupon ? selectedCoupon.id : 'add-new-coupon'}
        mode={mode}
        initialData={selectedCoupon || undefined}
        products={products}
        modalOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />

      <CustomModal
        modalOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
      >
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-nowrap">Tem certeza que deseja excluir esse cupom?</p>
          <p className="text-xs text-red-600 dark:text-red-400">
            Essa ação não pode ser desfeita.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button 
            type="button"
            aria-label="Cancelar"
            onClick={() => setIsOpenDeleteModal(false)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-gray-100 text-secondary hover:bg-gray-200 transition-colors font-medium
              dark:bg-zinc-800 dark:border-0 dark:hover:bg-zinc-950/15 disabled:opacity-50
            `}
            disabled={isLoading}
          >
            <span>Cancelar</span>
          </button>

          <button 
            type="button"
            aria-label="Confirmar"
            onClick={handleDeleteCoupon}
            className={`flex gap-2 items-center justify-center px-4 py-2 
              text-white transition-colors font-medium rounded-lg cursor-pointer
              bg-red-500 hover:bg-red-600 disabled:opacity-50
            `}
            disabled={isLoading}
          > 
            <span>{isLoading ? 'Deletando...' : 'Sim, excluir'}</span>
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