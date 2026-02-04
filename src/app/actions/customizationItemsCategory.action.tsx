'use server';

import { 
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  deleteCategory,
  createCategory,
  updateCategory,
  updateCategoryStatus, 
} from "@/data/services/categoryItem.service";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { refreshCacheAction } from "./cache.actions";

export async function getAllCategoriesAction() {
  try {
    const categories = await getAllCategories();
    return serializeFirestoreData(categories);
  } catch (error) {
    console.error("Erro ao buscar todas as categorias:", error);
    return error;
  };
};

export async function getCategoryByIdAction(id: string) {
  try {
    const category = await getCategoryById(id);
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao buscar categoria por id:", error);
    return error;
  };
};

export async function getCategoryByNameAction(name: string) {
  try {
    const category = await getCategoryByName(name);
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao buscar categoria por name:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCustomizationItemCategoryAction(data: any) {
  try {
    const category = await createCategory(data);
    await refreshCacheAction('customization_items_categories');
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCustomizationItemCategoryAction(
  id: string, 
  data: any
) {
  try {
    const category = await updateCategory(id, data);
    await refreshCacheAction('customization_items_categories');
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCustomizationItemCategoryStatusAction(
  id: string, 
  data: any
) {
  try {
    const category = await updateCategoryStatus(id, data.available);

    await refreshCacheAction('products');
    await refreshCacheAction('customization_items');
    await refreshCacheAction('customization_items_categories');

    return category;
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return error;
  };
};

export async function deleteCategoryAction(id: string) {
  try {
    await deleteCategory(id);
    await refreshCacheAction('customization_items_categories');
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
  };
};