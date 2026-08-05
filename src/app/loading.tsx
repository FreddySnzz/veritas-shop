"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
}

export default function Loading({ 
  className, 
  text = "Carregando, aguarde um momento…" 
}: LoadingProps) {
  return (
    <main className={cn("relative flex min-h-dvh items-center justify-center bg-background-alternative dark:bg-background-dark text-foreground font-sans", className)}>
      <section className="relative z-10 mx-auto w-full max-w-md px-6 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-input">
          <div className="size-8 animate-spin rounded-full border-2 border-primary dark:border-zinc-600 border-t-transparent" aria-hidden />
        </div>
        <p className="text-sm text-muted-foreground dark:text-zinc-200">{text}</p>
      </section>
    </main>
  );
}
