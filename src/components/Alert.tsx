import { X } from "lucide-react";
import { useState } from "react";

interface AlertProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Alert({ 
  title, 
  subtitle, 
  className,
  children 
}: AlertProps ) {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div className={`${alertOpen ? "" : "hidden"} flex justify-between
      bg-gray-50 rounded-lg transition-colors p-3 ${className}`}
    >
      <div className="flex flex-col text-xs">
        { title || subtitle ? (
          <>
            <span className="font-bold">{title}</span>
            <span>{subtitle}</span>
          </>
        ) : children}
      </div>
      <button 
        type="button"
        aria-label="Fechar aviso"
        title="Fechar aviso"
        onClick={handleCloseAlert}
        className="flex items-center justify-center cursor-pointer pl-2"
      >
        <X className="w-4 h-4 hover:text-secondary/80 transition-colors" />
      </button>
    </div>
  )
}