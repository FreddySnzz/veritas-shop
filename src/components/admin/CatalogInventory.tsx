import { getCachedProducts } from "@/data/services/product.service";
import { Pencil } from "lucide-react";

export default async function ManageCatalogInventory() {
  const products = await getCachedProducts();

  return (
    <div className="font-sans overflow-y-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="flex-col bg-secondary p-4 rounded-2xl mb-4"
          >
            <p className="text-sm font-medium truncate text-white">
              {product.name}
            </p>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              Descrição: {product.desc}
            </p>
            <p className="text-xs mt-1 line-clamp-2 text-white">
              Preço: R$ {product.initial_price.toFixed(2)}
            </p>
            <p className={`text-xs mt-1 line-clamp-2 ${product.available ? 'text-green-600' : 'text-red-500'}`}>
              Disponível: {product.available ? 'Sim' : 'Não'}
            </p>

            <div className="flex justify-end">
              <button
                className="flex items-center justify-center bg-secondary hover:bg-secondary/80 text-white transition-all cursor-pointer mr-2"
                disabled={!product.available}
              >
                <Pencil className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}