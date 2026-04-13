'use client';

import { useState } from "react";
import { useAuth } from "@/data/context/AuthContext";
import { useRouter } from "next/navigation";
import { refreshCacheAction } from "@/app/actions/cache.actions";
import { updateUserAction } from "@/app/actions/users.action";
import { 
  ClipboardPenLine, 
  Eye, 
  Image as ImageIcon, 
  ListOrdered, 
  RefreshCw, 
  X 
} from "lucide-react";
import { toast } from "sonner";
import { BackButton } from "../buttons/BackButton";
import { FaWhatsapp } from "react-icons/fa6";
import CustomModal from "../modals/CustomModal";
import { Input } from "../ui/input";
import { onlyNumbers } from "@/data/functions/inputMasks";
import ManageStepsOrderModal from "../modals/ManageStepsOrder";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import ActionCard from "../CardAdminPanel";

interface PanelLayoutProps {
  categories?: CustomizationItemsCategoryModel[];
  className?: string
};

export default function PanelLayout({ categories, className }: PanelLayoutProps) {
  const { user, setUser } = useAuth();
  const [whatsappNumber, setWhatsappNumber] = useState<string>(user?.phone || '');
  const [isOpenOrderStepsModal, setIsOpenOrderStepsModal] = useState(false);
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

  const actions = [
    {
      key: 'refresh',
      title: loading ? 'Atualizando...' : 'Atualizar Catálogo',
      icon: <RefreshCw className={`h-6 w-6 ${loading ? 'animate-spin' : ''}`} />,
      onClick: handleUpdateCatalog,
      disabled: loading,
      highlight: true,
    },
    {
      key: 'stocks',
      title: 'Gerenciar Estoques',
      icon: <ClipboardPenLine className="h-6 w-6" />,
      onClick: () => router.push('/admin/estoques'),
    },
    {
      key: 'steps',
      title: 'Ordenar Passos de Personalização',
      icon: <ListOrdered className="h-6 w-6" />,
      onClick: () => setIsOpenOrderStepsModal(true),
    },
    {
      key: 'carousel',
      title: 'Editar Carrossel do Catálogo',
      icon: <ImageIcon className="h-6 w-6" />,
      onClick: () => router.push('/admin/editar-carrossel'),
    },
    {
      key: 'whatsapp',
      title: 'Mudar número do WhatsApp',
      icon: <FaWhatsapp className="h-6 w-6" />,
      onClick: () => setIsOpenWhatsAppModal(true),
    },
    {
      key: 'orders',
      title: 'Ver Pedidos',
      icon: <Eye className="h-6 w-6" />,
      onClick: () => toast.warning('Em breve!'),
    },
  ];

  return (
    <div className={`flex flex-col font-sans h-full ${className}`}>
      <div className={`grid flex-1 grid-cols-1 gap-4 overflow-y-auto 
        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {actions.map((action) => (
          <ActionCard
            key={action.key}
            title={action.title}
            icon={action.icon}
            onClick={action.onClick}
            disabled={action.disabled}
            highlight={action.highlight}
          />
        ))}
      </div>

      <ManageStepsOrderModal 
        categories={categories || []}
        modalOpen={isOpenOrderStepsModal} 
        onClose={() => setIsOpenOrderStepsModal(false)}
      />

      <CustomModal
        modalOpen={isOpenWhatsAppModal}
        onClose={() => setIsOpenWhatsAppModal(false)}
      >
        <div className="flex flex-col items-center justify-center p-2 gap-4">
          <div className="flex flex-col justify-center w-full">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Atualizar Número do WhatsApp
              </h2>
              <button 
                type="button"
                aria-label="Fechar"
                title="Fechar"
                onClick={() => setIsOpenWhatsAppModal(false)} 
                className="cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-400 transition-colors" />
              </button>
            </div>
            <span className="text-xs text-gray-400 mt-4">
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
              className={`flex w-full px-4 py-2 items-center justify-center
                bg-gray-50 hover:bg-primary/10 font-medium cursor-pointer rounded-lg
              `}
            >
              <span>Cancelar</span>
            </button>
            <button 
              type="button"
              onClick={() => handleUpdateWhatsApp(whatsappNumber)}
              className={`flex w-full px-4 py-2 items-center justify-center cursor-pointer
                bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all
              `}
            >
              <span>{loading ? 'Atualizando...' : 'Confirmar'}</span>
            </button>
          </div>
        </div>
      </CustomModal>
      
      <div className="shrink-0 mt-auto bg-background-alternative md:hidden">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col">
          <BackButton pushRoute="/" />
        </div>
      </div>
    </div>
  );
};