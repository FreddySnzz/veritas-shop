'use client'

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateCordaoAction } from "@/app/actions/customization-items/cordao.action";
import { updateContaAction } from "@/app/actions/customization-items/conta.action";
import { updateEntremeioAction } from "@/app/actions/customization-items/entremeio.action";
import { updateLetraAction } from "@/app/actions/customization-items/letra.action";
import { updateCrucifixoAction } from "@/app/actions/customization-items/crucifixo.action";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { updateCatalogImageAction } from "@/app/actions/catalogImages.action";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { updateCustomizationItemCategoryAction } from "@/app/actions/customizationItemsCategory.action";
import { updateCustomizationItemAction } from "@/app/actions/customizationItems.action";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  idProduct: string;
  available: boolean;
  itemType: ItemsCustomizationTypes;
};

const ACTION_MAP: Record<ItemsCustomizationTypes, (
  id: string, 
  data: { available: boolean }
) => Promise<any>> = {
  customization_item: updateCustomizationItemAction,
  catalog_image: updateCatalogImageAction,
  category: updateCustomizationItemCategoryAction,
};

export function ToggleCustomizationItemAvailableSwitch({ idProduct, available, itemType }: ToggleProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [availableState, setAvailableState] = useState<boolean>(available);

  useEffect(() => {
    setAvailableState(available);
  }, [available]);

  const handleUpdate = (checked: boolean) => {
    const updateAction = ACTION_MAP[itemType];

    if (!updateAction) {
      toast.error("Tipo de item desconhecido.");
      return;
    };

    setAvailableState(checked);

    startTransition(async () => {
      try {
        const result = await updateAction(idProduct, { available: checked });

        if (result instanceof Error) {
          toast.error("Erro ao atualizar o status do item.");
          setAvailableState(!checked);
          return;
        };

        toast.success(`Disponibilidade atualizada com sucesso!`);
        router.refresh();
      } catch (error) {
        console.error(`Erro ao atualizar ${itemType}:`, error);
        toast.error(`Erro ao atualizar o status do item.`);
        setAvailableState(!checked);
      };
    });
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()} 
      className="flex items-center"
    >
      <Switch
        checked={availableState}
        onCheckedChange={handleUpdate}
        disabled={isPending}
        className="cursor-pointer data-[state=checked]:bg-green-600"
      />
    </div>
  );
};