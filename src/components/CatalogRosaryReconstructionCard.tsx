'use client';

import Link from "next/link";
import FlowerIcon from "./icons/FlowerIcon";
import { CircleArrowRight } from "lucide-react";

interface CatalogRosaryReconstructionCardProps {
  whatsappNumber: string;
};

export default function CatalogRosaryReconstructionCard({ whatsappNumber }: CatalogRosaryReconstructionCardProps) {
  return (
    <div className="relative flex w-full bg-primary/80 font-sans text-white overflow-hidden">
      <div className="p-8 md:p-12 lg:px-24 xl:px-32 z-10">
        <div className="flex flex-col">
          <span className="text-4xl font-black">
            Deseja restaurar seu terço?
          </span>
          <span className="text-xl font-bold md:mt-[-4]">
            Tem algum terço quebrado ou que gostaria de restaurar?
          </span>
          <span className="mt-4">
            Não se preocupe, nós também restauramos seu terço!
          </span>
        </div>

        <Link
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, quero restaurar meu terço!")}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Restaurar meu terço"
          aria-label="Restaurar meu terço"
          className="flex gap-2 mt-8 text-white hover:underline italic items-center"
        >
          <span className="font-medium">
            Quero restaurar meu terço
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