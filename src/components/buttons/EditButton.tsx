'use client'

import { Pencil } from "lucide-react";
import { CustomLink } from "./CustomLink";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pushRoute: string;
};

export function EditButton({ className, pushRoute }: ButtonProps) {
  return (
    <CustomLink
      href={pushRoute}
      aria-label="Editar"
      className={`flex items-center justify-center 
        hover:text-gray-600 text-secondary/70 transition-all cursor-pointer mr-2 ${className}
      `}
    >
      <Pencil className="w-5 h-5" />
    </CustomLink>
  );
};