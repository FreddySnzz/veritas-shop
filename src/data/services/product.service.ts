import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Collections } from "../types/collections.enum";
import ProductModel from "../models/Product.model";
import { unstable_cache } from "next/cache";
import { getAllCrucifixos } from "./customization-items/crucifixo.service";
import { getAllContas } from "./customization-items/conta.service";
import { getAllEntremeios } from "./customization-items/entremeio.service";
import { getAllLetras } from "./customization-items/letra.service";
import { getAllCordoes } from "./customization-items/cordao.service";

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
      initial_price: data.initial_price / 100
    } as ProductModel;
  });
};

export async function getProductByName(
  name: string,
): Promise<ProductModel[] | null> {
  const productRef = collection(db, Collections.PRODUCTS_COLLECTION);

  const nameQuery = query(
    productRef, where("name", "==", name)
  );

  const nameSnap = await getDocs(nameQuery);

  return nameSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      initial_price: data.initial_price / 100
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

export async function updateProduct(id: string, data: ProductModel): Promise<ProductModel> {
  const docRef = doc(db, Collections.PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Product not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteProduct(id: string) {
  const docRef = doc(db, Collections.PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Product not exists", 404);
  };

  await deleteDoc(docRef);
};

export const getCachedProducts = unstable_cache(
  async () => getAllProducts(),
  ['products'],
  {
    revalidate: 3600,
    tags: ['products'],
  }
);

export const getCachedCustomizationItems = unstable_cache(
  async () => ({
    crucifixos: await getAllCrucifixos(),
    contas: await getAllContas(),
    entremeios: await getAllEntremeios(),
    letras: await getAllLetras(),
    cordoes: await getAllCordoes(),
  }),
  ['customization_items'],
  {
    revalidate: 1800,
    tags: ['customization_items'],
  }
);