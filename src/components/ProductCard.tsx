'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductModel from "@/data/models/Product.model";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";

interface ProductCardProps extends React.HTMLAttributes<HTMLElement> {
  product: ProductModel;
  mode: 'header' | 'catalog' | 'product-page';
};

export default function ProductCard({ product, mode }: ProductCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainImage = product.images_url?.[0] || null;
  const productUrl = `/produtos/${mountProductUrl(product.name, product.id)}`;
  
  return (
    <article className="flex flex-1 flex-col font-sans h-full">
      <Link
        href={productUrl}
        aria-label={`Ver detalhes de ${product.name}`}
        className={`w-full h-full group flex flex-col overflow-hidden rounded-xl 
          bg-white dark:bg-input/50 shadow-md hover:shadow-lg transition-all duration-300 text-start`}
      >
        <div className="relative w-full aspect-square overflow-hidden shrink-0 bg-gray-100 dark:bg-input/50">
          {mainImage ? (
            <>
              <Image
                src={mainImage}
                alt={product.name}
                fill
                loading="eager"
                className={cn("object-cover group-hover:scale-105 transition-transform duration-300",
                  "transition-all duration-500 ease-in-out",
                  isLoaded ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => setIsLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {mode === 'product-page' && product.customizable && (
                <div 
                  arial-label="Personalizável"
                  title="Personalizável"
                  className={cn("absolute bottom-0 right-0 line-clamp-1 transition-all",
                    "text-white rounded-tl-lg p-1 bg-linear-to-r from-indigo-400 via-purple-400 to-yellow-400",
                    "shadow-md"
                  )
                }>
                  <Paintbrush className="w-5 h-5 shadow-lg" />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Sem imagem</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        <div className="flex-1 flex flex-col p-4 w-full">
          <div className="flex flex-col space-y-1">
            <h3 className="font-bold text-gray-900 dark:text-gray-200 line-clamp-2 group-hover:text-primary dark:group-hover:text-details transition-colors">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-300 line-clamp-2 min-h-[2.5em]">
              {product.desc}
            </p>
          </div>

          <div className={cn("flex relative shrink-0 mt-auto pt-4 items-end justify-between")}>
            <div className="flex flex-col">
              <p className="text-[0.625rem] text-gray-400 uppercase tracking-wide">
                a partir de
              </p>
              <p className="font-bold text-lg text-gray-900 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-details transition-colors">
                {formatCurrency(product.initial_price)}
              </p>
            </div>
            
            <p className={`text-xs text-primary font-medium opacity-0 -translate-x-2 
              group-hover:translate-x-0 group-hover:opacity-100 dark:group-hover:text-details transition-all duration-300`}
            >
              {mode === 'header' ? "" : (
                <span>Ver mais →</span>
              )}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};