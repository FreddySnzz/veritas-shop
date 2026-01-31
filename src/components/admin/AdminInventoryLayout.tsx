'use client'

import { useRouter } from "next/navigation";
import { ListChecks, Paintbrush, Plus, ShoppingBasket } from "lucide-react";
import { CustomButton } from "../buttons/CustomButton";
import { BackButton } from "../buttons/BackButtom";

export default function AdminInventoryLayout() {
  const router = useRouter();

  return (
    <div className="flex flex-col font-sans h-full">
      <div className="flex-1 flex flex-col mx-2 gap-4 overflow-y-auto"> 
        <p className="items-center text-2xl font-bold text-secondary mb-2 px-4">
          Adicionar
        </p>

        <hr className="border-muted-foreground/50 mb-4 mx-4" />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4 mb-8">
          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border"
            onClick={() => router.push('/admin/estoques/catalogo/adicionar')}
          >
            <Plus className="w-6 h-6" />
            <span>Produto ao Catálogo</span>
          </CustomButton>

          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border"
            onClick={() => router.push('/admin/estoques/itens-personalizacao/adicionar')}
          >
            <Plus className="w-6 h-6" />
            <span>Item de Personalização</span>
          </CustomButton>
        </div>

        <p className="text-2xl font-bold text-secondary mb-2 px-4">
          Editar
        </p>

        <hr className="border-muted-foreground/50 mb-4 mx-4" />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4">
          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border"
            onClick={() => router.push('/admin/estoques/catalogo')}
          >
            <ShoppingBasket className="w-6 h-6" />
            <span>Produtos do Catálogo</span>
          </CustomButton>

          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border"
            onClick={() => router.push('/admin/estoques/itens-personalizacao')}
          >
            <Paintbrush className="w-6 h-6" />
            <span>Itens de Personalização</span>
          </CustomButton>

          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border"
            onClick={() => router.push('/admin/estoques/categoria')}
          >
            <ListChecks className="w-6 h-6" />
            <span>Categorias de Itens</span>
          </CustomButton>
        </div>
      </div>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/admin" />
        </div>
      </div>
    </div>
  );
};