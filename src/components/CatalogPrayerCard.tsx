import Link from "next/link";
import FlowerIcon from "./icons/FlowerIcon";
import { CircleArrowRight } from "lucide-react";

export default function CatalogPrayerCard() {
  return (
    <div className="relative flex w-full bg-primary/80 font-sans text-white overflow-hidden">
      <div className="p-8 md:p-12 lg:px-24 xl:px-32 z-10">
        <div className="flex flex-col">
          <span className="text-4xl font-black">
            Ainda não sabe como rezar?
          </span>
          <span className="text-xl font-bold md:mt-[-8]">
            Ou fazer aquela oração específica?
          </span>
          <span className="mt-4">
            Não se preocupe, nós temos um catálogo de orações para você aprender a rezar.
          </span>
        </div>

        <Link
          href="/ajuda/oracoes"
          title="Ir para a página de Orações"
          aria-label="Ir para a página de Orações"
          className="flex gap-2 mt-8 text-white hover:underline italic items-center"
        >
          <span className="font-medium">
            Ir para a página de Orações
          </span>
          <CircleArrowRight className="w-6 h-6" />
        </Link>
      </div>

      <div className="absolute top-5 right-[-200] md:top-2 md:right-[-100] pointer-events-none z-0">
        <FlowerIcon 
          color="#af996a42"
          className="h-70 md:h-60" 
        />
      </div>
    </div>
  )
}