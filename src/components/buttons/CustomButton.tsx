import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
};

export function CustomButton({ onClick, children, className }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex lg:flex-col items-center justify-center w-full lg:max-h-1/2 xl:max-h-1/3 py-4 px-5",
        "bg-white hover:bg-gray-50 text-secondary",
        "rounded-xl font-sans font-bold gap-2 transition-all cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
};