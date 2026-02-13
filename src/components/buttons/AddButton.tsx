'use client'

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pushRoute: string;
  className?: string;
  size?: number;
  onClick?: (e: React.MouseEvent) => void;
};

export function AddButton({ className, pushRoute }: ButtonProps) {
  const router = useRouter();
  return (
    <button 
      type="button"
      aria-label="Adicionar"
      onClick={() => router.push(pushRoute)}
      className={`flex w-full px-4 py-3 rounded-lg items-center justify-center
        bg-primary text-white font-bold text-lg hover:bg-primary/90 cursor-pointer 
        transition-colors ${className}
      `}
    >
      Adicionar
    </button>
  );
};

export function FloatAddButton({ 
  className, 
  size,
  pushRoute,
  onClick
}: ButtonProps) {
  const router = useRouter();
  return (
    <button 
      type="button"
      aria-label="Adicionar"
      title="Adicionar"
      onClick={(e) => onClick ? onClick(e) : router.push(pushRoute)}
      className={cn(`flex p-2 rounded-full items-center justify-center
        bg-primary text-white font-bold text-lg hover:bg-primary/90 
        cursor-pointer transition-colors shadow`, className
      )}
    >
      <Plus className={cn(`w-${size} h-${size}`)} />
    </button>
  );
};