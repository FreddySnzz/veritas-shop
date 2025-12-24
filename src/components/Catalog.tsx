import ProductCatalog from "./ProductCatalog"

interface CatalogProps {
  className?: string
}

export default function Catalog({ className }: CatalogProps) {
  return (
    <div className={`font-sans ${className}`}>
      <p className="font-medium ml-4 mt-4">
        Nossos Produtos
      </p>
      <div className={`grid grid-cols-2 gap-2 p-4`}>
        <ProductCatalog
          title="Produto"
          desc="Descrição"
          price={20}
          url="url qualquer"
          available
        />
      </div>
    </div>
  )
}