import { getCachedProducts } from "@/data/services/product.service";
import ProductCatalog from "./ProductCatalog"

interface CatalogProps {
  className?: string
}

export default async function Catalog({ className }: CatalogProps) {
  const products = await getCachedProducts();

  return (
    <div className={`font-sans ${className}`}>
      <p className="font-bold text-center mt-4">
        Nossos Produtos
      </p>
      <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4`}>
        {products?.map((product) => (
          <ProductCatalog
            key={product.id}
            title={product.name}
            desc={product.desc || ""}
            price={product.initial_price}
            img={product.image_url}
            available={product.available}
            productPage={`/personalizar`}
          />
        ))}
      </div>
    </div>
  )
}