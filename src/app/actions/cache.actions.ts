'use server'

import { getCachedProducts } from "@/data/services/product.service";
import { revalidateTag } from "next/cache";

export async function refreshProductsAction(
  collection: string
) {
  revalidateTag(collection, 'max');
};

export async function getCachedProductsAction() {
  const products = await getCachedProducts();
  
  return products;
};