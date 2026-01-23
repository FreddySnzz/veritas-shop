'use client'

import { useState } from "react";
import { Trash } from "lucide-react";
import DeleteProductItemModal from "../modals/DeleteProductItem";

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
        className={`flex items-center justify-center 
          hover:text-gray-600 text-secondary/70 transition-all cursor-pointer mr-2 ${className}
        `}
      >
        <Trash className="w-5 h-5" />
      </button>

      <DeleteProductItemModal
        productId={idProduct}
        modalOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};