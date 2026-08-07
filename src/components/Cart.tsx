'use client';

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/data/context/CartContext";
import { 
  Minus, 
  Plus, 
  ShoppingCart, 
  Tag, 
  Trash2 
} from "lucide-react";
import DeleteItemCartModal from "./modals/DeleteItemCart";
import ClearCartModal from "./modals/ClearCart";
import { BackButton } from "./buttons/BackButton";
import { WhatsAppButton } from "./buttons/WhatsAppButton";
import { CartProductItem } from "@/data/types/cart-products.type";
import { 
  formatAndCapitalize, 
  formatCurrency 
} from "@/data/functions/formatAndCapitalize";
import SeeMoreProducts from "./SeeMoreProducts";
import ProductModel from "@/data/models/Product.model";
import { SupportButton } from "./buttons/SupportButton";
import Alert from "./Alert";
import Link from "next/link";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";
import { useAuth } from "@/data/context/AuthContext";
import { useRouter } from "next/navigation";
import { createOrderAction } from "@/app/actions/orders.action";
import { CreateOrderRequest } from "@/data/types/order.type";
import { toast } from "sonner";
import { CustomInput } from "./inputs/CustomInput";
import { Label } from "./ui/label";
import { getCouponByCodeAction, updateCouponAction, validateCouponAction } from "@/app/actions/coupons.action";
import { applyCoupon } from "@/data/functions/applyCoupon";
import { cn } from "@/lib/utils";
import { AppliedCoupon } from "@/data/types/coupon.type";
import { centsToPriceString } from "@/data/functions/inputMasks";
import { CustomLink } from "./buttons/CustomLink";

interface CartProps extends React.HTMLAttributes<HTMLElement> {
  whatsappNumber?: string;
  catalogProducts: ProductModel[];
};

export default function Cart({ 
  catalogProducts,
  whatsappNumber
}: CartProps) {
  const { 
    cartCount, 
    items, 
    addQuantity,
    subtractQuantity,
  } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [lockCoupon, setLockCoupon] = useState(false);
  const [productsWithCouponApplied, setProductsWithCouponApplied] = useState<AppliedCoupon[]>([]);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);
  const [isDeleteItemCartModalOpen, setIsDeleteItemCartModalOpen] = useState(false);
  const [itemCartIdToDelete, setItemCartIdToDelete] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const isCartEmpty = cartCount === 0;
  const router = useRouter();

  const handleSubtractQuantity = (id: string) => {
    const itemQuantity = items.filter(item => item.cartId === id)[0].quantity;
    
    if ((itemQuantity - 1) >= 1) {
      subtractQuantity(id);
      setLockCoupon(false);
      setProductsWithCouponApplied([]);
    };

    if ((itemQuantity - 1) < 1) return;
  }

  const handleAddQuantity = (id: string) => {
    const itemQuantity = items.filter(item => item.cartId === id)[0].quantity;
    
    if ((itemQuantity + 1) <= 10) {
      addQuantity(id);
      setLockCoupon(false);
      setProductsWithCouponApplied([]);
    };
  }

  const handleRemoveItemCart = (id: string) => {
    setItemCartIdToDelete(id);
    setIsDeleteItemCartModalOpen(true);
  }

  const handleCouponButtonClick = () => {
    if (lockCoupon) {
      setCouponCode('');
      setLockCoupon(false);
      setProductsWithCouponApplied([]);
    } else {
      handleApplyCoupon();
      setLockCoupon(true);
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode) return;

    try {
      const coupons = await validateCouponAction(couponCode); 

      if (coupons.length === 0) { 
        toast.error("Cupom inválido.");
        setLockCoupon(false);
        return;
      }

      const result = await applyCoupon({ coupon: coupons[0], cartItems: items });
      
      if (result) {
        for (const couponApplied of result) {
          if (couponApplied.applied_discount && couponApplied.product) {
            toast.success(`Cupom aplicado à ${couponApplied.product.name} com sucesso!`);
            setLockCoupon(true);
          } else if (!couponApplied.applied_discount && couponApplied.message) {
            toast.error(`${couponApplied.message} • (${formatCurrency(coupons[0].minimum_value)}).`);
            setLockCoupon(false);
          } else if (!couponApplied.applied_discount) {
            toast.error(`Cupom não pode ser aplicado à ${couponApplied.product?.name}`);
            setLockCoupon(false);
          } else if (couponApplied.applied_discount) {
            toast.success(`Cupom aplicado ao carrinho com sucesso!`);
            setLockCoupon(true);
            break;
          }
        }
      }

      setProductsWithCouponApplied(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Cupom expirado.") {
        toast.error("O cupom está expirado.");
        setLockCoupon(false);
      } else {
        toast.error("Erro ao aplicar cupom.");
      }
    }
  }

  const calculeTotalCartValue = () => {
    let total = items.reduce((acc, item) => {
      const price = Number(item.product.price) || 0;
      const customizationPrice = Number(item.product.customizationPrice) || 0;
      const quantity = Number(item.quantity) || 0;
      const finalPrice = (acc + (price + customizationPrice)) * quantity;

      return finalPrice;
    }, 0);

    for (const coupon of productsWithCouponApplied) {
      if (coupon.applied_discount && coupon.coupon_type === 'percentage' || coupon.applied_discount && coupon.coupon_type === 'fixed') {
        total -= Number(coupon.discount_price);
      }
    }

    if (total === 0) return 'R$0,00';
    return formatCurrency(total);
  }

  const renderCustomizationDesc = (
    key: string, 
    value: string | string[] | undefined
  ) => {
    if (!key || !value) return null;
    key = formatAndCapitalize(key);

    if (key.includes('Letras') || key.includes('Frase')) {
      const formattedValue = Array.isArray(value) ? value.join(', ') : value;
      return `• ${key}: ${formattedValue}\n`;
    };

    return `• ${key}: ${value}\n`;
  }

  const generateWhatsAppMessage = (
    items: CartProductItem[], 
    productsWithCouponApplied: AppliedCoupon[]
  ) => {
    let mensagem = `Olá! Gostaria de finalizar o seguinte pedido:\n\n`;
    
    items.forEach((item: CartProductItem, index: number) => {
      const { product, quantity, customization } = item;
      let customizationPrice = Number(product.customizationPrice);
      
      if (!customizationPrice) customizationPrice = 0;
      
      mensagem += `----------------------------------------------------\n`;
      mensagem += `*ITEM ${index + 1}: ${formatAndCapitalize(product.name)}*\n`;
      mensagem += `Quantidade: ${quantity} (${formatCurrency(product.price)} / und)\n`;
      if (customizationPrice > 0) mensagem += `Personalização: (${formatCurrency(customizationPrice)} / item)\n`;
      if (productsWithCouponApplied.length > 0) {
        for (const coupon of productsWithCouponApplied) {
          if (coupon.applied_discount && coupon.discount_price && coupon.product?.id === product.id) {
            mensagem += `Cupom aplicado: "${couponCode.toLocaleUpperCase()}" ( - ${formatCurrency(Number(coupon.discount_price))})\n`;
          }
        }
      }
      mensagem += `----------------------------------------------------\n`;

      Object.entries(customization || {}).forEach(([key, value]) => {
        if (!key || !value) return;
        mensagem += `${renderCustomizationDesc(key, value)}`;
      });

      mensagem += `\n`;
    });

    if (productsWithCouponApplied.length === 1) {
      mensagem += `============================\n`;
      mensagem += `*Cupom Aplicado: "${couponCode.toLocaleUpperCase()}" (${
        productsWithCouponApplied[0]?.coupon_percentage_value ? 
        `${productsWithCouponApplied[0]?.coupon_percentage_value}% OFF` :
        productsWithCouponApplied[0]?.coupon_fixed_value && 
        `- ${formatCurrency(Number(centsToPriceString(productsWithCouponApplied[0]?.coupon_fixed_value)))} OFF`
      })*\n`;
    }
    mensagem += `============================\n`;
    mensagem += `*Total Estimado: ${calculeTotalCartValue()}*\n`;
    mensagem += `============================\n`;
    mensagem += `Aguardo a confirmação e dados para pagamento!`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
  }

  const createOrder = async () => {
    try {
      if (!user) return;

      for (const item of items) {
        const customizationPrice = Number(item.product.customizationPrice) || 0;
        const subtotal = (item.product.price + customizationPrice) * item.quantity;

        const matchedCoupon = productsWithCouponApplied.find(
          (coupon) => coupon.product?.id === item.product.id
        );

        const payload: CreateOrderRequest = {
          user_id: user?.id,
          product_id: item.product.id,
          quantity: item.quantity,
          customization: item.product.customizationPrice > 0 ? item.customization : null,
          coupon_id: matchedCoupon?.applied_discount ? matchedCoupon.coupon_id : null,
          final_price: matchedCoupon?.applied_discount ? Number(matchedCoupon.final_price) : subtotal,
        };

        await createOrderAction(payload);

        if (matchedCoupon?.applied_discount) {
          const getCoupon = await getCouponByCodeAction(couponCode);
          await updateCouponAction(
            matchedCoupon.coupon_id, 
            { quantity: getCoupon[0].quantity - 1 }
          );
        }
      }

      router.push('/me/pedidos');
      return;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast.error("Erro ao criar pedido.");
    }
  }

  const renderFinishOrderButton = () => {
    if (isAuthenticated) 
      return <WhatsAppButton 
        clickCallback={createOrder} 
        message={generateWhatsAppMessage(items, productsWithCouponApplied)} 
      />;

    return (
      <CustomLink
        aria-label="Faça login para ver o botão de WhatsApp"
        href="/login?redirect=/carrinho"
        className={`w-full bg-primary dark:bg-details text-white hover:bg-primary/90 dark:hover:bg-details/90 text-center`}
      >
        <p className="text-center">
          Faça login para concluir seu pedido
        </p>
      </CustomLink>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full min-h-0 font-sans">
      <div className="flex flex-col">
        <div className="flex items-baseline justify-between">
          <span className="text-xl lg:text-3xl font-bold text-secondary dark:text-zinc-50">
            Meu Carrinho
          </span>
          <span className="text-sm text-gray-500 dark:text-zinc-200">
            {items.length} {items.length > 1 ? "produtos" : "produto"}
          </span>
        </div>
        <hr className="border-muted-foreground/30 my-2" />
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col h-full space-y-4">
          {isCartEmpty ? (
            <div className="flex flex-col h-full items-center justify-center py-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
              <p className="text-sm text-gray-400 mt-2">
                Adicione itens para finalizar seu pedido
              </p>
            </div>
          ) : (
            <>
              <div className="mt-2 mb-4">
                <Alert
                  title="Os produtos no carrinho não estão reservados."
                  subtitle="Finalize seu pedido antes que o estoque acabe."
                  className="dark:bg-input/50"
                />
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full lg:w-2/3 space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.cartId} 
                      className={`flex flex-col gap-2 w-full
                        bg-white dark:bg-input/50 rounded-lg px-4 lg:px-6 py-3 
                        border border-gray-100 dark:border-zinc-700
                      `}
                    >
                      <Link
                        aria-label="Ir para Página do Produto"
                        title="Ir para Página do Produto"
                        href={mountProductUrl(item.product.name, item.product.id)}
                      >
                        <p className="font-bold hover:underline dark:text-zinc-50">
                          {formatAndCapitalize(item.product.name)}
                        </p>
                      </Link>
                      <div className="flex">
                        {item.product.image ? (
                          <div className="relative w-35 h-35 shrink-0">
                            <Image 
                              src={item.product.image}
                              alt={item.product.name}
                              fill 
                              loading="eager"
                              className={cn("object-cover rounded-lg aspect-square",
                                "transition-opacity duration-500 ease-in-out",
                                isLoaded ? "opacity-100" : "opacity-0",
                              )}
                              onLoad={() => setIsLoaded(true)}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="relative w-35 h-35">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-gray-400 text-sm">Sem imagem</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col ml-2 md:ml-4 grow">
                          <div className="flex flex-col h-full justify-between text-xs dark:text-zinc-200">
                            <p>
                              Quantidade: {item.quantity}
                            </p>

                            {item.product.customizable && (
                              <div className="flex text-xs text-gray-500 dark:text-zinc-500 h-full mt-2">
                                <div className="flex grow flex-col">
                                  {Object.entries(item.customization || {}).map(([key, value]) => (
                                    <p key={key}>
                                      {renderCustomizationDesc(key, value)}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-center justify-between">
                        <div className="flex ml-1">
                          <div className="flex border border-gray-200 dark:border-zinc-600 gap-3 px-2 py-1 rounded">
                            { item.quantity === 1 ? (
                              <button 
                                type="button"
                                aria-label="Remover item do carrinho"
                                title="Remover item do carrinho"
                                onClick={() => handleRemoveItemCart(item.cartId)}
                                className="cursor-pointer px-2"
                              >
                                <Trash2 className="w-3 h-3 md:w-4 md:h-4 dark:text-red-400 hover:text-red-500/80 transition-colors" />
                              </button>
                            ) : (
                              <button 
                                type="button"
                                aria-label="Diminuir quantidade"
                                title="Diminuir quantidade"
                                onClick={() => handleSubtractQuantity(item.cartId)}
                                className="cursor-pointer px-2"
                              >
                                <Minus className="w-3 h-3 dark:text-zinc-300 hover:text-secondary/80 transition-colors" />
                              </button>
                            )}
                            <p className="px-3 cursor-default dark:text-zinc-300">
                              {item.quantity}
                            </p>
                            <button 
                              type="button"
                              aria-label="Aumentar quantidade"
                              title="Aumentar quantidade"
                              onClick={() => handleAddQuantity(item.cartId)}
                              className="cursor-pointer px-2"
                            >
                              <Plus className="w-3 h-3 dark:text-zinc-300 hover:text-secondary/80 transition-colors" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col text-gray-400 dark:text-details justify-end items-end text-xs">
                          <p className="text-sm font-medium dark:font-bold">
                            {item.quantity} x {formatCurrency(item.product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Mobile */}
                  <div className="flex md:hidden w-full items-center justify-center">
                    <button 
                      type="button"
                      aria-label="Limpar carrinho"
                      onClick={() => setIsClearCartModalOpen(true)}
                      className={`flex items-center justify-center gap-2 px-5 py-3 
                        text-red-500/80 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500
                        transition-colors font-medium cursor-pointer
                      `}
                    >
                      <Trash2 className="w-4 h-4" />
                      <p>Limpar Carrinho</p>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:w-1/3 pl-0 md:pl-8 lg:pl-16">
                  <div className="flex flex-1 flex-col">
                    <p className="font-bold text-lg md:text-2xl text-secondary dark:text-zinc-50 uppercase md:order-first">
                      Resumo do Pedido
                    </p>

                    <Alert 
                      title="Lembre-se que o valor mostrado é apenas uma estimativa."
                      subtitle="O valor real será confirmado na finalização do pedido com nosso atendimento."
                      className="flex font-medium my-2 dark:bg-input/50 order-last md:order-2"
                    />
                    <Alert 
                      title="Apenas 1 (um) cupom pode ser aplicado ao carrinho."
                      className="flex font-medium my-2 dark:bg-input/50 order-last md:order-3"
                    />

                    <div className="flex flex-col font-bold my-4 w-full gap-2 md:order-4">
                      <Label className="text-nowrap">
                        <Tag className="w-4 h-4 text-primary dark:text-details" />
                        {productsWithCouponApplied.length > 0 ? 'Cupom Aplicado:' : 'Possui cupom de desconto?'}
                      </Label>
                      <div className="flex gap-2 items-center">
                        <CustomInput
                          searchbarPlaceholder="Ex: TERCO10OFF"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={lockCoupon}
                          className={`${lockCoupon ? "opacity-50 cursor-not-allowed" : ""} bg-white`}
                          clearButtonAction={() => setCouponCode('')}
                          withClearButton
                        />
                        <button
                          type="button"
                          aria-label="Aplicar"
                          title="Aplicar"
                          onClick={handleCouponButtonClick}
                          className={cn(`flex items-center px-4 py-1.5 rounded-lg font-medium cursor-pointer transition-colors text-white`,
                            lockCoupon ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/80 dark:bg-details dark:hover:bg-details/80"
                          )}
                        >
                          {lockCoupon ? "Remover" : "Aplicar"}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 md:order-5">
                      {items.map((item) => (
                        <div 
                          key={item.cartId}
                          className="flex flex-col"
                        >
                          <div className="flex justify-between w-full gap-2 items-baseline">
                            <p className="text-nowrap">
                              {item.quantity} {item.quantity > 1 ? "itens" : "item"}
                            </p>
                            <hr className="border-dashed border-gray-300 w-full" />
                            <p>{formatCurrency(item.product.price * item.quantity)}</p>
                          </div>
                          {item.product.customizationPrice > 0 && (
                            <div className="flex justify-between text-xs text-gray-400 dark:text-zinc-500 font-medium">
                              <p>Personalização</p>
                              <p>
                                + {formatCurrency(Number(item.product.customizationPrice * item.quantity))}
                              </p>
                            </div>
                          )}
                          {couponCode && productsWithCouponApplied.length > 0 && productsWithCouponApplied
                            .filter((productWithCoupon) => productWithCoupon.applied_discount 
                              && productWithCoupon.coupon_type !== 'free_shipping' 
                              && item.product.id === productWithCoupon?.product?.id)
                            .map((productCallback, index) => {
                              return (
                                <div 
                                  key={index}
                                  className={`flex flex-col`}
                                >
                                  <div className="flex justify-between text-xs text-primary dark:text-details font-medium">
                                    <p>Cupom aplicado</p>
                                    <p>
                                      - {formatCurrency(Number(productCallback?.discount_price))}
                                    </p>
                                  </div>
                                  <div className="flex gap-1 justify-between items-baseline text-xs text-primary dark:text-details font-bold text-nowrap">
                                    <p>Valor final</p>
                                    <hr className="border-dashed border-primary dark:border-details w-full" />
                                    <p>{formatCurrency(Number(productCallback?.final_price))}</p>
                                  </div>
                                </div>
                              )
                            }
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 w-full gap-2 items-baseline md:order-6">
                      <p className="text-nowrap">Entrega</p>
                      <hr className="border-dashed border-gray-300 w-full" />
                      <p className="text-nowrap">
                        {productsWithCouponApplied.length > 0 
                          && productsWithCouponApplied[0].coupon_type === 'free_shipping' 
                          && productsWithCouponApplied[0].applied_discount ? 'Frete Grátis' : 'A combinar'
                        }
                      </p>
                    </div>
                    {productsWithCouponApplied.length === 1 && !productsWithCouponApplied[0].product && productsWithCouponApplied[0].coupon_percentage_value ? (
                      <div className="flex flex-col md:order-7">
                        <div className="flex font-bold justify-between mt-4 w-full gap-2 items-baseline text-primary dark:text-details">
                          <p className="text-nowrap">{couponCode.toLocaleUpperCase()}</p>
                          <hr className="border-dashed border-gray-300 dark:border-details w-full" />
                          <p className="text-nowrap">{`${productsWithCouponApplied[0]?.coupon_percentage_value}% OFF`}</p>
                        </div>
                        <div className="flex font-bold justify-between w-full gap-2 items-baseline text-muted-foreground/70">
                          <p className="text-nowrap">Desconto</p>
                          <hr className="border-dashed text-muted-foreground/70 w-full" />
                          <p className="text-nowrap">- {formatCurrency(Number(productsWithCouponApplied[0]?.discount_price))}</p>
                        </div>
                      </div>
                    ) : productsWithCouponApplied.length === 1 && !productsWithCouponApplied[0].product && productsWithCouponApplied[0].coupon_percentage_value && (
                      <div className="flex flex-col md:order-7">
                        <div className="flex font-bold justify-between mt-4 w-full gap-2 items-baseline text-primary dark:text-details">
                          <p className="text-nowrap">{couponCode.toLocaleUpperCase()}</p>
                          <hr className="border-dashed border-gray-300 dark:border-details w-full" />
                          <p className="text-nowrap">{`${formatCurrency(Number(centsToPriceString(productsWithCouponApplied[0]?.coupon_fixed_value)))} OFF`}</p>
                        </div>
                        <div className="flex font-bold justify-between w-full gap-2 items-baseline text-muted-foreground/70">
                          <p className="text-nowrap">Desconto</p>
                          <hr className="border-dashed text-muted-foreground/70 w-full" />
                          <p className="text-nowrap">- {formatCurrency(Number(productsWithCouponApplied[0]?.discount_price))}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex font-bold dark:font-black justify-between mt-2 w-full gap-2 items-baseline dark:text-details md:order-8">
                      <p className="text-nowrap">Total</p>
                      <hr className="border-dashed border-gray-300 dark:border-details w-full" />
                      <p>{calculeTotalCartValue()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center shrink-0 mt-auto">
                    <button 
                      type="button"
                      aria-label="Limpar carrinho"
                      onClick={() => setIsClearCartModalOpen(true)}
                      className={`hidden md:flex items-center justify-center gap-2 px-5 py-3 
                        text-red-500/80 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 
                        transition-colors font-medium cursor-pointer w-fit
                      `}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Limpar Carrinho</span>
                    </button>
                    <Alert className="flex font-medium mb-4 dark:bg-input/50">
                      <p>{`Ao clicar em "Finalizar Pedido", você declara que leu e concorda com nossos `} 
                        <Link 
                          href="/ajuda/termos-e-condicoes"
                          className="font-bold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ver Termos e Condições"
                          title="Ver Termos e Condições"
                        >
                          <span> Termos e Condições.</span>
                        </Link>
                      </p>
                    </Alert>
                    <div className="hidden md:block w-full">
                      {renderFinishOrderButton()}
                    </div>
                  </div>
                  <div className="flex w-full justify-center mt-4">
                    <SupportButton messageToSupport="Olá, estou tendo problemas no meu carrinho!" />
                  </div>
                </div>

                <DeleteItemCartModal
                  cartId={itemCartIdToDelete}
                  modalOpen={isDeleteItemCartModalOpen}
                  onClose={() => setIsDeleteItemCartModalOpen(false)}
                />
              </div>

              <ClearCartModal
                modalOpen={isClearCartModalOpen}
                onClose={() => setIsClearCartModalOpen(false)}
              />
            </>
          )}
        </div>
      </div>

      {/* Footer Mobile */}
      {!isCartEmpty && (
        <div className="shrink-0 mt-4 md:hidden">
          <hr className="border-muted-foreground/50" />
          <div className="flex flex-col my-2 gap-2">
            {renderFinishOrderButton()}
            <BackButton backRoute />
          </div>
        </div>
      )}

      {catalogProducts.length > 1 && (
        <div className="hidden md:flex flex-col pt-6 md:-mx-14 lg:-mx-16">
          {items.length > 1 && (
            <>
              <div className="flex ml-4">
                <span className="font-bold uppercase ml-12">
                  Veja também
                </span>
              </div>
              <div className="overflow-hidden">
                <SeeMoreProducts 
                  atualProductId={items[0].product.id} 
                  cachedProducts={catalogProducts}
                  className="ml-12"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};