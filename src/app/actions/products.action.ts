'use server';

import { 
  createProduct, 
  deleteProduct, 
  updateProduct 
} from "@/data/services/product.service";
import { refreshProductsAction } from "./cache.actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProductAction(data: any) {
  const product = await createProduct(data);

  await refreshProductsAction('products');

  return product;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProductAction(id: string, data: any) {
  const product = await updateProduct(id, data);

  await refreshProductsAction('products');

  return product;
};

export async function deleteProductAction(id: string) {
  await deleteProduct(id);

  await refreshProductsAction('products');
};