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
import { unstable_cache } from "next/cache";
import { Collections } from "../types/collections.enum";
import { ProductServiceError } from "./product.service";
import { CustomizationItemsModel } from "../models/CustomizationItems.model";

export async function getAllCustomizationItems(): Promise<CustomizationItemsModel[] | null> {
  const q = query(collection(
    db, 
    Collections.CUSTOMIZATION_ITEMS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as CustomizationItemsModel;
  });
};

export async function getCustomizationItemById(
  id: string
): Promise<CustomizationItemsModel> {
  const docSnap = await getDoc(
    doc(db, Collections.CUSTOMIZATION_ITEMS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as CustomizationItemsModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "CustomizationItem not exists", 404
  );

  return data;
};

export async function getCustomizationItemByRef(
  ref: string
): Promise<CustomizationItemsModel[]> {
  const customizationItemRef = collection(db, Collections.CUSTOMIZATION_ITEMS_COLLECTION);

  const refQuery = query(customizationItemRef, where("ref", "==", ref));
  const refSnap = await getDocs(refQuery);

  return refSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as CustomizationItemsModel[];
};

export async function createCustomizationItem(
  data: CustomizationItemsModel
): Promise<CustomizationItemsModel> {
  const docRef = await addDoc(collection(db, Collections.CUSTOMIZATION_ITEMS_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateCustomizationItem(
  id: string, 
  data: CustomizationItemsModel
): Promise<CustomizationItemsModel> {
  const docRef = doc(db, Collections.CUSTOMIZATION_ITEMS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("CustomizationItem not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteCustomizationItem(id: string) {
  const docRef = doc(db, Collections.CUSTOMIZATION_ITEMS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("CustomizationItem not exists", 404);
  };

  await deleteDoc(docRef);
};

export const getCachedCustomizationItems = unstable_cache(
  async () => await getAllCustomizationItems(),
  ['customization_items'],
  {
    revalidate: 1800,
    tags: ['customization_items'],
  }
);