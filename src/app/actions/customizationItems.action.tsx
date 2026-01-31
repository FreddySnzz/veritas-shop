'use server';


import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { refreshCacheAction } from "./cache.actions";
import { createCustomizationItem, deleteCustomizationItem, getAllCustomizationItems, getCustomizationItemById, getCustomizationItemByName, updateCustomizationItem } from "@/data/services/customizationItems.service";

export async function getAllCustomizationItemsAction() {
  try {
    const categories = await getAllCustomizationItems();
    return serializeFirestoreData(categories);
  } catch (error) {
    console.error("Erro ao buscar todas as categorias:", error);
    return error;
  };
};

export async function getCustomizationItemByIdAction(id: string) {
  try {
    const category = await getCustomizationItemById(id);
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao buscar categoria por id:", error);
    return error;
  };
};

export async function getCustomizationItemByNameAction(name: string) {
  try {
    const category = await getCustomizationItemByName(name);
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao buscar categoria por name:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCustomizationItemAction(data: any) {
  try {
    const category = await createCustomizationItem(data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCustomizationItemAction(id: string, data: any) {
  try {
    const category = await updateCustomizationItem(id, data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return error;
  };
};

export async function deleteCustomizationItemAction(id: string) {
  try {
    await deleteCustomizationItem(id);
    await refreshCacheAction('customization_items');
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
  };
};