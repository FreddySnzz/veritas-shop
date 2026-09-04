'use client';

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { CustomInput } from "./inputs/CustomInput";
import { getBibleChapterData, getBibleSearchData } from "@/app/actions/bible.actions";
import { Delete, Search } from "lucide-react";
import { 
  BibleChapterSearchResponse,
  BibleSearchResponse, 
  SupportedLanguage 
} from "@/data/types/bible.type";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CustomModal from "./modals/CustomModal";
import { bibleBooksList } from "@/data/constants/bible-books";

const supportedLanguages = [
  { value: 'pt', label: 'Português' },
  { value: 'la', label: 'Latim' },
  { value: 'el', label: 'Grego' },
]

export default function BibleLayout() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [searchText, setSearchText] = useState(search || '');
  const [searchResult, setSearchResult] = useState<BibleSearchResponse>();
  const [searchChapter, setSearchChapter] = useState<BibleChapterSearchResponse[]>();
  const [language, setLanguage] = useState<SupportedLanguage>('pt' as SupportedLanguage);
  const [isLoading, setIsLoading] = useState(!!search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChooseBookAndChapterModalOpen, setIsChooseBookAndChapterModalOpen] = useState(false);

  const fetchSearchData = useCallback(async (query: string) => {
    try {
      return await getBibleSearchData(query);
    } catch (error) {
      console.error("Erro ao buscar texto:", error);
      toast.error("Erro ao buscar");
      return null;
    }
  }, []);

  const handleSearch = async (overrideText?: string) => {
    const query = overrideText ?? searchText; 
    if (query === "") return;
    
    setIsLoading(true);
    const result = await fetchSearchData(query);
    
    if (result) {
      setSearchResult(result);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    let isSubscribed = true; 

    const loadInitialSearch = async () => {
      if (!search) return;
      const result = await fetchSearchData(search);
      
      if (isSubscribed) {
        if (result) {
          setSearchResult(result);
        }
        setIsLoading(false);
      }
    }

    loadInitialSearch();
    return () => {
      isSubscribed = false; 
    };
  }, [search, fetchSearchData]);

  const handleOpenChapter = async () => {
    setIsLoading(true);

    try {
      const result = await getBibleChapterData(
        searchResult?.results[0]?.abbrev as string, 
        searchResult?.results[0]?.chapter.toString() as string
      );
      setSearchChapter(result.verses);
    } catch (error) {
      console.error("Erro ao buscar capítulo:", error);
      toast.error("Erro ao buscar");
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  }

  const handleChooseBookAndChapterModalOpen = (bookName: string) => {
    setSearchText(bookName);
    setIsChooseBookAndChapterModalOpen(true);
  }

  const handleChooseChapter = (chapter: number) => {
    const newSearchText = `${searchText} ${chapter}`;
    setSearchText(newSearchText);
    setIsChooseBookAndChapterModalOpen(false);
    handleSearch(newSearchText);
  }

  return (
    <section id={'bible-layout'} className="font-sans">
      <div className="flex flex-col items-center justify-center w-full mb-4">
        <h1 className="text-secondary dark:text-white font-bold text-2xl md:text-3xl font-libertinus-math">
          Sagradas Escrituras
        </h1>
      </div>
      
      <div className="flex flex-col overflow-y-auto font-sans scrollbar-hide justify-center items-center my-4 transition-all">
        <div className="relative flex w-full items-center justify-center md:gap-3">
          <CustomInput
            searchbarPlaceholder="Busque por capítulo ou versículo. Ex: Mt 28, 1-7"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            className="bg-white dark:bg-input/30 shadow-xs pr-9"
          />
          
          <button
            aria-label="Buscar"
            title="Buscar"
            className={`absolute right-2 cursor-pointer transition-all
              hover:bg-zinc-50 dark:hover:bg-input/50 rounded-lg p-1
            `}
            onClick={() => handleSearch()}
          >
            <Search className="w-5 h-5 text-secondary cursor-pointer" />
          </button>
        </div>

        {searchText.length > 0 && (
          <button
            aria-label="Limpar busca"
            title="Limpar busca"
            type="button"
            className="flex gap-2 text-sm cursor-pointer px-3 py-1 border rounded-lg text-muted-foreground w-fit mt-4 transition-all"
            onClick={() => setSearchText('')}
          >
            <Delete className="w-5 h-5" />
            Limpar busca
          </button>
        )}
      </div>

      {isLoading && (
        <div className="flex px-5 py-3 items-center justify-center gap-2">
          <div className="size-8 animate-spin rounded-full border-2 border-primary dark:border-zinc-600 border-t-transparent" aria-hidden />
          <p className="text-sm text-muted-foreground dark:text-zinc-200">
            Buscando…
          </p>
        </div>
      )}

      {searchResult?.results.length === 0 && (
        <div className="flex flex-col px-5 py-3 items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground dark:text-zinc-200">
            Nenhum resultado encontrado.
          </p>
        </div>
      )}

      {searchResult && searchResult?.results.length > 0 && searchResult.results.map((result, index) => {
        return (
          <div 
            key={index}
            className={cn("flex px-5 py-3 rounded-lg bg-zinc-50 dark:bg-input/20 shadow-sm mb-2", 
              searchResult?.results.length === 0 && "hidden"
            )}
          >
            <div className="flex flex-col justify-center gap-4">
              <div className="flex justify-center items-center">
                <div className="w-full">
                  <p className="text-lg font-bold font-libertinus-math dark:text-zinc-50">
                    {result?.verses ? result?.verses[language].reference : result?.reference}
                  </p>
                </div>
                <div className={cn("flex w-full justify-end gap-1", 
                  result.type === "invalid" || result.type === "chapter" && "hidden"
                )}>
                  {supportedLanguages.map((languageCallback, index) => {
                    return (
                      <button
                        key={index}
                        aria-label={`Mudar idioma para ${languageCallback.label}`}
                        title={`Mudar idioma para ${languageCallback.label}`}
                        onClick={() => setLanguage(languageCallback.value as SupportedLanguage)}
                        className={cn(`border rounded-lg p-1 text-[0.675rem] cursor-pointer`, 
                          language === languageCallback.value && "bg-primary dark:bg-details text-white font-bold",
                          "transition-all hover:bg-zinc-200 dark:hover:bg-details/15 dark:hover:text-white",
                          result?.type === "book" && "hidden"
                        )}
                      >
                        {languageCallback.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {result?.type === "verse" && result.verses && result.verses[language].parts.map((part, index) => {
                return (
                  <div 
                    key={index}
                    className="flex gap-1 font-libertinus-math"
                  >
                    <p className="text-[0.65rem] text-secondary dark:text-zinc-100">
                      {part.n}
                    </p>
                    <p className="text-secondary">
                      {part.t}
                    </p>
                  </div>
                )
              })}

              {result?.type === "book" && (
                <>
                  <p className="text-sm text-secondary">
                    {result?.text}.
                  </p>
                </>
              )}

              {result?.type === "chapter" && (
                <>
                  <p className="text-sm text-secondary">
                    {result?.text}
                  </p>

                  <button
                    aria-label="Ver capítulo"
                    title="Ver capítulo"
                    type="button"
                    className={cn("text-sm cursor-pointer text-secondary/40 hover:text-secondary text-start transition-colors w-fit")}
                    onClick={handleOpenChapter}
                  >
                    Ver capítulo completo →
                  </button>
                </>
              )}

              {result?.type === "invalid" && (
                <p className="text-sm text-secondary">
                  {result?.text}.
                </p>
              )}
            </div>
          </div>
        )
      })}

      <div className={cn("flex flex-col gap-8 mt-4")}>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">Antigo Testamento</p>
          <div className={cn("grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2")}>
            {bibleBooksList.length && bibleBooksList.map((book, index) => book.testament === "old" && (
              <button
                key={index} 
                aria-label={`Buscar em ${book.book_name}`}
                title={`Buscar em ${book.book_name}`}
                type="button"
                className={cn("flex text-[0.65rem] font-medium cursor-pointer px-3 py-1 justify-center items-center hover:bg-zinc-200 dark:hover:bg-input/30",
                  "border border-zinc-300 dark:border-muted-foreground/50 rounded-lg transition-all text-secondary dark:text-zinc-300"
                )}
                onClick={() => handleChooseBookAndChapterModalOpen(book.book_name)}
              >
                {book.book_name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">Novo Testamento</p>
          <div className={cn("grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2")}>
            {bibleBooksList.length && bibleBooksList.map((book, index) => book.testament === "new" && (
              <button
                key={index} 
                aria-label={`Buscar em ${book.book_name}`}
                title={`Buscar em ${book.book_name}`}
                type="button"
                className={cn("flex text-[0.65rem] font-medium cursor-pointer px-3 py-1 justify-center items-center hover:bg-zinc-200 dark:hover:bg-input/30",
                  "border border-zinc-300 dark:border-muted-foreground/50 rounded-lg transition-all text-secondary dark:text-zinc-300"
                )}
                onClick={() => handleChooseBookAndChapterModalOpen(book.book_name)}
              >
                {book.book_name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CustomModal
        modalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-h-[80vh] font-libertinus-math"
        title={searchResult?.results[0]?.reference}
      >
        <div className="overflow-y-scroll">
          {searchChapter?.map((result, index) => {
            return (
              <div key={index} className="flex gap-1">
                <p className={"text-[0.65rem] font-medium"}> 
                  {result.number}
                </p>
                <p>
                  {result.text}
                </p>
              </div>
            )
          })}
        </div>
      </CustomModal>

      <CustomModal
        modalOpen={isChooseBookAndChapterModalOpen}
        onClose={() => setIsChooseBookAndChapterModalOpen(false)}
        title={`Capítulos do Livro de ${searchText}`}
        className="max-h-[80vh]"
      >
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 overflow-y-auto md:scrollbar-thin md:pr-2">
          {bibleBooksList.length && bibleBooksList.filter((book) => book.book_name === searchText).map((book) => {
            const chapterList = [];

            for (let i = 0; i < book.chapters; i++) {
              chapterList.push(i + 1)
            }

            return chapterList.map((chapter, index) => (
              <button
                key={index}
                type="button"
                className={cn("flex text-[0.65rem] font-medium cursor-pointer px-3 py-1 justify-center items-center hover:bg-zinc-200 dark:hover:bg-input/30",
                  "border border-zinc-300 dark:border-muted-foreground/50 rounded-lg transition-all text-secondary dark:text-zinc-300"
                )}
                onClick={() => handleChooseChapter(chapter)}
              >
                {chapter}
              </button>
            ))
          })}
        </div>
      </CustomModal>
    </section>
  )
}