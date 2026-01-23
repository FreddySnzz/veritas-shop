'use client';

import Image from "next/image";
import { useState } from "react";
import { useApp } from "@/data/context/AppContext";
import { useCart } from "@/data/context/CartContext";
import { useRouter } from "next/navigation";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { Trash2, ShoppingCart, X, Minus, Plus } from "lucide-react";
import { CustomButton } from "./buttons/CustomButton";
import ClearCartModal from "./modals/ClearCart";
import DeleteItemCartModal from "./modals/DeleteItemCart";

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useApp();
  const router = useRouter();
  const { 
    cartCount, 
    items, 
    addQuantity,
    subtractQuantity,
  } = useCart();
  const [alertOpen, setAlertOpen] = useState(true);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);
  const [isDeleteItemCartModalOpen, setIsDeleteItemCartModalOpen] = useState(false);
  const [itemCartIdToDelete, setItemCartIdToDelete] = useState<string>('');
  const isCartEmpty = cartCount === 0;

  useLockBodyScroll(isSidebarOpen);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

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
              <h2 className="text-xl font-bold text-secondary">
                Meu Carrinho
              </h2>
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
              onClick={closeSidebar} 
              aria-label="Fechar menu" 
              className="hover:bg-gray-100 rounded-lg p-2 transition-colors ml-auto cursor-pointer"
            >
              <X className="text-secondary text-xl hover:text-secondary/80" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {isCartEmpty ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
                <p className="text-sm text-gray-400 mt-2">
                  Adicione itens para finalizar seu pedido
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-8">
                  <div className={`${alertOpen ? "" : "hidden"} flex justify-between bg-gray-50 rounded-lg transition-colors p-3`}>
                    <span className="text-xs">
                      <strong>Os produtos no carrinho não estão reservados.</strong><br/> Finalize seu pedido antes que o estoque acabe.
                    </span>
                    <button 
                      onClick={handleCloseAlert}
                      className="flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4 hover:text-secondary/80 transition-colors" />
                    </button>
                  </div>

                  {items.map((item) => (
                    <div key={item.cartId} className="flex flex-col gap-2">
                      <span className="font-bold ">
                        {item.product.name}
                      </span>
                      <div className="flex">
                        {item.product.image ? (
                          <div className="relative w-25 h-25">
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
                        
                        <div className="flex flex-col ml-2 grow">
                          <div className="flex flex-col h-full justify-between text-xs">
                            <span>
                              Quantidade: {item.quantity}
                            </span>

                            {item.product.customizable && (
                              <div className="flex text-[0.6rem] text-gray-500">
                                <div className="flex grow flex-col">
                                  {item.customization?.cordao && <span className="mr-1">Cordão: {item.customization.cordao}</span>}
                                  {item.customization?.conta && <span className="mr-1">Contas: {item.customization.conta}</span>}
                                  {item.customization?.styleLetra && <span className="mr-1">Letra: {item.customization.styleLetra}</span>}
                                </div>
                                <div className="flex grow flex-col">
                                  {item.customization?.crucifixo && <span className="mr-1">Crucifixo: {item.customization.crucifixo}</span>}
                                  {item.customization?.entremeio && <span className="mr-1">Entremeio: {item.customization.entremeio}</span>}
                                  {item.customization?.frase && <span className="mr-1">Texto: {item.customization.frase.join(', ')}</span>}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex mt-2">
                              <div className="flex border border-gray-200 gap-3 px-3 py-2 rounded">
                                <button className="cursor-pointer">
                                  <Minus 
                                    onClick={() => handleSubtractQuantity(item.cartId)}
                                    className="w-3 h-3 hover:text-secondary/80 transition-colors" 
                                  />
                                </button>
                                <span className="px-3">
                                  {item.quantity}
                                </span>
                                <button 
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
                    onClick={() => setIsClearCartModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium cursor-pointer"
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
          <div className="shrink-0 border-t border-gray-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between py-2 px-3">
              <CustomButton
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