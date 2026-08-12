'use client'

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CardButtonProps extends React.HTMLAttributes<HTMLElement> {
  pushRoute: string;
  children: React.ReactNode;
  className?: string;
};

export default function CardButton(props: CardButtonProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(props.pushRoute)}
      className={cn("flex items-center justify-center py-1.5 px-5 gap-2 transition-all cursor-pointer",
        "bg-white hover:bg-gray-50 dark:bg-background-dark dark:hover:bg-input/30 text-secondary dark:text-zinc-200",
        "rounded-xl font-sans font-bold transition-all",
        "relative p-4 rounded-2xl h-fit cursor-pointer",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};