import { ShoppingCart } from "lucide-react";

interface CartButtonProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: () => void;
};

export function CartButton({ isOpen }: CartButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={isOpen}
        className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
      >
        <ShoppingCart className="w-6 h-6 text-secondary" />
      </button>
    </div>
  );
}