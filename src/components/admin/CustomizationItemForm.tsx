'use client';

import { 
  useState, 
  useEffect, 
  useMemo, 
  useRef, 
  useTransition 
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  getCachedCustomizationItemsAction, 
  getCachedCustomizationItemsCategoriesAction, 
} from "@/app/actions/cache.actions";
import { deleteImageAction, uploadImageAction } from "@/app/actions/cloudinary.actions";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { ArrowBigUpDash, Images, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createCustomizationItemAction, deleteCustomizationItemAction, updateCustomizationItemAction } from "@/app/actions/customizationItems.action";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { generateRefNumber } from "@/data/functions/generateRefForItem";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import CustomModal from "../modals/CustomModal";

interface CustomizationItemFormProps {
  mode: string;
  itemId?: string;
  itemType?: string;
};

export function CustomizationItemForm({ itemId, mode }: CustomizationItemFormProps) {
  const [categories, setCategories] = useState<[]>([]);
  const [customizationItems, setCustomizationItems] = useState<CustomizationItemsModel[]>([]);

  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const isEditMode = mode === 'editar';
  const router = useRouter();
  
  const [name, setName] = useState<string>("");
  const [categoryKey, setCategoryKey] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [priceAddon, setPriceAddon] = useState<number>(0);
  const [sizeHeight, setSizeHeight] = useState<number>(0);
  const [sizeWidth, setSizeWidth] = useState<number>(0);
  const [available, setAvailable] = useState<boolean>(true);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function getInitialData() {
    setIsLoading(true);

    try {
      const cachedItems = await getCachedCustomizationItemsAction();
      setCustomizationItems(cachedItems);

      const cachedCategories = await getCachedCustomizationItemsCategoriesAction();
      setCategories(cachedCategories.map((category: CustomizationItemsCategoryModel) => category));

      if (isEditMode && itemId) {
        const foundItem = cachedItems.find((item: CustomizationItemsModel) => item.id === itemId);
        
        if (foundItem) {
          setName(foundItem.name || "");
          setCategoryKey(foundItem.category || "");
          setStyle(foundItem.metadata?.style || ""); 
          setColor(foundItem.metadata?.color || "");
          setCurrentImageUrl(foundItem.image_url || "");
          setPriceAddon(Number(foundItem.metadata?.price_addon) || 0);
          setSizeHeight(Number(foundItem.metadata?.size_height) || 0);
          setSizeWidth(Number(foundItem.metadata?.size_width) || 0);
          setAvailable(foundItem.available ?? true);
        } else {
          toast.error("Item não encontrado.");
          router.back();
        };
      };
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      toast.error("Erro ao carregar itens.");
    } finally {
      setIsLoading(false);
    };
  };

  useEffect(() => {
    getInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, isEditMode]);

  const handleButtonClick = () => fileInputRef.current?.click();

  const imagePreview = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    if (currentImageUrl) return currentImageUrl;
    return null;
  }, [selectedFile, currentImageUrl]);

  const handleRemoveImage = async () => {
    if (!currentImageUrl) {
      setSelectedFile(null);
      return;
    };
    
    setIsLoading(true);

    try {
      await deleteImageAction(currentImageUrl);
      setSelectedFile(null);
      setCurrentImageUrl("");
    } catch (error) {
      console.error("Erro ao apagar imagem:", error);
      toast.error("Erro ao apagar imagem do servidor.");
    } finally {
      setIsLoading(false);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalUrlToSave = currentImageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        finalUrlToSave = await uploadImageAction(formData);
      };

      const metadata = {
        style: style,
        color: color,
        size_height: sizeHeight,
        size_width: sizeWidth,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        name,
        available,
        category: categoryKey,
        image_url: finalUrlToSave,
        metadata,
        price_addon: priceAddon,
        updated_at: new Date(),
      };

      startTransition(async () => {
        try {
          if (isEditMode && itemId) {
            await updateCustomizationItemAction(itemId, payload);
            toast.success("Item atualizado com sucesso!");
          } else {
            const newRef = generateRefNumber(customizationItems, categoryKey);
            payload.ref = newRef;
            
            await createCustomizationItemAction(payload);
            toast.success(`Item criado com sucesso!`);
          };
            
          router.refresh();
          router.back();
        } catch (err) {
          console.error(err);
          toast.error("Erro ao salvar no banco de dados.");
        };
      });

    } catch (error) {
      console.error("Erro geral no submit:", error);
      toast.error("Erro ao processar requisição.");
    } finally {
      setIsLoading(false);
    };
  };

  const handleDeleteItem = async (itemId: string) => {
    setIsLoading(true);

    try {
      await deleteCustomizationItemAction(itemId);
      toast.success("Item deletado com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      toast.error("Erro ao deletar item.");
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <form 
        onSubmit={handleSubmit} 
        className="flex-1 flex flex-col gap-4 overflow-y-auto px-6 font-sans scrollbar-hide"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-sm">Nome de Referência</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Ex: Entremeio de São José / Cordão Simples"}
            required={true}
            disabled={isLoading}
            className="bg-white focus-visible:ring-0 truncate text-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm">Categoria do Item</Label>
          <Select 
            disabled={isEditMode || isLoading}
            value={categoryKey} 
            onValueChange={(value) => setCategoryKey(value)}
          >
            <SelectTrigger className={`flex w-full items-center justify-between gap-2 rounded-lg px-4
              bg-white text-sm text-secondary transition-colors hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-primary
            `}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position={"item-aligned"}>
              <SelectGroup className="font-sans">
                {categories?.map((category: CustomizationItemsCategoryModel) => (
                  <SelectItem 
                    key={category.id}
                    value={category.category_name}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="style" className="text-sm">Estilo ou Referência de Cor (Opcional)</Label>
          <Input
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="Ex: Ouro Velho / Brilhante / Marrom Café"
            disabled={isLoading}
            className="bg-white focus-visible:ring-0 truncate text-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="color" className="text-sm">Código da Cor (Opcional)</Label>
          <div className="flex gap-4 items-center">
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-20 h-10 p-1 cursor-pointer"
              disabled={isLoading}
            />
            <Input 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#000000"
              maxLength={7}
              max={7}
              className="flex-1 bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Label className="text-sm mb-1">Imagem do Item</Label>
          <span className="text-xs text-gray-400 mb-2">*.jpg / *.jpeg / *.png - tam. limite de 10MB</span>
          
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />

          <button 
            type="button" 
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`flex gap-2 items-center justify-center px-4 py-2 font-medium cursor-pointer mt-2
              bg-gray-200 text-secondary rounded-lg transition-all shadow
            `}
          >
            {selectedFile || currentImageUrl ? (
              <> 
                <Images className="w-4 h-4 text-secondary" />
                <span>Alterar Imagem</span>
              </>
            ) : (
              <> 
                <ArrowBigUpDash className="w-4 h-4" /> 
                <span>Selecionar Imagem</span>
              </>
            )}
          </button>

          {imagePreview && (
            <div className="relative mt-4 w-full flex flex-col items-center p-4 border rounded-xl bg-gray-50">
              <div className="relative w-40 h-40">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  draggable="false"
                  className="object-cover rounded-2xl border border-gray-200 shadow-sm"
                  sizes="(max-width: 768px) 100vw, 250px"
                />
              </div>
              <button 
                type="button"
                onClick={handleRemoveImage}
                disabled={isLoading}
                className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
              >
                <Trash className="w-4 h-4" />
                <span>Remover Imagem</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label 
            htmlFor="priceAddon" 
            className="text-sm"
          >
            Quanto esse item soma ao preço final? (Opcional)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
            <Input
              id="priceAddon"
              type="number"
              required
              onChange={(e) => setPriceAddon(Number(e.target.value) || 0)}
              value={priceAddon}
              placeholder="0,00"
              step="0.01"
              min="0"
              className="pl-10 bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label 
            htmlFor="sizeHeight" 
            className="text-sm"
          >
            Medidas do item (Opcional)
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-secondary">Altura: </span>
            <Input
              id="sizeHeight"
              type="number"
              required
              onChange={(e) => setSizeHeight(Number(e.target.value) || 0)}
              value={sizeHeight}
              placeholder="0,00"
              step="0.01"
              min="0"
              className="bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
            <span className="text-secondary">Largura: </span>
            <Input
              id="sizeWidth"
              type="number"
              required
              onChange={(e) => setSizeWidth(Number(e.target.value) || 0)}
              value={sizeWidth}
              placeholder="0,00"
              step="0.01"
              min="0"
              className="bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex items-center w-full justify-between px-4 py-3 bg-white rounded-lg border">
          <Label htmlFor="available">Item Disponível no Estoque?</Label>
          <Switch 
            id="available" 
            checked={available}
            onCheckedChange={setAvailable}
            disabled={isLoading}
            className="cursor-pointer"
          />
        </div>

        {isEditMode && itemId && (
          <div className="flex items-center w-full justify-center py-2 mb-4">
            <button 
              type="button"
              className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash className="w-4 h-4" />
              <span className="text-sm font-medium hover:underline">
                Deletar Item
              </span>
            </button>

            <CustomModal
              modalOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              className=""
            >
              <div className="flex flex-col items-center justify-center p-2 gap-4">
                <p className="font-bold">
                  Tem certeza que deseja deletar este item?
                </p>

                <div className="flex w-full items-center justify-end gap-2">
                  <button 
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex w-full px-4 py-2 rounded-lg bg-gray-100 items-center justify-center font-medium cursor-pointer"
                  >
                    <span>Cancelar</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleDeleteItem(itemId)}
                    className="flex w-full px-4 py-2 rounded-lg bg-primary text-white items-center justify-center font-medium cursor-pointer"
                  >
                    <span>Confirmar</span>
                  </button>
                </div>
              </div>
            </CustomModal>
          </div>
        )}
      </form>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex mx-6 my-4 gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex w-full px-4 py-3 rounded-lg bg-primary/20 text-secondary items-center justify-center hover:bg-red-200 cursor-pointer transition-colors"
            disabled={isLoading || isPending}
          >
            Cancelar
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex w-full px-4 py-3 rounded-lg bg-primary text-white items-center justify-center hover:bg-primary/90 cursor-pointer transition-colors"
            disabled={isLoading || isPending}
          >
            {isLoading || isPending ? (
              <div className="flex justify-center items-center gap-2">
                <span>Salvando...</span>
              </div>
            ) : (
              isEditMode ? "Salvar Alterações" : "Criar Item"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};