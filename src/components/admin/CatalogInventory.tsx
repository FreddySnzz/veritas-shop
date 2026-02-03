import Image from "next/image";
import ProductModel from "@/data/models/Product.model";
import { getCachedProductsAction } from "@/app/actions/cache.actions";
import { DeleteButton } from "../buttons/DeleteButton";
import { BackButton } from "../buttons/BackButtom";
import CardButton from "../buttons/CardButton";
import { FloatAddButton } from "../buttons/AddButtom";

export default async function ManageCatalogInventory() {
  const products = await getCachedProductsAction();

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className={`flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 
        gap-2 mx-6 overflow-y-auto content-start pb-4 scrollbar-hide
      `}>
        <div className="fixed bottom-25 right-7 z-15">
          <FloatAddButton
            pushRoute={'/admin/estoques/catalogo/adicionar'}
            className="p-3"
          />
        </div>

        {products && products?.length > 0 ? products?.map((product: ProductModel) => (
          <CardButton 
            key={product.id}
            pushRoute={`/admin/estoques/catalogo/editar/${product.id}`}
            className="bg-white"
          >
            <div>
              {product.images_url ? (
                <div className="relative w-35 h-35 shrink-0">
                  <Image
                    src={product.images_url[0]}
                    alt="preview"
                    draggable="false"
                    fill
                    loading="eager"
                    className="aspect-square rounded-2xl object-cover shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-35 h-35 bg-gray-200 rounded-2xl shrink-0">
                  <span className="text-sm text-secondary px-2 text-center font-medium">
                    Sem Imagem
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
              <p className="text-sm font-bold truncate text-secondary">
                {product.name}
              </p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {product.desc}
              </p>
              <p className="text-xs mt-2 text-secondary">
                R$ {product.initial_price.toFixed(2)}
              </p>
              <p className={`text-sm font-medium mt-1 ${product.available ? 'text-green-600' : 'text-red-500'}`}>
                Disponível: {product.available ? 'Sim' : 'Não'}
              </p>
              <p className={`text-sm font-medium mt-1 ${product.customizable ? 'text-green-600' : 'text-red-500'}`}>
                Customizável: {product.customizable ? 'Sim' : 'Não'}
              </p>
            </div>

            <div className="absolute bottom-3.5 right-2">
              <DeleteButton idProduct={product.id} />
            </div>
          </CardButton>
        )) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-gray-500 px-2 text-center">
              Sem Produtos
            </span>
          </div>
        )}
      </div>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2 z-10">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/admin/estoques" />
        </div>
      </div>
    </div>
  );
};