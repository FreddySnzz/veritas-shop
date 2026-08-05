'use server';

import { 
  getAllProductCategories,
  getProductCategoryById,
  getProductCategoryByName,
  deleteProductCategory,
  createProductCategory,
  updateProductCategory,
} from "@/data/services/categoryProduct.service";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { refreshCacheAction } from "./cache.actions";
import { revalidatePath } from "next/cache";

export async function getAllProductCategoriesAction() {
  try {
    const categories = await getAllProductCategories();
    return serializeFirestoreData(categories);
  } catch (error) {
    console.error("Erro ao buscar todas as categorias:", error);
    throw error;
  }
}

export async function getProductCategoryByIdAction(id: string) {
  try {
    const category = await getProductCategoryById(id);
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao buscar categoria por id:", error);
    throw error;
  }
}

export async function getProductCategoryByNameAction(name: string) {
  try {
    const category = await getProductCategoryByName(name);
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao buscar categoria por name:", error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProductCategoryAction(data: any) {
  try {
    const category = await createProductCategory(data);
    await refreshCacheAction('product_categories');
    revalidatePath('/admin/estoques/categoria-produtos');
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
}

export async function updateProductCategoryAction(
  id: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
) {
  try {
    const category = await updateProductCategory(id, data);
    await refreshCacheAction('product_categories');
    revalidatePath('/admin/estoques/categoria-produtos');
    return serializeFirestoreData(category);
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    throw error;
  }
}

export async function deleteProductCategoryAction(id: string) {
  try {
    await deleteProductCategory(id);
    await refreshCacheAction('product_categories');
    revalidatePath('/admin/estoques/categoria-produtos');
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
  }
}