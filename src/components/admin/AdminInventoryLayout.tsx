'use client'

import { useRouter } from "next/navigation";
import { ListChecks, Paintbrush, Plus, ShoppingBasket } from "lucide-react";
import { CustomButton } from "../buttons/CustomButton";
import { BackButton } from "../buttons/BackButton";

export default function AdminInventoryLayout() {
  const router = useRouter();

  return (
    <div className="flex flex-col font-sans h-full">
      <div className="flex-1 flex flex-col overflow-y-auto gap-8"> 
        <div>
          <h1 className="items-center text-2xl font-bold text-secondary dark:text-zinc-50">
            Adicionar
          </h1>
          <hr className="border-muted-foreground/50 my-2 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:h-40">
            <CustomButton
              className={`flex-col shadow-lg shadow-secondary/5 border lg:h-80
                dark:shadow-black/15 dark:bg-input/50 dark:border-zinc-700
                dark:text-zinc-200 dark:hover:bg-zinc-700
              `}
              onClick={() => router.push('/admin/estoques/catalogo/adicionar')}
            >
              <Plus className="w-6 h-6" />
              <span>Produto ao Catálogo</span>
            </CustomButton>

            <CustomButton
              className={`flex-col shadow-lg shadow-secondary/5 border lg:h-80
                dark:shadow-black/15 dark:bg-input/50 dark:border-zinc-700
                dark:text-zinc-200 dark:hover:bg-zinc-700
              `}
              onClick={() => router.push('/admin/estoques/itens-personalizacao/adicionar')}
            >
              <Plus className="w-6 h-6" />
              <span>Item de Personalização</span>
            </CustomButton>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-secondary dark:text-zinc-50">
            Editar
          </h1>
          <hr className="border-muted-foreground/50 my-2 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:h-30">
            <CustomButton
              className={`flex-col shadow-lg shadow-secondary/5 border lg:h-80
                dark:shadow-black/15 dark:bg-input/50 dark:border-zinc-700
                dark:text-zinc-200 dark:hover:bg-zinc-700
              `}
              onClick={() => router.push('/admin/estoques/catalogo')}
            >
              <ShoppingBasket className="w-6 h-6" />
              <span>Produtos do Catálogo</span>
            </CustomButton>

            <CustomButton
              className={`flex-col shadow-lg shadow-secondary/5 border lg:h-80
                dark:shadow-black/15 dark:bg-input/50 dark:border-zinc-700
                dark:text-zinc-200 dark:hover:bg-zinc-700
              `}
              onClick={() => router.push('/admin/estoques/itens-personalizacao')}
            >
              <Paintbrush className="w-6 h-6" />
              <span>Itens de Personalização</span>
            </CustomButton>

            <CustomButton
              className={`flex-col shadow-lg shadow-secondary/5 border lg:h-80
                dark:shadow-black/15 dark:bg-input/50 dark:border-zinc-700
                dark:text-zinc-200 dark:hover:bg-zinc-700
              `}
              onClick={() => router.push('/admin/estoques/categoria')}
            >
              <ListChecks className="w-6 h-6" />
              <span>Categorias de Itens</span>
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="md:hidden shrink-0 mt-auto bg-background-alternative dark:bg-input/0">
        <hr className="border-muted-foreground/50 mb-2" />
        <div className="flex flex-col">
          <BackButton pushRoute="/admin" />
        </div>
      </div>
    </div>
  );
};