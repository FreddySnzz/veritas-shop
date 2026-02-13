import ProductModel from "@/data/models/Product.model";
import ProductCard from "./ProductCard";

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
      <p className="font-bold text-center md:text-start my-4 md:uppercase text-secondary">
        Confira nossos produtos
      </p>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4`}>
        {products?.map((product: ProductModel) => (
          <ProductCard 
            key={product.id}
            product={product} 
            mode="catalog"
          />
        ))}
      </div>
    </div>
  );
};