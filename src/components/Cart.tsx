'use client';

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/data/context/CartContext";
import { 
  Minus, 
  Plus, 
  ShoppingCart, 
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
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);
  const [isDeleteItemCartModalOpen, setIsDeleteItemCartModalOpen] = useState(false);
  const [itemCartIdToDelete, setItemCartIdToDelete] = useState<string>('');
  const isCartEmpty = cartCount === 0;

  const handleSubtractQuantity = (id: string) => {
    const itemQuantity = items.filter(item => item.cartId === id)[0].quantity;
    
    if ((itemQuantity - 1) >= 1) {
      subtractQuantity(id);
    };

    if ((itemQuantity - 1) < 1) return;
  };

  const handleRemoveItemCart = (id: string) => {
    setItemCartIdToDelete(id);
    setIsDeleteItemCartModalOpen(true);
  };

  const calculeTotalCartValue = () => {
    const total = items.reduce(
      (acc, item) => (
        item.product.customizationPrice > 0 ? 
        acc + item.quantity * (item.product.price + item.product.customizationPrice) : 
        acc + item.quantity * item.product.price
      ), 0
    );

    return formatCurrency(total);
  };

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
  };

  const generateWhatsAppMessage = (items: CartProductItem[]) => {
    let mensagem = `Olá! Gostaria de finalizar o seguinte pedido:\n\n`;
    let totalGeral = 0;
    
    items.forEach((item: CartProductItem, index: number) => {
      const { product, quantity, customization } = item;
      if (!product.customizationPrice) product.customizationPrice = 0;
      const subtotal = (product.price + product.customizationPrice) * quantity;
      totalGeral += subtotal;
      
      mensagem += `----------------------------------------------------\n`;
      mensagem += `*ITEM ${index + 1}: ${product.name}*\n`;
      mensagem += `Quantidade: ${quantity} (${formatCurrency(product.price)} / und)\n`;
      if (product.customizationPrice > 0) mensagem += `Personalização: (${formatCurrency(product.customizationPrice)} / item)\n`;
      mensagem += `----------------------------------------------------\n`;

      Object.entries(customization || {}).forEach(([key, value]) => {
        if (!key || !value) return;
        mensagem += `${renderCustomizationDesc(key, value)}`;
      });

      mensagem += `\n`;
    });

    mensagem += `============================\n`;
    mensagem += `*Total Estimado: ${formatCurrency(totalGeral)}*\n`;
    mensagem += `============================\n`;
    mensagem += `Aguardo a confirmação e dados para pagamento!`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
  };

  return (
    <div className="flex-1 flex flex-col w-full min-h-0 font-sans">
      <div className="flex flex-col">
        <div className="flex items-baseline justify-between">
          <span className="text-xl lg:text-3xl font-bold text-secondary">
            Meu Carrinho
          </span>
          <span className="text-sm text-gray-500">
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
                />
              </div>

              <div className="flex">
                <div className="w-full lg:w-2/3 space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.cartId} 
                      className={`flex flex-col gap-2 w-full
                        bg-white rounded-lg px-4 lg:px-6 py-3 border border-gray-100
                      `}
                    >
                      <span className="font-bold ">
                        {item.product.name}
                      </span>
                      <div className="flex">
                        {item.product.image ? (
                          <div className="relative w-35 h-35 shrink-0">
                            <Image 
                              src={item.product.image}
                              alt={item.product.name}
                              fill 
                              loading="eager"
                              className="object-cover rounded-lg aspect-square" 
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
                          <div className="flex flex-col h-full justify-between text-xs">
                            <span>
                              Quantidade: {item.quantity}
                            </span>

                            {item.product.customizable && (
                              <div className="flex text-xs text-gray-500 h-full mt-2">
                                <div className="flex grow flex-col">
                                  {Object.entries(item.customization || {}).map(([key, value]) => (
                                    <span key={key}>
                                      {renderCustomizationDesc(key, value)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-center">
                          <button 
                            type="button"
                            aria-label="Remover item do carrinho"
                            title="Remover item do carrinho"
                            onClick={() => handleRemoveItemCart(item.cartId)}
                            className="cursor-pointer"
                          >
                            <Trash2 className="w-5 h-5 hover:text-secondary/80 transition-colors" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-center justify-between">
                        <div className="flex ml-1">
                          <div className="flex border border-gray-200 gap-3 px-2 py-1 rounded">
                            <button 
                              type="button"
                              aria-label="Diminuir quantidade"
                              title="Diminuir quantidade"
                              onClick={() => handleSubtractQuantity(item.cartId)}
                              className="cursor-pointer px-2"
                            >
                              <Minus className="w-3 h-3 hover:text-secondary/80 transition-colors" />
                            </button>
                            <span className="px-3 cursor-default">
                              {item.quantity}
                            </span>
                            <button 
                              type="button"
                              aria-label="Aumentar quantidade"
                              title="Aumentar quantidade"
                              onClick={() => addQuantity(item.cartId)}
                              className="cursor-pointer px-2"
                            >
                              <Plus className="w-3 h-3 hover:text-secondary/80 transition-colors" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col text-gray-400 justify-end items-end text-xs">
                          <span className="text-sm font-medium">
                            {item.quantity} x {formatCurrency(item.product.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden md:flex flex-col w-full lg:w-1/3 pl-16">
                  <div className="flex-1 flex-col">
                    <span className="font-bold text-2xl text-secondary uppercase">
                      Resumo do Pedido
                    </span>

                    <div className="flex flex-col mt-2 gap-2">
                      {items.map((item) => (
                        <div 
                          key={item.cartId}
                          className="flex flex-col"
                        >
                          <div className="flex justify-between w-full gap-2 items-baseline">
                            <span className="text-nowrap">
                              {item.quantity} {item.quantity > 1 ? "itens" : "item"}
                            </span>
                            <hr className="border-dashed border-gray-300 w-full" />
                            <span>{formatCurrency(item.product.price * item.quantity)}</span>
                          </div>
                          {item.product.customizationPrice > 0 && (
                            <div className="flex justify-between text-xs text-gray-400 font-medium">
                              <span>Personalização</span>
                              <span>
                                + {formatCurrency(item.product.customizationPrice * item.quantity)}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 w-full gap-2 items-baseline">
                      <span className="text-nowrap">Entrega</span>
                      <hr className="border-dashed border-gray-300 w-full" />
                      <span className="text-nowrap">A combinar</span>
                    </div>
                    <div className="flex font-bold justify-between mt-6 w-full gap-2 items-baseline">
                      <span className="text-nowrap">Total</span>
                      <hr className="border-dashed border-gray-300 w-full" />
                      <span>{calculeTotalCartValue()}</span>
                    </div>
                    <Alert 
                      title="Lembre-se que o valor mostrado é apenas uma estimativa."
                      subtitle="O valor real será confirmado na finalização do pedido com nosso atendimento."
                      className="flex font-medium mt-4"
                    />
                  </div>

                  <div className="shrink-0 mt-auto">
                    <div className="hidden md:flex w-full items-center justify-center">
                      <button 
                        type="button"
                        aria-label="Limpar carrinho"
                        onClick={() => setIsClearCartModalOpen(true)}
                        className={`flex items-center justify-center gap-2 px-5 py-3 
                          text-red-500/80 hover:text-red-600 transition-colors font-medium cursor-pointer
                        `}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Limpar Carrinho</span>
                      </button>
                    </div>
                    <Alert className="flex font-medium mb-4">
                      <span>{`Ao clicar em "Finalizar Pedido", você declara que leu e concorda com nossos `} 
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
                      </span>
                    </Alert>
                    <WhatsAppButton message={generateWhatsAppMessage(items)} />
                    <SupportButton messageToSupport="Olá, estou tendo problemas no meu carrinho!" />
                  </div>
                </div>

                <DeleteItemCartModal
                  cartId={itemCartIdToDelete}
                  modalOpen={isDeleteItemCartModalOpen}
                  onClose={() => setIsDeleteItemCartModalOpen(false)}
                />
              </div>

              <div className="flex md:hidden w-full items-center justify-center">
                <button 
                  type="button"
                  aria-label="Limpar carrinho"
                  onClick={() => setIsClearCartModalOpen(true)}
                  className={`flex items-center justify-center gap-2 px-5 py-3 
                    text-red-500/80 hover:text-red-600 transition-colors font-medium cursor-pointer
                  `}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Limpar Carrinho</span>
                </button>
              </div>

              <ClearCartModal
                modalOpen={isClearCartModalOpen}
                onClose={() => setIsClearCartModalOpen(false)}
              />
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 mt-auto md:hidden">
        <div className="flex flex-col w-full mt-2">
          <div className="flex-1 flex-col">
            <span className="font-bold text-lg text-secondary uppercase">
              Resumo do Pedido
            </span>

            <div className="flex flex-col mt-2 gap-2">
              {items.map((item) => (
                <div 
                  key={item.cartId}
                  className="flex flex-col"
                >
                  <div className="flex justify-between w-full gap-2 items-baseline">
                    <span className="text-nowrap">
                      {item.quantity} {item.quantity > 1 ? "itens" : "item"}
                    </span>
                    <hr className="border-dashed border-gray-300 w-full" />
                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                  {item.product.customizationPrice > 0 && (
                    <div className="flex justify-between text-xs text-gray-400 font-medium">
                      <span>Personalização</span>
                      <span>
                        + {formatCurrency(item.product.customizationPrice * item.quantity)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between w-full gap-2 items-baseline">
              <span className="text-nowrap">Entrega</span>
              <hr className="border-dashed border-gray-300 w-full" />
              <span className="text-nowrap">A combinar</span>
            </div>

            <div className="flex font-bold justify-between mt-6 w-full gap-2 items-baseline">
              <span className="text-nowrap">Total</span>
              <hr className="border-dashed border-gray-300 w-full" />
              <span>{calculeTotalCartValue()}</span>
            </div>
            <Alert 
              title="Lembre-se que o valor mostrado é apenas uma estimativa."
              subtitle="O valor real será confirmado na finalização do pedido com nosso atendimento."
              className="flex font-medium my-2"
            />
            <Alert className="flex font-medium my-2">
              <span>{`Ao clicar em "Finalizar Pedido", você declara que leu e concorda com nossos `}
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
              </span>
            </Alert>
            <SupportButton 
              messageToSupport="Olá, estou tendo problemas no meu carrinho!"
              className="my-2"
            />
          </div>
        </div>
        
        <hr className="border-muted-foreground/50" />
        <div className="flex flex-col my-2 gap-2">
          <WhatsAppButton message={generateWhatsAppMessage(items)} />
          <BackButton backRoute />
        </div>
      </div>

      <div className="hidden md:flex flex-col pt-6 md:-mx-14 lg:-mx-16">
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
      </div>
    </div>
  );
};