'use client';

import { useState } from "react";
import { useAuth } from "@/data/context/AuthContext";
import { useRouter } from "next/navigation";
import { refreshCacheAction } from "@/app/actions/cache.actions";
import { updateUserAction } from "@/app/actions/users.action";
import { CustomButton } from "../buttons/CustomButton"
import { ClipboardPenLine, Eye, Image as ImageIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { BackButton } from "../buttons/BackButtom";
import { FaWhatsapp } from "react-icons/fa6";
import CustomModal from "../modals/CustomModal";
import { Input } from "../ui/input";
import { onlyNumbers } from "@/data/functions/inputMasks";

interface PanelLayoutProps {
  className?: string
};

export default function PanelLayout({ className }: PanelLayoutProps) {
  const { user, setUser } = useAuth();
  const [whatsappNumber, setWhatsappNumber] = useState<string>(user?.phone || '');
  const [isOpenWhatsAppModal, setIsOpenWhatsAppModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateCatalog = async () => {
    setLoading(true);
    try {
      await refreshCacheAction('products'); 
      await refreshCacheAction('customization_items'); 
      await refreshCacheAction('catalog_images');
      toast.success("Catálogo atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Houve um erro ao atualizar estoques");
    } finally {
      setLoading(false);
    };
  };

  const handleUpdateWhatsApp = async (number: string) => {
    setLoading(true);
    try {
      if (!user) return;

      await updateUserAction(user.id, { phone: number });
      setUser({ ...user, phone: number });
      toast.success("Número do WhatsApp atualizado com sucesso!");
      setIsOpenWhatsAppModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Houve um erro ao atualizar número do WhatsApp");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className={`flex flex-col font-sans h-full ${className}`}>
      <div className="flex-1 flex flex-col mx-6 gap-4 overflow-y-auto">
        <CustomButton
          onClick={() => router.push('/admin/estoques')}
        >
          <ClipboardPenLine className="w-6 h-6" />
          <span>Gerenciar Estoques</span>
        </CustomButton>

        <CustomButton
          onClick={() => router.push('/admin/editar-carrossel')}
        >
          <ImageIcon className="w-6 h-6" />
          <span>Editar Carrossel</span>
        </CustomButton>

        <button
          onClick={handleUpdateCatalog}
          disabled={loading}
          className={`flex items-center justify-center gap-2 transition-colors shrink-0 w-full py-4 
            rounded-2xl font-bold text-lg cursor-pointer
            ${loading ? 'cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-secondary'}
          `}
        >
          <RefreshCw 
            className={`w-6 h-6 ${loading && 'animate-spin'}`} 
          />
          {loading ? 'Atualizando...' : 'Atualizar Catálogo'}
        </button>

        <CustomButton
          onClick={() => setIsOpenWhatsAppModal(true)}
        >
          <FaWhatsapp className="w-6 h-6" />
          <span>Mudar número do WhatsApp</span>
        </CustomButton>

        <CustomButton
          onClick={() => toast.warning("Em breve!")}
        >
          <Eye className="w-6 h-6" />
          <span>Ver Pedidos</span>
        </CustomButton>
      </div>
      
      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/" />
        </div>
      </div>

      <CustomModal
        modalOpen={isOpenWhatsAppModal}
        onClose={() => setIsOpenWhatsAppModal(false)}
      >
        <div className="flex flex-col items-center justify-center p-2 gap-4">
          <div className="flex flex-col justify-center">
            <span className="font-bold">
              Atualizar o número do WhatsApp:
            </span>
            <span className="text-xs text-gray-400">
              Esse número será usado para enviar mensagens de confirmação de pedidos ou suporte para clientes.
            </span>
          </div>

          <Input
            id="number"
            type="text"
            onChange={(e) => setWhatsappNumber(onlyNumbers(e.target.value))}
            value={whatsappNumber || ''}
            maxLength={13}
            disabled={loading}
            placeholder="Ex: 5586912345678"
            className="bg-gray-50 focus-visible:ring-0 truncate text-secondary shadow-none"
          />

          <div className="flex w-full items-center justify-end gap-2">
            <button 
              type="button"
              onClick={() => {
                setWhatsappNumber(user?.phone || '');
                setIsOpenWhatsAppModal(false);
              }}
              className="flex w-full px-4 py-2 rounded-lg bg-gray-100 items-center justify-center font-medium cursor-pointer"
            >
              <span>Cancelar</span>
            </button>
            <button 
              type="button"
              onClick={() => handleUpdateWhatsApp(whatsappNumber)}
              className="flex w-full px-4 py-2 rounded-lg bg-primary text-white items-center justify-center font-medium cursor-pointer"
            >
              <span>{loading ? 'Atualizando...' : 'Confirmar'}</span>
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};