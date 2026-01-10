'use client'

import Image from "next/image"
import { useCustomization } from "@/data/context/CustomizationContext"
import { useRouter } from "next/navigation"

interface ProductCatalogProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string
  desc: string
  price: number
  available?: boolean
  productPage: string
  img?: string
  className?: string
  onClick?: () => void
}

export default function ProductCatalog(props: ProductCatalogProps) {
  const isAvailable = props.available !== false;
  const { updateCustomization } = useCustomization();
  const router = useRouter();

  const handleClick = async () => {
    if (isAvailable) {
      updateCustomization({ product: props.title });
      router.push(props.productPage);
    }
  };

  if (!isAvailable) {
    return (
      <div className={`relative group overflow-hidden rounded-xl opacity-60 bg-white shadow-md ${props.className} transition-all duration-500`}>
        <div className="absolute inset-0 bg-secondary/20 backdrop-grayscale-100 z-5" />
        <div className="relative w-full aspect-square">
          {props.img ? (
            <Image
              src={props.img}
              alt={props.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Sem imagem</span>
            </div>
          )}
        </div>
        <div className="p-4 opacity-60 w-full">
          <h3 className="font-bold text-gray-900 line-clamp-2">
            {props.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {props.desc}
          </p>
          <div className="mt-4">
            <div className="flex flex-col h-full w-full">
              <span className="text-xs text-gray-400">a partir de</span>
              <p className="font-bold text-secondary">
                R$ {props.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className={`relative group block overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 text-start ${props.className}`}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        {props.img ? (
          <Image
            src={props.img}
            alt={props.title}
            fill
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

      <div className="p-4 w-full">
        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {props.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {props.desc}
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div className="w-full">
            <span className="text-xs text-gray-400 block">a partir de</span>
            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
              R$ {props.price.toFixed(2)}
            </p>
          </div>
          <span className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Ver mais →
          </span>
        </div>
      </div>
    </button>
  );
}