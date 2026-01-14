'use server';

import { createProduct } from "@/data/services/product.service";
import { refreshProductsAction } from "./cache.actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProductAction(data: any) {
  const product = await createProduct({
    ...data,
    initial_price: data.initial_price * 100
  });

  await refreshProductsAction('products');

  return product;
};