import Image from "next/image";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { Check } from "lucide-react";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";

interface CardCustomizationProps {
  item: CustomizationItemsModel;
  isSelected: boolean;
  onSelect: () => void;
};

export default function CardCustomization({ 
  item, 
  isSelected, 
  onSelect 
}: CardCustomizationProps) {
  return (
    <button
      type="button"
      aria-label={`Selecionar item (${item.ref})`}
      title={`Selecionar item (${item.ref})`}
      onClick={onSelect}
      className={`group relative p-3 rounded-xl border text-left
        md:w-65 cursor-pointer transition-all duration-200
        ${isSelected ? 'border-primary shadow-sm' : 
          'border-transparent bg-white shadow-sm'}
      `}
    >
      <div className={`aspect-square relative max-w-70 mb-3 rounded-lg 
        bg-gray-50 overflow-hidden border`}
      >
        {item.image_url ? (
          <Image 
            src={item.image_url} 
            alt={item.name} 
            fill 
            draggable="false"
            loading="eager"
            className="object-cover transition-transform duration-300" 
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center 
            text-gray-400 text-xs flex-col gap-2`}
          >
            <span>Sem Imagem</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col">
        <span className={`text-sm font-semibold line-clamp-2 
          ${isSelected ? 'text-primary' : 'text-gray-700'}`}
        >
          {item.name}
        </span>

        <div className="flex flex-col text-[10px] my-1 text-gray-400 font-mono">
          <span className="flex font-bold text-primary">
            {item?.price_addon ? (<span>+ {formatCurrency(item?.price_addon)}</span>) : null}
          </span>
          <span>
            Ref: {item.ref}
          </span>
        </div>

        {item?.metadata && (
          <div className="flex flex-col text-[8px] md:text-[10px] text-gray-400 font-mono">
            {Number(item?.metadata?.size_height) > 0 && (
              <span>Altura: {item?.metadata?.size_height}cm</span>
            )}
            {Number(item?.metadata?.size_width) > 0 && (
              <span>Largura: {item?.metadata?.size_width}cm</span>
            )}
          </div>
        )}
      </div>

      {isSelected && (
        <div className={`absolute top-2 right-2 bg-primary 
          text-white p-1 rounded-full shadow-sm animate-in zoom-in duration-200`}
        >
          <Check size={10} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};