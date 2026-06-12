import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
    <div className={cn("flex justify-between rounded-lg transition-colors bg-gray-50 dark:bg-zinc-800 p-3", className,
      alertOpen ? "" : "hidden")}
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