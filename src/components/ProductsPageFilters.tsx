'use client';

import { ProductCategoryModel } from '@/data/models/ProductCategory.model';
import { formatAndCapitalize } from '@/data/functions/formatAndCapitalize';
import { CustomInput } from './inputs/CustomInput';
import { PriceRangeInput } from './inputs/PriceRangeInput';
import { removeAccentsAndSpacesToURL } from '@/data/functions/removeAccentsAndSpaces';

interface ProductsPageFiltersProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  categories: ProductCategoryModel[];
  selectedCategories: string[];
  onToggleCategory: (category_name: string) => void;
  onTogglePriceRange: (priceRange: [number, number]) => void;
  showCustomizableOnly: boolean;
  onToggleCustomizableOnly: () => void;
  showNotCustomizableOnly: boolean;
  onToggleNotCustomizableOnly: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

export function ProductsPageFilters({
  searchText,
  onSearchChange,
  onClearSearch,
  categories,
  selectedCategories,
  onToggleCategory,
  onTogglePriceRange,
  showCustomizableOnly,
  onToggleCustomizableOnly,
  showNotCustomizableOnly,
  onToggleNotCustomizableOnly,
  onClearFilters,
  hasActiveFilters,
}: ProductsPageFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline gap-2">
          <label
            htmlFor="desktop-search-products"
            className="block text-xs font-semibold text-gray-500 dark:text-zinc-200"
          >
            Buscar Produto
          </label>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-gray-400 dark:text-zinc-200 hover:text-secondary dark:hover:text-red-400 cursor-pointer transition-colors"
              aria-label="Limpar todos os filtros"
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="relative">
          <CustomInput
            id="desktop-search-products"
            searchbarPlaceholder="Nome ou categoria"
            value={searchText}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)
            }
            className="bg-gray-50 shadow-xs truncate"
            clearButtonAction={onClearSearch}
            withClearButton
          />
        </div>
      </div>

      <div id='priceRange' className="border-none lg:p-0 dark:p-2">
        <fieldset className="flex flex-col gap-2">
          <PriceRangeInput
            min={0}
            max={200}
            step={5}
            onValueChange={(values) => onTogglePriceRange(values)}
          />
        </fieldset>
      </div>

      <div id='categoriesCheckbox' className="lg:border-none lg:p-0 dark:border dark:rounded-lg dark:p-2">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-semibold text-gray-500 dark:text-zinc-200 mb-1">
            Categorias
          </legend>

          <div
            role="group"
            aria-label="Selecionar categorias"
            className="flex flex-col gap-2 max-h-[25vh] overflow-y-auto pr-1"
          >
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(removeAccentsAndSpacesToURL(category.name));
              
              return (
                <label
                  key={category.id}
                  className={`flex items-center rounded-lg transition-colors
                    border border-gray-200 dark:border-zinc-600 px-3 py-2 cursor-pointer
                    hover:bg-background-alternative dark:hover:bg-zinc-900/50`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleCategory(removeAccentsAndSpacesToURL(category.name))}
                      aria-label={`Filtrar pela categoria ${category}`}
                      className="focus:ring-primary cursor-pointer accent-primary dark:accent-details"
                    />
                    <p className="text-sm text-secondary dark:text-zinc-200">
                      {formatAndCapitalize(category.name)}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div id='customizableCheckbox' className="lg:border-none lg:p-0 dark:border dark:rounded-lg dark:p-2">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-semibold text-gray-500 dark:text-zinc-200 mb-2">
            Personalização
          </legend>

          <label 
            className={`flex items-center gap-3 rounded-lg transition-colors
              border border-gray-200 dark:border-zinc-600 px-3 py-2 cursor-pointer
              hover:bg-background-alternative dark:hover:bg-zinc-900/50
            `}
          >
            <input
              type="checkbox"
              checked={showNotCustomizableOnly}
              onChange={onToggleNotCustomizableOnly}
              className="focus:ring-primary cursor-pointer accent-primary dark:accent-details"
              aria-label="Mostrar apenas produtos personalizáveis"
            />
            <span className="text-xs text-secondary">
              Mostrar não personalizáveis
            </span>
          </label>

          <label 
            className={`flex items-center gap-3 rounded-lg transition-colors
              border border-gray-200 dark:border-zinc-600 px-3 py-2 cursor-pointer
              hover:bg-background-alternative dark:hover:bg-zinc-900/50
            `}
          >
            <input
              type="checkbox"
              checked={showCustomizableOnly}
              onChange={onToggleCustomizableOnly}
              className="focus:ring-primary cursor-pointer accent-primary dark:accent-details"
              aria-label="Mostrar apenas produtos personalizáveis"
            />
            <span className="text-xs text-secondary">
              Mostrar apenas personalizáveis
            </span>
          </label>
        </fieldset>
      </div>
    </div>
  );
}