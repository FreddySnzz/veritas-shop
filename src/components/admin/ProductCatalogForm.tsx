'use client';

import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { verifyFirebaseId } from "@/data/functions/verifyFirebaseId";
import { 
  createProductAction, 
  getAllProductsAction, 
  updateProductAction 
} from "@/app/actions/products.action";
import { deleteImageAction, uploadImageAction } from "@/app/actions/cloudinary.actions";
import { ArrowBigUpDash, Images, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ProductModel from "@/data/models/Product.model";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";

interface ProductFormProps {
  initialData?: ProductModel | null
};

const CUSTOMIZATION_OPTIONS = [
  { label: 'Cordão', value: ItemsCustomizationTypes.cordoes },
  { label: 'Conta', value: ItemsCustomizationTypes.contas },
  { label: 'Letras', value: ItemsCustomizationTypes.letras },
  { label: 'Crucifixo', value: ItemsCustomizationTypes.crucifixos },
  { label: 'Entremeio', value: ItemsCustomizationTypes.entremeios },
];

export function ProductForm({ 
  initialData,
}: ProductFormProps) {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [desc, setDesc] = useState<string>(initialData?.desc || "");
  const [initialPrice, setInitialPrice] = useState<number>(initialData?.initial_price || 0);
  const [available, setAvailable] = useState<boolean>(initialData?.available || false);
  const [customizable, setCustomizable] = useState<boolean>(initialData?.customizable || false);
  const [customizationItems, setCustomizationItems] = useState<string[]>(initialData?.customization_items || []);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(initialData?.image_url || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(!!initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const router = useRouter();
  const pathname = usePathname();

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
            setCustomizationItems(foundProduct.customization_items || []);
            setAvailable(foundProduct.available);
            setCurrentImageUrl(foundProduct.image_url || "");
            setIsEditMode(true);
          }
        } catch (error) {
          console.error("Erro ao carregar produto:", error);
        } finally {
          setIsLoading(false);
        };
      };
    };

    initializeForm();
  }, [pathname, initialData]);

  const imagePreview = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    };

    if (currentImageUrl) {
      return currentImageUrl;
    };
  }, [selectedFile, currentImageUrl]);

  const handleRemoveImage = () => {
    try {
      setIsLoading(true);

      deleteImageAction(currentImageUrl);
      setSelectedFile(null);
      setCurrentImageUrl("");

      toast.success("Imagem apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar imagem:", error);
    } finally {
      setIsLoading(false);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (initialPrice <= 0) {
      toast.error("O valor do produto não pode ser R$0,00");
      setIsLoading(false);
      return;
    };

    try {
      let finalUrlToSave = currentImageUrl;

      if (selectedFile) {
        const formData = new FormData();

        formData.append("file", selectedFile);

        try {
          finalUrlToSave = await uploadImageAction(formData);
        } catch (error) {
          console.error("Erro no upload de imagem:", error);
          toast.error("Erro no upload de imagem.");
          return;
        };
      };

      const productId = isEditMode ? pathname.split('/').pop() : undefined;

      const dataToSubmit = {
        id: productId,
        name,
        desc,
        available,
        customizable,
        customization_items: customizationItems,
        initial_price: initialPrice * 100,
        image_url: finalUrlToSave,
        updated_at: new Date(),
      };

      if (isEditMode && productId) {
        await updateProductAction(productId, dataToSubmit);
      } else {
        await createProductAction(dataToSubmit);
      };

      toast.success(isEditMode ? "Produto atualizado!" : "Produto criado!");
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

  const toggleCustomizationItem = (itemValue: string) => {
    setCustomizationItems((prev) => {
      const exists = prev.includes(itemValue);
      
      if (exists) {
        return prev.filter((item) => item !== itemValue);
      } else {
        return [...prev, itemValue];
      }
    });
  };
  
  return (
    <div className="flex-1 flex flex-col w-full min-h-0 overflow-hidden font-sans">
      <form 
        onSubmit={handleSubmit} 
        className="flex-1 flex flex-col gap-4 overflow-y-auto px-6 pb-2 scrollbar-hide"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm">Nome</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Nome do Produto"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="desc" className="text-sm">Descrição (Opcional)</Label>
            <Input
              id="description"
              type="text"
              autoComplete="description"
              placeholder="Descrição do Produto"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className="bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="initialPrice" className="text-sm">Preço</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
              <Input
                id="initialPrice"
                type="number"
                required
                onChange={(e) => setInitialPrice(Number(e.target.value) || 0)}
                value={initialPrice > 0 ? initialPrice : ''}
                placeholder="0,00"
                step="0.01"
                min="0"
                className="pl-10 bg-white focus-visible:ring-0 truncate text-secondary"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="image" className="text-sm">
              {isEditMode ? "Alterar Imagem (Opcional)" : "Imagem (Opcional)"}
            </Label>
            <span className="text-xs text-gray-400 mb-2">*.jpg / *.jpeg / *.png - tam. limite de 10MB</span>

            <Input
              id="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            <button 
              type="button" 
              onClick={handleButtonClick}
              disabled={isLoading}
              className={`flex gap-2 items-center justify-center px-4 py-1 font-medium cursor-pointer mt-2
                bg-gray-300 text-secondary rounded-lg transition-all shadow
              `}
            >
              {selectedFile ? (
                <>
                  <Images className="w-4 h-4 text-secondary" />
                  Alterar Imagem
                </>
              ) : (
                <>
                  <ArrowBigUpDash className="w-4 h-4" />
                  Selecionar Imagem
                </>
              )}
            </button>

            { imagePreview && (
              <div className="flex flex-col justify-center items-center mt-6">
                <div className="relative w-62 h-50">
                  <Image
                    src={imagePreview}
                    alt="preview"
                    draggable="false"
                    loading="eager"
                    fill
                    className="object-cover rounded-2xl border border-gray-200 shadow-sm"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={handleRemoveImage}
                  className="flex justify-center items-center gap-2 mt-4 cursor-pointer text-secondary"
                >
                  <Trash className="w-4 h-4" />
                  <span className="text-sm">Apagar Imagem</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center w-full justify-between px-4 py-3 bg-white rounded-lg border">
            <Label htmlFor="available">Produto Disponível no Estoque?</Label>
            <Switch 
              id="available" 
              checked={available}
              onCheckedChange={setAvailable}
              disabled={isLoading}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center w-full justify-between px-4 py-3 bg-white rounded-lg border">
            <Label htmlFor="customizable">Produto Customizável?</Label>
            <Switch 
              id="customizable"
              checked={customizable}
              onCheckedChange={handleMainSwitchChange}
              disabled={isLoading}
              className="cursor-pointer"
            />
          </div>

          {customizable && (
            <div className="flex flex-col w-full bg-white rounded-lg border px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="flex text-xs font-medium mb-3 text-muted-foreground">
                Personalizações disponíveis:
              </span>

              <div className="flex flex-col gap-2">
                {CUSTOMIZATION_OPTIONS.map((option) => {
                  const isChecked = customizationItems.includes(option.value);

                  return (
                    <div 
                      key={option.value} 
                      className="flex items-center justify-between w-full"
                    >
                      <Label 
                        htmlFor={`cust-item-${option.value}`} 
                        className="cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      <Switch
                        id={`cust-item-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={() => toggleCustomizationItem(option.value)}
                        disabled={isLoading}
                        className="cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </form>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex mx-6 my-4 gap-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="flex w-full px-4 py-3 rounded-lg bg-primary/20 text-secondary items-center justify-center hover:bg-red-200 cursor-pointer transition-colors" 
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button 
            type="submit" 
            onClick={handleSubmit}
            className="flex w-full px-4 py-3 rounded-lg bg-primary text-white items-center justify-center hover:bg-primary/90 cursor-pointer transition-colors" 
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
  );
};