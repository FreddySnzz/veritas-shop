'use client';

import { useCart } from "@/data/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: () => void;
};

export function CartButton({ isOpen }: CartButtonProps) {
  const { items } = useCart();

  return (
    <div className="relative">
      <button
        onClick={isOpen}
        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
      >
        { items.length > 0 ? 
          <span className="absolute flex size-4 top-0.5 right-0 z-10 items-center justify-center gap-2 rounded-full text-xs font-semibold font-sans">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-25" />
            <span className="relative inline-flex size-4 rounded-full bg-primary justify-center items-center text-secondary">
              {items.length}
            </span>
          </span> : null }
        <ShoppingCart className="w-6 h-6 text-secondary" />
      </button>
    </div>
  );
}