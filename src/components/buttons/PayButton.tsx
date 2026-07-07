import { cn } from "@/lib/utils"
import { CircleDollarSign } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function PayButton({ onClick, className }: ButtonProps) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-full py-3 px-4",
        "rounded-lg font-sans font-bold gap-2 transition-all cursor-pointer",
        "bg-primary text-sm hover:bg-primary/90 dark:bg-details dark:hover:bg-details/90 text-white ",
        className
      )}
    >
      <CircleDollarSign className="w-5 h-5" />
      Pagar agora mesmo
    </button>
  )
}