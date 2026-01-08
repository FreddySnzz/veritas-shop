'use client';

import { CustomButton } from "../buttons/CustomButtom"
import { ClipboardPenLine, Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface PanelLayoutProps {
  className?: string
}

export default function PanelLayout({ className }: PanelLayoutProps) {
  const router = useRouter();
  return (
    <div className={`font-sans ${className} overflow-y-hidden`}>
      <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4 mt-20`}>
        <CustomButton
          onClick={() => console.log('Gerenciar Estoques')}
        >
          <ClipboardPenLine className="w-6 h-6" />
          <span>Gerenciar Estoques</span>
        </CustomButton>

        <CustomButton
          onClick={() => console.log('Adicionar Produtos')}
        >
          <Plus className="w-6 h-6" />
          <span>Adicionar Produtos</span>
        </CustomButton>

        <CustomButton
          onClick={() => console.log('Adicionar Itens de Personalização')}
        >
          <Plus className="w-6 h-6" />
          <span>Adicionar Itens de Personalização</span>
        </CustomButton>

        <CustomButton
          onClick={() => console.log('Ver Pedidos')}
        >
          <Eye className="w-6 h-6" />
          <span>Ver Pedidos</span>
        </CustomButton>
      </div>
    </div>
  )
}