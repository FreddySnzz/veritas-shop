'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductModel from "@/data/models/Product.model";
import { DeleteButton } from "../buttons/DeleteButton";
import { BackButton } from "../buttons/BackButton";
import CardButton from "../buttons/CardButton";
import { FloatAddButton } from "../buttons/AddButton";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";
import { CustomInput } from "../inputs/CustomInput";
import { Plus } from "lucide-react";
import { ProductCategoryModel } from "@/data/models/ProductCategory.model";
import { CustomLink } from "../buttons/CustomLink";
import { cn } from "@/lib/utils";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { removeAccentsAndSpacesToURL } from "@/data/functions/removeAccentsAndSpaces";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { updateProductAction } from "@/app/actions/products.action";

interface ManageCatalogInventoryProps {
  products: ProductModel[];
  categories: ProductCategoryModel[];
};

type SortField = 'name-az' | 'name-za' | 'newest' | 'oldest' | 'lowest' | 'highest' | 'all' | 'featured';

export default function ManageCatalogInventory({ 
  products,
  categories
}: ManageCatalogInventoryProps) {
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState<SortField>('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateFeaturedProduct = async (id: string) => {
    if (!id) return;
    setLoading(true);

    try {
      const payload = {
        featured: !products.find((product) => product.id === id)?.featured
      };

      await updateProductAction(id, payload);
      toast.success("Produto colocado como destaque com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Houve um erro ao atualizar destaque do produto");
    } finally {
      setLoading(false);
    };
  }

  const handleToggleFeatured = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();  
    e.stopPropagation(); 
    handleUpdateFeaturedProduct(id);
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

  const filteredData = useMemo(() => {
    const lowerSearch = searchText ? searchText.toLowerCase().trim() : '';

    const filtered = normalizedProducts
      .filter(({ normalized }) => {
        if (!lowerSearch) return true; 
        return normalized.searchBlob.includes(lowerSearch);
      })
      .map(({ original }) => original);
    
    switch (sortField) {
      case 'name-az':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
      case 'lowest':
        return filtered.sort((a, b) => a.initial_price - b.initial_price);
      case 'highest':
        return filtered.sort((a, b) => b.initial_price - a.initial_price);
      case 'featured':
        return filtered.sort((_a, b) => b.featured ? 1 : -1);
      default:
        return filtered;
    }
  }, [normalizedProducts, searchText, sortField]);

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex w-full items-center justify-center gap-2 mb-2 md:mb-4">
        <div className="relative flex items-center w-full grow">
          <CustomInput
            searchbarPlaceholder="Pesquisar produtos"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="bg-white dark:bg-input/30 shadow-xs"
            clearButtonAction={() => setSearchText('')}
            withClearButton
          />
        </div>

        <div className="flex w-fit">
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
                <SelectItem value={"featured"} className="cursor-pointer">
                  Destaques do Catálogo
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <CustomLink
          aria-label="Adicionar"
          href="/admin/estoques/catalogo/adicionar"
          className={`hidden md:flex py-1.5 rounded-lg shadow-xs font-bold text-base
            bg-primary dark:bg-details text-white hover:bg-primary/90 dark:hover:bg-details/80 transition-all
          `}
        >
          <Plus className="w-6 h-6" />
          <p>Adicionar</p>
        </CustomLink>
      </div>

      <div className={`flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-2 overflow-y-auto content-start scrollbar-hide md:scrollbar-thin md:pr-2 ${products?.length === 0 && 'xl:block'}`}
      >
        <div className="fixed md:hidden bottom-25 right-7 md:bottom-10 z-15">
          <FloatAddButton
            pushRoute={'/admin/estoques/catalogo/adicionar'}
            className="p-3"
          />
        </div>

        {products?.length === 0 ? (
          <div className={`flex flex-col w-full h-[55vh] gap-4 
            items-center justify-center text-gray-400 dark:text-zinc-400`}
          >
            <div className="flex flex-col items-center justify-center">
              <span>Nenhum produto encontrado.</span>
              <span className="font-bold text-sm">
                {`Adicione um novo produto no botão "Adicionar".`}
              </span>
            </div>
          </div>
        ) : (
          <>
            {filteredData && filteredData?.length > 0 ? filteredData?.map((product: ProductModel) => (
              <CardButton 
                key={product.id}
                pushRoute={`/admin/estoques/catalogo/editar/${product.id}`}
                className="bg-white dark:bg-input/50 h-full"
              >
                <div>
                  {product.images_url?.length ? (
                    <div className="relative w-35 h-35 shrink-0">
                      <Image
                        src={product.images_url[0]}
                        alt="preview"
                        draggable="false"
                        fill
                        loading="eager"
                        className={cn("aspect-square rounded-2xl object-cover shadow-sm",
                          "transition-opacity duration-500 ease-in-out",
                          isLoaded ? "opacity-100" : "opacity-0",
                        )}
                        onLoad={() => setIsLoaded(true)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-35 h-35 bg-gray-200 rounded-2xl shrink-0">
                      <span className="text-sm text-secondary px-2 text-center font-medium">
                        Sem Imagem
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col ml-2 gap-1 w-full overflow-hidden h-full">
                  <p className="text-sm font-bold truncate text-secondary dark:text-zinc-50">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 line-clamp-1 font-normal">
                    {product.desc}
                  </p>
                  <p className="text-xs text-zinc-400">
                    Categoria: {categories.find((category) => category.id === product.category_id)?.name}
                  </p>
                  <p className="text-xs text-secondary dark:text-zinc-50 font-bold dark:font-black mt-1">
                    {formatCurrency(product.initial_price)}
                  </p>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-xs font-medium ${product.featured ? 'text-green-600' : 'text-red-500 dark:text-red-400'}`}>
                        Destaque:
                      </p>
                      <Switch
                        checked={product.featured}
                        onClick={(e) => handleToggleFeatured(product.id, e)}
                        className="cursor-pointer disabled:cursor-not-allowed"
                        disabled={loading}
                      />
                    </div>
                    <p className={`text-xs font-medium ${product.available ? 'text-green-600' : 'text-red-500 dark:text-red-400'}`}>
                      Disponível: {product.available ? 'Sim' : 'Não'}
                    </p>
                    <p className={`text-xs font-medium ${product.customizable ? 'text-green-600' : 'text-red-500 dark:text-red-400'}`}>
                      Customizável: {product.customizable ? 'Sim' : 'Não'}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-3 right-1.5">
                  <DeleteButton idProduct={product.id} />
                </div>
              </CardButton>
            )) : (
              <div className="flex w-[90vw] h-[55vh] items-center justify-center-safe text-gray-400">
                <p>Nenhum produto encontrado com</p>
                <p className="font-bold ml-1">
                  &quot;{searchText}&quot;.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="md:hidden shrink-0 mt-auto bg-background-alternative dark:bg-input/0 z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton backRoute />
        </div>
      </div>
    </div>
  );
};