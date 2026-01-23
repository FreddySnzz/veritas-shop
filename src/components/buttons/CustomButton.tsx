import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function CustomButton({ onClick, children, className }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-full py-4 px-2",
        "bg-white hover:bg-gray-50 text-secondary",
        "rounded-2xl font-sans font-bold text-lg gap-3 transition-all cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}