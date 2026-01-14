'use client'

import { useRouter } from "next/navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pushRoute: string;
};

export function BackButton({ className, pushRoute }: ButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(pushRoute)}
      className={`flex w-full px-4 py-3 rounded-lg items-center justify-center
        bg-primary/20 hover:bg-primary/30 text-secondary transition-all cursor-pointer mr-2 ${className}
      `}
    >
      Voltar
    </button>
  );
};