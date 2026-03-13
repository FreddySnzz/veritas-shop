'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { 
  createCustomizationItemCategoryAction, 
  updateCustomizationItemCategoryAction 
} from "@/app/actions/customizationItemsCategory.action";
import { removeAccentsAndSpaces } from "@/data/functions/removeAccentsAndSpaces";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { deleteImageAction, uploadImageAction } from "@/app/actions/cloudinary.actions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { ArrowBigUpDash, Images, Trash, X } from "lucide-react";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { Textarea } from "../ui/textarea";

interface CustomizationItemCategoryProps extends React.HTMLAttributes<HTMLElement> {
  mode: 'editar' | 'adicionar';
  initialData?: CustomizationItemsCategoryModel;
  modalOpen: boolean
  onClose?: () => void
};

export default function CustomizationItemCategoryModal({ 
  mode,
  initialData,
  modalOpen, 
  onClose 
}: CustomizationItemCategoryProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modalOpen) {
      if (mode === 'editar' && initialData) {
        setName(initialData.name);
        setDescription(initialData.description || '');
        setImageUrl(initialData.image_url || '');
      } else {
        setName('');
        setDescription('');
        setImageUrl('');
      }
      setSelectedFile(null);
    };
  }, [modalOpen, mode, initialData]);

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
      await deleteImageAction(imageUrl);
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
        description: description,
        image_url: finalUrlToSave,
        available: true,
        updated_at: new Date(),
      };

      if (mode === 'editar' && initialData) {
        const result = await updateCustomizationItemCategoryAction(
          initialData.id, 
          dataSubmit
        );

        if (result instanceof Error) {
          toast.error("Erro ao editar categoria.");
          return;
        };
      } else if (mode === 'adicionar') {
        const result = await createCustomizationItemCategoryAction(dataSubmit);
  
        if (result instanceof Error) {
          toast.error("Erro ao adicionar categoria.");
          return;
        };
      };

      toast.success(`Categoria ${mode === 'editar' ? 'editada' : 'adicionada'} com sucesso!`);
    } catch (error) {
      console.error("Erro geral no submit:", error);
      toast.error("Erro ao processar requisição.");
    } finally {
      setName("");
      setDescription("");
      setImageUrl("");
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    };
  };

  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
        bg-black/30 p-4 backdrop-blur-xs transition-all cursor-default
      `}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md h-full overflow-y-auto scrollbar-hide
         bg-white text-secondary p-6 rounded-lg shadow-xl"
      >
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === 'editar' ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          <button 
            type="button"
            aria-label="Fechar"
            title="Fechar"
            onClick={onClose} 
            className="cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-400 transition-colors" />
          </button>
        </div>

        <form 
          id="add-category"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="font-bold">
                Nome da Categoria (no plural):
              </Label>
              
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Ex: Cordões"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-gray-50 focus-visible:ring-0 truncate text-secondary"
                disabled={isLoading}
              />

              {mode === 'editar' && (
                <span className="text-xs text-primary">
                  ATENÇÃO: Alterar o nome da categoria pode causar problemas no sistema.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="font-bold">
                Descrição da Categoria (opcional):
              </Label>
              
              <Textarea
                id="description"
                autoComplete="description"
                placeholder="Ex: Selecione a cor da Conta."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="bg-gray-50 focus-visible:ring-0 text-secondary text-sm"
                disabled={isLoading}
              />

              <span className="text-xs text-primary">
                A descrição da categoria será exibida como subtítulo na página de personalização.
              </span>
            </div>

            <div className="flex flex-col">
              <Label className="font-bold mb-1">
                Imagem do Item da Categoria (Opcional)
              </Label>
              <span className="text-xs text-gray-400 mb-2">
                *.jpg / *.jpeg / *.png - tam. limite de 10MB
              </span>
              
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />

              <button 
                type="button" 
                aria-label="Alterar Imagem"
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
                <div className="relative mt-4 flex flex-col items-center p-4 border rounded-xl bg-gray-50">
                  <div className="relative w-30 h-30">
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
                    aria-label="Remover imagem"
                    onClick={handleRemoveImage}
                    disabled={isLoading}
                    className={`mt-3 flex items-center gap-2 text-red-500 hover:text-red-700 
                      text-sm font-medium cursor-pointer
                    `}
                  >
                    <Trash className="w-4 h-4" />
                    <span>Remover Imagem</span>
                  </button>
                </div>
              )}

              <span className="text-xs text-primary mt-2">
                Essa imagem servirá para ajudar o usuário a identificar o item no produto final.
              </span>
            </div>
          </div>
        </form>

        <div className="flex w-full gap-4">
          <button 
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className={`flex w-full items-center justify-center px-4 py-2 rounded-lg font-medium 
              bg-gray-50 text-secondary border border-gray-100 hover:bg-gray-100 
              transition-colors disabled:opacity-50 cursor-pointer
            `}
            disabled={isLoading}
          >
            <span>Fechar</span>
          </button>

          <button 
            form="add-category"
            type="submit" 
            aria-label="Salvar Categoria"
            onClick={handleSubmit}
            className={`flex w-full px-4 py-2 rounded-lg justify-center items-center cursor-pointer 
              bg-primary text-white hover:bg-primary/80 transition-colors font-medium
              disabled:opacity-50
            `} 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center"> 
                <span>Salvando...</span>
              </div>
            ) : 
              <div className="flex justify-center items-center"> 
                <span>Salvar</span>
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  );
};