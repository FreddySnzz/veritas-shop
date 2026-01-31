'use client'

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
      className={`flex w-full px-4 py-3 rounded-lg items-center justify-center font-medium
        bg-gray-50 hover:bg-primary/10 text-secondary transition-all cursor-pointer mr-2 ${className}
      `}
    >
      Voltar
    </button>
  );
};