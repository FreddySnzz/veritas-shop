'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { ListFilter } from "lucide-react";
import ProductModel from "@/data/models/Product.model";
import { DesktopSidePanel } from "./DesktopSidePanel";
import { CustomInput } from "./inputs/CustomInput";
import ProductCard from "./ProductCard";
import CustomModal from "./modals/CustomModal";
import { ProductCategoryModel } from "@/data/models/ProductCategory.model";
import { ProductsPageFilters } from "./ProductsPageFilters";
import { removeAccentsAndSpacesToURL } from "@/data/functions/removeAccentsAndSpaces";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { cn } from '@/lib/utils';

interface ProductsPageProps {
  products: ProductModel[];
  categories: ProductCategoryModel[];
};

type SortField = 'name-az' | 'name-za' | 'newest' | 'oldest' | 'lowest' | 'highest' | 'all';

export default function ProductsPageLayout({ products, categories }: ProductsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchText = searchParams.get('search') || '';
  const categoryParam = searchParams.get('categoria');
  
  const [localSearchText, setLocalSearchText] = useState(searchText);
  const [prevSearchText, setPrevSearchText] = useState(searchText);
  
  const [sortField, setSortField] = useState<SortField>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showCustomizableOnly, setShowCustomizableOnly] = useState(false);
  const [showNotCustomizableOnly, setShowNotCustomizableOnly] = useState(false);
  
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);

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

  const handleSearchChange = (text: string) => {
    setLocalSearchText(text);
  };

  const normalizedProducts = useMemo(() => {
    return products.map((product) => {
      const name = product.name || '';
      const nameFormatted = removeAccentsAndSpacesToURL(name);
      const categoryId = product.category_id?.trim() || 'Sem categoria';
      const categoryName = categories.find((category) => category.id === categoryId)?.name || 'Sem categoria';
      const customizable = product.customizable || false;
      const initialPrice = product.initial_price || 0;

      return {
        original: product,
        normalized: {
          name: name.toLowerCase(),
          nameFormatted: nameFormatted,
          category_id: categoryId,
          category_name: removeAccentsAndSpacesToURL(categoryName),
          initial_price: initialPrice,
          customizable: customizable,
          searchBlob: `${name} ${nameFormatted} ${categoryName} ${categoryId} ${initialPrice}`.toLowerCase(),
        }
      };
    });
  }, [products, categories]);

  const hasActiveFilters = useMemo(() => {
    return (
      searchText.trim().length > 0 ||
      selectedCategories.length > 0 ||
      showCustomizableOnly ||
      showNotCustomizableOnly ||
      priceRange[0] > 0 || 
      priceRange[1] < 200
    );
  }, [
    searchText, 
    selectedCategories, 
    showCustomizableOnly, 
    showNotCustomizableOnly, 
    priceRange
  ]);

  const toggleCategory = (category_name: string) => {
    const appliedCategories = selectedCategories.includes(category_name)
      ? selectedCategories.filter((item) => item !== category_name)
      : [...selectedCategories, category_name];
    
    updateQueryParams('categoria', appliedCategories.length ? appliedCategories.join(',') : null);
  };

  const togglePriceRange = (priceRange: [number, number]) => {
    setPriceRange(priceRange);
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
    setShowCustomizableOnly(false);
    setShowNotCustomizableOnly(false);
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

  const filteredProducts = useMemo(() => {
    const lowerSearch = searchText.toLowerCase().trim();
    
    const filters = normalizedProducts.filter(({ normalized }) => {
      const matchesSearch = !lowerSearch || normalized.searchBlob.includes(lowerSearch);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(normalized.category_name);
      const matchesCustomizableOnly = !showCustomizableOnly || normalized.customizable;
      const matchesNotCustomizableOnly = !showNotCustomizableOnly || !normalized.customizable;
      const matchesPriceRange = normalized.initial_price >= priceRange[0] && normalized.initial_price <= priceRange[1];
  
      return matchesSearch && matchesCategory && matchesCustomizableOnly && matchesNotCustomizableOnly && matchesPriceRange;
    }).map(({ original }) => original);

    switch (sortField) {
      case 'name-az':
        return filters.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return filters.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return filters.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      case 'oldest':
        return filters.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
      case 'lowest':
        return filters.sort((a, b) => a.initial_price - b.initial_price);
      case 'highest':
        return filters.sort((a, b) => b.initial_price - a.initial_price);
      default:
        return filters;
    }
  }, [
    normalizedProducts, 
    searchText, 
    selectedCategories, 
    showCustomizableOnly, 
    showNotCustomizableOnly, 
    priceRange,
    sortField
  ]);

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex flex-1 w-full overflow-y-auto scrollbar-hide content-start lg:gap-6">
        <div className="flex flex-col gap-3">
          <div className="hidden lg:flex w-full">
            <Select 
              value={sortField as SortField}
              onValueChange={(value) => setSortField(value as SortField)}
            >
              <SelectTrigger 
                title="Ordenar por"
                aria-label="Ordenar por"
                className={cn("border-none hover:border-none w-full cursor-pointer",
                  "focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all",
                  "bg-white dark:bg-input/0 hover:bg-zinc-50 dark:hover:bg-input/50 text-secondary",
                  "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700",
                )}
              >
                <SelectValue placeholder={"Ordernar por"} />
              </SelectTrigger>
              <SelectContent className="transition-all font-sans">
                <SelectGroup>
                  <SelectItem value={"all"} className="cursor-pointer">
                    Todos
                  </SelectItem>
                  <SelectItem value={"name-az"} className="cursor-pointer">
                    Nome (A-Z)
                  </SelectItem>
                  <SelectItem value={"name-za"} className="cursor-pointer">
                    Nome (Z-A)
                  </SelectItem>
                  <SelectItem value={"newest"} className="cursor-pointer">
                    Novidades
                  </SelectItem>
                  <SelectItem value={"oldest"} className="cursor-pointer">
                    Mais antigos
                  </SelectItem>
                  <SelectItem value={"lowest"} className="cursor-pointer">
                    Menor preço
                  </SelectItem>
                  <SelectItem value={"highest"} className="cursor-pointer">
                    Maior preço
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DesktopSidePanel 
            className="hidden lg:flex lg:max-w-70 xl:max-w-80"
            contentClassName="p-4"
          >
            <ProductsPageFilters
              searchText={localSearchText}
              onSearchChange={handleSearchChange}
              onClearSearch={() => handleSearchChange('')}
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              onTogglePriceRange={togglePriceRange}
              showCustomizableOnly={showCustomizableOnly}
              onToggleCustomizableOnly={() => setShowCustomizableOnly((prev) => !prev)}
              showNotCustomizableOnly={showNotCustomizableOnly}
              onToggleNotCustomizableOnly={() => setShowNotCustomizableOnly((prev) => !prev)}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </DesktopSidePanel>
        </div>

        {/* Tela mobile */}
        <div className={`flex flex-col flex-1 min-h-0 
          gap-4 overflow-y-auto scrollbar-hide md:scrollbar-thin md:pr-2 content-start pb-4`}
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

          {hasActiveFilters && filteredProducts.length === 0 ? (
            <div className={`flex flex-col w-full h-[55vh] gap-4 items-center justify-center
              text-gray-400 dark:text-zinc-500`}
            >
              <div className="flex flex-col text-center items-center justify-center">
                {hasActiveFilters && (
                  <>
                    <p className="text-sm font-bold">
                      Nenhum produto encontrado com os filtros atuais.
                    </p>
                    <p className="text-sm">
                      Limpe os filtros para ver os produtos disponíveis.
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    mode="product-page"
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
        className="gap-4"
      >
        <div className="flex flex-col gap-2 mb-2">
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-200">
            Ordenar por:
          </label>
          <Select 
            value={sortField as SortField}
            onValueChange={(value) => setSortField(value as SortField)}
          >
            <SelectTrigger 
              title="Ordenar por"
              aria-label="Ordenar por"
              className={cn("border-none hover:border-none w-full cursor-pointer",
                "focus:outline-none focus:ring-0 focus:ring-offset-0 transition-all",
                "bg-white dark:bg-input/0 hover:bg-zinc-50 dark:hover:bg-input/50 text-secondary",
                "dark:bg-input/30 dark:hover:bg-input/50 dark:border-zinc-700",
              )}
            >
              <SelectValue placeholder={"Ordernar por"} />
            </SelectTrigger>
            <SelectContent className="transition-all font-sans">
              <SelectGroup>
                <SelectItem value={"all"} className="cursor-pointer">
                  Todos
                </SelectItem>
                <SelectItem value={"name-az"} className="cursor-pointer">
                  Nome (A-Z)
                </SelectItem>
                <SelectItem value={"name-za"} className="cursor-pointer">
                  Nome (Z-A)
                </SelectItem>
                <SelectItem value={"newest"} className="cursor-pointer">
                  Novidades
                </SelectItem>
                <SelectItem value={"oldest"} className="cursor-pointer">
                  Mais antigos
                </SelectItem>
                <SelectItem value={"lowest"} className="cursor-pointer">
                  Menor preço
                </SelectItem>
                <SelectItem value={"highest"} className="cursor-pointer">
                  Maior preço
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DesktopSidePanel>
          <ProductsPageFilters
            searchText={localSearchText} 
            onSearchChange={handleSearchChange}
            onClearSearch={() => handleSearchChange('')}
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onTogglePriceRange={togglePriceRange}
            showCustomizableOnly={showCustomizableOnly}
            onToggleCustomizableOnly={() => setShowCustomizableOnly((prev) => !prev)}
            showNotCustomizableOnly={showNotCustomizableOnly}
            onToggleNotCustomizableOnly={() => setShowNotCustomizableOnly((prev) => !prev)}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </DesktopSidePanel>
      </CustomModal>
    </div>
  );
};