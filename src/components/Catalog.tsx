import { dataImages } from "@/data/constants/productsImages"
import ProductCatalog from "./ProductCatalog"

interface CatalogProps {
  className?: string
}

export default function Catalog({ className }: CatalogProps) {
  return (
    <div className={`font-sans ${className}`}>
      <p className="font-bold text-center mt-4">
        Nossos Produtos
      </p>
      <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4`}>
        <ProductCatalog
          title="Terço Personalizado"
          desc="Personalize seu terço com entremeios, crucifixo, letras e textos personalizados"
          price={20}
          img={dataImages[2].url}
          available
          productPage="/personalizar"
        />
        <ProductCatalog
          title="Dezena Personalizada"
          desc="Personalize seu dezena com entremeios, crucifixo, letras e textos personalizados"
          price={15}
          available={false}
          productPage="/personalizar"
        />
        <ProductCatalog
          title="Pulseira Personalizada"
          desc="Personalize seu pulteira com letras e textos personalizados"
          price={10}
          available={false}
          productPage="/personalizar"
        />
        <ProductCatalog
          title="Chaveiro Personalizado"
          desc="Personalize seu chaveiro com crucifixo, entremeio, letras e textos personalizados"
          price={15}
          available={false}
          productPage="/personalizar"
        />
      </div>
    </div>
  )
}