import Link from "next/link";
import ProductCard from "./ProductCard";
import ProductModel from "@/data/models/Product.model";
import { ChevronRight } from "lucide-react";
import { FaRegFaceSadTear } from "react-icons/fa6";

interface CatalogLayoutProps {
  products: ProductModel[];
  className?: string
};

export default function CatalogLayout({ 
  products, 
  className 
}: CatalogLayoutProps) {
  return (
    <div className={`font-sans ${className}`}>
      {products?.length === 0 ? (
        <div className={`flex flex-col w-full h-[55vh] gap-4 
          items-center justify-center text-gray-400`}
        >
          <FaRegFaceSadTear className="w-12 h-12 opacity-40" />
          <div className="flex flex-col items-center justify-center">
            <p>Nenhum produto encontrado.</p>
            <p className="font-bold text-sm">
              Entre em contato com o suporte.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className={`font-bold text-center text-secondary dark:text-zinc-200 
            md:text-start md:uppercase my-4`}
          >
            Destaques
          </p>
          <div className={`grid grid-cols-2 gap-4
            sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5`}
          >
            {products?.map((product: ProductModel) => (
              <ProductCard 
                key={product.id}
                product={product} 
                mode="catalog"
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 w-full mt-4">
            <Link
              title="Ver todos os produtos"
              aria-label="Ver todos os produtos"
              rel="noreferrer"
              href="/produtos"
              className={`flex group items-center justify-center py-2 px-4 
                border border-muted-foreground/20 dark:border-muted-foreground/50 
                rounded-lg hover:bg-muted-foreground/10 transition-all text-xs
                text-secondary dark:text-zinc-200 cursor-pointer font-medium
              `}
            >
              Conferir todos os produtos
              <ChevronRight className="w-5 h-5 group-hover:text-primary dark:group-hover:text-details transition-all" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};