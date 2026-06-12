'use client'

import { useState } from "react";
import { Trash } from "lucide-react";
import DeleteProductItemModal from "../modals/DeleteProductItem";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  idProduct: string;
};

export function DeleteButton({ className, idProduct }: ButtonProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteModalOpen(true);
        }}
        className={cn("flex items-center justify-center transition-all cursor-pointer mr-2",
          "text-secondary/70  hover:text-gray-600 dark:hover:text-red-400",
          className
        )}
      >
        <Trash className="w-4 h-4" />
      </button>

      <DeleteProductItemModal
        productId={idProduct}
        modalOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};