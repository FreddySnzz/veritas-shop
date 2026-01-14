import { getCachedProducts } from "@/data/services/product.service";
import { EditButton } from "../buttons/EditButtom";
import { BackButton } from "../buttons/BackButtom";
import Image from "next/image";

export default async function ManageCatalogInventory() {
  const products = await getCachedProducts();

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4 overflow-y-auto content-start pb-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="relative flex bg-secondary p-4 rounded-2xl h-fit"
          >
            <div>
              {product.image_url ? (
                <div className="relative w-40 h-40 shrink-0">
                  <Image
                    src={product.image_url}
                    alt="preview"
                    draggable="false"
                    fill
                    loading="eager"
                    className="aspect-square rounded-2xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-40 h-40 bg-gray-700/50 rounded-2xl shrink-0">
                  <span className="text-sm text-white px-2 text-center">
                    Sem Imagem
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
              <p className="text-sm font-medium truncate text-white">
                {product.name}
              </p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                Descrição: {product.desc}
              </p>
              <p className="text-xs mt-1 line-clamp-2 text-white">
                Preço: R$ {product.initial_price.toFixed(2)}
              </p>
              <p className={`text-sm mt-4 line-clamp-2 ${product.available ? 'text-green-600' : 'text-red-400'}`}>
                Disponível: {product.available ? 'Sim' : 'Não'}
              </p>
            </div>

            <div className="absolute bottom-3 right-2">
              <EditButton pushRoute={`/admin/estoques/catalogo/editar/${product.id}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 mt-auto bg-background-alternative pt-4 z-10">
        <hr className="border-muted-foreground/50 mb-4 mx-4" />
        <div className="flex flex-col mx-4 my-4 gap-4">
          <BackButton pushRoute="/admin/estoques" />
        </div>
      </div>
    </div>
  );
};