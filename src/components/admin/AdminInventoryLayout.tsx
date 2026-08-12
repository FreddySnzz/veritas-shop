import { 
  ListChecks, 
  Paintbrush, 
  Plus, 
  ShoppingBasket, 
  TableProperties 
} from "lucide-react";
import { CustomLink } from "../buttons/CustomLink";
import { BackButton } from "../buttons/BackButton";

export default function AdminInventoryLayout() {
  const cardStyles = `flex-col shadow-lg shadow-secondary/5 border
    dark:shadow-black/15 dark:bg-input/50 dark:border-zinc-700
    dark:text-zinc-200 dark:hover:bg-zinc-700 text-center py-6`;

  return (
    <div className="flex flex-col font-sans h-full">
      <div className="flex-1 flex flex-col overflow-y-auto gap-8"> 
        <div>
          <h1 className="items-center text-2xl font-bold text-secondary dark:text-zinc-50">
            Adicionar
          </h1>
          <hr className="border-muted-foreground/50 my-2 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:h-40">
            <CustomLink
              href="/admin/estoques/catalogo/adicionar"
              className={cardStyles}
            >
              <Plus className="w-6 h-6" />
              <p>Produto ao Catálogo</p>
            </CustomLink>
            <CustomLink
              href="/admin/estoques/itens-personalizacao/adicionar" 
              className={cardStyles}
            >
              <Plus className="w-6 h-6" />
              <p>Item de Personalização</p>
            </CustomLink>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-secondary dark:text-zinc-50">
            Editar
          </h1>
          <hr className="border-muted-foreground/50 my-2 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:h-30">
            <CustomLink
              href="/admin/estoques/catalogo" 
              className={cardStyles}
            >
              <ShoppingBasket className="w-6 h-6" />
              <p>Produtos do Catálogo</p>
            </CustomLink>
            <CustomLink
              href="/admin/estoques/itens-personalizacao" 
              className={cardStyles}
            >
              <Paintbrush className="w-6 h-6" />
              <p>Itens de Personalização</p>
            </CustomLink>
            <CustomLink
              href="/admin/estoques/categoria-produtos" 
              className={cardStyles}
            >
              <TableProperties className="w-6 h-6" />
              <p>Categorias de Produtos</p>
            </CustomLink>
            <CustomLink
              href="/admin/estoques/categoria-itens" 
              className={cardStyles}
            >
              <ListChecks className="w-6 h-6" />
              <p>Categorias de Itens</p>
            </CustomLink>
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