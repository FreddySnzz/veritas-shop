'use client'

import { useRouter } from "next/navigation";
import { deleteProductAction } from "@/app/actions/products.action";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  idProduct: string;
};

export function DeleteButton({ className, idProduct }: ButtonProps) {
  const router = useRouter();

  async function handleDelete(id: string) {
    try {
      await deleteProductAction(id);

      toast.success("Produto excluído com sucesso!");
      router.refresh();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Erro ao excluir produto.");
    };
  };

  return (
    <button
      type="button"
      onClick={() => handleDelete(idProduct)}
      className={`flex items-center justify-center 
        hover:text-gray-600 text-secondary/70 transition-all cursor-pointer mr-2 ${className}
      `}
    >
      <Trash className="w-6 h-6" />
    </button>
  );
};