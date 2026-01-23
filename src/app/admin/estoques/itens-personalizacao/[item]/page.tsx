'use client';

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { getCachedCustomizationItemsAction } from "@/app/actions/cache.actions";
import CrucifixoModel from "@/data/models/Crucifixo.model";
import ContaModel from "@/data/models/Conta.model";
import EntremeioModel from "@/data/models/Entremeio.model";
import LetraModel from "@/data/models/Letra.model";
import CordaoModel from "@/data/models/Cordao.model";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ManageCustomizationItemsInventory from "@/components/admin/CustomizationItemsInventory";
import { useParams } from "next/navigation";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";

interface CustomizationItems {
  crucifixos: CrucifixoModel[];
  contas: ContaModel[];
  entremeios: EntremeioModel[];
  letras: LetraModel[];
  cordoes: CordaoModel[];
};

export default function ManageInvertoryCatalogPage() {
  const [customizationItems, setCustomizationItems] = useState<CustomizationItems | undefined>(undefined);
  const params = useParams();

  async function getCustomizationItems() {
    const items = await getCachedCustomizationItemsAction();
    
    const safeItems = {
      crucifixos: items.crucifixos ?? [],
      contas: items.contas ?? [],
      entremeios: items.entremeios ?? [],
      letras: items.letras ?? [],
      cordoes: items.cordoes ?? [],
    };

    setCustomizationItems(safeItems);
  };

  useEffect(() => {
    getCustomizationItems();
  }, []);

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
          <hr className="border-muted-foreground/50 mb-4 mx-6" />
        </div>
        <ManageCustomizationItemsInventory
          items={
            customizationItems ?? {
              crucifixos: [],
              contas: [],
              entremeios: [],
              letras: [],
              cordoes: [],
            }
          }
          itemType={ItemsCustomizationTypes[params.item as keyof typeof ItemsCustomizationTypes]}
        />
      </main>
    </div>
  );
};