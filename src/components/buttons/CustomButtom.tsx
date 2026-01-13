interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string;
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function CustomButton({ onClick, children, className }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center w-full py-4 px-2
        bg-secondary hover:bg-secondary/80 text-white 
        rounded-2xl font-sans font-bold text-lg gap-3 transition-all cursor-pointer ${className}`}
      >
      {children}
    </button>
  );
}