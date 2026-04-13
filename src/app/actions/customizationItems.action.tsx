'use server';


import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { refreshCacheAction } from "./cache.actions";
import { 
  copyCustomizationItems,
  createCustomizationItem, 
  deleteCustomizationItem, 
  getAllCustomizationItems, 
  getCustomizationItemById, 
  getCustomizationItemByRef, 
  updateCustomizationItem 
} from "@/data/services/customizationItems.service";

export async function getAllCustomizationItemsAction() {
  try {
    const customizationItems = await getAllCustomizationItems();
    return serializeFirestoreData(customizationItems);
  } catch (error) {
    console.error("Erro ao buscar todos os itens de personalização:", error);
    throw error;
  };
};

export async function getCustomizationItemByIdAction(id: string) {
  try {
    const customizationItem = await getCustomizationItemById(id);
    return serializeFirestoreData(customizationItem);
  } catch (error) {
    console.error("Erro ao buscar item de personalização por id:", error);
    throw error;
  };
};

export async function getCustomizationItemByRefAction(ref: string) {
  try {
    const customizationItem = await getCustomizationItemByRef(ref);

    if (!customizationItem) return null;
    return serializeFirestoreData(customizationItem);
  } catch (error) {
    console.error("Erro ao buscar item de personalização por ref:", error);
    throw error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCustomizationItemAction(data: any) {
  try {
    const customizationItem = await createCustomizationItem(data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(customizationItem);
  } catch (error) {
    console.error("Erro ao criar item de personalização:", error);
    throw error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCustomizationItemAction(id: string, data: any) {
  try {
    const customizationItem = await updateCustomizationItem(id, data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(customizationItem);
  } catch (error) {
    console.error("Erro ao atualizar item de personalização:", error);
    throw error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function copyCustomizationItemsAction(data: any) {
  try {
    const customizationItems = await copyCustomizationItems(data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(customizationItems);
  } catch (error) {
    console.error("Erro ao copiar itens de personalização:", error);
    throw error;
  };
};

export async function deleteCustomizationItemAction(id: string) {
  try {
    await deleteCustomizationItem(id);
    await refreshCacheAction('customization_items');
  } catch (error) {
    console.error("Erro ao excluir item de personalização:", error);
  };
};