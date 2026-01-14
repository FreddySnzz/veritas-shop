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

export default function ProductCatalogCard(props: ProductCatalogProps) {
  const isAvailable = props.available !== false;
  const router = useRouter();
  const { updateCustomization } = useCustomization();

  const handleClick = async () => {
    if (isAvailable) {
      updateCustomization({ product: props.title });
      router.push(props.productPage);
    }
  };

  if (!isAvailable) {
    return (
      <div className="flex flex-1 flex-col">
        <div className={`w-full h-full group flex flex-col group overflow-hidden rounded-xl 
          bg-white opacity-60 shadow-md transition-all duration-500 cursor-not-allowed ${props.className}
          `}
        >
          <div className="relative w-full aspect-square overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-secondary/20 backdrop-grayscale-100 z-5" />
            {props.img ? (
              <Image
                src={props.img}
                alt={props.title}
                fill
                loading="eager"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Sem imagem</span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col p-4 opacity-60 w-full">
            <div className="flex flex-col">
              <p className="font-bold text-gray-900 line-clamp-2">
                {props.title}
              </p>

              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {props.desc}
              </p>
            </div>

            <div className="flex shrink-0 mt-auto pt-4 items-end justify-between"> 
              <div className="flex flex-col">
                <span className="text-[0.625rem] text-gray-400">
                  a partir de
                </span>
                <p className="font-bold text-secondary">
                  R$ {props.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <button
        onClick={handleClick}
        className={`w-full h-full group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 text-start cursor-pointer ${props.className}`}
      >
        <div className="relative w-full aspect-square overflow-hidden shrink-0">
          {props.img ? (
            <Image
              src={props.img}
              alt={props.title}
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
              {props.title}
            </p>

            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {props.desc}
            </p>
          </div>

          <div className="flex shrink-0 mt-auto pt-4 items-end justify-between"> 
            <div className="flex flex-col">
              <span className="text-[0.625rem] text-gray-400">
                a partir de
              </span>
              <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                R$ {props.price.toFixed(2)}
              </p>
            </div>

            <span className="text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity mb-0.5">
              Ver mais →
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};