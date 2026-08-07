'use client'

import { useDraggableButton } from "@/data/hook/useDraggableButton";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CustomLink } from "./CustomLink";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pushRoute: string;
  className?: string;
  size?: number;
  onClick?: (e: React.MouseEvent) => void;
};

export function AddButton({ className, pushRoute }: ButtonProps) {
  return (
    <CustomLink
      href={pushRoute}
      aria-label="Adicionar"
      className={cn("flex w-full px-4 py-3 rounded-lg items-center justify-center",
        "bg-primary text-white font-bold text-lg hover:bg-primary/90 cursor-pointer",
        "dark:bg-details dark:hover:bg-details/80 transition-colors", className
      )}
    >
      <p>Adicionar</p>
    </CustomLink>
  );
};

export function FloatAddButton({ 
  className, 
  size,
  pushRoute,
  onClick
}: ButtonProps) {
  const router = useRouter();
  const {
    buttonRef,
    position,
    dragging,
    onTouchStart,
    onMouseDown,
  } = useDraggableButton({
    margin: 12,
  });

  return (
    <button 
      type="button"
      ref={buttonRef}
      aria-label="Adicionar"
      title="Adicionar"
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      onClick={(e) => onClick ? onClick(e) : router.push(pushRoute)}
      className={cn(`flex p-2 rounded-full items-center justify-center
        bg-primary text-white font-bold text-lg hover:bg-primary/90 
        dark:bg-details dark:hover:bg-details/80
        cursor-pointer transition-colors shadow`, className
      )}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        transition: dragging ? 'none' : 'left 0.2s ease, top 0.2s ease',
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      <Plus className={cn(`w-${size} h-${size}`)} />
    </button>
  );
};