'use server'

import { revalidateTag } from "next/cache";
import { getCachedProducts } from "@/data/services/product.service";

export async function refreshProductsAction(
  collection: string
) {
  revalidateTag(collection, 'max');
};

export async function getCachedProductsAction() {
  const products = await getCachedProducts();
  
  return products;
};