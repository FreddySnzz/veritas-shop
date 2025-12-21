import { 
  FaTimes, 
} from "react-icons/fa";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { useMediaQuery } from "@/data/hook/useMediaQuery";
import { LogoHorizontal } from "./Typography";
import { WhatsAppButton } from "./buttons/WhatsAppButton";
import { useCustomization } from "@/data/context/CustomizationContext";
import { calculateCustomizationPrice } from "@/data/functions/calculateCustomizationPrice";
import { MinusCircle, Trash2 } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { customization, updateCustomization, resetCustomization } = useCustomization();
  const isMdDown = useMediaQuery("(max-width: 768px)");

  const gerarMensagemWhatsApp = () => {
    const mensagem = `Olá! Gostaria de fazer um pedido de Terço Personalizado:

        • Cordão: ${customization?.cordao || 'Não selecionado;'}
        • Contas: ${customization?.conta || 'Não selecionado;'}
        • Letras: ${customization?.styleLetra || 'Não selecionado;'}
        • Crucifixo: ${customization?.crucifixo || 'Não selecionado;'}
        • Entremeio: ${customization?.entremeio || 'Não selecionado;'}
        • Texto: ${customization?.frase || 'Não informado;'}

      Aguardo retorno!
    `;

    const url = `https://wa.me/5586994379414?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  useLockBodyScroll(open);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 transition-opacity z-49 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white transform transition-transform duration-500 z-50 shadow-xl
        ${open ? "translate-x-[-100]" : "translate-x-full"}`}
      >
        <div className="flex items-center">
          <div className="flex w-full justify-between p-4">
            {isMdDown && <LogoHorizontal />}
            <button onClick={onClose} aria-label="Fechar menu" className="hover:bg-gray-100 rounded-xl p-2 cursor-pointer">
              <FaTimes className="text-secondary text-2xl" />
            </button>
          </div>
        </div>

        <nav className="flex min-h-[90vh] flex-col p-4 gap-2">
          <div className="flex grow flex-col mt-4">
            <p className="font-sans font-medium text-lg">
              Meu carrinho
            </p>

            <hr className="mt-4 mb-2 border-muted-foreground/10"/>

            <div className="flex flex-col p-4 gap-2 font-sans">
              {customization?.conta && 
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="bg-black rounded-xl w-12 h-12 object-contain">
                      {/* TODO: find by ref */}
                      {/* <Image
                        src={conta.img}
                        alt={conta.ref}
                        width={400}
                        height={400}
                        className='rounded-xl'
                      /> */}
                    </div>
                    <p className="text-sm text-muted-foreground">Conta: {customization.conta}</p>
                  </div>
                  <button onClick={() => updateCustomization({ conta: undefined })} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <MinusCircle className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              }

              {customization?.cordao && 
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="bg-black rounded-xl w-12 h-12" />
                    <p className="text-sm text-muted-foreground">Cordão: {customization.cordao}</p>
                  </div>
                  <button onClick={() => updateCustomization({ cordao: undefined })} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <MinusCircle className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              }

              {customization?.styleLetra && 
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="bg-black rounded-xl w-12 h-12" />
                    <p className="text-sm text-muted-foreground">Letra: {customization.styleLetra}</p>
                  </div>
                  <button onClick={() => updateCustomization({ styleLetra: undefined })} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <MinusCircle className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              }

              {customization?.crucifixo && 
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="bg-black rounded-xl w-12 h-12" />
                    <p className="text-sm text-muted-foreground">Crucifixo: {customization.crucifixo}</p>
                  </div>
                  <button onClick={() => updateCustomization({ crucifixo: undefined })} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <MinusCircle className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              }

              {customization?.entremeio && 
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="bg-black rounded-xl w-12 h-12" />
                    <p className="text-sm text-muted-foreground">Entremeio: {customization.entremeio}</p>
                  </div>
                  <button onClick={() => updateCustomization({ entremeio: undefined })} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <MinusCircle className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              }

              {customization?.frase && customization.frase.map((frase: string, index: number) => (
                <div key={index} className="flex items-center justify-between gap-4 w-full">
                  <p className="text-muted-foreground mt-6">
                    Texto {index + 1}: {frase}
                  </p>
                  
                  <button 
                    onClick={() => {
                      const novaFrase = (customization.frase!).filter((_, i) => i !== index);
                      updateCustomization({ frase: novaFrase });
                    }} 
                    className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    title="Remover este item"
                  >
                    <MinusCircle className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button 
              onClick={() => resetCustomization()}
              className="flex gap-2 font-sans text-red-400"
            >
              <Trash2 />
              Limpar Carrinho
            </button>
          </div>

          <hr className="my-4 border-muted-foreground/15"/>

          <span className="font-sans font-medium">
            Valor aproximado: R$ {calculateCustomizationPrice(customization).toFixed(2)}
          </span>

          <hr className="my-4 border-muted-foreground/15"/>

          <WhatsAppButton message={gerarMensagemWhatsApp} />
        </nav>
      </aside>
    </>
  );
}
