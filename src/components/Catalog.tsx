import { getCachedProductsAction } from "@/app/actions/cache.actions";
import ProductCatalogCard from "./ProductCatalogCard"
import { ProductTypes } from "@/data/types/products.type";
import ProductModel from "@/data/models/Product.model";

interface CatalogProps {
  className?: string
};

export default async function Catalog({ className }: CatalogProps) {
  const products = await getCachedProductsAction();

  return (
    <div className={`font-sans ${className}`}>
      <p className="font-bold text-center mt-4">
        Nossos Produtos
      </p>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-4`}>
        {products?.map((product: ProductModel) => (
          <ProductCatalogCard
            key={product.id}
            id={product.id}
            title={product.name}
            desc={product.desc || ""}
            price={product.initial_price}
            type={ProductTypes[product.name as keyof typeof ProductTypes]}
            img={product.image_url}
            available={product.available}
            customizable={product.customizable}
            customizationItems={product.customization_items}
            productPage={product.customizable ? `/personalizar` : ``}
          />
        ))}
      </div>
    </div>
  )
}