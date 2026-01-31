'use client';

import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";

interface AddCustomizationItemCategoryProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  modalOpen: boolean;
  className?: string;
  onClose?: () => void;
};

export default function CustomModal({ 
  modalOpen, 
  onClose, 
  children,
  className,
}: AddCustomizationItemCategoryProps) {
  useLockBodyScroll(modalOpen);

  if (!modalOpen) return null;

  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
        bg-black/30 p-4 backdrop-blur-xs transition-all cursor-default
      `}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col gap-4 p-6 w-full max-w-md 
          bg-white rounded-lg shadow-xl ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
};