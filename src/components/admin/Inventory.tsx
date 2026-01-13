'use client'

import { Paintbrush, Plus, ShoppingBasket } from "lucide-react";
import { CustomButton } from "../buttons/CustomButtom";
import { useRouter } from "next/navigation";

export default function AdminInventory() {
const router = useRouter();

  return (
    <div className="font-sans overflow-y-hidden">
      <p className="items-center text-2xl font-bold text-secondary mb-2 px-4">
        Adicionar
      </p>

      <hr className="border-muted-foreground/50 mb-4 mx-4" />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4 mb-8">
        <CustomButton
          className="flex-col"
          onClick={() => router.push('/admin/estoques/catalogo/adicionar')}
        >
          <ShoppingBasket className="w-6 h-6" />
          <span>Produtos do Catálogo</span>
        </CustomButton>

        <CustomButton
          className="flex-col"
          onClick={() => console.log('Adicionar Itens de Personalização')}
        >
          <Paintbrush className="w-6 h-6" />
          <span>Itens de Personalização</span>
        </CustomButton>
      </div>

      <p className="text-2xl font-bold text-secondary mb-2 px-4">
        Editar
      </p>

      <hr className="border-muted-foreground/50 mb-4 mx-4" />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4">
        <CustomButton
          className="flex-col"
          onClick={() => router.push('/admin/estoques/catalogo')}
        >
          <ShoppingBasket className="w-6 h-6" />
          <span>Produtos do Catálogo</span>
        </CustomButton>

        <CustomButton
          className="flex-col"
          onClick={() => console.log('Adicionar Itens de Personalização')}
        >
          <Paintbrush className="w-6 h-6" />
          <span>Itens de Personalização</span>
        </CustomButton>
      </div>
    </div>
  )
}