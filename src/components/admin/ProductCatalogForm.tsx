'use client';

import { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ProductModel from "@/data/models/Product.model";
import { verifyFirebaseId } from "@/data/functions/verifyFirebaseId";
import { getCachedProductsAction } from "@/app/actions/cache.actions";
import { uploadImageAction } from "@/app/actions/upload-image.action";
import { Trash } from "lucide-react";
import { deleteImageAction } from "@/app/actions/delete-image.action";
import { createProductAction } from "@/app/actions/products.action";

interface ProductFormProps {
  initialData?: ProductModel | null
};

export function ProductForm({ 
  initialData,
}: ProductFormProps) {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [desc, setDesc] = useState<string>(initialData?.desc || "");
  const [initialPrice, setInitialPrice] = useState<number>(initialData?.initial_price || 0);
  const [available, setAvailable] = useState<boolean>(initialData?.available || false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(initialData?.image_url || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
          const cachedProducts = await getCachedProductsAction();
          const foundProduct = cachedProducts?.find(p => p.id === productId);

          if (foundProduct) {
            setName(foundProduct.name);
            setDesc(foundProduct.desc || "");
            setInitialPrice(foundProduct.initial_price);
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

    try {
      let finalUrlToSave = currentImageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        
        finalUrlToSave = await uploadImageAction(formData);
      };

      const dataToSubmit = {
        id: isEditMode ? pathname.split('/').pop() : undefined,
        name,
        desc,
        available,
        initial_price: initialPrice,
        image_url: finalUrlToSave,
        updated_at: new Date(),
      };

      if (dataToSubmit.id)  {
        console.log("UPDATE")
        console.log("Enviando para o banco:", dataToSubmit);
      };

      try {
        await createProductAction(dataToSubmit);

        toast.success(isEditMode ? "Produto atualizado!" : "Produto criado!");
        router.push(`/admin/estoques/catalogo`);

      } catch (error) {
        console.error("Erro no processo:", error);
        toast.error("Erro ao salvar produto.");
      } finally {
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Erro no processo:", error);
      toast.error("Erro ao salvar produto.");
    } finally {
      setIsLoading(false);
    };
  };
  
  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col mx-2 gap-4 overflow-y-auto space-y-6 px-4 font-sans">
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
              className="h-12 bg-white focus-visible:ring-0 truncate text-secondary"
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
              className="h-12 bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="initialPrice" className="text-sm">Preço</Label>
            <Input
              id="initialPrice"
              type="number"
              required
              onChange={(e) => setInitialPrice(parseFloat(e.target.value) || 0)}
              value={initialPrice}
              className="h-12 bg-white focus-visible:ring-0 truncate text-secondary"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="image" className="text-sm">
              {isEditMode ? "Alterar Imagem (Opcional)" : "Imagem (Opcional)"}
            </Label>

            <span className="text-xs text-gray-400 mb-2">*.jpg / *.jpeg / *.png</span>

            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="bg-gray-300 focus-visible:ring-0 px-4 mt-2 font-medium cursor-pointer"
              disabled={isLoading}
            />

            { imagePreview && (
              <div className="flex flex-col justify-center items-center mt-6">
                <div className="relative w-62 h-50">
                  <Image
                    src={imagePreview}
                    alt="preview"
                    draggable="false"
                    fill
                    className="object-cover rounded-2xl border border-gray-200 shadow-sm"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  className="flex justify-center items-center gap-2 mt-4 cursor-pointer"
                >
                  <Trash className="w-4 h-4" />
                  <span className="text-sm">Apagar Imagem</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center mt-4">
            <Label htmlFor="available" className="">Disponível</Label>
            <Switch 
              id="available" 
              disabled={isLoading}
              onCheckedChange={setAvailable} 
              checked={available}
            />
          </div>
        </div>
      </form>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2">
        <hr className="border-muted-foreground/50 mb-4 mx-4" />
        <div className="flex mx-4 my-4 gap-4">
          <button 
            type="button"
            onClick={() => router.push('/admin/estoques/catalogo')}
            className="flex w-full px-4 py-3 rounded-lg bg-primary/20 text-secondary items-center justify-center hover:bg-red-200 cursor-pointer transition-colors" 
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button 
            type="submit" 
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