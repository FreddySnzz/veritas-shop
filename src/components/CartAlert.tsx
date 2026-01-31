import { X } from "lucide-react";
import { useState } from "react";

export default function CartAlert() {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div className={`${alertOpen ? "" : "hidden"} flex justify-between bg-gray-50 rounded-lg transition-colors p-3`}>
      <div className="flex flex-col text-xs">
        <span className="font-bold">
          Os produtos no carrinho não estão reservados.
        </span>
        <span>Finalize seu pedido antes que o estoque acabe.</span>
      </div>
      <button 
        type="button"
        aria-label="Fechar aviso"
        title="Fechar aviso"
        onClick={handleCloseAlert}
        className="flex items-center justify-center cursor-pointer"
      >
        <X className="w-4 h-4 hover:text-secondary/80 transition-colors" />
      </button>
    </div>
  )
}