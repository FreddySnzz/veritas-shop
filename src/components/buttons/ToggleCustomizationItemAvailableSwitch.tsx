'use client'

import { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { updateCordaoAction } from "@/app/actions/customization-items/cordao.action";
import { updateContaAction } from "@/app/actions/customization-items/conta.action";
import { updateEntremeioAction } from "@/app/actions/customization-items/entremeio.action";
import { updateLetraAction } from "@/app/actions/customization-items/letra.action";
import { updateCrucifixoAction } from "@/app/actions/customization-items/crucifixo.action";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { updateCatalogImageAction } from "@/app/actions/catalogImages.action";
import { useRouter } from "next/navigation";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  idProduct: string;
  available: boolean;
  itemType: ItemsCustomizationTypes;
};

const ACTION_MAP: Record<ItemsCustomizationTypes, (
  id: string, 
  data: { available: boolean }
) => Promise<any>> = {
  cordao: updateCordaoAction,
  conta: updateContaAction,
  entremeio: updateEntremeioAction,
  letra: updateLetraAction,
  crucifixo: updateCrucifixoAction,
  catalog_image: updateCatalogImageAction
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
        await updateAction(idProduct, { available: checked });
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