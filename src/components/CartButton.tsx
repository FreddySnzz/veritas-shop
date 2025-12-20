'use client';

import { ShoppingCart, X } from "lucide-react";

interface CartButtonProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: () => void;
};

export function CartButton({ isOpen }: CartButtonProps) {
  const cart = localStorage.getItem('custom_rosario');
  
  return (
    <div className="relative">
      <button
        onClick={isOpen}
        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
      >
        <ShoppingCart className="w-6 h-6 text-secondary" />
      </button>
      {cart && <div className="absolute w-2 h-2 top-2 right-2 rounded-full bg-details animate-ping" />}
    </div>
  );
}