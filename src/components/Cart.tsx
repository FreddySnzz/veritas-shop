'use client';

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/data/context/CartContext";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import DeleteItemCartModal from "./modals/DeleteItemCart";
import ClearCartModal from "./modals/ClearCart";
import { BackButton } from "./buttons/BackButtom";
import { WhatsAppButton } from "./buttons/WhatsAppButton";

export default function Cart() {
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

  const renderTotalCartValue = () => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    return (
      <div className="flex items-center justify-end w-full gap-2">
        <span className="text-lg font-medium text-secondary">
          Total apróx.:
        </span>
        <span className="text-lg font-bold text-secondary">
          R$ {total.toFixed(2)}
        </span>
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gerarMensagemWhatsApp = (items: any) => {
    const labels = {
      cordao: 'Cordão',
      conta: 'Contas',
      styleLetra: 'Estilo da Letra',
      letra: 'Estilo da Letra',
      crucifixo: 'Crucifixo',
      entremeio: 'Entremeio',
      frase: 'Texto/Nome'
    };

    let mensagem = `Olá! Gostaria de finalizar o seguinte pedido:\n\n`;
    let totalGeral = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.forEach((item: any, index: number) => {
      const { product, quantity, customization } = item;
      const subtotal = product.price * quantity;
      totalGeral += subtotal;

      mensagem += `*ITEM ${index + 1}: ${product.name}*\n`;
      mensagem += `Qtd: ${quantity}un (R$ ${product.price.toFixed(2)} un)\n`;
      mensagem += `--------------------\n`;

      const allowedItems = product.customizationItems || [];

      if (allowedItems.includes('cordao') && customization.cordao) {
        mensagem += `- ${labels.cordao}: ${customization.cordao}\n`;
      };

      if (allowedItems.includes('conta') && customization.conta) {
        mensagem += `- ${labels.conta}: ${customization.conta}\n`;
      };

      if (allowedItems.includes('letra') || allowedItems.includes('texto')) {
        if (customization.styleLetra) {
          mensagem += `- ${labels.styleLetra}: ${customization.styleLetra}\n`;
        };
        
        if (customization.frase && customization.frase.length > 0) {
          const textoFormatado = customization.frase.join(', '); 
          mensagem += `- ${labels.frase}: ${textoFormatado}\n`;
        };
      };

      if (allowedItems.includes('crucifixo') && customization.crucifixo) {
        mensagem += `- ${labels.crucifixo}: ${customization.crucifixo}\n`;
      };

      if (allowedItems.includes('entremeio')) {
        const entremeioVal = customization.entremeio ? customization.entremeio : 'Sem entremeio';
        mensagem += `- ${labels.entremeio}: ${entremeioVal}\n`;
      };

      mensagem += `\n`;
    });

    mensagem += `*Total Estimado: R$ ${totalGeral.toFixed(2)}*\n`;
    mensagem += `\nAguardo a confirmação e dados para pagamento!`;
    
    const numeroWhatsApp = "5586994379414";
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  };

  return (
    <div className="flex-1 flex flex-col w-full min-h-0 overflow-hidden font-sans">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex px-6 py-2">
          <h2 className="text-xl font-bold text-secondary">
            Meu Carrinho
          </h2>
        </div>
        <div className="px-6 py-2 space-y-4">
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
              <div className="space-y-2">
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
                  <div 
                    key={item.cartId} 
                    className="flex flex-col gap-2 w-full bg-white rounded-lg p-4 border border-gray-100"
                  >
                    <span className="font-bold ">
                      {item.product.name}
                    </span>
                    <div className="flex">
                      {item.product.image ? (
                        <div className="relative w-35 h-35">
                          <Image 
                            src={item.product.image}
                            alt={item.product.name}
                            fill 
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
                      
                      <div className="flex flex-col ml-2 grow">
                        <div className="flex flex-col h-full justify-between text-xs">
                          <span>
                            Quantidade: {item.quantity}
                          </span>

                          {item.product.customizable && (
                            <div className="flex text-xs text-gray-500 h-full mt-2">
                              <div className="flex grow flex-col">
                                {item.customization?.cordao && <span className="mr-1">Cordão: {item.customization.cordao}</span>}
                                {item.customization?.conta && <span className="mr-1">Contas: {item.customization.conta}</span>}
                                {item.customization?.styleLetra && <span className="mr-1">Letra: {item.customization.styleLetra}</span>}
                                {item.customization?.crucifixo && <span className="mr-1">Crucifixo: {item.customization.crucifixo}</span>}
                                {item.customization?.entremeio && <span className="mr-1">Entremeio: {item.customization.entremeio}</span>}
                                {item.customization?.frase && <span className="mr-1">Texto: {item.customization.frase.join(', ')}</span>}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <button 
                          onClick={() => handleRemoveItemCart(item.cartId)}
                          className="cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5 hover:text-secondary/80 transition-colors" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-center justify-between">
                      <div className="flex mt-2">
                        <div className="flex border border-gray-200 gap-3 px-2 py-1 rounded">
                          <button className="cursor-pointer px-2">
                            <Minus 
                              onClick={() => handleSubtractQuantity(item.cartId)}
                              className="w-3 h-3 hover:text-secondary/80 transition-colors" 
                            />
                          </button>
                          <span className="px-3 cursor-default">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => addQuantity(item.cartId)}
                            className="cursor-pointer px-2"
                          >
                            <Plus className="w-3 h-3 hover:text-secondary/80 transition-colors" />
                          </button>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        {item.quantity} x R$ {item.product.price.toFixed(2)}
                      </span>
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
                  className="flex items-center justify-center gap-2 px-5 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Limpar Carrinho</span>
                </button>

                <ClearCartModal
                  modalOpen={isClearCartModalOpen}
                  onClose={() => setIsClearCartModalOpen(false)}
                />
              </div>

              <WhatsAppButton
                message={gerarMensagemWhatsApp(items)}
              />
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 mt-auto bg-background-alternative">
        <div className="flex my-2 mx-6 items-center justify-between">
          {renderTotalCartValue()}
        </div>
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/" />
        </div>
      </div>
    </div>
  );
};