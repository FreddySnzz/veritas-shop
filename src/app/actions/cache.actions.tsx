'use server'

import { revalidateTag } from "next/cache";
import { getCachedProducts } from "@/data/services/product.service";
import { getCachedCatalogImages } from "@/data/services/catalogImages.service";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { getCachedCustomizationItemsCategories } from "@/data/services/categoryItem.service";
import { getCachedCustomizationItems } from "@/data/services/customizationItems.service";
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { CustomizationItemsModel } from "@/data/models/CustomizationItems.model";
import ProductModel from "@/data/models/Product.model";
import { getCachedAdminInfo } from "@/data/services/user.service";

export async function refreshCacheAction(collection: string) {
  revalidateTag(collection, "max");
};

export async function getCachedProductsAction() {
  const products = await getCachedProducts();

  let sortedItems: ProductModel[] = [];
  if (products) {
    sortedItems = [...products].sort((a, b) => {
      return a.name.localeCompare(b.name, 'pt-BR');
    });
  };
  
  return serializeFirestoreData(sortedItems);
};

export async function getCachedAdminInfoAction() {
  const admin = await getCachedAdminInfo();

  if (!admin) {
    return null;
  };

  return serializeFirestoreData(admin);
};

export async function getCachedCatalogImagesAction() {
  const catalogImages = await getCachedCatalogImages();
  
  return serializeFirestoreData(catalogImages);
};

export async function getCachedCustomizationItemsAction() {
  const customizationItems = await getCachedCustomizationItems();

  let sortedItems: CustomizationItemsModel[] = [];
  if (customizationItems) {
    sortedItems = [...customizationItems].sort((a, b) => {
      return a.name.localeCompare(b.name, 'pt-BR');
    });
  };
  
  return serializeFirestoreData(sortedItems);
};

export async function getCachedCustomizationItemsCategoriesAction() {
  const customizationItemsCategories = await getCachedCustomizationItemsCategories();

  let sortedItems: CustomizationItemsCategoryModel[] = [];
  if (customizationItemsCategories) {
    sortedItems = [...customizationItemsCategories].sort((a, b) => {
      return a.name.localeCompare(b.name, 'pt-BR');
    });
  };
  
  return serializeFirestoreData(sortedItems);
};