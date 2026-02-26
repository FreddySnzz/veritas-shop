'use client';

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { updateCatalogImageAction } from "@/app/actions/catalogImages.action";
import { uploadImageAction } from "@/app/actions/cloudinary.actions";
import { Plus, Trash, Pencil } from "lucide-react";
import { BackButton } from "../buttons/BackButton";
import { CustomButton } from "../buttons/CustomButton";
import { ToggleCustomizationItemAvailableSwitch } from "../buttons/ToggleCustomizationItemAvailableSwitch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Loading from "@/app/admin/loading";
import AddCatalogImageModal from "../modals/AddCatalogImage";
import CatalogImageModel from "@/data/models/CatalogImage.model";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";
import DeleteCatalogImageModal from "../modals/DeleteCatalogImage";
import { useIsTouchDevice } from "@/data/hook/useMouseDrag";
import { FloatAddButton } from "../buttons/AddButton";

interface ManageCatalogImagesProps {
  images: CatalogImageModel[];
  className?: string;
};

type PendingChange = {
  newFile?: File;
  previewUrl?: string;
  newDesc?: string;
};

export default function ManageCatalogImages({ images, className }: ManageCatalogImagesProps) {
  const [pendingChanges, setPendingChanges] = useState<Record<string, PendingChange>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState<string>('');

  const isTouchDevice = useIsTouchDevice();

  const handleOpenAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleOpenDeleteModal = (imageId?: string) => {
    if (imageId) setDeleteImageId(imageId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      
      setPendingChanges((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          newFile: file,
          previewUrl: objectUrl
        }
      }));
    };
  };

  const handleUpdateDescription = (value: string, id: string) => {
    setPendingChanges((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        newDesc: value
      }
    }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);

    try {
      const updatePromises = Object.entries(pendingChanges).map(async ([id, fields]) => {
        let uploadedUrl = undefined;

        if (fields?.newFile) {
          const formData = new FormData();
          formData.append("file", fields.newFile);
          
          uploadedUrl = await uploadImageAction(formData); 
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataToSubmit: any = {};

        if (fields?.newDesc !== undefined) {
          dataToSubmit.desc = fields.newDesc;
        };

        if (uploadedUrl) {
          dataToSubmit.image_url = uploadedUrl;
        };

        if (Object.keys(dataToSubmit).length === 0) return;

        return updateCatalogImageAction(id, dataToSubmit);
      });

      await Promise.all(updatePromises);

      toast.success("Todas as alterações foram salvas!");
      setPendingChanges({}); 
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      toast.error("Ocorreu um erro ao salvar algumas alterações.");
    } finally {
      setIsLoading(false);
      window.location.reload();
    };
  };

  const hasPendingChanges = Object.keys(pendingChanges).length > 0;
  
  if (isLoading) return <Loading />;

  return (
    <div className={`flex flex-col font-sans h-full ${className}`}>
      <div className="flex justify-end mb-4">
        <CustomButton
          onClick={handleOpenAddModal}
          className={`hidden md:flex items-center justify-center gap-2 shrink-0 
            bg-primary text-white hover:bg-primary/90 lg:flex-row w-full transition-colors
            rounded-lg lg:w-1/4 xl:w-1/6 md:py-3 lg:py-5 px-4 text-nowrap
          `}
        >
          <Plus className="w-6 h-6" />
          <span>Adicionar Imagem</span>
        </CustomButton>
      </div>

      <div className="fixed md:hidden bottom-22 right-5 z-15">
        <FloatAddButton
          pushRoute={'#'}
          onClick={handleOpenAddModal}
          className="p-3"
        />
      </div>

      {images.length === 0 ? (
        <div className={`flex flex-col w-full h-[55vh] gap-4 
          items-center justify-center text-gray-400`}
        >
          <div className="flex flex-col items-center justify-center">
            <span>Nenhuma imagem encontrada.</span>
            <span className="font-bold text-sm">
              {`Adicione uma nova imagem no botão "Adicionar".`}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className={`flex-1 flex flex-col min-h-0 overflow-y-auto content-start 
            gap-4 scrollbar-hide lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4`}
          >
            {images?.map((image) => {
              const changes = pendingChanges[image.id];
              const currentSrc = changes?.previewUrl || image.image_url;
              const currentDesc = changes?.newDesc !== undefined ? changes.newDesc : image.desc;

              return (
                <div 
                  key={image.id}
                  className={`relative flex p-4 rounded-2xl h-fit bg-white`}
                >
                  <div className="flex flex-col gap-2 w-full">
                    <Input
                      id={`name-${image.id}`}
                      type="text"
                      placeholder="Descrição para a imagem (opcional)"
                      onChange={(e) => handleUpdateDescription(e.target.value, image.id)}
                      value={currentDesc || ''}
                      className={`bg-white truncate text-sm line-clamp-1 font-medium text-secondary border-none 
                        shadow-none p-0 h-4 rounded-none
                        focus-visible:ring-0 focus:bg-gray-50 focus:rounded-lg focus:border focus:h-6 focus:px-2
                      `}
                    />
                    
                    <div className="relative w-full h-60 shrink-0 group rounded-2xl overflow-hidden">
                      <label 
                        htmlFor={`file-input-${image.id}`} 
                        className="cursor-pointer block w-full h-full relative"
                      >
                        {currentSrc ? (
                          <Image
                            src={currentSrc || ''}
                            alt="preview"
                            draggable="false"
                            fill
                            loading="eager"
                            className="aspect-square object-cover shadow-sm transition-opacity group-hover:opacity-90"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className={`shrink-0 flex items-center justify-center h-full rounded-2xl bg-gray-200`}>
                            <span className="text-sm text-secondary px-2 text-center font-medium">
                              Sem Imagem
                            </span>
                          </div>
                        )}
                        
                        <div 
                          className={`absolute inset-0 flex items-center justify-center transition-opacity
                            bg-black/10 rounded-2xl opacity-0 group-hover:opacity-100
                          `}
                        >
                          <span className="bg-white/80 text-xs px-2 py-1 rounded-lg shadow text-black font-semibold">
                            Alterar Imagem
                          </span>
                        </div>

                        {isTouchDevice && (
                          <div 
                            className={`absolute flex items-center justify-center 
                              bg-secondary/80 rounded-bl-xl p-2 right-[-2] top-[-2]
                            `}
                          >
                            <Pencil className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </label>
                      
                      <input
                        id={`file-input-${image.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, image.id)}
                      />
                    </div>

                    <div className="flex items-center w-full justify-between px-2 py-2 rounded-lg">
                      <Label htmlFor="available">Visível no Catálogo?</Label>
                      <ToggleCustomizationItemAvailableSwitch
                        idProduct={image.id}
                        available={image.available}
                        itemType={ItemsCustomizationTypes.catalogImage}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => handleOpenDeleteModal(image.id)}
                        className={`flex items-center justify-center gap-2 
                          text-red-700 hover:text-red-500 transition-colors shrink-0 rounded-2xl 
                          font-medium text-xs cursor-pointer
                        `}
                      >
                        <Trash className="w-4 h-4" />
                        <span>Apagar Imagem do Catálogo</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="shrink-0 md:hidden mt-auto bg-background-alternative z-10">
            <hr className="border-muted-foreground/50 my-2" />
            <div className="flex flex-col gap-4">
              {hasPendingChanges && (
                <CustomButton
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                  className={`flex items-center justify-center w-full py-2 gap-2 
                    bg-primary hover:bg-primary/80 text-white animate-in fade-in slide-in-from-bottom-4
                  `}
                >
                  {isLoading ? (
                    <span>Salvando...</span>
                  ) : (
                    <span>Salvar Alterações ({Object.keys(pendingChanges).length})</span>
                  )}
                </CustomButton>
              )}
              <BackButton backRoute />
            </div>
          </div>
        </>
      )}

      <div className={`shrink-0 md:hidden mt-auto bg-background-alternative z-10 
        ${images.length > 0 && 'hidden'}`}
      >
        <hr className="border-muted-foreground/50 my-2" />
        <div className="flex flex-col gap-4">
          <BackButton backRoute />
        </div>
      </div>

      <AddCatalogImageModal 
        modalOpen={isAddModalOpen} 
        onClose={handleOpenAddModal}
      />
      <DeleteCatalogImageModal 
        idCatalogImage={deleteImageId} 
        modalOpen={isDeleteModalOpen} 
        onClose={handleOpenDeleteModal}
      />
    </div>
  );
};