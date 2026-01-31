'use server';

import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { refreshCacheAction } from "./cache.actions";
import { 
  createCatalogImage, 
  deleteCatalogImage, 
  getAllCatalogImages, 
  updateCatalogImage 
} from "@/data/services/catalogImages.service";

export async function getAllCatalogImagesAction() {
  try {
    const images = await getAllCatalogImages();
    return images;
  } catch (error) {
    console.error("Erro ao carregar imagens:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCatalogImageAction(data: any) {
  try {
    const image = await createCatalogImage(data);
    await refreshCacheAction('catalog_images');
    return image;
  } catch (error) {
    console.error("Erro ao criar imagem:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCatalogImageAction(id: string, data: any) {
  try {
    const image = await updateCatalogImage(id, data);
    await refreshCacheAction('catalog_images');
    return serializeFirestoreData(image);
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    return error;
  };
};

export async function deleteCatalogImageAction(id: string) {
  try {
    await deleteCatalogImage(id);
    await refreshCacheAction('catalog_images');
  } catch (error) {
    console.error("Erro ao excluir imagem:", error);
  };
};