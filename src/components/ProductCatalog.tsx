interface ProductCatalogProps {
  title: string
  desc: string
  price: number
  available?: boolean
  url?: string
  className?: string
}

export default function ProductCatalog(props: ProductCatalogProps) {
  return (
    <div className="p-4 bg-white w-full h-full rounded-xl">
      <div className="flex flex-col items-center justify-center w-40 h-40 rounded-xl bg-primary">
        {props.url}
      </div>
      <div className="flex flex-col">
        <span className="font-bold mt-2">{props.title}</span>
        <span className="text-xs mt-1 text-gray-500">{props.desc}</span>
        <span className="text-sm mt-1">a partir de</span>
        <span className="font-bold text-xl">R$ {(props.price).toFixed(2)}</span>
      </div>
    </div>
  )
}