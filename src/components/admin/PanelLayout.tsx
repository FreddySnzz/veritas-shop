'use client';

import { refreshProductsAction } from "@/app/actions/cache.actions";
import { CustomButton } from "../buttons/CustomButtom"
import { ClipboardPenLine, Eye, RefreshCw } from "lucide-react";
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
      await refreshProductsAction('products'); 
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

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`w-full text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shrink-0
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-secondary/90'}
          `}
        >
          <RefreshCw 
            className={`w-6 h-6 ${loading && 'animate-spin'}`} 
          />
          {loading ? 'Atualizando...' : 'Atualizar Catálogo'}
        </button>

        <CustomButton
          onClick={() => console.log('Ver Pedidos')}
        >
          <Eye className="w-6 h-6" />
          <span>Ver Pedidos</span>
        </CustomButton>
        
        <div className="pb-4"></div>
      </div>
      
      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-4" />
        <div className="flex flex-col mx-4 my-4 gap-4">
          <BackButton pushRoute="/admin" />
        </div>
      </div>
    </div>
  );
};