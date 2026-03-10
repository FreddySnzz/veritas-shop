'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductModel from "@/data/models/Product.model";
import { DeleteButton } from "../buttons/DeleteButton";
import { BackButton } from "../buttons/BackButton";
import CardButton from "../buttons/CardButton";
import { FloatAddButton } from "../buttons/AddButton";
import { formatCurrency } from "@/data/functions/formatAndCapitalize";
import { SearchbarInput } from "../inputs/SearchbarInput";
import { Plus, X } from "lucide-react";
import { CustomButton } from "../buttons/CustomButton";
import { useRouter } from "next/navigation";

interface ManageCatalogInventoryProps {
  products: ProductModel[];
};

export default function ManageCatalogInventory({ 
  products 
}: ManageCatalogInventoryProps) {
  const [searchText, setSearchText] = useState('');

  const filteredData = useMemo(() => {
    if (!searchText) return products;
    
    const lowerSearch = searchText.toLowerCase();
    return products.filter((item) => 
      item.name.toLowerCase().includes(lowerSearch)
    );
  }, [searchText, products]);

  const router = useRouter();

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex w-full items-center justify-center md:gap-3 mb-2 md:mb-4">
        <div className="grow">
          <SearchbarInput
            searchbarPlaceholder="Pesquisar produtos"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="bg-white shadow-xs"
          />
        </div>
        <div>
          <CustomButton 
            onClick={() => router.push('/admin/estoques/catalogo/adicionar')}
            className={`hidden md:flex lg:flex-row py-2 lg:px-8 rounded-lg shadow-xs
              bg-primary text-white hover:bg-primary/90 font-bold text-md
            `}
          >
            <Plus className="w-6 h-6" />
            <span>Adicionar</span>
          </CustomButton>
        </div>
        
        {searchText.length > 0 && (
          <button
            aria-label="Limpar pesquisa"
            title="Limpar pesquisa"
            className="fixed right-8 cursor-pointer"
            onClick={() => setSearchText('')}
          >
            <X className="w-6 h-6 text-secondary cursor-pointer" />
          </button>
        )}
      </div>

      <div className={`flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4
        gap-2 overflow-y-auto content-start scrollbar-hide ${products?.length === 0 && 'xl:block'}`}
      >
        <div className="fixed md:hidden bottom-25 right-7 md:bottom-10 z-15">
          <FloatAddButton
            pushRoute={'/admin/estoques/catalogo/adicionar'}
            className="p-3"
          />
        </div>

        {products?.length === 0 ? (
          <div className={`flex flex-col w-full h-[55vh] gap-4 
            items-center justify-center text-gray-400`}
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
                className="bg-white h-full"
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
                        className="aspect-square rounded-2xl object-cover shadow-sm"
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

                <div className="flex flex-col ml-4 gap-1 w-full overflow-hidden">
                  <p className="text-sm font-bold truncate text-secondary">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {product.desc}
                  </p>
                  <p className="text-xs mt-1 text-secondary font-medium">
                    {formatCurrency(product.initial_price)}
                  </p>
                  <div className="flex flex-col mt-1">
                    <p className={`text-xs font-medium ${product.available ? 'text-green-600' : 'text-red-500'}`}>
                      Disponível: {product.available ? 'Sim' : 'Não'}
                    </p>
                    <p className={`text-xs font-medium ${product.customizable ? 'text-green-600' : 'text-red-500'}`}>
                      Customizável: {product.customizable ? 'Sim' : 'Não'}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-3.5 right-2">
                  <DeleteButton idProduct={product.id} />
                </div>
              </CardButton>
            )) : (
              <div className="flex w-full h-[55vh] items-center justify-center text-gray-400">
                <span>Nenhum produto encontrado com</span>
                <span className="font-bold ml-1">&quot;{searchText}&quot;.</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="md:hidden shrink-0 mt-auto bg-background-alternative z-10">
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton backRoute />
        </div>
      </div>
    </div>
  );
};