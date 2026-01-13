import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { Collections } from "../types/collections.enum";
import ProductModel from "../models/Product.model";
import { unstable_cache } from "next/cache";

export async function getAllProducts(): Promise<ProductModel[] | null> {
  const q = query(collection(
    db, 
    Collections.PRODUCTS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      initial_price: data.initial_price / 100,
      updated_at: data.updated_at?.toMillis(),
    } as ProductModel;
  });
};

export const getCachedProducts = unstable_cache(
  async () => getAllProducts(),
  ['products'],
  {
    revalidate: 3600,
    tags: ['products'],
  }
);