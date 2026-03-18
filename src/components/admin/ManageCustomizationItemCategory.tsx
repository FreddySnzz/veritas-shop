'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCategoryAction } from "@/app/actions/customizationItemsCategory.action";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { Plus, Trash, X } from "lucide-react";
import CustomizationItemCategoryModal from "../modals/CustomizationItemCategory";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import CustomModal from "../modals/CustomModal";
import { BackButton } from "../buttons/BackButton";
import { FloatAddButton } from "../buttons/AddButton";
import { SearchbarInput } from "../inputs/SearchbarInput";
import { CustomButton } from "../buttons/CustomButton";
import { ToggleAvailableSwitch } from "../buttons/ToggleAvailableSwitch";

interface ManageCustomizationItemCategoryProps {
  categories: CustomizationItemsCategoryModel[];
};

export function ManageCustomizationItemCategory({ categories }: ManageCustomizationItemCategoryProps) {
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState<boolean>(false);
  const [categoryToModify, setCategoryToModify] = useState<CustomizationItemsCategoryModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const filteredData = useMemo(() => {
    if (!searchText) return categories;
    
    const lowerSearch = searchText.toLowerCase();
    return categories.filter((category) => 
      category.name.toLowerCase().includes(lowerSearch)
    );
  }, [searchText, categories]);

  const handleUpdateStatus = (toggleCallback: boolean) => {
    setIsLoading(toggleCallback);
  };
  
  const handleOpenCategoryModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCategoryToModify(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (category: CustomizationItemsCategoryModel) => {
    setCategoryToModify(category);
    setCategoryModalOpen(true);
  };

  const handleOpenDeleteModal = (e: React.MouseEvent, category: CustomizationItemsCategoryModel) => {
    e.stopPropagation();
    setCategoryToModify(category);
    setDeleteCategoryModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCategoryAction(id);
      toast.success("Categoria removida com sucesso!");
      setDeleteCategoryModalOpen(false);
      setCategoryToModify(null);
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
      <div className="flex overflow-y-auto font-sans scrollbar-hide">
        <div className="flex w-full items-center justify-center md:gap-3 mb-2 md:mb-4">
          <div className="relative flex items-center grow">
            <SearchbarInput
              searchbarPlaceholder="Pesquisar categorias"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className="bg-white shadow-xs"
            />

            {searchText.length > 0 && (
              <button
                aria-label="Limpar pesquisa"
                title="Limpar pesquisa"
                className="absolute right-3 cursor-pointer"
                onClick={() => setSearchText('')}
              >
                <X className="w-6 h-6 text-secondary cursor-pointer" />
              </button>
            )}
          </div>

          <div>
            <CustomButton 
              onClick={(e: React.MouseEvent) => handleOpenCategoryModal(e)}
              className={`hidden md:flex lg:flex-row py-2 lg:px-8 rounded-lg shadow-xs
                bg-primary text-white hover:bg-primary/90 font-bold text-base
              `}
            >
              <Plus className="w-6 h-6" />
              <span>Adicionar</span>
            </CustomButton>
          </div>
        </div>
        
        <div className="fixed md:hidden bottom-22 right-5 z-15">
          <FloatAddButton
            pushRoute={'#'}
            onClick={(e: React.MouseEvent) => handleOpenCategoryModal(e)}
            className="p-3"
          />
        </div>
      </div>

      {isLoading && (
        <span className="text-center w-full mt-2 md:mt-0 mb-4 text-gray-400">
          Atualizando...
        </span>
      )}

      {categories.length === 0 ? (
        <div className={`flex flex-col w-full h-[55vh] gap-4 
          items-center justify-center text-gray-400`}
        >
          <div className="flex flex-col items-center justify-center">
            <span>Nenhuma categoria encontrada.</span>
            <span className="font-bold text-sm">
              {`Adicione uma nova categoria no botão "Adicionar".`}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
            <div className={`flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-2`}>
              {filteredData.map((category: CustomizationItemsCategoryModel) => (
                <div 
                  key={category.name} 
                  onClick={() => handleEditCategory(category)}
                  className={`flex justify-between gap-4 w-full cursor-pointer
                    bg-white rounded-xl p-4 border border-gray-100
                  `}
                >
                  {category.image_url ? (
                    <div className="relative w-15 h-15 md:w-25 md:h-25 shrink-0">
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
                    <div 
                      className={`shrink-0 flex items-center justify-center w-15 h-15 
                        rounded-lg bg-gray-200 md:w-25 md:h-25
                      `}
                    >
                      <span className="text-[0.6rem] text-secondary px-2 text-center font-medium">
                        Sem Imagem
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-col grow justify-between w-full">
                    <span className="font-bold text-secondary">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {category?.description}
                    </span>
                    <div className="flex pt-2 gap-3 items-center">
                      <span className={`font-medium text-sm ${category.available ? 
                        'text-green-600' : 'text-red-500'}`}
                      >
                        Disponível:
                      </span>
                      <ToggleAvailableSwitch
                        idProduct={category.id}
                        available={category.available}
                        itemType={ItemsCustomizationTypes.category}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute bottom-0 right-0">
                      <button 
                        type="button"
                        aria-label="Deletar Categoria"
                        title="Deletar Categoria"
                        onClick={(e) => handleOpenDeleteModal(e, category)}
                        className="flex items-center hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash className="text-secondary w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <CustomizationItemCategoryModal 
        mode={categoryToModify ? 'editar' : 'adicionar'}
        initialData={categoryToModify || undefined}
        modalOpen={categoryModalOpen} 
        onClose={() => {
          setCategoryToModify(null);
          setCategoryModalOpen(false)
        }}
      />

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
          <button 
            type="button"
            aria-label="Cancelar"
            onClick={() => setDeleteCategoryModalOpen(false)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-gray-100 text-secondary hover:bg-gray-200 transition-colors font-medium
              disabled:opacity-50
            `}
            disabled={isLoading}
          >
            <span>Cancelar</span>
          </button>

          <button 
            type="button"
            aria-label="Confirmar"
            onClick={() => handleDeleteCategory(categoryToModify?.id || '')}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-primary text-white hover:bg-primary/90 transition-colors font-medium
              disabled:opacity-50
            `}
            disabled={isLoading}
          >
            <span>{isLoading ? 'Deletando...' : 'Sim, deletar'}</span>
          </button>
        </div>
      </CustomModal>

      <div className="shrink-0 md:hidden mt-auto bg-background-alternative z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton backRoute />
        </div>
      </div>
    </div>
  );
};