import ProductCard from "./ProductCard";
import ProductModel from "@/data/models/Product.model";
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
            <span>Nenhum produto encontrado.</span>
            <span className="font-bold text-sm">
              Entre em contato com o suporte.
            </span>
          </div>
        </div>
      ) : (
        <>
          <p className={`font-bold text-center text-secondary dark:text-zinc-200 
            md:text-start md:uppercase my-4`}
          >
            Confira nossos produtos
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
        </>
      )}
    </div>
  );
};