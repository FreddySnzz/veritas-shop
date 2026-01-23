'use client';

import { refreshCacheAction } from "@/app/actions/cache.actions";
import { CustomButton } from "../buttons/CustomButton"
import { ClipboardPenLine, Eye, Image, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { BackButton } from "../buttons/BackButtom";

interface PanelLayoutProps {
  className?: string
};

export default function PanelLayout({ className }: PanelLayoutProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
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
          <Image className="w-6 h-6" />
          <span>Editar Carrossel</span>
        </CustomButton>

        <button
          onClick={handleUpdate}
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
          onClick={() => toast.warning("Em breve!")}
        >
          <Eye className="w-6 h-6" />
          <span>Ver Pedidos</span>
        </CustomButton>
        
        <div className="pb-4"></div>
      </div>
      
      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/" />
        </div>
      </div>
    </div>
  );
};