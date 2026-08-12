'use client';

import * as motion from "motion/react-client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductModel from "@/data/models/Product.model";
import { useMouseDrag, useIsTouchDevice } from "@/data/hook/useMouseDrag";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";
import { cn } from "@/lib/utils";
import { CustomLink } from "./buttons/CustomLink";

interface SeeMoreProductsProps {
  atualProductId?: string;
  cachedProducts: ProductModel[];
  className?: string;
  motionDivClassName?: string;
};

export default function SeeMoreProducts({ 
  atualProductId,
  cachedProducts,
  className,
  motionDivClassName,
}: SeeMoreProductsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const availableProducts = cachedProducts.filter(
    (product: ProductModel) => product.available
  );

  const { containerRef, dragLeft } = useMouseDrag(availableProducts.length);
  const isTouchDevice = useIsTouchDevice();
  const router = useRouter();

  return (
    <div className={cn("flex flex-1 flex-col py-4", className)}>
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: dragLeft, right: 0 }}
        dragElastic={0.05}
        className={cn("flex cursor-grab active:cursor-grabbing scrollbar-hide mx-4 gap-4", motionDivClassName)}
      >
        {availableProducts.map((product: ProductModel) => product.id !== atualProductId && (
          <div 
            key={product.id}
            className="flex flex-1 flex-col h-full"
          >
            <motion.div
              onClick={!isTouchDevice ? undefined : () => router.push(`/${mountProductUrl(product.name, product.id)}`)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`group flex flex-col rounded-lg w-40 h-60 md:w-60 md:h-70 cursor-pointer overflow-hidden
                bg-white dark:bg-input/30 shadow-md transition-all duration-300 text-start 
              `}
            >
              {product.images_url?.length ? (
                <div className="relative w-full md:h-50 aspect-square overflow-hidden 
                  shrink-0 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={product?.images_url?.[0] || ""}
                    alt={product.id}
                    draggable="false"
                    fill
                    loading="eager"
                    className={cn("object-cover group-hover:scale-105 transition-transform duration-300",
                      "duration-500 ease-in-out transition-all",
                      isLoaded ? "opacity-100" : "opacity-0",
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onLoad={() => setIsLoaded(true)}
                  />
                </div>
              ) : (
                <div className={`relative flex items-center justify-center w-full h-50 overflow-hidden  
                  cursor-grab active:cursor-grabbing bg-gray-200 shrink-0 aspect-square`}
                >
                  <p className="text-sm text-secondary px-2 text-center font-medium">
                    Produto Sem Imagem
                  </p>
                </div>
              )}

              <CustomLink
                href={`/${mountProductUrl(product.name, product.id)}`}
                className={`flex-1 flex flex-col cursor-pointer bg-white dark:bg-input/30 dark:hover:bg-input/30
                  transition-all items-start px-3 w-full rounded-b-lg rounded-t-none
                `}
                aria-label={`Ver ${product.name}`}
              >
                <div className="flex flex-col items-start">
                  <p className="font-bold group-hover:text-primary dark:group-hover:text-details transition-all">
                    {formatCurrency(product.initial_price)}
                  </p>
                  <p className={`font-light dark:font-normal dark:group-hover:font-bold text-sm text-gray-600 dark:text-zinc-200 line-clamp-1
                    group-hover:text-primary dark:group-hover:text-zinc-200 transition-all text-start`
                  }>
                    {product.name}
                  </p>
                  <p className={`absolute right-3 bottom-1 text-xs text-primary font-medium opacity-0 
                    group-hover:opacity-100 dark:group-hover:text-details transition-all mb-0.5`
                  }>
                    Ver mais →
                  </p>
                </div>
              </CustomLink>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};