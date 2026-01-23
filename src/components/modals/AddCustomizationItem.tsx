'use client';

import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { useRouter } from "next/navigation";

interface AddCustomizationItemProps extends React.HTMLAttributes<HTMLElement> {
  modalOpen: boolean
  onClose?: () => void
};

export default function AddCustomizationItemModal({ modalOpen, onClose }: AddCustomizationItemProps) {
  const router = useRouter();
  useLockBodyScroll(modalOpen);

  if (!modalOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 p-4 backdrop-blur-xs transition-all cursor-default"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
      >
        <span>Que item deseja adicionar?</span>
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => router.push('/admin/estoques/itens-personalizacao/cordoes/adicionar')}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-secondary text-white hover:bg-secondary/90 transition-colors
            `}
          >
            <span>Cordão</span>
          </div>

          <div 
            onClick={() => router.push('/admin/estoques/itens-personalizacao/contas/adicionar')}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-secondary text-white hover:bg-secondary/90 transition-colors
            `}
          >
            <span>Conta</span>
          </div>

          <div 
            onClick={() => router.push('/admin/estoques/itens-personalizacao/letras/adicionar')}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-secondary text-white hover:bg-secondary/90 transition-colors
            `}
          >
            <span>Letras</span>
          </div>

          <div 
            onClick={() => router.push('/admin/estoques/itens-personalizacao/crucifixos/adicionar')}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-secondary text-white hover:bg-secondary/90 transition-colors
            `}
          >
            <span>Crucifixo</span>
          </div>

          <div 
            onClick={() => router.push('/admin/estoques/itens-personalizacao/entremeios/adicionar')}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-secondary text-white hover:bg-secondary/90 transition-colors
            `}
          >
            <span>Entremeio</span>
          </div>
        </div>
      </div>
      <div 
        onClick={onClose}
        className={`flex w-full items-center justify-center px-4 py-2 rounded-lg font-medium cursor-pointer
          bg-white text-secondary mt-2 border border-gray-100 hover:bg-gray-100 transition-colors
        `}
      >
        <span>Fechar</span>
      </div>
    </div>
  );
};