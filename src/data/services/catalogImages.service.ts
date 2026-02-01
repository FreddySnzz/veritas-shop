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
} from "firebase/firestore";
import { unstable_cache } from "next/cache";
import { Collections } from "../types/collections.enum";
import CatalogImageModel from "../models/CatalogImage.model";
import { ProductServiceError } from "./product.service";

export async function getAllCatalogImages(): Promise<CatalogImageModel[] | null> {
  const q = query(collection(
    db, 
    Collections.CATALOG_IMAGES_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data
    } as CatalogImageModel;
  });
};

export async function getCatalogImageById(id: string) {
  const docSnap = await getDoc(
    doc(db, Collections.CATALOG_IMAGES_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as CatalogImageModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "CatalogImage not exists", 404
  );

  return data;
};

export async function createCatalogImage(data: CatalogImageModel): Promise<CatalogImageModel> {
  const docRef = await addDoc(collection(db, Collections.CATALOG_IMAGES_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateCatalogImage(id: string, data: CatalogImageModel): Promise<CatalogImageModel> {
  const docRef = doc(db, Collections.CATALOG_IMAGES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("CatalogImage not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteCatalogImage(id: string) {
  const docRef = doc(db, Collections.CATALOG_IMAGES_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("CatalogImage not exists", 404);
  };

  await deleteDoc(docRef);
};

export const getCachedCatalogImages = unstable_cache(
  async () => getAllCatalogImages(),
  ['catalog_images'],
  {
    revalidate: 86400, // segs = 1d
    tags: ['catalog_images'],
  }
);