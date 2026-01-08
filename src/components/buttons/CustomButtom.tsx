interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string;
  children?: React.ReactNode;
  onClick: () => void;
}

export function CustomButton({ onClick, children }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center w-full bg-secondary hover:bg-secondary/80 text-white py-4 rounded-2xl font-sans font-bold text-lg gap-3 transition-all cursor-pointer">
      {children}
    </button>
  );
}