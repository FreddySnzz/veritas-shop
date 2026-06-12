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
        ${isSelected ? 'border-primary dark:border-details dark:bg-background-dark/60 shadow-sm' : 
          'border-transparent dark:border-zinc-700 bg-white dark:bg-input/50 shadow-sm'}
      `}
    >
      <div className={`aspect-square relative max-w-70 mb-3 rounded-lg 
        bg-gray-50 dark:bg-zinc-700 overflow-hidden border`}
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
        <p className={`text-sm font-semibold line-clamp-2 
          ${isSelected ? 'text-primary dark:text-zinc-200' : 'text-gray-700 dark:text-zinc-50'}`}
        >
          {item.name}
        </p>

        <div className="flex flex-col text-[10px] my-1 text-gray-400 dark:text-zinc-400 font-mono">
          <p className="flex font-bold text-primary dark:text-emerald-500 dark:font-black">
            {item?.price_addon ? (<span>+ {formatCurrency(item?.price_addon)}</span>) : null}
          </p>
          <p>
            Ref: {item.ref}
          </p>
        </div>

        {item?.metadata && (
          <div className="flex flex-col text-[8px] md:text-[10px] text-gray-400 dark:text-zinc-400 font-mono">
            {Number(item?.metadata?.size_height) > 0 && (
              <p>Altura: {item?.metadata?.size_height}cm</p>
            )}
            {Number(item?.metadata?.size_width) > 0 && (
              <p>Largura: {item?.metadata?.size_width}cm</p>
            )}
          </div>
        )}
      </div>

      {isSelected && (
        <div className={`absolute top-2 right-2 bg-primary dark:bg-details
          text-white p-1 rounded-full shadow-sm animate-in zoom-in duration-200`}
        >
          <Check size={10} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};