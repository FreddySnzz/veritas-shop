'use client';

import { 
  useState, 
  useMemo, 
  useRef, 
  useTransition,
  FormEvent,
  useCallback
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowBigUpDash, Images, Trash } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import CustomModal from "../modals/CustomModal";
import { deleteImageAction, uploadImageAction } from "@/app/actions/cloudinary.actions";
import { 
  createCustomizationItemAction, 
  deleteCustomizationItemAction, 
  updateCustomizationItemAction 
} from "@/app/actions/customizationItems.action";
import { generateRefNumber } from "@/data/functions/generateRefForItem";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import { 
  centsToPriceString, 
  normalizePriceInput, 
  onlyNumbers, 
  priceStringToCents 
} from "@/data/functions/inputMasks";
import { BackButton } from "../buttons/BackButton";

interface CustomizationItemFormProps {
  mode: string;
  initialData?: CustomizationItemsModel;
  customizationItems: CustomizationItemsModel[];
  categories: CustomizationItemsCategoryModel[];
};

export function CustomizationItemForm({ 
  mode, 
  initialData,
  customizationItems, 
  categories 
}: CustomizationItemFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  
  const isEditMode = mode === 'editar';
  const isLoading = isPending || isUploading;

  const [name, setName] = useState<string>(initialData?.name || "");
  const [categoryKey, setCategoryKey] = useState<string>(initialData?.category || "");
  const [style, setStyle] = useState<string>(initialData?.metadata?.style || "");
  const [color, setColor] = useState<string>(initialData?.metadata?.color || "#000000");
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(() => initialData?.image_url || "");
  const [available, setAvailable] = useState<boolean>(true);
  const [priceAddon, setPriceAddon] = useState<string>(
    centsToPriceString(initialData?.price_addon)
  );
  const [sizeHeight, setSizeHeight] = useState<string>(() => 
    initialData?.metadata?.size_height !== undefined ? String(initialData.metadata.size_height) : ""
  );
  const [sizeWidth, setSizeWidth] = useState<string>(() => 
    initialData?.metadata?.size_width !== undefined ? String(initialData.metadata.size_width) : ""
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => fileInputRef.current?.click();

  const imagePreview = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    if (currentImageUrl) return currentImageUrl;

    return null;
  }, [selectedFile, currentImageUrl]);

  const handleRemoveImage = useCallback(async () => {
    if (!currentImageUrl) {
      setSelectedFile(null);
      return;
    };
    
    setIsUploading(true);

    try {
      await deleteImageAction(currentImageUrl);
      setSelectedFile(null);
      setCurrentImageUrl("");
      toast.success("Imagem removida.");
    } catch (error) {
      console.error("Erro ao apagar imagem:", error);
      toast.error("Erro ao apagar imagem do servidor.");
    } finally {
      setIsUploading(false);
    };
  }, [currentImageUrl]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      if (!name) return toast.error("Nome do item obrigatório.");
      if (!categoryKey) return toast.error("Categoria do item obrigatório.");

      let finalUrlToSave = currentImageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        finalUrlToSave = await uploadImageAction(formData);
      };

      const metadata = {
        style: style,
        color: color,
        size_height: sizeHeight ? Number(sizeHeight) : 0,
        size_width: sizeWidth ? Number(sizeWidth) : 0,
      };

      const payload = {
        name,
        available,
        category: categoryKey,
        image_url: finalUrlToSave,
        metadata,
        price_addon: priceStringToCents(priceAddon),
        updated_at: new Date(),
      };

      startTransition(async () => {
        try {
          if (isEditMode && initialData) {
            await updateCustomizationItemAction(initialData.id, payload);
            toast.success("Item atualizado com sucesso!");
          } else {
            const newRef = generateRefNumber(customizationItems, categoryKey);
            await createCustomizationItemAction({...payload, ref: newRef});
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
      setIsUploading(false);
    };
  };

  const handleDeleteItem = async () => {
    if (!initialData) return;
    
    startTransition(async () => {
      try {
        await deleteCustomizationItemAction(initialData.id);
        toast.success("Item deletado com sucesso!");
        router.refresh();
        router.back();
      } catch (error) {
        console.error("Erro ao deletar item:", error);
        toast.error("Erro ao deletar item.");
      };
    });
  };

  return (
    <div className="flex-1 flex flex-col w-full min-h-0 overflow-hidden font-sans">
      <form 
        id="customization-form"
        onSubmit={handleSubmit} 
        className={`flex-1 flex flex-col gap-4 overflow-y-auto scrollbar-hide
          
        `}
      >
        <div className="flex flex-col w-full lg:flex-row gap-4 lg:gap-8">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="name" className="text-sm">Nome de Referência *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Entremeio de São José / Cordão Simples"
              disabled={isLoading}
              className="bg-white focus-visible:ring-0 truncate text-secondary"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm">Categoria do Item *</Label>
            <Select 
              disabled={isEditMode || isLoading}
              value={categoryKey} 
              onValueChange={(value) => setCategoryKey(value)}
            >
              <SelectTrigger 
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-4 
                  bg-white text-sm text-secondary transition-colors hover:bg-gray-50 
                  focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-primary`}
                >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectGroup className="font-sans">
                  {categories?.map((category) => (
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
        </div>

        <div className="flex flex-col w-full lg:flex-row gap-4 lg:gap-8">
          <div className={`flex flex-col w-full
            ${fileInputRef.current ?? 'lg:w-1/3'}`}
          >
            <Label htmlFor="image" className="text-sm mb-1">
              Imagem do Item (Opcional)
            </Label>
            <span className="text-xs text-gray-400 mb-2">
              *.jpg / *.jpeg / *.png - tam. limite de 10MB
            </span>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="hidden"
              onClick={(e) => (e.currentTarget.value = '')} 
            />

            <button 
              type="button" 
              onClick={handleButtonClick}
              disabled={isLoading}
              className={`flex gap-2 items-center justify-center px-4 py-2 font-medium cursor-pointer mt-2 h-full 
                bg-gray-200 text-secondary rounded-lg transition-all shadow hover:bg-gray-300 disabled:opacity-50
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
              <div className="relative w-full mt-4 flex flex-col items-center p-4 border rounded-xl bg-gray-50">
                <div className="relative w-40 h-40 md:w-60 md:h-60">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    loading="eager"
                    draggable={false}
                    className="object-cover rounded-2xl border border-gray-200 shadow-sm"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>
                <button 
                  type="button"
                  aria-label="Remover imagem"
                  onClick={handleRemoveImage}
                  disabled={isLoading}
                  className={`flex items-center mt-3 gap-2 font-medium
                    text-red-500 hover:text-red-700 text-sm cursor-pointer disabled:opacity-50
                  `}
                >
                  <Trash className="w-4 h-4" />
                  <span>Remover Imagem</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full">
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
                  className="flex-1 bg-white focus-visible:ring-0 truncate text-secondary"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label className="text-sm">Medidas do item (Opcional) *cm</Label>
              <div className="flex items-center gap-4 md:gap-8">
                <div className="flex-1 flex items-center gap-2">
                  <Label htmlFor="sizeHeight" className="text-secondary whitespace-nowrap">Altura:</Label>
                  <Input
                      id="sizeHeight"
                      type="text"
                      inputMode="decimal"
                      onChange={(e) => setSizeHeight(onlyNumbers(e.target.value))}
                      value={sizeHeight}
                      placeholder="0"
                      min="0"
                      className="bg-white focus-visible:ring-0 truncate text-secondary"
                      disabled={isLoading}
                  />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Label htmlFor="sizeWidth" className="text-secondary whitespace-nowrap">Largura:</Label>
                  <Input
                      id="sizeWidth"
                      type="text"
                      inputMode="decimal"
                      onChange={(e) => setSizeWidth(onlyNumbers(e.target.value))}
                      value={sizeWidth}
                      placeholder="0"
                      min="0"
                      className="bg-white focus-visible:ring-0 truncate text-secondary"
                      disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="priceAddon" className="text-sm">
                Quanto esse item soma ao preço final? (Opcional)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input
                  id="priceAddon"
                  type="text"
                  inputMode="decimal"
                  onChange={(e) => {
                    const formatted = normalizePriceInput(e.target.value);
                    setPriceAddon(formatted);
                  }}
                  value={priceAddon}
                  placeholder="0.00"
                  className="pl-10 bg-white focus-visible:ring-0 truncate text-secondary"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`flex items-center w-full justify-between px-4 py-3 
          bg-white rounded-lg border`}
        >
          <Label htmlFor="available" className="cursor-pointer">Item Disponível no Estoque?</Label>
          <Switch 
            id="available" 
            checked={available}
            onCheckedChange={setAvailable}
            disabled={isLoading}
            className="cursor-pointer"
          />
        </div>
        
        {isEditMode && (
          <div className="flex items-center w-full justify-center py-2 mb-4">
            <button 
              type="button"
              aria-label="Deletar Item"
              className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors disabled:opacity-50"
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={isLoading}
            >
              <Trash className="w-4 h-4" />
              <span className="text-sm font-medium hover:underline">
                Deletar Item
              </span>
            </button>

            <CustomModal
              modalOpen={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
            >
              <div className="flex flex-col items-center justify-center p-2 gap-4">
                <p className="font-bold text-center">
                  Tem certeza que deseja deletar este item?
                </p>

                <div className="flex w-full items-center justify-end gap-2">
                  <button 
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className={`flex w-full px-4 py-2 rounded-lg items-center justify-center
                      bg-gray-100 hover:bg-gray-200 font-medium cursor-pointer
                    `}
                    disabled={isLoading}
                  >
                    <span>Cancelar</span>
                  </button>
                  <button 
                    type="button"
                    onClick={handleDeleteItem}
                    className={`flex w-full px-4 py-2 rounded-lg items-center justify-center font-medium cursor-pointer
                      bg-red-500 text-white hover:bg-red-600 disabled:opacity-70`}
                    disabled={isLoading}
                  >
                    {isPending ? "Deletando..." : "Confirmar"}
                  </button>
                </div>
              </div>
            </CustomModal>
          </div>
        )}
      </form>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2 lg:pt-0">
        <hr className="border-muted-foreground/50 mb-2 lg:hidden" />
        <div className="flex lg:justify-end">
          <div className="flex gap-4 w-full lg:w-1/2 xl:w-1/3">
            <BackButton backRoute />
            <button
              type="submit"
              aria-label={isEditMode ? "Salvar Alterações" : "Criar Item"}
              form="customization-form" 
              className={`flex w-full px-4 py-1 rounded-lg font-medium
                bg-primary text-white items-center justify-center hover:bg-primary/90 
                cursor-pointer transition-colors disabled:opacity-70 disabled:cursor-not-allowed
              `}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2 animate-pulse">
                  <span>Salvando...</span>
                </div>
              ) : (
                isEditMode ? "Salvar Alterações" : "Criar Item"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};