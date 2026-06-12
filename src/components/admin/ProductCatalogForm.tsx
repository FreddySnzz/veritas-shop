'use client';

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { verifyFirebaseId } from "@/data/functions/verifyFirebaseId";
import { uploadImageAction } from "@/app/actions/cloudinary.actions"; 
import { 
  createProductAction, 
  getAllProductsAction, 
  updateProductAction 
} from "@/app/actions/products.action";
import { Eye, EyeOff, Images, Trash, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import ProductModel from "@/data/models/Product.model"; 
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { CustomizationItemConfig } from "@/data/types/customization.type";
import { toast } from "sonner";
import { BackButton } from "../buttons/BackButton";
import { useIsTouchDevice } from "@/data/hook/useMouseDrag";
import { 
  centsToPriceString,
  normalizePriceInput, 
  priceStringToCents 
} from "@/data/functions/inputMasks";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  initialData?: ProductModel | null
  customizationOptions: CustomizationItemsCategoryModel[];
};

export function ProductForm({ 
  initialData,
  customizationOptions,
}: ProductFormProps) {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [desc, setDesc] = useState<string>(initialData?.desc || "");
  const [initialPrice, setInitialPrice] = useState<string>(centsToPriceString(initialData?.initial_price || 0));
  const [available, setAvailable] = useState<boolean>(initialData?.available || false);
  const [customizable, setCustomizable] = useState<boolean>(initialData?.customizable || false);
  const [customizationItems, setCustomizationItems] = useState<CustomizationItemConfig[]>(
    (initialData?.customization_items as unknown as CustomizationItemConfig[]) || []
  );
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images_url || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newFilesPreviews, setNewFilesPreviews] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(!!initialData);
  const [viewMarkdown, setViewMarkdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
   
  const router = useRouter();
  const pathname = usePathname();
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    const initializeForm = async () => {
      if (initialData) return;

      const paths = pathname.split('/');
      const productId = paths[paths.length - 1];

      if (verifyFirebaseId(productId)) {
        setIsLoading(true);
        try {
          const products = await getAllProductsAction();
          const foundProduct = products?.find((p: ProductModel) => p.id === productId);

          if (foundProduct) {
            setName(foundProduct.name);
            setDesc(foundProduct.desc || "");
            setInitialPrice(foundProduct.initial_price);
            setCustomizable(foundProduct.customizable);
            const items = (foundProduct.customization_items as unknown as CustomizationItemConfig[]) || [];
            setCustomizationItems(items);
            setAvailable(foundProduct.available);
            setExistingImages(foundProduct.images_url || []);
            setIsEditMode(true);
          };
        } catch (error) {
          console.error("Erro ao carregar produto:", error);
        } finally {
          setIsLoading(false);
        };
      };
    };

    initializeForm();
  }, [pathname, initialData]);

  useEffect(() => {
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setNewFilesPreviews(newUrls);

    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [newFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024);
      
      if (validFiles.length !== selectedFiles.length) {
        toast.warning("Alguns arquivos eram maiores que 10MB e foram ignorados.");
      };

      setNewFiles(prev => [...prev, ...validFiles]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
  };

  const handleRemoveExistingImage = (urlToRemove: string) => {
    setExistingImages(prev => prev.filter(url => url !== urlToRemove));
  };

  const handleRemoveNewFile = (indexToRemove: number) => {
    setNewFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!initialPrice) {
        toast.error("O valor do produto não pode ser R$0,00");
        setIsLoading(false);
        return;
      };

      if (!name) return toast.error("Nome do produto obrigatório.");
      if (!initialPrice) return toast.error("Preço do produto obrigatório.");

      const uploadedUrls: string[] = [];

      if (newFiles.length > 0) {
        for (const file of newFiles) {
          const formData = new FormData();
          formData.append("file", file);
          try {
            const url = await uploadImageAction(formData);
            if (url) uploadedUrls.push(url);
          } catch (error) {
            console.error(`Erro ao subir arquivo ${file.name}:`, error);
            toast.error(`Falha ao subir imagem: ${file.name}`);
            setIsLoading(false);
            return;
          };
        };
      };

      const finalImagesUrl = [...existingImages, ...uploadedUrls];
      const productId = isEditMode ? pathname.split('/').pop() : undefined;
      
      const dataToSubmit = {
        id: productId,
        name,
        desc,
        available,
        customizable,
        customization_items: customizationItems,
        initial_price: priceStringToCents(initialPrice),
        images_url: finalImagesUrl,
        updated_at: new Date(),
      };
      
      if (isEditMode && productId) {
        await updateProductAction(productId, dataToSubmit);
      } else {
        await createProductAction(dataToSubmit);
      };

      toast.success(isEditMode ? "Produto atualizado!" : "Produto criado!");
      setNewFiles([]);

      router.refresh(); 
      router.push(`/admin/estoques/catalogo`);
    } catch (error) {
      console.error("Erro no processo:", error);
      toast.error("Erro ao salvar produto.");
    } finally {
      setIsLoading(false);
    };
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleMainSwitchChange = (checked: boolean) => {
    setCustomizable(checked);
    if (!checked) {
      setCustomizationItems([]); 
    };
  };
  
  const toggleCustomizationCategory = (
    categoryName: string, 
    category: string,
    isChecked: boolean
  ) => {
    setCustomizationItems((prev) => {
      if (isChecked) {
        return [...prev, { 
          category_name: categoryName, 
          category: category, 
          required: false,
          available: true
        }];
      } else {
        return prev.filter((item) => item.category !== category);
      };
    });
  };

  const toggleRequiredStatus = (
    categoryName: string, 
    category: string, 
    isRequired: boolean
  ) => {
    setCustomizationItems((prev) => prev.map(item => 
      item.category === category ? { ...item, required: isRequired } : item
    ));
  };
   
  return (
    <div className="flex-1 flex flex-col w-full min-h-0 overflow-hidden font-sans">
      <form 
        id="product-catalog-form"
        onSubmit={handleSubmit} 
        className="flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide"
      >
        <div className="flex flex-col w-full lg:flex-row gap-4 lg:gap-8">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="name" className="text-sm dark:text-zinc-50">
              Nome *
            </Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Nome do Produto"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-white focus-visible:ring-0 truncate text-secondary dark:border-zinc-700/90"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="initialPrice" className="text-sm dark:text-zinc-50">
              Preço *
            </Label>
            <div className="relative">
              <p className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                R$
              </p>
              <Input
                id="initialPrice"
                type="text"
                inputMode="decimal"
                onChange={(e) => {
                  const formatted = normalizePriceInput(e.target.value);
                  setInitialPrice(formatted);
                }}
                value={initialPrice}
                placeholder="0.00"
                className="pl-10 bg-white focus-visible:ring-0 truncate text-secondary dark:border-zinc-700/90"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:flex-row gap-4 lg:gap-8">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-baseline">
              <Label htmlFor="description" className="text-sm dark:text-zinc-50">
                Descrição (Opcional)
              </Label>
              <p className="text-[0.65rem] text-gray-400 dark:text-zinc-500">{`Suporte à Markdown *`}</p>
            </div>
            <div className="relative flex w-full">
              <div className="absolute top-[-25] right-0">
                <button
                  type="button"
                  aria-label="Ver Markdown"
                  title="Ver Markdown"
                  onClick={() => setViewMarkdown(!viewMarkdown)}
                  className={`flex items-center justify-center px-1 py-1 font-medium cursor-pointer
                    ${viewMarkdown ? 'bg-green-50 dark:bg-zinc-900/60 dark:border-zinc-700/70 dark:hover:bg-zinc-950/70' 
                      : 'bg-white dark:bg-input/30 dark:border-zinc-600'}
                    hover:bg-gray-50 dark:hover:bg-input/70 text-secondary rounded-t-lg 
                    transition-all border border-gray-200
                  `}
                >
                  {viewMarkdown ? (
                    <EyeOff className="w-4 h-4 text-secondary" />
                  ) : (
                    <Eye className="w-4 h-4 text-secondary" />
                  )}
                </button>
              </div>
              <div 
                className={`${viewMarkdown ? '' : 'hidden'} w-full h-full text-sm transition-colors
                  bg-green-50 dark:bg-zinc-900/60 overflow-y-auto rounded-tr-none rounded-lg 
                  px-3 py-2 mb-2 text-secondary dark:text-details border shadow-xs whitespace-pre-line
                `}
              >
                <article className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {desc}
                  </ReactMarkdown>
                </article>
              </div>
              <Textarea
                id="description"
                placeholder="Descrição do Produto"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                rows={4}
                className={`${viewMarkdown ? 'hidden' : ''} bg-white
                  focus-visible:ring-0 text-secondary overflow-y-auto rounded-tr-none
                `}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <Label htmlFor="image" className="text-sm dark:text-zinc-50">
              Galeria de Imagens (Opcional)
            </Label>
            <p className="text-xs text-gray-400 dark:text-zinc-500">*.jpg / *.png - máx 10MB</p>
          </div>

          <Input
            id="image"
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`flex gap-2 items-center justify-center px-4 py-2 font-medium cursor-pointer mt-2
              bg-gray-100 dark:bg-input/30 hover:bg-gray-200 dark:hover:bg-input/50 text-secondary rounded-lg 
              transition-all border border-dashed border-gray-300 dark:border-zinc-600
            `}
          >
            <Images className="w-4 h-4 text-secondary" />
            <p>Adicionar Imagens</p>
          </button>

          {(existingImages.length > 0 || newFiles.length > 0) && (
            <div className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 
              bg-gray-50 dark:bg-input/30 p-4 rounded-xl border border-gray-100 dark:border-zinc-600`}
            >
              {existingImages.map((url, index) => (
                <div 
                  key={`existing-${index}`} 
                  className="relative aspect-square group w-40 h-40 md:w-60 md:h-60"
                >
                  <Image
                    src={url}
                    alt={`Produto imagem ${index + 1}`}
                    fill
                    loading="eager"
                    className="object-cover rounded-lg border border-gray-200"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />

                  <div className={cn(`absolute inset-0 flex items-center justify-center 
                    transition-opacity rounded-lg bg-black/40 opacity-0 group-hover:opacity-100`, 
                    isTouchDevice && `bg-black/20 opacity-100`)
                  }>
                    <button
                      type="button"
                      aria-label="Remover imagem"
                      title="Remover imagem"
                      onClick={() => handleRemoveExistingImage(url)}
                      className={`bg-white/90 dark:bg-zinc-950 p-2 text-red-500 
                        hover:bg-white dark:hover:bg-red-950 hover:scale-110 
                        transition-all cursor-pointer rounded-full
                      `}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 rounded">
                    Salva
                  </span>
                </div>
              ))}

              {newFilesPreviews.map((previewUrl, index) => (
                <div 
                  key={`new-${index}`} 
                  className="relative aspect-square group w-40 h-40 md:w-60 md:h-60"
                >
                  <Image
                    src={previewUrl}
                    alt={`Nova imagem ${index + 1}`}
                    fill
                    className="object-cover rounded-lg border-2 border-primary/50"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />

                  <div className={`flex items-center justify-center absolute inset-0 
                    bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg`}
                  >
                    <button
                      type="button"
                      aria-label="Cancelar upload"
                      title="Cancelar upload"
                      onClick={() => handleRemoveNewFile(index)}
                      className={`bg-white/90 p-2 rounded-full text-red-500 
                        hover:bg-white hover:scale-110 transition-all cursor-pointer
                      `}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-1 right-1 bg-primary text-white text-[10px] px-1.5 rounded">
                    Nova
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full lg:flex-row gap-4 lg:gap-8">
            <div className="flex items-center w-full justify-between px-4 py-3 bg-white dark:bg-input/30 rounded-lg border">
              <Label htmlFor="available">Produto Disponível no Estoque?</Label>
              <Switch 
                id="available" 
                checked={available}
                onCheckedChange={setAvailable}
                disabled={isLoading}
                className="cursor-pointer"
              />
            </div>

            <div className="flex items-center w-full justify-between px-4 py-3 bg-white dark:bg-input/30 rounded-lg border">
              <Label htmlFor="customizable">Produto Customizável?</Label>
              <Switch 
                id="customizable"
                checked={customizable}
                onCheckedChange={handleMainSwitchChange}
                disabled={isLoading}
                className="cursor-pointer"
              />
            </div>
          </div>

          {customizable && (
            <div className={`flex flex-col w-full bg-white dark:bg-input/30 rounded-lg border
              px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300`}
            >
              <p className="flex text-sm font-medium mb-3 dark:text-zinc-50">
                Configuração de Personalização:
              </p>
              <div className="flex text-[0.6rem] text-gray-400 dark:text-zinc-400 mb-2 px-1 justify-between uppercase tracking-wider font-bold">
                <p>Aceita:</p>
                <p>Obrigatório?</p>
              </div>

              <div className="flex flex-col gap-2">
                {customizationOptions.sort().map((option: CustomizationItemsCategoryModel) => {
                  if (!option.available) return null;
                  
                  const selectedConfig = customizationItems.find(item => item.category ===  option.category_name);
                  const isChecked = !!selectedConfig;
                  
                  return (
                    <div 
                      key={option.id} 
                      className={`flex items-center justify-between w-full p-2 rounded transition-colors border 
                        ${isChecked ? 'bg-primary/5 border-primary/20 dark:bg-zinc-800 dark:border-details' 
                          : 'bg-gray-50 dark:bg-input/40 border-transparent dark:border-zinc-500/20'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`cust-item-${option.category_name}`}
                          checked={isChecked}
                          disabled={isLoading}
                          onChange={(e) => toggleCustomizationCategory(
                            option.name, 
                            option.category_name, 
                            e.target.checked
                          )}
                          className={`w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary dark:focus:ring-details 
                            cursor-pointer accent-primary dark:accent-details
                          `}
                        />
                        <Label 
                          htmlFor={`cust-item-${option.category_name}`} 
                          className="cursor-pointer font-medium text-sm text-secondary dark:text-zinc-50 select-none"
                        >
                          {option.name}
                        </Label>
                      </div>

                      {isChecked && (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                          <label 
                            className="text-xs text-muted-foreground dark:text-zinc-200 cursor-pointer select-none" 
                            htmlFor={`req-${option.category_name}`}
                          >
                            {selectedConfig?.required ? "Sim" : "Não"}
                          </label>
                          <input
                            type="checkbox"
                            id={`req-${option.category_name}`}
                            checked={selectedConfig?.required || false}
                            onChange={(e) => toggleRequiredStatus(
                              option.name, 
                              option.category_name, 
                              e.target.checked
                            )}
                            className={`w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary dark:focus:ring-details 
                              cursor-pointer accent-primary dark:accent-details
                            `}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </form>

      <div className="shrink-0 mt-auto bg-background-alternative dark:bg-input/0 pt-4">
        <hr className="border-muted-foreground/50 mb-2 lg:hidden" />
        <div className="flex lg:justify-end">
          <div className="flex gap-4 w-full lg:w-1/2 xl:w-1/3">
            <BackButton 
              backRoute 
              className="dark:bg-zinc-800 dark:hover:bg-zinc-950/15 transition-colors"
            />
            <button 
              type="submit" 
              aria-label={isEditMode ? "Salvar Alterações" : "Criar Produto"}
              form="product-catalog-form"
              className={`flex w-full px-4 py-3 rounded-lg font-medium
                bg-primary dark:bg-details text-white items-center justify-center hover:bg-primary/90 
                dark:hover:bg-details/70 cursor-pointer transition-colors
              `}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2"> 
                  <span>Salvando...</span>
                </div>
              ) : (
                isEditMode ? "Salvar Alterações" : "Criar Produto"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};