'use client'

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { updateCatalogImageAction } from "@/app/actions/catalogImages.action";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { updateCustomizationItemCategoryStatusAction } from "@/app/actions/customizationItemsCategory.action";
import { updateCustomizationItemAction } from "@/app/actions/customizationItems.action";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  idProduct: string;
  available: boolean;
  itemType: ItemsCustomizationTypes;
  onUpdateStatus?: (toggleCallback: boolean) => void;
};

const ACTION_MAP: Record<ItemsCustomizationTypes, (
  id: string, 
  data: { available: boolean }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>> = {
  customization_item: updateCustomizationItemAction,
  catalog_image: updateCatalogImageAction,
  category: updateCustomizationItemCategoryStatusAction,
};

export function ToggleAvailableSwitch({ 
  idProduct, 
  available, 
  itemType,
  onUpdateStatus
}: ToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [availableState, setAvailableState] = useState<boolean>(available);

  useEffect(() => {
    setAvailableState(available);
  }, [available]);

  const handleUpdate = (checked: boolean) => {
    if (isLoading) return;

    setIsLoading(true);
    onUpdateStatus?.(true);
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
          toast.error("Erro na atualização do status do item.");
          setAvailableState(!checked);
          return;
        };

        toast.success(`Disponibilidade atualizada com sucesso!`);
        router.refresh();
      } catch (error) {
        console.error(`Erro ao atualizar ${itemType}:`, error);
        toast.error(`Erro ao atualizar o status do item.`);
        setAvailableState(!checked);
      } finally {
        setIsLoading(false);
        onUpdateStatus?.(false);
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
        disabled={isPending || isLoading}
        className={`cursor-pointer data-[state=checked]:bg-green-600 data-[state=checked]:dark:bg-zinc-800 dark:data-[state=checked]:text-white
          dark:data-[state=unchecked]:bg-zinc-800 dark:data-[state=unchecked]:text-zinc-50 data-[state=unchecked]:bg-gray-200
        `}
      />
    </div>
  );
};