'use client'

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pushRoute?: string;
  backRoute?: boolean;
};

export function BackButton({ className, pushRoute, backRoute }: ButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Voltar"
      onClick={() => backRoute ? router.back() : router.push(pushRoute || '/')}
      className={cn("flex w-full px-4 py-3 rounded-lg items-center justify-center font-medium transition-all cursor-pointer",
        "bg-gray-50 dark:bg-zinc-900/40 hover:bg-primary/10 dark:hover:bg-zinc-900/50 text-secondary ",
        className
      )}
    >
      Voltar
    </button>
  );
};