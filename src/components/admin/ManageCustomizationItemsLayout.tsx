'use client';

import Image from "next/image";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { ToggleCustomizationItemAvailableSwitch } from "../buttons/ToggleCustomizationItemAvailableSwitch";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { BackButton } from "../buttons/BackButton";
import CardButton from "../buttons/CardButton";
import { formatAndCapitalize } from "@/data/functions/formatAndCapitalize";
import ItemContent from "../ItemContent";
import ItemCollapse from "../ItemCollapse";
import { FloatAddButton } from "../buttons/AddButton";
import { SearchbarInput } from "../inputs/SearchbarInput";
import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { CustomButton } from "../buttons/CustomButton";
import { useRouter } from "next/navigation";

interface ManageCustomizationItemsLayoutProps {
  customizationItems: CustomizationItemsModel[];
};

export default function ManageCustomizationItemsLayout({ 
  customizationItems 
}: ManageCustomizationItemsLayoutProps) {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const filteredData = useMemo(() => {
    if (!searchText) return customizationItems;
    
    const lowerSearch = searchText.toLowerCase();
    return customizationItems.filter((item) => {
      const name = item.name.toLowerCase();
      const category = item.category.toLowerCase();
      const ref = item.ref.toLowerCase();
      const style = item.metadata?.style?.toLowerCase();
      
      return name.includes(lowerSearch) || 
        category.includes(lowerSearch) || 
        style?.includes(lowerSearch) ||
        ref.includes(lowerSearch);
    });
  }, [searchText, customizationItems]);

  const groups = Object.groupBy(filteredData, (item) => item.category);
  const groupedItems = Object.entries(groups).map(([category, items]) => ({
    category,
    items
  }));

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className={`flex flex-col flex-1 min-h-0 
        gap-4 overflow-y-auto scrollbar-hide content-start pb-4`}
      >
        <div className="fixed md:hidden bottom-22 right-5 z-15">
          <FloatAddButton
            pushRoute={'/admin/estoques/itens-personalizacao/adicionar'}
            className="p-3"
          />
        </div>

        <div className="flex w-full items-center justify-center md:gap-3 mb-2 md:mb-4">
          <div className="grow">
            <SearchbarInput
              searchbarPlaceholder="Pesquise por nome, estilo, categoria ou referência"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className="bg-white shadow-xs"
            />
          </div>
          <div>
            <CustomButton 
              onClick={() => router.push('/admin/estoques/itens-personalizacao/adicionar')}
              className={`hidden md:flex lg:flex-row py-2 lg:px-8 rounded-lg shadow-xs
                bg-primary text-white hover:bg-primary/90 font-bold text-md
              `}
            >
              <Plus className="w-6 h-6" />
              <span>Adicionar</span>
            </CustomButton>
          </div>
          
          {searchText.length > 0 && (
            <button
              aria-label="Limpar pesquisa"
              title="Limpar pesquisa"
              className="fixed right-8 cursor-pointer"
              onClick={() => setSearchText('')}
            >
              <X className="w-6 h-6 text-secondary cursor-pointer" />
            </button>
          )}
        </div>

        {customizationItems.length === 0 ? (
          <div className={`flex flex-col w-full h-[55vh] gap-4 
            items-center justify-center text-gray-400`}
          >
            <div className="flex flex-col items-center justify-center">
              <span>Nenhum item de personalização encontrado.</span>
              <span className="font-bold text-sm">
                {`Adicione um novo item no botão "Adicionar".`}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {groupedItems.map((group) => {
                if (!group) return null;
                
                const renderGroupedCategories = group.items?.map((item: CustomizationItemsModel) => (
                  <ItemContent key={item.id}> 
                    <CardButton 
                      className="bg-white"
                      pushRoute={`/admin/estoques/itens-personalizacao/editar/${item.id}`}
                    >
                      {item.image_url ? (
                        <div className="relative w-25 h-25 shrink-0">
                          <Image
                            src={item.image_url}
                            alt="preview"
                            draggable="false"
                            fill
                            loading="eager"
                            className="aspect-square rounded-2xl object-cover shadow-sm"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div 
                          className={`shrink-0 flex items-center justify-center w-25 h-25 rounded-2xl bg-gray-200`}
                          style={{ backgroundColor: item.metadata?.color }}
                        >
                          <span className="text-sm text-secondary px-2 text-center font-medium">
                            Sem Imagem
                          </span>
                        </div>
                      )}
        
                      <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                        <p className="text-sm font-bold truncate text-secondary">
                          <span>{item?.name}</span>
                          { item?.metadata?.style && <span> - {item?.metadata?.style}</span> }
                        </p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                          Ref: {item.ref}
                        </p>
                        <p className="text-xs text-gray-400 line-clamp-3">
                          Categoria: {item.category}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className={`font-medium  ${item.available ? 'text-green-600' : 'text-red-500'}`}>
                            Disponível:
                          </span>
                          <ToggleCustomizationItemAvailableSwitch
                            idProduct={item.id}
                            available={item.available}
                            itemType={ItemsCustomizationTypes.customizationItem}
                          />
                        </div>
                      </div>
                    </CardButton>
                  </ItemContent>
                ));

                return (
                  <div 
                    key={group.category} 
                    className="flex flex-col gap-2"
                  >
                    <ItemCollapse 
                      title={formatAndCapitalize(group.category)}
                      className={`flex flex-col mt-2 gap-2
                        md:grid md:grid-cols-2 lg:grid-cols-3
                      `}
                    >
                      {renderGroupedCategories}
                    </ItemCollapse>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="shrink-0 md:hidden mt-auto bg-background-alternative z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton backRoute />
        </div>
      </div>
    </div>
  );
};