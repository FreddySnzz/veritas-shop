'use client';

import Image from "next/image";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { ToggleAvailableSwitch } from "../buttons/ToggleAvailableSwitch";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { BackButton } from "../buttons/BackButton";
import CardButton from "../buttons/CardButton";
import { formatAndCapitalize, formatCurrency } from "@/data/functions/formatAndCapitalize";
import { FloatAddButton } from "../buttons/AddButton";
import { SearchbarInput } from "../inputs/SearchbarInput";
import { startTransition, useEffect, useMemo, useState } from "react";
import { BookCopy, ListFilter, Plus, Trash, X } from "lucide-react";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { CustomButton } from "../buttons/CustomButton";
import { useRouter } from "next/navigation";
import { DesktopSidePanel } from "../DesktopSidePanel";
import { CustomizationItemsFilters } from "../CustomizationItemsFilters";
import CustomModal from "../modals/CustomModal";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { 
  copyCustomizationItemsAction, 
  deleteCustomizationItemAction 
} from "@/app/actions/customizationItems.action";
import { Input } from "../ui/input";

interface ManageCustomizationItemsLayoutProps {
  customizationItems: CustomizationItemsModel[];
};

export default function ManageCustomizationItemsLayout({ 
  customizationItems 
}: ManageCustomizationItemsLayoutProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [isOpenCopyModal, setIsOpenCopyModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryToCopy, setSelectedCategoryToCopy] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasHydratedFilters, setHasHydratedFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedFilters = sessionStorage.getItem('customizationItems-filters');

    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);

        setSearchText(parsedFilters.searchText ?? '');
        setSelectedCategories(parsedFilters.selectedCategories ?? []);
        setSelectedStyles(parsedFilters.selectedStyles ?? []);
        setShowAvailableOnly(parsedFilters.showAvailableOnly ?? false);
      } catch {
        sessionStorage.removeItem('customizationItems-filters');
      };
    };

    setHasHydratedFilters(true);
  }, []);

  useEffect(() => {
    if (!hasHydratedFilters) return;

    const filters = {
      searchText,
      selectedCategories,
      selectedStyles,
      showAvailableOnly,
    };

    sessionStorage.setItem(
      'customizationItems-filters',
      JSON.stringify(filters)
    );
  }, [
    hasHydratedFilters,
    searchText,
    selectedCategories,
    selectedStyles,
    showAvailableOnly
  ]);

  const normalizedItems = useMemo(() => {
    return customizationItems.map((item) => {
      const category = item.category?.trim() || 'Sem categoria';
      const style = item.metadata?.style?.trim() || 'Sem estilo';
      const name = item.name || '';
      const ref = item.ref || '';

      return {
        original: item,
        normalized: {
          name: name.toLowerCase(),
          ref: ref.toLowerCase(),
          category,
          categoryLower: category.toLowerCase(),
          style,
          styleLower: style.toLowerCase(),
          searchBlob: `${name} ${ref} ${category} ${style}`.toLowerCase(),
        }
      };
    });
  }, [customizationItems]);

  const hasActiveFilters = useMemo(() => {
    return (
      searchText.trim().length > 0 ||
      selectedCategories.length > 0 ||
      selectedStyles.length > 0 ||
      showAvailableOnly
    );
  }, [
    searchText, 
    selectedCategories, 
    selectedStyles, 
    showAvailableOnly
  ]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(customizationItems
        .map((item) => item.category?.trim() || 'Sem categoria')
        .filter(Boolean))
    );  

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [customizationItems]);

  const styles = useMemo(() => {
    const uniqueStyles = Array.from(
      new Set(customizationItems
        .map((item) => item?.metadata?.style?.trim() || 'Sem estilo')
        .filter(Boolean))
    );  

    return uniqueStyles.sort((a, b) => a.localeCompare(b));
  }, [customizationItems]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((item) => item !== style)
        : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedCategories([]);
    setSelectedStyles([]);
    setShowAvailableOnly(false);

    sessionStorage.removeItem('customizationItems-filters');
  };

  const handleToggleItem = (id: string) => {
    const itemIndex = selectedItems.indexOf(id);

    if (itemIndex === -1) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  const toggleSelectAllItems = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item.id));
    };
  };

  const handleCopyItems = async () => {
    setIsLoading(true);

    try {
      await copyCustomizationItemsAction({
        category: selectedCategory,
        categoryToCopy: selectedCategoryToCopy,
      });

      toast.success("Itens copiados com sucesso!");
    } catch (error) {
      console.error("Erro ao copiar itens:", error);
      toast.error("Erro ao copiar itens.");
    } finally {
      setIsLoading(false);
    };
  };

  const handleDeleteItems = async (ids: string[]) => {
    setIsLoading(true);

    try {
      startTransition(() => {
        ids.forEach(async (id) => {
          await deleteCustomizationItemAction(id);
        });
      });
    } catch (error) {
      console.error("Erro ao deletar itens:", error);
      toast.error("Erro ao deletar itens.");
    } finally {
      startTransition(() => {
        setIsLoading(false);
        clearFilters();
        setSelectedItems([]);
        toast.success("Itens deletados com sucesso!");
      });
    };
  };

  const filteredItems = useMemo(() => {
    const lowerSearch = searchText.toLowerCase().trim();

    return normalizedItems
      .filter(({ original, normalized }) => {
        const matchesSearch =
          !lowerSearch || normalized.searchBlob.includes(lowerSearch);

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(normalized.category);

        const matchesStyle =
          selectedStyles.length === 0 ||
          selectedStyles.includes(normalized.style);

        const matchesAvailability =
          !showAvailableOnly || original.available;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStyle &&
          matchesAvailability
        );
      })
      .map(({ original }) => original);
  }, [
    normalizedItems,
    searchText,
    selectedCategories,
    selectedStyles,
    showAvailableOnly,
  ]);

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex flex-1 w-full overflow-y-auto scrollbar-hide content-start lg:gap-6">
        <div className="flex flex-col gap-3">
          <CustomButton 
            onClick={() => router.push('/admin/estoques/itens-personalizacao/adicionar')}
            className={`hidden lg:flex lg:flex-row py-2 lg:px-8 rounded-lg shadow-xs
              bg-primary text-white hover:bg-primary/90 font-bold text-base
              dark:bg-details dark:hover:bg-details/80
            `}
          >
            <Plus className="w-6 h-6" />
            <span>Adicionar item</span>
          </CustomButton>

          <CustomButton
            onClick={() => setIsOpenCopyModal(true)}
            className={`hidden lg:flex lg:flex-row py-2 lg:px-8 rounded-lg shadow-xs
            bg-gray-300 text-secondary hover:bg-gray-400/60 font-bold text-sm border
            transition-colors dark:bg-zinc-900 dark:border-none
            `}
          >
            <BookCopy className="w-5 h-5" />
            <span>Copiar Itens de Personalização</span>
          </CustomButton>

          <CustomButton
            onClick={() => setIsOpenDeleteModal(true)}
            className={`hidden ${selectedItems.length > 0 && 'lg:flex'} 
              lg:flex-row items-center py-2 lg:px-8 rounded-lg font-medium gap-2
              bg-red-400 text-white hover:bg-red-500 transition-all
              dark:bg-red-500 dark:hover:bg-red-600
            `}
          >
            <Trash className="w-4 h-4" />
            <p>
              {isLoading ? 'Deletando' : 'Deletar'} {selectedItems.length} {selectedItems.length > 1 ? 'itens' : 'item'}
            </p>
          </CustomButton>

          {/* TODO: Add ao mobile */}
          <CustomButton
            onClick={() => toggleSelectAllItems()}
            className={`hidden ${selectedItems.length > 0 && 'lg:flex'}
              lg:flex-row py-2 lg:px-8 rounded-lg shadow-xs
              bg-gray-300 text-secondary hover:bg-gray-400/60 font-bold text-sm border
              transition-all dark:bg-zinc-900 dark:border-none
            `}
          >
            <RiCheckboxMultipleLine className="w-4 h-4" />
            <p>
              {selectedItems.length === customizationItems.length ? 'Desmarcar todos os itens' : 'Selecionar todos'}
            </p>
          </CustomButton>
          
          <DesktopSidePanel 
            className="hidden lg:flex"
            contentClassName="p-4"
          >
            <CustomizationItemsFilters
              searchText={searchText}
              onSearchChange={setSearchText}
              onClearSearch={() => setSearchText('')}
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              styles={styles}
              selectedStyles={selectedStyles}
              onToggleStyle={toggleStyle}
              showAvailableOnly={showAvailableOnly}
              onToggleAvailableOnly={() => setShowAvailableOnly((prev) => !prev)}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </DesktopSidePanel>
        </div>

        {/* Tela mobile */}
        <div className={`flex flex-col flex-1 min-h-0 
          gap-4 overflow-y-auto scrollbar-hide content-start pb-4`}
        >
          <div className={`fixed md:hidden bottom-22 right-5 z-15`}>
            <FloatAddButton
              pushRoute={'/admin/estoques/itens-personalizacao/adicionar'}
              className="p-3"
            />
          </div>

          <div className="flex lg:hidden w-full items-center justify-end gap-1 md:gap-2 mt-2">
            <div className="relative flex items-center grow gap-2">
              <SearchbarInput
                searchbarPlaceholder="Pesquise por nome, estilo, categoria ou referência"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                className="bg-white shadow-xs truncate"
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

            <button
              type="button"
              aria-label="Filtrar"
              title="Filtrar"
              onClick={() => setIsOpenFilterModal(true)}
              className={`bg-white hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 
                rounded-lg shadow-xs cursor-pointer h-9 w-12 flex items-center justify-center transition-all
              `}
            >
              <ListFilter className="w-6 h-6 text-secondary" />
            </button>

            <button
              type="button"
              aria-label="Copiar Itens"
              title="Copiar Itens"
              onClick={() => setIsOpenCopyModal(true)}
              className={`bg-white hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 
                rounded-lg shadow-xs cursor-pointer h-9 w-12 flex items-center justify-center transition-all
              `}
            >
              <BookCopy className="w-6 h-6 text-secondary" />
            </button>

            <div className={`${selectedItems.length < 0 && 'md:hidden'}`}>
              <button
                type="button"
                aria-label="Selecionar todos os itens"
                title="Selecionar todos os itens"
                onClick={() => toggleSelectAllItems()}
                className={`bg-white hover:bg-gray-50 dark:bg-input/50 dark:hover:bg-input/70 
                  rounded-lg shadow-xs cursor-pointer h-9 w-12 flex items-center justify-center transition-all
                `}
              >
                <RiCheckboxMultipleLine className="w-6 h-6 text-secondary" />
              </button>
            </div>

            <div className={`hidden ${selectedItems.length > 0 && 'md:flex'}`}>
              <button
                type="button"
                aria-label="Deletar Itens"
                title="Deletar Itens"
                onClick={() => setIsOpenDeleteModal(true)}
                className={`bg-red-400 hover:bg-red-500 rounded-lg shadow-xs cursor-pointer 
                  h-9 w-12 flex items-center justify-center transition-all
                `}
              >
                <Trash className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="hidden md:flex">
              <CustomButton 
                onClick={() => router.push('/admin/estoques/itens-personalizacao/adicionar')}
                className={`hidden md:flex lg:flex-row py-2 lg:px-8 rounded-lg shadow-xs
                  bg-primary text-white hover:bg-primary/90 font-bold text-base
                  dark:bg-details dark:hover:bg-details/80
                `}
              >
                <Plus className="w-6 h-6" />
                <span>Adicionar</span>
              </CustomButton>
            </div>
          </div>

          { hasActiveFilters && filteredItems.length === 0 ? (
            <div className={`flex flex-col w-full h-[55vh] gap-4 
              items-center justify-center text-gray-400 dark:text-zinc-500`}
            >
              <div className="flex flex-col text-center items-center justify-center">
                { hasActiveFilters ? (
                  <>
                    <p className="text-sm font-bold">
                      Nenhum item de personalização encontrado com os filtros atuais.
                    </p>
                    <p className="text-sm">
                      Limpe os filtros ou adicione um novo item.
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-sm">
                    Adicione um novo item no botão "Adicionar".
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2">
                {filteredItems.map((item) => (
                  <CardButton
                    key={item.id}
                    className="bg-white dark:bg-input/50 dark:border-zinc-700 dark:hover:bg-input/70 transition-colors"
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
                        className="shrink-0 flex items-center justify-center w-25 h-25 rounded-2xl bg-gray-200 dark:bg-input/50"
                        style={{ backgroundColor: item.metadata?.color }}
                      >
                        <span className="text-sm text-secondary px-2 text-center font-medium">
                          Sem Imagem
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                      <p className="text-sm font-bold truncate text-secondary dark:text-zinc-50">
                        <span>{item.name}</span>
                        {item.metadata?.style && (
                          <span> - {item.metadata.style}</span>
                        )}
                      </p>

                      <div className="flex flex-col text-xs text-gray-400 dark:text-zinc-400 mt-1">
                        <p className="truncate">
                          Ref: {item.ref}
                        </p>
                        <p className="truncate">
                          Categoria: {formatAndCapitalize(item.category)}
                        </p>
                        {item?.price_addon ? (
                          <span className="truncate dark:font-bold dark:text-zinc-200">
                            Preço adicional: {formatCurrency(item?.price_addon)}
                          </span>
                        ) : ' '}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium text-sm ${
                            item.available ? 'text-green-600' : 'text-red-500'
                          }`}
                        >
                          Disponível:
                        </span>

                        <ToggleAvailableSwitch
                          idProduct={item.id}
                          available={item.available}
                          itemType={ItemsCustomizationTypes.customizationItem}
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute bottom-[-7] right-0">
                          <Input
                            id={`item-${item.id}`}
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => handleToggleItem(item.id)}
                            className={`h-4 w-4 cursor-pointer accent-primary dark:accent-details`}
                          />
                        </div>
                      </div>
                    </div>
                  </CardButton>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <CustomModal
        title="Filtros de busca"
        modalOpen={isOpenFilterModal}
        onClose={() => setIsOpenFilterModal(false)}
      >
        <DesktopSidePanel>
          <CustomizationItemsFilters
            searchText={searchText}
            onSearchChange={setSearchText}
            onClearSearch={() => setSearchText('')}
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            styles={styles}
            selectedStyles={selectedStyles}
            onToggleStyle={toggleStyle}
            showAvailableOnly={showAvailableOnly}
            onToggleAvailableOnly={() => setShowAvailableOnly((prev) => !prev)}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </DesktopSidePanel>
      </CustomModal>

      <CustomModal
        title="Copiar Itens"
        modalOpen={isOpenCopyModal}
        onClose={() => {
          setIsOpenCopyModal(false),
          setSelectedCategoryToCopy('');
          setSelectedCategory('');
        }}
      >
        <div className="flex flex-col w-full">
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            Copiar itens de personalização de uma categoria para outra.
          </p>

          <div className="flex flex-col mt-4">
            <Label
              htmlFor="copy-category-id"
              className="block text-xs font-semibold text-gray-500 dark:text-zinc-200"
            >
              Categoria de Origem
            </Label>
            <Select 
              disabled={isLoading}
              value={selectedCategory} 
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger 
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-4 mt-2
                  bg-white text-sm text-secondary dark:text-zinc-200 transition-colors hover:bg-gray-50 
                  focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-primary`}
                >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectGroup className="font-sans">
                  {categories?.map((category, index) => (
                    <SelectItem 
                      key={index}
                      value={category}
                    >
                      {formatAndCapitalize(category)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col mt-4">
            <Label
              htmlFor="copy-category-id"
              className="block text-xs font-semibold text-gray-500 dark:text-zinc-200"
            >
              Categoria de Destino
            </Label>
            <Select 
              disabled={isLoading}
              value={selectedCategoryToCopy} 
              onValueChange={(value) => setSelectedCategoryToCopy(value)}
            >
              <SelectTrigger 
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-4 mt-2
                  bg-white text-sm text-secondary transition-colors hover:bg-gray-50 
                  focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-primary`}
                >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectGroup className="font-sans">
                  {categories?.map((category, index) => (
                    <SelectItem 
                      key={index}
                      value={category}
                    >
                      {formatAndCapitalize(category)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex mt-8">
            <CustomButton
              onClick={handleCopyItems}
              disabled={isLoading}
              className={`flex w-full px-4 py-2 lg:py-5 rounded-lg items-center justify-center font-medium cursor-pointer
                bg-primary text-white hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed
                transition-colors dark:bg-details dark:hover:bg-details/80
              `}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2 animate-pulse">
                  <span>Copiando...</span>
                </div>
              ) : (
                "Copiar Itens"
              )}
            </CustomButton>
          </div>
        </div>
      </CustomModal>

      <CustomModal
        modalOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
      >
        <div className="flex flex-col items-center justify-center p-2">
          <p className="font-bold text-center dark:text-zinc-50">
            Tem certeza que deseja remover {selectedItems.length > 1 ? 'estes' : 'este' } {selectedItems.length > 1 ? 'itens' : 'item'}?
          </p>
          <p className="text-xs font-light text-red-600 dark:text-red-400">
            Essa ação não pode ser desfeita.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            type="button"
            aria-label="Cancelar"
            onClick={() => setIsOpenDeleteModal(false)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-gray-100 text-secondary dark:text-zinc-200 hover:bg-gray-200 transition-colors font-medium
              dark:bg-zinc-800 dark:border-0 dark:hover:bg-zinc-950/15
              disabled:opacity-50
            `}
            disabled={isLoading}
          >
            <span>Cancelar</span>
          </button>

          <button 
            type="button"
            aria-label="Confirmar"
            onClick={() => handleDeleteItems(selectedItems)}
            className={`flex gap-2 items-center justify-center px-4 py-2 rounded-lg cursor-pointer
              bg-primary text-white hover:bg-primary/90 transition-colors font-medium
              dark:bg-red-500 dark:hover:bg-red-600
              disabled:opacity-50
            `}
            disabled={isLoading}
          >
            <span>{isLoading ? 'Deletando...' : 'Sim, deletar'}</span>
          </button>
        </div>
      </CustomModal>

      <div className="shrink-0 md:hidden mt-auto bg-background-alternative dark:bg-input/0 z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-2">
          <div className={`${selectedItems.length === 0 && 'hidden'} transition-all`}>
            <CustomButton
              onClick={() => setIsOpenDeleteModal(true)}
              className={`flex items-center px-4 py-3 rounded-lg font-medium gap-2
                bg-red-400 text-white hover:bg-red-500 transition-all
                dark:bg-red-500 dark:hover:bg-red-600
              `}
            >
              <Trash className="w-4 h-4" />
              <span>{isLoading ? 'Deletando' : 'Deletar'} {selectedItems.length} {selectedItems.length > 1 ? 'itens' : 'item'}</span>
            </CustomButton>
          </div>

          <BackButton backRoute />
        </div>
      </div>
    </div>
  );
};