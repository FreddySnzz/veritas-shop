'use client';

import Image from "next/image";
import Link from "next/link";
import ProductModel from "@/data/models/Product.model";
import { mountProductUrl } from "@/data/functions/removeAccentsAndSpaces";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";

interface ProductCardProps extends React.HTMLAttributes<HTMLElement> {
  product: ProductModel;
  mode: 'header' | 'catalog';
};

export default function ProductCard({ product, mode }: ProductCardProps) {
  const mainImage = product.images_url?.[0] || null;
  const productUrl = `/${mountProductUrl(product.name, product.available)}`;

  return (
    <article className="flex flex-1 flex-col font-sans h-full">
      <Link
        href={productUrl}
        aria-label={`Ver detalhes de ${product.name}`}
        className="w-full h-full group flex flex-col overflow-hidden rounded-xl 
          bg-white shadow-md hover:shadow-lg transition-all duration-300 text-start"
      >
        <div className="relative w-full aspect-square overflow-hidden shrink-0 bg-gray-100">
          {mainImage ? (
            <Image
              src={mainImage}
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        <div className="flex-1 flex flex-col p-4 w-full">
          <div className="flex flex-col space-y-1">
            <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5em]">
              {product.desc}
            </p>
          </div>

          <div className="flex relative shrink-0 mt-auto pt-4 items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[0.625rem] text-gray-400 uppercase tracking-wide">
                a partir de
              </span>
              <p className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
                {formatCurrency(product.initial_price)}
              </p>
            </div>
            
            <span className={`text-xs text-primary font-medium opacity-0 -translate-x-2 
              group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300`}
            >
              {mode === 'header' ? "" : (
                <span>Ver mais →</span>
              )}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};