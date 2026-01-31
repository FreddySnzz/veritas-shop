'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { deleteCategoryAction } from "@/app/actions/customizationItemsCategory.action";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { Trash2 } from "lucide-react";
import AddCustomizationItemCategoryModal from "../modals/AddCustomizationItemCategory";
import { ToggleCustomizationItemAvailableSwitch } from "../buttons/ToggleCustomizationItemAvailableSwitch";
import { CustomButton } from "../buttons/CustomButton";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import CustomModal from "../modals/CustomModal";
import Image from "next/image";

interface ManageCustomizationItemCategoryProps {
  categories: CustomizationItemsCategoryModel[];
};

export function ManageCustomizationItemCategory({ categories }: ManageCustomizationItemCategoryProps) {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState<boolean>(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState<boolean>(false);
  const [idCategory, setIdCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleOpenDeleteModal = (id: string) => {
    setIdCategory(id);
    setDeleteCategoryModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategoryAction(id);
      toast.success("Categoria removida com sucesso!");
      setDeleteCategoryModalOpen(false);
      setIdCategory('');
      router.refresh();
    } catch (error) {
      console.error("Erro ao remover categoria:", error);
      toast.error("Erro ao remover categoria.");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex overflow-y-auto px-6 font-sans scrollbar-hide mb-4">
        <CustomButton
          className={`flex items-center justify-center w-full py-4 px-2 font-sans font-bold gap-3
            bg-white hover:bg-gray-50 text-secondary rounded-2xl text-lg transition-all cursor-pointer shadow shadow-secondary/5
          `}
          onClick={() => setAddCategoryModalOpen(true)}
        >
          <span>Adicionar Categoria</span>
        </CustomButton>

        <AddCustomizationItemCategoryModal 
          modalOpen={addCategoryModalOpen} 
          onClose={() => setAddCategoryModalOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-6 font-sans scrollbar-hide">
        {categories.map((category: CustomizationItemsCategoryModel) => (
          <div 
            key={category.name} 
            className="flex items-center justify-between gap-2 w-full bg-white rounded-xl p-4 border border-gray-100"
          >
            {category.image_url ? (
              <div className="relative w-15 h-15 shrink-0">
                <Image
                  src={category.image_url}
                  alt="preview"
                  draggable="false"
                  fill
                  loading="eager"
                  className="aspect-square rounded-lg object-cover shadow-sm"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className={`shrink-0 flex items-center justify-center w-15 h-15 rounded-lg bg-gray-200`}>
                <span className="text-[0.6rem] text-secondary px-2 text-center font-medium">
                  Sem Imagem
                </span>
              </div>
            )}
            
            <div className="flex flex-col justify-center grow w-full">
              <span className="font-bold">
                Categoria:
              </span>
              <span className="line-clamp-1">
                {category.name}
              </span>
            </div>

            <div className="flex items-center w-full justify-end gap-3">
              <div className="flex items-center gap-3">
                <Label 
                  htmlFor="available"
                  className="font-bold"
                >
                  Disponível?
                </Label>
                <ToggleCustomizationItemAvailableSwitch
                  idProduct={category.id}
                  available={category.available}
                  itemType={ItemsCustomizationTypes.category}
                />
              </div>

              <button 
                type="button"
                onClick={() => handleOpenDeleteModal(category.id)}
                className="flex hover:text-red-500 transition-colors cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal
        modalOpen={deleteCategoryModalOpen}
        onClose={() => setDeleteCategoryModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center p-2">
          <span className="font-bold text-center">
            Tem certeza que deseja remover essa categoria?
          </span>
          <span className="text-xs font-light text-red-600">
            Essa ação não pode ser desfeita.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => setDeleteCategoryModalOpen(false)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-gray-100 text-secondary hover:bg-gray-200 transition-colors font-medium
            `}
          >
            <span>Cancelar</span>
          </div>

          <div 
            onClick={() => handleDeleteCategory(idCategory)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-primary text-white hover:bg-primary/90 transition-colors font-medium
            `}
          >
            <span>Confirmar</span>
          </div>
        </div>
      </CustomModal>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex mx-6 my-4 gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex w-full px-4 py-3 rounded-lg bg-primary/20 text-secondary items-center justify-center hover:bg-red-200 cursor-pointer transition-colors"
            disabled={isLoading}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};