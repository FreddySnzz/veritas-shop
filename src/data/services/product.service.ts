import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Collections } from "../types/collections.enum";
import ProductModel from "../models/Product.model";
import { unstable_cache } from "next/cache";

export class ProductServiceError extends Error {
  status: number;
  constructor(
    message: string, 
    status = 400
  ) {
    super(message);
    this.status = status;
  };
};

async function productExists(
  name: string,
): Promise<boolean> {
  const productRef = collection(db, Collections.PRODUCTS_COLLECTION);

  const nameQuery = query(
    productRef, where("name", "==", name)
  );

  const nameSnap = await getDocs(nameQuery);

  if (!nameSnap.empty) return true;

  return false;
};

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

export async function getProductById(id: string) {
  const docSnap = await getDoc(
    doc(db, Collections.PRODUCTS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as ProductModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Product not exists", 404
  );

  return data;
};

export async function createProduct(data: ProductModel): Promise<ProductModel> {
  const verifyProductExists = await productExists(data.name);

  if (verifyProductExists) {
    throw new ProductServiceError("Product already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.PRODUCTS_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export const getCachedProducts = unstable_cache(
  async () => getAllProducts(),
  ['products'],
  {
    revalidate: 3600,
    tags: ['products'],
  }
);