import Image from "next/image";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { Check } from "lucide-react";

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
      className={`group relative p-3 rounded-xl border text-left transition-all duration-200 w-full
        cursor-pointer ${ isSelected ? 'border-primary shadow-sm' : 'border-transparent bg-white shadow-sm'}
      `}
    >
      <div className="aspect-square relative w-full mb-3 rounded-lg bg-gray-50 overflow-hidden">
        {item.image_url ? (
          <Image 
            src={item.image_url} 
            alt={item.name} 
            fill 
            loading="eager"
            className="object-cover transition-transform duration-300" 
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs flex-col gap-2">
            <span>Sem Imagem</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-0.5">
        <span className={`text-sm font-semibold line-clamp-2 ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
          {item.name}
        </span>
        <span className="text-[10px] text-gray-400 font-mono">
          Ref: {item.ref}
        </span>

        {item?.metadata && (
          <div className="flex text-[8px] text-gray-400 font-mono gap-1">
            {Number(item?.metadata?.size_height) > 0 && (
              <>
                <span>Altura: {item?.metadata?.size_height}cm</span>
                <span>|</span>
              </>
            )}
            {Number(item?.metadata?.size_width) > 0 && (
              <span>Largura: {item?.metadata?.size_width}cm</span>
            )}
          </div>
        )}
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow-sm animate-in zoom-in duration-200">
          <Check size={10} strokeWidth={3} />
        </div>
      )}
    </button>
  );
};