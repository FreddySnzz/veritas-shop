import ProductModel from "@/data/models/Product.model";
import ProductCard from "./ProductCard";

interface CatalogLayoutProps {
  products: ProductModel[];
  className?: string
};

export default function CatalogLayout({ products, className }: CatalogLayoutProps) {
  return (
    <div className={`font-sans ${className}`}>
      <p className="font-bold text-center mt-4">
        Nossos Produtos
      </p>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-4`}>
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