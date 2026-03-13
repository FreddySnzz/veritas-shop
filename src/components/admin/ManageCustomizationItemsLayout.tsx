'use client';

import Image from "next/image";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { ToggleCustomizationItemAvailableSwitch } from "../buttons/ToggleCustomizationItemAvailableSwitch";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { BackButton } from "../buttons/BackButton";
import CardButton from "../buttons/CardButton";
import { formatAndCapitalize, formatCurrency } from "@/data/functions/formatAndCapitalize";
import { FloatAddButton } from "../buttons/AddButton";
import { SearchbarInput } from "../inputs/SearchbarInput";
import { useMemo, useState } from "react";
import { ListFilter, Plus, X } from "lucide-react";
import { CustomButton } from "../buttons/CustomButton";
import { useRouter } from "next/navigation";
import { DesktopSidePanel } from "../DesktopSidePanel";
import { CustomizationItemsFilters } from "../CustomizationItemsFilters";
import CustomModal from "../modals/CustomModal";

interface ManageCustomizationItemsLayoutProps {
  customizationItems: CustomizationItemsModel[];
};

export default function ManageCustomizationItemsLayout({ 
  customizationItems 
}: ManageCustomizationItemsLayoutProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const router = useRouter();

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
  }, [searchText, selectedCategories, selectedStyles, showAvailableOnly]);

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
              bg-primary text-white hover:bg-primary/90 font-bold text-md
            `}
          >
            <Plus className="w-6 h-6" />
            <span>Adicionar item</span>
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

        <div className={`flex flex-col flex-1 min-h-0 
          gap-4 overflow-y-auto scrollbar-hide content-start pb-4`}
        >
          <div className="fixed md:hidden bottom-22 right-5 z-15">
            <FloatAddButton
              pushRoute={'/admin/estoques/itens-personalizacao/adicionar'}
              className="p-3"
            />
          </div>

          <div className="flex lg:hidden w-full items-center justify-end gap-1 md:gap-3 mt-2">
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
              className="bg-white rounded-lg shadow-xs cursor-pointer h-9 w-12 flex items-center justify-center"
            >
              <ListFilter className="w-6 h-6 text-secondary" />
            </button>

            <div className="hidden md:flex">
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {filteredItems.map((item) => (
                  <CardButton
                    key={item.id}
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
                        className="shrink-0 flex items-center justify-center w-25 h-25 rounded-2xl bg-gray-200"
                        style={{ backgroundColor: item.metadata?.color }}
                      >
                        <span className="text-sm text-secondary px-2 text-center font-medium">
                          Sem Imagem
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                      <p className="text-sm font-bold truncate text-secondary">
                        <span>{item.name}</span>
                        {item.metadata?.style && (
                          <span> - {item.metadata.style}</span>
                        )}
                      </p>

                      <div className="flex flex-col text-xs text-gray-400 mt-1">
                        <span className="truncate">Ref: {item.ref}</span>
                        <span className="truncate">Categoria: {formatAndCapitalize(item.category)}</span>
                        {item?.price_addon ? (
                          <span className="truncate">
                            Preço adicional: {formatCurrency(item?.price_addon)}
                          </span>
                        ) : ' '}
                      </div>

                      <div className="flex items-center mt-2 gap-2">
                        <span
                          className={`font-medium xl:text-xs ${
                            item.available ? 'text-green-600' : 'text-red-500'
                          }`}
                        >
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

      <div className="shrink-0 md:hidden mt-auto bg-background-alternative z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton backRoute />
        </div>
      </div>
    </div>
  );
};