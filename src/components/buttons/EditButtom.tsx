'use client'

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pushRoute: string;
};

export function EditButton({ className, pushRoute }: ButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(pushRoute)}
      className={`flex items-center justify-center 
        hover:text-gray-600 text-secondary/70 transition-all cursor-pointer mr-2 ${className}
      `}
    >
      <Pencil className="w-6 h-6" />
    </button>
  );
};