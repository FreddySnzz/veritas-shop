'use client';

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLockBodyScroll } from "@/data/hook/useBodyLockScroll";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ArrowBigUpDash, Images, Trash, X } from "lucide-react";
import { deleteImageAction, uploadImageAction } from "@/app/actions/cloudinary.actions";
import { createCatalogImageAction } from "@/app/actions/catalogImages.action";
import { toast } from "sonner";

interface AddCatalogImageProps extends React.HTMLAttributes<HTMLElement> {
  modalOpen: boolean
  onClose?: () => void
};

export default function AddCatalogImageModal({ 
  modalOpen, 
  onClose 
}: AddCatalogImageProps) {
  const [desc, setDesc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useLockBodyScroll(modalOpen);

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
    } catch (error) {
      console.error("Erro ao apagar imagem:", error);
    } finally {
      setIsLoading(false);
    };
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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

      const dataToSubmit = {
        desc,
        available: true,
        image_url: finalUrlToSave,
        updated_at: new Date(),
      };

      const result = await createCatalogImageAction(dataToSubmit);

      if (result instanceof Error) {
        toast.error("Erro ao adicionar imagem.");
        return;
      };

      toast.success("Imagem adicionada ao Catálogo!");
      router.refresh();
      router.push(`/admin/editar-carrossel`);
    } catch (error) {
      console.error("Erro no processo:", error);
      toast.error("Erro ao salvar produto.");
    } finally {
      setIsLoading(false);
      onClose?.();
      window.location.reload();
    };
  };

  if (!modalOpen) return null;

  return (
    <div 
      onClick={onClose}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
        bg-black/50 p-4 backdrop-blur-xs transition-all cursor-default
      `}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-xl"
      >
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Adicionar Imagem ao Carrossel
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

        <form onSubmit={handleSubmit}> 
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="desc" className="text-sm">Descrição (Opcional)</Label>
              <Input
                id="desc"
                type="text"
                autoComplete="desc"
                placeholder="Ex: Pulseira de São José Personalizada"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className="bg-gray-50 focus-visible:ring-0 truncate text-secondary"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="image" className="text-sm">
                Imagem do Item
              </Label>
              <div className="flex flex-col mb-4">
                <span className="text-xs text-primary">{`Dica: Opte por imagens widescreen (horizontais).`}</span>
                <span className="text-xs text-gray-400">*.jpg / *.jpeg / *.png - tam. limite de 10MB</span>
              </div>

              <Input
                id="image"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              />
              <button 
                type="button" 
                onClick={handleButtonClick}
                disabled={isLoading}
                className={`flex gap-2 items-center justify-center px-4 py-2 font-medium cursor-pointer
                  bg-gray-100 text-secondary rounded-lg transition-all
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
                <div className="flex flex-col justify-center items-center mt-4">
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
                    className="flex justify-center items-center gap-2 mt-2 cursor-pointer text-secondary"
                  >
                    <Trash className="w-4 h-4" />
                    <span className="text-sm">Apagar Imagem</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="flex w-full mt-2 gap-4">
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
              bg-primary text-white hover:bg-primary/90
            `} 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center"> 
                <span>Salvando...</span>
              </div>
            ) : 'Salvar Imagem'}
          </button>
        </div>
      </div>
    </div>
  );
};