'use client';

import { useMemo, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search, X, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { useMediaQuery } from "@/data/hook/useMediaQuery";
import { SearchbarInput } from "./inputs/SearchbarInput";

interface SearchbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  searchbarPlaceholder?: string;
};

export default function Searchbar({ 
  searchbarPlaceholder,
  data 
}: SearchbarProps) {
  const [searchText, setSearchText] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isSearching = searchText !== debouncedValue;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSmUp = useMediaQuery("(min-width: 640px)");
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isXsDown = useMediaQuery("(max-width: 450px)");
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchText);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchText]);

  const filteredData = useMemo(() => {
    if (!debouncedValue) return [];
    
    const lowerSearch = debouncedValue.toLowerCase();
    return data.filter((item) => 
      item.name.toLowerCase().includes(lowerSearch)
    );
  }, [debouncedValue, data]);

  const handleClear = () => {
    setSearchText('');
    setDebouncedValue('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (searchText.length > 0) setIsOpen(true);
  };

  const toggleOpenSearchbar = () => {
    setIsOpen(!isOpen);
  };

  const showResults = isOpen && searchText.length > 0;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full md:w-5/6 lg:w-2/3 z-40 font-sans"
    >
      <div className="relative w-full flex items-center">
        {isMdUp && (
          <SearchbarInput
            inputRef={inputRef as React.RefObject<HTMLInputElement>}
            value={searchText}
            searchbarPlaceholder={searchbarPlaceholder}
            onFocus={handleInputFocus}
            onChange={(e) => {
              setSearchText(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
          />
        )}

        <div className="absolute right-2 flex items-center justify-center">
          {isSearching ? (
            <Loader2 className="w-5 h-5 text-primary dark:text-zinc-400 animate-spin" />
          ) : searchText.length > 0 || isOpen ? (
            <button
              onClick={handleClear}
              aria-label="Limpar pesquisa"
              title={!isMdUp ? "Limpar pesquisa" : ""}
              className="cursor-pointer"
            >
              <X className={`w-6 h-6 cursor-pointer 
                text-secondary dark:text-background-alternative-v2`} 
              />
            </button>
        ) : (
          <button
            aria-label="Abrir pesquisa"
            title={!isMdUp ? "Abrir pesquisa" : ""}
            className="cursor-pointer transition-colors"
            onClick={toggleOpenSearchbar}
          >
            <Search className={`w-6 h-6 cursor-pointer transition-colors
              text-secondary dark:text-background-alternative-v2 dark:hover:text-zinc-400`}
            />
          </button>
        )}
        </div>
      </div>

      {showResults && (
        <div className={cn(`absolute top-10 left-0 w-full overflow-hidden z-50
          bg-white dark:bg-zinc-900 shadow-[0_60px_50px_15px_rgba(0,0,0,0.3)] rounded-b-xl
          animate-in fade-in slide-in-from-top-2 duration-200`, 
          !isMdUp && isOpen && "fixed top-14 left-0"
        )}>
          <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredData.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard 
                      product={product} 
                      mode="header"
                    />
                  </div>
                ))}
              </div>
            ) : (!isSearching && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <span>Nenhum produto encontrado para</span>
                  <span className="font-bold ml-1">&quot;{searchText}&quot;.</span>
                </div>
              )
            )}
          </div>
          {filteredData.length > 0 && (
            <div className="bg-gray-50 dark:bg-zinc-900 p-2 text-center text-xs text-gray-400 border-t rounded-b-xl">
              <span>Mostrando {filteredData.length} resultados para</span>
              <span className="font-bold ml-1">&quot;{searchText}&quot;.</span>
            </div>
          )}
        </div>
      )}

      {!isMdUp && isOpen && (
        <div className={cn(`fixed flex items-center justify-center top-0 right-22 h-14
          bg-transparent animate-in fade-in slide-in-from-right-2 duration-300`, 
          'w-[73%]',
          isXsDown && "w-[69%] right-21",
          !isSmUp && !isXsDown && "w-[45%]",
          isSmUp && "w-[50%]"
        )}>
          <div className="flex items-center justify-center w-full px-4">
            <SearchbarInput
              inputRef={inputRef as React.RefObject<HTMLInputElement>}
              value={searchText}
              searchbarPlaceholder={searchbarPlaceholder}
              onFocus={handleInputFocus}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};