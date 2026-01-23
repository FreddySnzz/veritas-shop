'use server';

import { 
  createProduct, 
  deleteProduct, 
  getAllProducts, 
  getProductById, 
  getProductByName, 
  updateProduct 
} from "@/data/services/product.service";
import { refreshCacheAction } from "./cache.actions";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

export async function getAllProductsAction() {
  try {
    const products = await getAllProducts();
    return serializeFirestoreData(products);
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    return null;
  };
};

export async function getProductByNameAction(name: string) {
  try {
    const product = await getProductByName(name);
    return serializeFirestoreData(product);
  } catch (error) {
    console.error("Erro ao carregar produto:", error);
    return null;
  };
};

export async function getProductByIdAction(id: string) {
  try {
    const product = await getProductById(id);
    return serializeFirestoreData(product);
  } catch (error) {
    console.error("Erro ao carregar produto:", error);
    return null;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProductAction(data: any) {
  try {
    const product = await createProduct(data);
    await refreshCacheAction('products');
    return serializeFirestoreData(product);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return null;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProductAction(id: string, data: any) {
  try {
    const product = await updateProduct(id, data);
    await refreshCacheAction('products');
    return serializeFirestoreData(product);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return null;
  };
};

export async function deleteProductAction(id: string) {
  try {
    await deleteProduct(id);
    await refreshCacheAction('products');
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
  };
};