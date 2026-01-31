'use client';

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createCustomizationItemCategoryAction } from "@/app/actions/customizationItemsCategory.action";
import { removeAccentsAndSpaces } from "@/data/functions/removeAccentsAndSpaces";
import { deleteImageAction, uploadImageAction } from "@/app/actions/cloudinary.actions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { ArrowBigUpDash, Images, Trash } from "lucide-react";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";

interface AddCustomizationItemCategoryProps extends React.HTMLAttributes<HTMLElement> {
  modalOpen: boolean
  onClose?: () => void
};

export default function AddCustomizationItemCategoryModal({ modalOpen, onClose }: AddCustomizationItemCategoryProps) {
  const [name, setName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imagePreview = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    if (imageUrl) return imageUrl;
    return null;
  }, [selectedFile, imageUrl]);

  useLockBodyScroll(modalOpen);

  if (!modalOpen) return null;

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleRemoveImage = async () => {
    if (!imageUrl) {
      setSelectedFile(null);
      return;
    };
    
    setIsLoading(true);

    try {
      // await deleteImageAction(imageUrl);
      setSelectedFile(null);
      setImageUrl("");
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
      let finalUrlToSave = imageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        finalUrlToSave = await uploadImageAction(formData);
      };

      const dataSubmit = {
        name: name,
        category_name: removeAccentsAndSpaces(name),
        image_url: finalUrlToSave,
        available: true,
        updated_at: new Date(),
      };

      const result = await createCustomizationItemCategoryAction(dataSubmit);

      if (result instanceof Error) {
        toast.error("Erro ao adicionar categoria.");
        return;
      };

      toast.success("Categoria adicionada com sucesso!");
    } catch (error) {
      console.error("Erro geral no submit:", error);
      toast.error("Erro ao processar requisição.");
    } finally {
      setName("");
      setIsLoading(false);
      window.location.reload();
    };
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/30 p-4 backdrop-blur-xs transition-all cursor-default"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md bg-white text-secondary p-6 rounded-lg shadow-xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="font-bold text-lg">Nome da Categoria (no plural):</Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Ex: Cordões"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-gray-50 focus-visible:ring-0 truncate text-secondary font-medium"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <Label className="text-sm mb-1">Imagem da Item da Categoria (Opcional)</Label>
              <span className="text-xs text-gray-400 mb-2">*.jpg / *.jpeg / *.png - tam. limite de 10MB</span>
              <span className="text-xs text-gray-400 mb-2">Essa imagem servirá para ajudar o usuário a identificar o item no produto final.</span>
              
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
                {selectedFile || imageUrl ? (
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
          </div>
        </form>

        <div className="flex w-full gap-4">
          <button 
            onClick={onClose}
            className={`flex w-full items-center justify-center px-4 py-2 rounded-lg font-medium cursor-pointer
              bg-gray-50 text-secondary border border-gray-100 hover:bg-gray-100 transition-colors
              `}
          >
            <span>Fechar</span>
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className={`flex w-full px-4 py-2 rounded-lg justify-center items-center cursor-pointer transition-colors font-medium
              bg-primary text-white hover:bg-primary/80
            `} 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2"> 
                <span>Salvando...</span>
              </div>
            ) : 
              <div className="flex justify-center items-center gap-2"> 
                <span>Salvar</span>
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  );
};