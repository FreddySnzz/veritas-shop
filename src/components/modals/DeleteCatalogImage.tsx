'use client';

import { deleteCatalogImageAction } from "@/app/actions/catalogImages.action";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteCatalogImageProps extends React.HTMLAttributes<HTMLElement> {
  idCatalogImage: string
  modalOpen: boolean
  onClose?: () => void
};

export default function DeleteCatalogImageModal({ 
  idCatalogImage, 
  modalOpen, 
  onClose 
}: DeleteCatalogImageProps) {
  const [isLoading, setIsLoading] = useState(false);
  useLockBodyScroll(modalOpen);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCatalogImageAction(id);
      toast.success("Imagem apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar imagem:", error);
      toast.error("Erro ao apagar imagem.");
    } finally {
      setIsLoading(false);
      onClose?.();
      window.location.reload();
    };
  };

  if (!modalOpen) return null;

  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
        bg-black/50 p-4 backdrop-blur-xs transition-all cursor-default
      `}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
      >
        <span className="font-bold text-center mb-4">
          Tem certeza que deseja apagar a imagem?
        </span>
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
            onClick={() => handleDelete(idCatalogImage)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-primary text-white hover:bg-primary/90 transition-colors
            `}
          >
            {isLoading ? (
              <span className="animate-spin">
                <span className="sr-only">Deletando...</span>
              </span>
            ) : (
              <span>Deletar</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};