'use client';

import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useMemo, startTransition, useEffect } from 'react';
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { formatAndCapitalize, formatCurrency } from "@/data/functions/formatAndCapitalize";
import { BookCopy, ListFilter, Plus, Trash } from "lucide-react";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ProductModel from "@/data/models/Product.model";
import { CustomLink } from "./buttons/CustomLink";
import { DesktopSidePanel } from "./DesktopSidePanel";
import { CustomInput } from "./inputs/CustomInput";
import ProductCard from "./ProductCard";
import CustomModal from "./modals/CustomModal";

interface ProductsPageProps {
  products: ProductModel[];
};

// filtros: nome, categoria, preco, novidades (mais recentes), personalizaveis, A-Z, 

export default function ProductsPageLayout({ products }: ProductsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchText = searchParams.get('search') || '';
  const categoryParam = searchParams.get('categoria');
  // const styleParam = searchParams.get('estilo');

  const [localSearchText, setLocalSearchText] = useState(searchText);
  const [prevSearchText, setPrevSearchText] = useState(searchText);
  
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (searchText !== prevSearchText) {
    setPrevSearchText(searchText);
    setLocalSearchText(searchText);
  };

  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    };

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const selectedCategories = useMemo(() => {
    return categoryParam?.split(',').filter(Boolean) || [];
  }, [categoryParam]);

  // const selectedStyles = useMemo(() => {
  //   return styleParam?.split(',').filter(Boolean) || [];
  // }, [styleParam]);

  const handleSearchChange = (text: string) => {
    setLocalSearchText(text);
  };

  const normalizedItems = useMemo(() => {
    return products.map((product) => {
      const category = product.category_id || 'Sem categoria';
      // const style = product.metadata?.style?.trim() || 'Sem estilo';
      const name = product.name || '';
      // const ref = product.ref || '';

      return {
        original: product,
        normalized: {
          name: name.toLowerCase(),
          // ref: ref.toLowerCase(),
          category,
          categoryLower: category.toLowerCase(),
          // style,
          // styleLower: style.toLowerCase(),
          searchBlob: `${name} ${category}`.toLowerCase(),
          // searchBlob: `${name} ${ref} ${category} ${style}`.toLowerCase(),
        }
      };
    });
  }, [products]);

  const hasActiveFilters = useMemo(() => {
    return (
      searchText.trim().length > 0 ||
      selectedCategories.length > 0
      // selectedStyles.length > 0 ||
      // showAvailableOnly
    );
  }, [searchText, selectedCategories]);
  // }, [searchText, selectedCategories, selectedStyles, showAvailableOnly]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products
        .map((product) => product.category_id || 'Sem categoria')
        .filter(Boolean))
    );  

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [products]);

  // const styles = useMemo(() => {
  //   const uniqueStyles = Array.from(
  //     new Set(customizationItems
  //       .map((item) => item?.metadata?.style?.trim() || 'Sem estilo')
  //       .filter(Boolean))
  //   );  

  //   return uniqueStyles.sort((a, b) => a.localeCompare(b));
  // }, [customizationItems]);

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    
    updateQueryParams('categoria', newCategories.length ? newCategories.join(',') : null);
  };

  // const toggleStyle = (style: string) => {
  //   const newStyles = selectedStyles.includes(style)
  //     ? selectedStyles.filter((item) => item !== style)
  //     : [...selectedStyles, style];
      
  //   updateQueryParams('estilo', newStyles.length ? newStyles.join(',') : null);
  // };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentSearch = searchParams.get('search') || '';
      if (localSearchText !== currentSearch) {
        updateQueryParams('search', localSearchText || null);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearchText, searchParams]);

  const lowerSearch = searchText.toLowerCase().trim();
  const filteredItems = normalizedItems.filter(({ normalized }) => {
    const matchesSearch = !lowerSearch || normalized.searchBlob.includes(lowerSearch);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(normalized.category);
    // const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(normalized.style);
    // const matchesAvailability = !showAvailableOnly || original.available;

    return matchesSearch && matchesCategory;
    // return matchesSearch && matchesCategory && matchesStyle && matchesAvailability;
  }).map(({ original }) => original);

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex flex-1 w-full overflow-y-auto scrollbar-hide content-start lg:gap-6">
        <div className="flex flex-col gap-3">
          <DesktopSidePanel 
            className="hidden lg:flex"
            contentClassName="p-4"
          >
            abcd
            {/* <CustomizationItemsFilters
              searchText={localSearchText}
              onSearchChange={handleSearchChange}
              onClearSearch={() => handleSearchChange('')}
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
            /> */}
          </DesktopSidePanel>
        </div>

        {/* Tela mobile */}
        <div className={`flex flex-col flex-1 min-h-0 
          gap-4 overflow-y-auto scrollbar-hide content-start pb-4`}
        >
          <div className="flex lg:hidden w-full items-center justify-end gap-1 md:gap-2 mt-2">
            <div className="relative flex items-center grow gap-2">
              <CustomInput
                searchbarPlaceholder="Pesquise por nome ou categoria"
                value={localSearchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-white shadow-xs truncate"
                clearButtonAction={() => handleSearchChange('')}
                withClearButton
              />
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
          </div>

          {hasActiveFilters && filteredItems.length === 0 ? (
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
                    Adicione um novo item no botão &quot;Adicionar&quot;.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {filteredItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    mode="catalog"
                  />
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
          efgh
          {/* <CustomizationItemsFilters
            searchText={localSearchText} 
            onSearchChange={handleSearchChange}
            onClearSearch={() => handleSearchChange('')}
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
          /> */}
        </DesktopSidePanel>
      </CustomModal>

      {/* <div className="shrink-0 md:hidden mt-auto bg-background-alternative dark:bg-input/0 z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-2">
          <BackButton backRoute />
        </div>
      </div> */}
    </div>
  );
};