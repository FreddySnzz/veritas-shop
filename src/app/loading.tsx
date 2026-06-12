"use client";

export default function Loading() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-background-alternative dark:bg-background-dark text-foreground font-sans">
      <section className="relative z-10 mx-auto w-full max-w-md px-6 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-input">
          <div className="size-8 animate-spin rounded-full border-2 border-primary dark:border-zinc-600 border-t-transparent" aria-hidden />
        </div>
        <p className="text-sm text-muted-foreground dark:text-zinc-200">Carregando, aguarde um momento…</p>
      </section>
    </main>
  );
}
