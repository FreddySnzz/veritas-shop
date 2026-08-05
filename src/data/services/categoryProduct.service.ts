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
import { ProductCategoryModel } from "../models/ProductCategory.model";

export async function getAllProductCategories(): Promise<ProductCategoryModel[] | null> {
  const q = query(collection(
    db, 
    Collections.PRODUCTS_CATEGORIES_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as ProductCategoryModel;
  });
};

export async function getProductCategoryById(
  id: string
): Promise<ProductCategoryModel> {
  const docSnap = await getDoc(
    doc(db, Collections.PRODUCTS_CATEGORIES_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as ProductCategoryModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Category not exists", 404
  );

  return data;
};

export async function getProductCategoryByName(
  name: string
): Promise<ProductCategoryModel[]> {
  const categoryRef = collection(db, Collections.PRODUCTS_CATEGORIES_COLLECTION);

  const nameQuery = query(categoryRef, where("name", "==", name));
  const refSnap = await getDocs(nameQuery);

  return refSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as ProductCategoryModel[];
};

export async function createProductCategory(
  data: ProductCategoryModel
): Promise<ProductCategoryModel> {
  const verifyCategoryExists = await getProductCategoryByName(data.name);
  
  if (verifyCategoryExists.length > 0) {
    throw new ProductServiceError("Product Category already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.PRODUCTS_CATEGORIES_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateProductCategory(
  id: string, 
  data: ProductCategoryModel
): Promise<ProductCategoryModel> {
  const docRef = doc(db, Collections.PRODUCTS_CATEGORIES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Category not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteProductCategory(id: string) {
  const docRef = doc(db, Collections.PRODUCTS_CATEGORIES_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Product Category not exists", 404);
  };

  await deleteDoc(docRef);
};

export const getCachedProductCategories = unstable_cache(
  async () => {
    const categories = await getAllProductCategories();
    return categories?.map((category) => ({
      id: category.id,
      name: category.name,
      image_url: category?.image_url,
    } as ProductCategoryModel));
  },
  ['product_categories'],
  {
    revalidate: 3600,
    tags: ['product_categories'],
  }
);