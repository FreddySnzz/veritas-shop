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
import { toast } from "sonner";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import { ArrowBigUpDash, Images, Trash, Loader2 } from "lucide-react";
import { getCachedCustomizationItemsAction } from "@/app/actions/cache.actions";
import { deleteImageAction, uploadImageAction } from "@/app/actions/cloudinary.actions";
import { createCordaoAction, updateCordaoAction } from "@/app/actions/customization-items/cordao.action";
import { createContaAction, updateContaAction } from "@/app/actions/customization-items/conta.action";
import { createEntremeioAction, updateEntremeioAction } from "@/app/actions/customization-items/entremeio.action";
import { createLetraAction, updateLetraAction } from "@/app/actions/customization-items/letra.action";
import { createCrucifixoAction, updateCrucifixoAction } from "@/app/actions/customization-items/crucifixo.action";
import CrucifixoModel from "@/data/models/Crucifixo.model";
import ContaModel from "@/data/models/Conta.model";
import EntremeioModel from "@/data/models/Entremeio.model";
import LetraModel from "@/data/models/Letra.model";
import CordaoModel from "@/data/models/Cordao.model";
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

interface CustomizationItemFormProps {
  mode: string;
  itemId?: string;
  itemType?: keyof typeof ItemsCustomizationTypes;
};

type CachedItemsType = {
  crucifixos: CrucifixoModel[] | null;
  contas: ContaModel[] | null;
  entremeios: EntremeioModel[] | null;
  letras: LetraModel[] | null;
  cordoes: CordaoModel[] | null;
};

const FIELD_CONFIG: Record<string, { hasName: boolean, hasStyle: boolean, hasColor: boolean }> = {
  cordao:     { hasName: true,  hasStyle: false, hasColor: true },
  conta:      { hasName: true,  hasStyle: false, hasColor: true },
  letra:      { hasName: true,  hasStyle: false, hasColor: false },
  crucifixo:  { hasName: false, hasStyle: true,  hasColor: false },
  entremeio:  { hasName: true,  hasStyle: true,  hasColor: false },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ACTIONS_MAP: any = {
  cordao:     { update: updateCordaoAction, create: createCordaoAction },
  conta:      { update: updateContaAction, create: createContaAction },
  letra:      { update: updateLetraAction, create: createLetraAction },
  crucifixo:  { update: updateCrucifixoAction, create: createCrucifixoAction },
  entremeio:  { update: updateEntremeioAction, create: createEntremeioAction },
};

export function CustomizationItemForm({ itemType, itemId, mode }: CustomizationItemFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isEditMode = mode === 'editar';
  const router = useRouter();
  
  const [name, setName] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [categoryKey, setCategoryKey] = useState<keyof CachedItemsType>(
    (itemType as keyof CachedItemsType) || 'cordoes'
  );
  const [color, setColor] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(true);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [allItemsOfCategory, setAllItemsOfCategory] = useState<any[]>([]); 
  const [currentRef, setCurrentRef] = useState<number | null>(null);

  const getSingularType = (key: string) => ItemsCustomizationTypes[key as keyof typeof ItemsCustomizationTypes];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNextRef = (items: any[]) => {
    if (!items || items.length === 0) return 1;
    const maxRef = items.reduce((max, item) => Math.max(max, Number(item.ref) || 0), 0);
    return maxRef + 1;
  };

  async function getInitialData() {
    setIsLoading(true);

    try {
      const cachedItems = await getCachedCustomizationItemsAction();
      
      const currentList = cachedItems[categoryKey] || [];
      setAllItemsOfCategory(currentList);

      if (isEditMode && itemId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundItem = currentList.find((i: any) => i.id === itemId);
        
        if (foundItem) {
          const itemData = foundItem as any; 

          setName(itemData.name || "");
          setStyle(itemData.style || ""); 
          setColor(itemData.color || "");
          setAvailable(itemData.available ?? true);
          setCurrentImageUrl(itemData.image_url || "");
          setCurrentRef(itemData.ref);
        } else {
          toast.error("Item não encontrado.");
          router.push(`/admin/estoques/catalogo`);
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
  }, [categoryKey, itemId, isEditMode]);

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

    const singularType = getSingularType(categoryKey);
    const actions = ACTIONS_MAP[singularType];
    const config = FIELD_CONFIG[singularType];

    if (!actions) {
      toast.error(`Ações não definidas para ${singularType}`);
      setIsLoading(false);
      return;
    };

    try {
      let finalUrlToSave = currentImageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        finalUrlToSave = await uploadImageAction(formData);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        available,
        image_url: finalUrlToSave,
        updated_at: new Date(),
      };

      if (config.hasName) payload.name = name;
      if (config.hasStyle) payload.style = style;
      if (config.hasColor) payload.color = color;

      startTransition(async () => {
        try {
          if (isEditMode && itemId) {
            await actions.update(itemId, payload);
            toast.success("Item atualizado com sucesso!");
          } else {
            const newRef = getNextRef(allItemsOfCategory);
            payload.ref = newRef;
            
            await actions.create(payload);
            toast.success(`Item criado com sucesso!`);
          };
            
          router.refresh();
          router.push(`/admin/estoques/itens-personalizacao/${categoryKey}`);
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

  const currentSingularType = getSingularType(categoryKey);
  const activeConfig = FIELD_CONFIG[currentSingularType] || { hasName: true, hasStyle: false, hasColor: false };

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <form 
        onSubmit={handleSubmit} 
        className="flex-1 flex flex-col gap-4 overflow-y-auto px-6 font-sans scrollbar-hide"
      >
        {activeConfig.hasName && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm">Nome de Referência</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Ex: Marrom"}
              required={activeConfig.hasName}
              disabled={isLoading}
              className="bg-white focus-visible:ring-0 truncate text-secondary"
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Categoria do Item</Label>
          <Select 
            disabled={isEditMode || isLoading}
            value={categoryKey} 
            onValueChange={(value) => setCategoryKey(value as keyof CachedItemsType)}
          >
            <SelectTrigger className={`flex w-full items-center justify-between gap-2 rounded-lg px-4
              bg-white text-sm text-secondary transition-colors hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-transparent focus-visible:ring-primary
            `}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position={"item-aligned"}>
              <SelectGroup className="font-sans">
                {Object.keys(ItemsCustomizationTypes).map((key) => (
                  <SelectItem 
                    key={key} 
                    value={key}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {activeConfig.hasStyle && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="style" className="text-sm">Estilo</Label>
            <Input
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="Ex: Ouro Velho"
              required={activeConfig.hasStyle}
              disabled={isLoading}
              className="bg-white focus-visible:ring-0 truncate text-secondary"
            />
          </div>
        )}

        {activeConfig.hasColor && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="color" className="text-sm">Cor de Referência (Opcional)</Label>
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
        )}

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
                className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                <Trash className="w-4 h-4" />
                <span>Remover Imagem</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center w-full justify-between px-4 py-3 mb-4 bg-white rounded-lg border">
          <Label htmlFor="available">Item Disponível no Estoque?</Label>
          <Switch 
            id="available" 
            checked={available}
            onCheckedChange={setAvailable}
            disabled={isLoading}
            className="cursor-pointer"
          />
        </div>
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