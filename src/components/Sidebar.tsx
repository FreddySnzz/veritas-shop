import { FaTimes } from "react-icons/fa";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { useMediaQuery } from "@/data/hook/useMediaQuery";
import { LogoHorizontal } from "./Typography";
import { WhatsAppButton } from "./buttons/WhatsAppButton";
import { useCustomization } from "@/data/context/CustomizationContext";
import { calculateCustomizationPrice } from "@/data/functions/calculateCustomizationPrice";
import { MinusCircle, Trash2, ShoppingCart } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { customization, updateCustomization, resetCustomization } = useCustomization();
  const isMdDown = useMediaQuery("(max-width: 768px)");

  const gerarMensagemWhatsApp = () => {
    const mensagem = `Olá! Gostaria de fazer um pedido de Terço Personalizado:

- Cordão: ${customization?.cordao || 'Não selecionado'}
- Contas: ${customization?.conta || 'Não selecionado'}
- Letras: ${customization?.styleLetra || 'Não selecionado'}
- Crucifixo: ${customization?.crucifixo || 'Não selecionado'}
- Entremeio: ${customization?.entremeio || 'Não selecionado'}
- Texto: ${customization?.frase?.join(', ') || 'Não informado'}

Aguardo retorno!`;

    const url = `https://wa.me/5586994379414?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const isCartEmpty = !customization?.cordao && 
                      !customization?.conta && 
                      !customization?.styleLetra && 
                      !customization?.crucifixo && 
                      !customization?.entremeio && 
                      (!customization?.frase || customization.frase.length === 0);

  useLockBodyScroll(open);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 font-sans ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-100 md:w-112.5 lg:w-125 bg-white font-sans
          transform transition-transform duration-300 ease-in-out z-50 shadow-2xl flex flex-col 
          ${ open ? "translate-x-0" : "translate-x-full"}`
        }
      >
        <div className="shrink-0 border-b border-gray-200 font-sans">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
              Meu Carrinho
            </h2>
            <button 
              onClick={onClose} 
              aria-label="Fechar menu" 
              className="hover:bg-gray-100 rounded-lg p-2 transition-colors ml-auto cursor-pointer"
            >
              <FaTimes className="text-secondary text-xl" />
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
                <div className="space-y-3">
                  {customization?.cordao && (
                    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="hrink-0 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg w-12 h-12 flex items-center justify-center">
                          <span className="text-xs text-gray-600">IMG</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Cordão</p>
                          <p className="text-sm font-medium text-gray-800 truncate">Ref: {customization.cordao}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => updateCustomization({ cordao: undefined })} 
                        className="hrink-0 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        aria-label="Remover cordão"
                      >
                        <MinusCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  )}

                  {customization?.conta && (
                    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="shrink-0 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg w-12 h-12 flex items-center justify-center">
                          <span className="text-xs text-gray-600">IMG</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Contas</p>
                          <p className="text-sm font-medium text-gray-800 truncate">Ref: {customization.conta}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => updateCustomization({ conta: undefined })} 
                        className="shrink-0 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        aria-label="Remover contas"
                      >
                        <MinusCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  )}

                  {customization?.styleLetra && (
                    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="shrink-0 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg w-12 h-12 flex items-center justify-center">
                          <span className="text-xs text-gray-600">ABC</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Estilo de Letra</p>
                          <p className="text-sm font-medium text-gray-800 truncate">Ref: {customization.styleLetra}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => updateCustomization({ styleLetra: undefined })} 
                        className="shrink-0 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        aria-label="Remover estilo de letra"
                      >
                        <MinusCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  )}

                  {customization?.crucifixo && (
                    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="shrink-0 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg w-12 h-14 flex items-center justify-center">
                          <span className="text-xs text-gray-600">✝</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Crucifixo</p>
                          <p className="text-sm font-medium text-gray-800 truncate">Ref: {customization.crucifixo}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => updateCustomization({ crucifixo: undefined })} 
                        className="shrink-0 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        aria-label="Remover crucifixo"
                      >
                        <MinusCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  )}

                  {customization?.entremeio && (
                    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="hrink-0 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg w-12 h-12 flex items-center justify-center">
                          <span className="text-xs text-gray-600">IMG</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Entremeio</p>
                          <p className="text-sm font-medium text-gray-800 truncate">Ref: {customization.entremeio}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => updateCustomization({ entremeio: undefined })} 
                        className="shrink-0 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        aria-label="Remover entremeio"
                      >
                        <MinusCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  )}

                  {customization?.frase && customization.frase.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs text-secondary uppercase tracking-wide font-bold px-1">
                        Textos Personalizados
                      </p>
                      {customization.frase.map((frase: string, index: number) => (
                        <div 
                          key={index} 
                          className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-1">Texto {index + 1}</p>
                            <p className="text-sm text-gray-800 wrap-break-word">{frase}</p>
                          </div>
                          <button 
                            onClick={() => {
                              const novaFrase = customization.frase!.filter((_, i) => i !== index);
                              updateCustomization({ frase: novaFrase });
                            }} 
                            className="shrink-0 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            aria-label={`Remover texto ${index + 1}`}
                          >
                            <MinusCircle className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={resetCustomization}
                  className="w-full flex items-center justify-center gap-2 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar Carrinho
                </button>
              </>
            )}
          </div>
        </div>

        {!isCartEmpty && (
          <div className="shrink-0 border-t border-gray-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between py-2 px-3">
              <span className="font-medium text-gray-700">Valor aproximado:</span>
              <span className="text-lg font-bold text-secondary">
                R$ {calculateCustomizationPrice(customization).toFixed(2)}
              </span>
            </div>

            <WhatsAppButton message={gerarMensagemWhatsApp} />
          </div>
        )}
      </aside>
    </>
  );
}