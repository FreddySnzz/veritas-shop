'use client';

import { useCart } from "@/data/context/CartContext";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { toast } from "sonner";

interface DeleteItemCartProps extends React.HTMLAttributes<HTMLElement> {
  cartId: string
  modalOpen: boolean
  onClose?: () => void
};

export default function DeleteItemCartModal({ cartId, modalOpen, onClose }: DeleteItemCartProps) {
  const { removeItem } = useCart();
  useLockBodyScroll(modalOpen);

  const handleDelete = (cartId: string) => {
    try {
      removeItem(cartId);
      toast.success("Item removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover item:", error);
      toast.error("Erro ao remover item.");
    } finally {
      onClose?.();
    };
  };

  if (!modalOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 p-4 backdrop-blur-xs transition-all cursor-default"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
      >
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <span className="font-bold text-center">
            Tem certeza que deseja remover esse item do carrinho?
          </span>
          <span className="text-xs font-light text-red-600">
            Essa ação não pode ser desfeita.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={onClose}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-gray-100 text-secondary hover:bg-gray-200 transition-colors font-medium
            `}
          >
            <span>Cancelar</span>
          </div>

          <div 
            onClick={() => handleDelete(cartId)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-primary text-white hover:bg-primary/90 transition-colors font-medium
            `}
          >
            <span>Confirmar</span>
          </div>
        </div>
      </div>
    </div>
  );
};