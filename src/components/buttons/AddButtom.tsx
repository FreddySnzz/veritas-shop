'use client'

import { useRouter } from "next/navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pushRoute: string;
};

export function AddButton({ className, pushRoute }: ButtonProps) {
  const router = useRouter();
  return (
    <button 
      type="button"
      onClick={() => router.push(pushRoute)}
      className={`flex w-full px-4 py-3 rounded-lg items-center justify-center
        bg-primary text-white font-bold text-lg hover:bg-primary/90 cursor-pointer transition-colors ${className}
      `}
    >
      Adicionar
    </button>
  );
};