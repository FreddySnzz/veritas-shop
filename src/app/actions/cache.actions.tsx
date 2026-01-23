'use server'

import { revalidateTag } from "next/cache";
import { 
  getCachedCustomizationItems, 
  getCachedProducts 
} from "@/data/services/product.service";
import { getCachedCatalogImages } from "@/data/services/catalogImages.service";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

export async function refreshCacheAction(collection: string) {
  revalidateTag(collection, "max");
};

export async function getCachedProductsAction() {
  const products = await getCachedProducts();
  
  return serializeFirestoreData(products);
};

export async function getCachedCatalogImagesAction() {
  const catalogImages = await getCachedCatalogImages();
  
  return serializeFirestoreData(catalogImages);
};

export async function getCachedCustomizationItemsAction() {
  const customizationItems = await getCachedCustomizationItems();
  
  return serializeFirestoreData(customizationItems);
};