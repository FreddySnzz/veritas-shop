'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { getCachedCustomizationItemsAction } from "@/app/actions/cache.actions";
import { ToggleCustomizationItemAvailableSwitch } from "../buttons/ToggleCustomizationItemAvailableSwitch";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { BackButton } from "../buttons/BackButtom";
import { CustomButton } from "../buttons/CustomButton";
import CardButton from "../buttons/CardButton";

export default function ManageCustomizationItemsLayout() {
  const [customizationItems, setCustomizationItems] = useState<CustomizationItemsModel[]>([]);
  const router = useRouter();

  async function getInitialData() {
    setCustomizationItems(await getCachedCustomizationItemsAction());
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4 overflow-y-auto scrollbar-hide content-start pb-4">
        <div className="flex mx-2">
          <CustomButton
            className="bg-white hover:bg-gray-50 text-secondary shadow shadow-secondary/5"
            onClick={() => router.push('/admin/estoques/itens-personalizacao/adicionar')}
          >
            <span>Adicionar Item</span>
          </CustomButton>
        </div>

        <div className="flex flex-col mx-2 gap-4">
          {customizationItems.map((item: CustomizationItemsModel) => (
            <div key={item.id}> 
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
                    <span className={`font-medium ${item.available ? 'text-green-600' : 'text-red-500'}`}>
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
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2 z-10">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/admin/estoques" />
        </div>
      </div>
    </div>
  );
};