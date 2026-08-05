'use client';

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import validate from "@/data/schemas/validate-forms";
import { cn } from "@/lib/utils";
import CouponModel from "@/data/models/Coupon.model";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { couponFormSchema } from "@/data/schemas/coupon-form.schema";
import { onlyNumbers } from "@/data/functions/inputMasks";
import { createCouponAction, updateCouponAction } from "@/app/actions/coupons.action";
import ProductModel from "@/data/models/Product.model";
import { Switch } from "../ui/switch";
import { formatDateByFirebase } from "@/data/functions/formatDate";
import { CouponStatus, CouponType } from "@/data/types/coupon.type";
import { deleteAccentsAndSpaces } from "@/data/functions/removeAccentsAndSpaces";

interface CouponProps extends React.HTMLAttributes<HTMLElement> {
  mode: 'editar' | 'adicionar';
  initialData?: CouponModel;
  products: ProductModel[];
  modalOpen: boolean
  onClose?: () => void
};

export default function CouponModal({ 
  mode,
  initialData,
  products,
  modalOpen, 
  onClose 
}: CouponProps) {
  const [form, setForm] = useState({
    code: initialData?.code || '',
    type: initialData?.type || 'percentage',
    product_id: initialData?.product_id || 'all',
    percentage: initialData?.percentage || 0,
    fixed_value: initialData?.fixed_value || 0,
    quantity: initialData?.quantity || 0,
    minimum_value: initialData?.minimum_value || 0,
    status: initialData?.status as CouponStatus || 'active',
    apply_to_category: initialData?.apply_to_category || false,
    valid_until: formatDateByFirebase(initialData?.valid_until) || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useLockBodyScroll(modalOpen);

  if (!modalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validate(couponFormSchema, form);
    if (validation.success === false) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      const dataSubmit = {
        code: deleteAccentsAndSpaces(form.code.toLocaleUpperCase()),
        type: form.type,
        product_id: form.product_id === 'all' ? undefined : form.product_id,
        percentage: form.type === 'percentage' ? form.percentage : null,
        fixed_value: form.type === 'fixed' ? form.fixed_value : null,
        quantity: form.quantity,
        status: form.status,
        minimum_value: form.minimum_value,
        apply_to_category: form.product_id === 'all' ? false : form.apply_to_category,
        valid_until: new Date(form.valid_until),
      }

      if (mode === 'editar' && initialData) {
        const result = await updateCouponAction(
          initialData.id, 
          dataSubmit
        )

        if (result instanceof Error) {
          toast.error("Erro ao editar cupom.");
          return;
        }
      } else {
        const result = await createCouponAction(dataSubmit);
  
        if (result instanceof Error) {
          toast.error("Erro ao adicionar cupom.");
          return;
        }
      }

      toast.success(`Cupom ${mode === 'editar' ? 'editado' : 'adicionado'} com sucesso!`);
      handleCloseModal();
    } catch (error) {
      if (error instanceof Error && error.message === "Coupon already exists") {
        toast.error("Já existe um cupom ativo com o mesmo código." );
      } else if (error instanceof Error && error.message === "Coupon already expired") {
        toast.error("O cupom não pode ter essa data de validade.");
      } else {
        toast.error("Erro ao processar requisição.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseModal = () => {
    setErrors({});
    onClose?.();
  }

  return (
    <div 
      onClick={handleCloseModal}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
        bg-black/30 p-4 backdrop-blur-xs transition-all cursor-default
      `}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md overflow-y-auto scrollbar-hide
          bg-white dark:bg-zinc-800 text-secondary p-6 rounded-lg shadow-xl"
      >
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-background-dark pb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-50">
            {mode === 'editar' ? 'Editar Cupom' : 'Novo Cupom'}
          </h2>
          <button 
            type="button"
            aria-label="Fechar"
            title="Fechar"
            onClick={handleCloseModal} 
            className="cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-400 transition-colors" />
          </button>
        </div>

        <form 
          id="coupon-form"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Label htmlFor="code" className="font-bold dark:text-zinc-200 text-nowrap w-full">
                Código do Cupom: 
              </Label>
              
              <Input
                id="code"
                type="text"
                autoComplete="code"
                placeholder="Ex: TERCO10OFF"
                maxLength={23}
                onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
                value={form.code}
                required
                className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary",
                  errors.code ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                )}
                disabled={isLoading}
              />
            </div>
            {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}

            <div className="flex gap-4">
              <Label htmlFor="type" className="font-bold dark:text-zinc-200 text-nowrap w-full">
                Tipo de cupom:
              </Label>
              
              <Select 
                value={form.type || 'percentage'}
                onValueChange={(value) => {if (value) setForm((prev) => ({ ...prev, type: value as CouponType }))}}
                required
              >
                <SelectTrigger 
                  className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary w-full",
                    errors.type ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  )}
                >
                  <SelectValue placeholder={"Tipo"} />
                </SelectTrigger>
                <SelectContent className="transition-all font-sans">
                  <SelectGroup>
                    <SelectItem value={'percentage'} className="cursor-pointer">
                      Porcentagem
                    </SelectItem>
                    <SelectItem value={'fixed'} className="cursor-pointer">
                      Fixo
                    </SelectItem>
                    <SelectItem value={'free_shipping'} className="cursor-pointer">
                      Frete Grátis
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}

            <div className={`flex gap-4 ${form.type === 'percentage' ? '' : 'hidden'}`}>
              <Label htmlFor="percentage" className="font-bold dark:text-zinc-200 text-nowrap w-full">
                Desconto (%):
              </Label>
              
              <Input
                id="percentage"
                type="text"
                maxLength={3}
                autoComplete="percentage"
                onChange={(e) => setForm((prev) => ({ 
                  ...prev, 
                  percentage: Number(onlyNumbers(e.target.value)) > 100 ? 100 : Number(onlyNumbers(e.target.value))
                }))}
                value={form.percentage}
                className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary",
                  errors.percentage ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                )}
                disabled={isLoading}
              />
            </div>
            {errors.percentage && <p className="text-xs text-red-500">{errors.percentage}</p>}

            <div className={`flex gap-4 ${form.type === 'fixed' ? '' : 'hidden'}`}>
              <Label htmlFor="fixed_value" className="font-bold dark:text-zinc-200 w-full">
                Valor do desconto (R$):
              </Label>
              
              <Input
                id="fixed_value"
                type="text"
                autoComplete="fixed_value"
                maxLength={7}
                onChange={(e) => setForm((prev) => ({ ...prev, fixed_value: Number(onlyNumbers(e.target.value)) }))}
                value={form.fixed_value}
                className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary",
                  errors.fixed_value ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                )}
                disabled={isLoading}
              />
            </div>
            {errors.fixed_value && <p className="text-xs text-red-500">{errors.fixed_value}</p>}

            <div className="flex gap-4">
              <Label htmlFor="quantity" className="font-bold dark:text-zinc-200 w-full">
                Quantidade disponíveis:
              </Label>
              
              <Input
                id="quantity"
                type="text"
                autoComplete="quantity"
                maxLength={7}
                required
                onChange={(e) => setForm((prev) => ({ ...prev, quantity: Number(onlyNumbers(e.target.value)) }))}
                value={form.quantity}
                className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary",
                  errors.quantity ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                )}
                disabled={isLoading}
              />
            </div>
            {errors.quantity && <p className="text-xs text-red-500">{errors.quantity}</p>}

            <div className="flex gap-4">
              <Label htmlFor="status" className="font-bold dark:text-zinc-200 w-full">
                Produto:
              </Label>
              
              <Select 
                value={form.product_id || 'all'}
                onValueChange={(value) => {if (value) setForm((prev) => ({ ...prev, product_id: value }))}}
                required
              >
                <SelectTrigger 
                  className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary w-full",
                    errors.product_id ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  )}
                >
                  <SelectValue placeholder={"Todos"} />
                </SelectTrigger>
                <SelectContent className="transition-all font-sans">
                  <SelectGroup>
                    <SelectItem value={'all'} className="cursor-pointer">
                      Todos
                    </SelectItem>

                    {form.product_id !== 'all' && !products.find(p => p.id === form.product_id) && (
                      <SelectItem value={form.product_id} className="hidden">
                        Carregando...
                      </SelectItem>
                    )}

                    {products.map((product) => (
                      <SelectItem 
                        key={product.id} 
                        value={product.id} 
                        className="cursor-pointer"
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.product_id && <p className="text-xs text-red-500">{errors.product_id}</p>}

            <div className="flex gap-4">
              <Label htmlFor="apply-to-category" className="font-bold dark:text-zinc-200 w-full">
                Aplicar cupom também para categoria?
              </Label>

              <Switch 
                id="apply-to-category" 
                checked={form.apply_to_category}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, apply_to_category: checked }))}
                disabled={isLoading}
                className={cn("cursor-pointer", 
                  errors.apply_to_category ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                )}
              />
            </div>
            {errors.apply_to_category && <p className="text-xs text-red-500">{errors.apply_to_category}</p>}

            <div className="flex gap-4">
              <Label htmlFor="minimum_value" className="font-bold dark:text-zinc-200 w-full">
                Preço mínimo (R$):
              </Label>
              
              <Input
                id="minimum_value"
                type="text"
                autoComplete="minimum_value"
                maxLength={7}
                required
                onChange={(e) => setForm((prev) => ({ ...prev, minimum_value: Number(onlyNumbers(e.target.value)) }))}
                value={form.minimum_value}
                className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary",
                  errors.minimum_value ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                )}
                disabled={isLoading}
              />
            </div>
            {errors.minimum_value && <p className="text-xs text-red-500">{errors.minimum_value}</p>}

            <div className="flex gap-4">
              <Label htmlFor="status" className="font-bold dark:text-zinc-200 text-nowrap w-full">
                Status:
              </Label>
              
              <Select 
                value={form.status || 'active'}
                onValueChange={(value) => {if (value) setForm((prev) => ({ ...prev, status: value as CouponStatus }))}}
                required
              >
                <SelectTrigger 
                  className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary w-full",
                    errors.status ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  )}
                >
                  <SelectValue placeholder={"Status"} />
                </SelectTrigger>
                <SelectContent className="transition-all font-sans">
                  <SelectGroup>
                    <SelectItem value={'active'} className="cursor-pointer">
                      Ativo
                    </SelectItem>
                    <SelectItem value={'expired'} className="cursor-pointer">
                      Expirado
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}

            <div className="flex gap-4">
              <Label htmlFor="valid-until" className="font-bold dark:text-zinc-200 text-nowrap w-full">
                Válido até:
              </Label>
              
              <Input
                id="valid-until"
                type="datetime-local"
                autoComplete="valid-until"
                min={new Date().toISOString().slice(0, 16)}
                onChange={(e) => setForm((prev) => ({ ...prev, valid_until: e.target.value }))}
                value={form.valid_until}
                required
                className={cn("bg-gray-50 focus-visible:ring-0 truncate text-secondary",
                  errors.valid_until ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                )}
                disabled={isLoading}
              />
            </div>
            {errors.valid_until && <p className="text-xs text-red-500">{errors.valid_until}</p>}
          </div>
        </form>

        <div className="flex w-full gap-4 mt-8">
          <button 
            type="button"
            aria-label="Fechar"
            onClick={handleCloseModal}
            className={`flex w-full items-center justify-center px-4 py-2 rounded-lg font-medium 
              bg-gray-50 text-secondary border border-gray-100 hover:bg-gray-100 
              dark:bg-zinc-800 dark:border-0 dark:hover:bg-zinc-950/15
              transition-colors disabled:opacity-50 cursor-pointer
            `}
            disabled={isLoading}
          >
            <span>Fechar</span>
          </button>

          <button 
            form="coupon-form"
            type="submit" 
            aria-label="Criar Cupom"
            className={`flex w-full px-4 py-2 rounded-lg justify-center items-center cursor-pointer 
              bg-primary text-white hover:bg-primary/80 transition-colors font-medium
              dark:bg-details dark:hover:bg-details/80
              disabled:opacity-50
            `} 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center"> 
                <span>Salvando...</span>
              </div>
            ) : 
              <div className="flex justify-center items-center"> 
                <span>{mode === 'editar' ? 'Editar' : 'Adicionar'}</span>
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  );
};