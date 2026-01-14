import { getCachedProducts } from "@/data/services/product.service";
import ProductCatalogCard from "./ProductCatalog"

interface CatalogProps {
  className?: string
};

export default async function Catalog({ className }: CatalogProps) {
  const products = await getCachedProducts();

  return (
    <div className={`font-sans ${className}`}>
      <p className="font-bold text-center mt-4">
        Nossos Produtos
      </p>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-4`}>
        {products?.map((product) => (
          <ProductCatalogCard
            key={product.id}
            title={product.name}
            desc={product.desc || ""}
            price={product.initial_price}
            img={product.image_url}
            available={product.available}
            productPage={product.customizable ? `/personalizar` : ``}
          />
        ))}
      </div>
    </div>
  )
}