'use client';

import { X } from 'lucide-react';
import { formatAndCapitalize } from '@/data/functions/formatAndCapitalize';
import { SearchbarInput } from './inputs/SearchbarInput';

interface CustomizationItemsFiltersProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  styles: string[];
  selectedStyles: string[];
  onToggleStyle: (style: string) => void;
  showAvailableOnly: boolean;
  onToggleAvailableOnly: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

export function CustomizationItemsFilters({
  searchText,
  onSearchChange,
  onClearSearch,
  categories,
  selectedCategories,
  onToggleCategory,
  styles,
  selectedStyles,
  onToggleStyle,
  showAvailableOnly,
  onToggleAvailableOnly,
  onClearFilters,
  hasActiveFilters,
}: CustomizationItemsFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline gap-2">
          <label
            htmlFor="desktop-search-items"
            className="block text-xs font-semibold text-gray-500 dark:text-zinc-200"
          >
            Buscar item
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
          <SearchbarInput
            id="desktop-search-items"
            searchbarPlaceholder="Nome, estilo, categoria ou referência"
            value={searchText}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)
            }
            className="bg-gray-50 shadow-xs truncate"
          />

          {searchText.length > 0 && (
            <button
              type="button"
              aria-label="Limpar pesquisa"
              title="Limpar pesquisa"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={onClearSearch}
            >
              <X className="w-5 h-5 text-secondary dark:text-zinc-200 dark:hover:text-red-400 cursor-pointer transition-colors" />
            </button>
          )}
        </div>
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
              const isSelected = selectedCategories.includes(category);
              
              return (
                <label
                  key={category}
                  className={`flex items-center rounded-lg transition-colors
                    border border-gray-200 dark:border-zinc-600 px-3 py-2 cursor-pointer
                    hover:bg-background-alternative dark:hover:bg-zinc-900/50`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleCategory(category)}
                      aria-label={`Filtrar pela categoria ${category}`}
                      className="focus:ring-primary cursor-pointer accent-primary dark:accent-details"
                    />
                    <span className="text-sm text-secondary dark:text-zinc-200">
                      {formatAndCapitalize(category)}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div id='stylesCheckbox' className="lg:border-none lg:p-0 dark:border dark:rounded-lg dark:p-2">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-semibold text-gray-500 dark:text-zinc-200 mb-1">
            Estilos
          </legend>

          <div
            role="group"
            aria-label="Selecionar estilos"
            className="flex flex-col gap-2 max-h-[25vh] overflow-y-auto pr-1"
          >
            {styles.map((style) => {
              const isSelected = selectedStyles.includes(style);
              
              return (
                <label
                  key={style}
                  className={`flex items-center rounded-lg transition-colors
                    border border-gray-200 dark:border-zinc-600 px-3 py-2 cursor-pointer
                    hover:bg-background-alternative dark:hover:bg-zinc-900/50`}
                >
                  <div className={`flex items-center gap-3 min-w-0`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleStyle(style)}
                      aria-label={`Filtrar pelo estilo ${style}`}
                      className="focus:ring-primary cursor-pointer accent-primary dark:accent-details"
                    />
                    <span className="text-sm text-secondary">
                      {formatAndCapitalize(style)}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div id='availableCheckbox' className="lg:border-none lg:p-0 dark:border dark:rounded-lg dark:p-2">
        <fieldset>
          <legend className="text-xs font-semibold text-gray-500 dark:text-zinc-200 mb-2">
            Disponibilidade
          </legend>

          <label 
            className={`flex items-center gap-3 rounded-lg transition-colors
              border border-gray-200 dark:border-zinc-600 px-3 py-2 cursor-pointer
              hover:bg-background-alternative dark:hover:bg-zinc-900/50
            `}
          >
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={onToggleAvailableOnly}
              className="focus:ring-primary cursor-pointer accent-primary dark:accent-details"
              aria-label="Mostrar apenas itens disponíveis"
            />
            <span className="text-sm text-secondary">
              Mostrar apenas disponíveis
            </span>
          </label>
        </fieldset>
      </div>
    </div>
  );
}