'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductModel from "@/data/models/Product.model";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";

interface CatalogProps {
  products: ProductModel[];
  className?: string
};

export default function Catalog({ products, className }: CatalogProps) {
  const router = useRouter();

  return (
    <div className={`font-sans ${className}`}>
      <p className="font-bold text-center mt-4">
        Nossos Produtos
      </p>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-4`}>
        {products?.map((product: ProductModel) => (
          <div 
            key={product.id}
            className="flex flex-1 flex-col"
          >
            <button
              type="button"
              aria-label={`Ver ${product.name}`}
              title={`Ver ${product.name}`}
              onClick={() => router.push(`/${mountProductUrl(product)}`)}
              className={`w-full h-full group flex flex-col overflow-hidden rounded-xl 
                bg-white shadow-md transition-all duration-300 text-start cursor-pointer
              `}
            >
              <div className="relative w-full aspect-square overflow-hidden shrink-0">
                {product.images_url ? (
                  <Image
                    src={product.images_url[0]}
                    alt={product.name}
                    fill
                    loading="eager"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Sem imagem</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              <div className="flex-1 flex flex-col p-4 w-full">
                <div className="flex flex-col">
                  <p className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </p>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {product.desc}
                  </p>
                </div>

                <div className="flex relative shrink-0 mt-auto pt-4 items-end justify-between"> 
                  <div className="flex flex-col">
                    <span className="text-[0.625rem] text-gray-400">
                      a partir de
                    </span>
                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      R$ {product.initial_price.toFixed(2)}
                    </p>
                  </div>

                  <span className="absolute right-0 top-8.5 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity mb-0.5">
                    Ver mais →
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};