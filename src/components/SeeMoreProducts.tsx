'use client';

import * as motion from "motion/react-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductModel from "@/data/models/Product.model";
import { useMouseDrag, useIsTouchDevice } from "@/data/hook/useMouseDrag";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";

interface SeeMoreProductsProps {
  atualProduct: ProductModel;
  cachedProducts: ProductModel[];
};

export default function SeeMoreProducts({ atualProduct, cachedProducts }: SeeMoreProductsProps) {
  const { containerRef, dragLeft } = useMouseDrag(cachedProducts.length);
  const isTouchDevice = useIsTouchDevice();
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col py-4">
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: dragLeft, right: 0 }}
        dragElastic={0.05}
        className={`flex cursor-grab active:cursor-grabbing scrollbar-hide mx-4 gap-4`}
      >
        {cachedProducts.map((product: ProductModel) => product.id !== atualProduct.id && (
          <div 
            key={product.id}
            className="flex flex-1 flex-col h-full"
          >
            <motion.div
              aria-label={!isTouchDevice ? `Arraste para ver mais` : `Ver mais ${product.name}`}
              title={!isTouchDevice ? `Arraste para ver mais` : `Ver mais ${product.name}`}
              onClick={!isTouchDevice ? undefined : () => router.push(`/${mountProductUrl(product)}`)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`group flex flex-col rounded-lg w-60 h-70 cursor-pointer overflow-hidden
                bg-white shadow-md transition-all duration-300 text-start 
              `}
            >
              {product.images_url ? (
                <div className="relative w-full h-50 aspect-square overflow-hidden shrink-0 cursor-grab active:cursor-grabbing">
                  <Image
                    src={product?.images_url?.[0] || ""}
                    alt={product.id}
                    draggable="false"
                    fill
                    loading="eager"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div 
                  className={`shrink-0 flex items-center justify-center w-25 h-25 rounded-2xl 
                    bg-gray-200 cursor-grab active:cursor-grabbing
                  `}
                >
                  <span className="text-sm text-secondary px-2 text-center font-medium">
                    Sem Imagem
                  </span>
                </div>
              )}

              <button 
                type="button"
                aria-label={`Ver ${product.name}`}
                title={`Ver ${product.name}`}
                onClick={() => router.push(`/${mountProductUrl(product)}`)}
                className="flex-1 flex flex-col px-3 py-3 w-full cursor-pointer"
              >
                <div className="flex flex-col gap-1 items-start">
                  <p className="font-bold group-hover:text-primary transition-colors">
                    R$ {product.initial_price.toFixed(2)}
                  </p>
                  <p className="font-light text-sm text-gray-600 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </p>
                  <span className="absolute right-3 bottom-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity mb-0.5">
                    Ver mais →
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};