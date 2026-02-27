'use client';

import Image from "next/image";
import { useState } from "react";
import { useApp } from "@/data/context/AppContext";
import { useCart } from "@/data/context/CartContext";
import { useRouter } from "next/navigation";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { Trash2, ShoppingCart, X, Minus, Plus } from "lucide-react";
import { CustomButton } from "./buttons/CustomButton";
import { formatAndCapitalize } from "@/data/functions/formatAndCapitalize";
import ClearCartModal from "./modals/ClearCart";
import DeleteItemCartModal from "./modals/DeleteItemCart";
import Alert from "./Alert";
import Link from "next/link";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useApp();
  const router = useRouter();
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

  useLockBodyScroll(isSidebarOpen);

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

  const handleGoToCart = () => {
    closeSidebar();
    router.push('/carrinho');
  };

  const renderCustomizationDesc = (
    key: string, 
    value: string | string[] | undefined
  ) => {
    if (!key || !value) return "Não informado";
    key = formatAndCapitalize(key);

    if (key.includes('Letras') || key.includes('Frase')) {
      const formattedValue = Array.isArray(value) ? value.join(', ') : value;
      return `${key}: ${formattedValue}\n`;
    };

    return `${key}: ${value}`;
  };

  return (
    <>
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 font-sans 
          ${ isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-100 md:w-112.5 lg:w-125 bg-white font-sans
          transform transition-transform duration-300 ease-in-out z-50 shadow-2xl flex flex-col 
          ${ isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="shrink-0 border-b border-gray-200 font-sans">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-secondary">
                  Meu Carrinho
                </span>
                <span className="text-xs font-medium text-gray-400">
                  ({items.length} {items.length > 1 ? "produtos" : "produto"})
                </span>
              </div>
              <button 
                onClick={handleGoToCart} 
                aria-label="Ir para página do carrinho" 
                className="flex cursor-pointer"
              >
                <span className="text-xs hover:underline text-gray-400">
                  Ir para página do carrinho
                </span>
              </button>
            </div>
            <button 
              type="button"
              aria-label="Fechar carrinho"
              title="Fechar carrinho"
              onClick={closeSidebar} 
              className="p-2 transition-colors ml-auto cursor-pointer"
            >
              <X className="text-secondary text-xl hover:text-secondary/70" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col h-full p-4 space-y-4">
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
                <div className="space-y-8">
                  <Alert
                    title="Os produtos no carrinho não estão reservados."
                    subtitle="Finalize seu pedido antes que o estoque acabe."
                  />

                  {items.map((item) => (
                    <div key={item.cartId} className="flex flex-col gap-2">
                      <Link
                        aria-label="Ir para Página do Produto"
                        title="Ir para Página do Produto"
                        href={mountProductUrl(item.product.name, true)}
                      >
                        <span className="font-bold hover:underline">
                          {item.product.name}
                        </span>
                      </Link>
                      <div className="flex">
                        {item.product.image ? (
                          <div className="relative w-25 h-25 shrink-0">
                            <Image 
                              src={item.product.image}
                              alt={item.product.name}
                              fill 
                              className="object-cover rounded-lg aspect-square" 
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        ) : (
                          <div className="relative w-25 h-25">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-gray-400 text-sm">Sem imagem</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col ml-3 grow">
                          <div className="flex flex-col h-full justify-between text-xs">
                            <span>
                              Quantidade: {item.quantity}
                            </span>

                            {item.product.customizable && (
                              <div className="flex text-[0.6rem] text-gray-500 mt-1">
                                <div className="grid grid-cols-2">
                                  {Object.entries(item.customization || {}).map(([key, value]) => (
                                    <span 
                                      key={key}
                                      className="mr-1"
                                    >
                                      {`• ${renderCustomizationDesc(key, value)}`}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex mt-2">
                              <div className="flex border border-gray-200 gap-3 px-3 py-2 rounded">
                                <button 
                                  type="button"
                                  aria-label="Diminuir quantidade"
                                  title="Diminuir quantidade"
                                  className="cursor-pointer"
                                  onClick={() => handleSubtractQuantity(item.cartId)}
                                >
                                  <Minus className="w-3 h-3 hover:text-secondary/80 transition-colors" />
                                </button>
                                <span className="px-3">
                                  {item.quantity}
                                </span>
                                <button 
                                  type="button"
                                  aria-label="Aumentar quantidade"
                                  title="Aumentar quantidade"
                                  onClick={() => addQuantity(item.cartId)}
                                  className="cursor-pointer"
                                >
                                  <Plus className="w-3 h-3 hover:text-secondary/80 transition-colors" />
                                </button>
                              </div>
                            </div>
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
                            <Trash2 className="w-4 h-4 hover:text-secondary/80 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <DeleteItemCartModal
                    cartId={itemCartIdToDelete}
                    modalOpen={isDeleteItemCartModalOpen}
                    onClose={() => setIsDeleteItemCartModalOpen(false)}
                  />
                </div>

                <div className="flex w-full items-center justify-center">
                  <button 
                    type="button"
                    aria-label="Limpar carrinho"
                    onClick={() => setIsClearCartModalOpen(true)}
                    className={`flex items-center justify-center gap-2 px-5 py-3 
                      text-red-500/80 hover:text-red-600 transition-colors font-medium cursor-pointer
                    `}
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpar Carrinho
                  </button>

                  <ClearCartModal
                    modalOpen={isClearCartModalOpen}
                    onClose={() => setIsClearCartModalOpen(false)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {!isCartEmpty && (
          <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-1 space-y-3">
            <div className="flex items-center justify-between py-2 px-3">
              <CustomButton
                type="button"
                aria-label="Ir para página do carrinho"
                onClick={handleGoToCart}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Ir para página do carrinho
              </CustomButton>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};