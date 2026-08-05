'use client';

import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
import { GiBookmark } from "react-icons/gi";

export default function CatalogBibleCard() {
  return (
    <div className="relative flex w-full bg-primary/80 dark:bg-zinc-900 font-sans text-white overflow-hidden">
      <div className="p-8 md:p-12 lg:px-24 xl:px-32 z-10">
        <div className="flex flex-col">
          <span className="text-4xl font-black dark:text-zinc-200">
            Quer ler a Bíblia e não tem uma?
          </span>
          <span className="text-xl font-bold md:mt-[-4] dark:text-zinc-200">
            Você precisa de uma bíblia portátil para ler onde quiser?
          </span>
          <span className="mt-4 dark:text-zinc-500">
            Acesse nossa Bíblia online e mergulhe nas Sagradas Escrituras!
          </span>
        </div>

        <Link
          href={`/ajuda/biblia`}
          title="Bíblia online"
          aria-label="Bíblia online"
          className="flex gap-2 w-fit mt-8 text-white dark:text-zinc-200 hover:underline dark:hover:text-details italic items-center transition-colors"
        >
          <span className="font-medium">
            Ler a Bíblia agora
          </span>
          <CircleArrowRight className="w-6 h-6" />
        </Link>
      </div>

      <div className="absolute top-5 right-[-90] md:top-2 md:right-[-1] pointer-events-none z-0">
        <GiBookmark className="text-[#af996a42] dark:text-muted-foreground/10 h-50 w-50 md:h-60 md:w-60" />
      </div>
    </div>
  )
}