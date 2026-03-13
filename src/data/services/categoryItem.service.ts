import { db } from "../firebase/config";
import { db as adminDb } from "../firebase/config-admin";
import { firestore } from "firebase-admin";
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
import { CustomizationItemsCategoryModel } from "@/data/models/CustomizationItemsCategory";
import { CustomizationItemConfig } from "../types/customization.type";

export async function getAllCategories(): Promise<CustomizationItemsCategoryModel[] | null> {
  const q = query(collection(
    db, 
    Collections.CUSTOMIZATION_ITEMS_CATEGORIES_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as CustomizationItemsCategoryModel;
  });
};

export async function getCategoryById(
  id: string
): Promise<CustomizationItemsCategoryModel> {
  const docSnap = await getDoc(
    doc(db, Collections.CUSTOMIZATION_ITEMS_CATEGORIES_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as CustomizationItemsCategoryModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Category not exists", 404
  );

  return data;
};

export async function getCategoryByName(
  name: string
): Promise<CustomizationItemsCategoryModel[]> {
  const categoryRef = collection(db, Collections.CUSTOMIZATION_ITEMS_CATEGORIES_COLLECTION);

  const nameQuery = query(categoryRef, where("name", "==", name));
  const refSnap = await getDocs(nameQuery);

  return refSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as CustomizationItemsCategoryModel[];
};

export async function createCategory(
  data: CustomizationItemsCategoryModel
): Promise<CustomizationItemsCategoryModel> {
  const verifyCategoryExists = await getCategoryByName(data.category_name);
  
  if (verifyCategoryExists.length > 0) {
    throw new ProductServiceError("Category already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.CUSTOMIZATION_ITEMS_CATEGORIES_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateCategory(
  id: string, 
  data: CustomizationItemsCategoryModel
): Promise<CustomizationItemsCategoryModel> {
  const docRef = doc(db, Collections.CUSTOMIZATION_ITEMS_CATEGORIES_COLLECTION, id);
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

export async function updateCategoryStatus(
  id: string,
  status: boolean,
) {
  try {
    const category = await getCategoryById(id);

    const categoryRef = adminDb.collection(
      Collections.CUSTOMIZATION_ITEMS_CATEGORIES_COLLECTION
    ).doc(id);

    const itemsSnapshot = await adminDb.collection(
      Collections.CUSTOMIZATION_ITEMS_COLLECTION
    ).where("category", "==", category.category_name).get();

    const productsSnapshot = await adminDb.collection(
      Collections.PRODUCTS_COLLECTION
    ).where("customizable", "==", true).get();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Operation = { ref: firestore.DocumentReference; data: any };
    const operations: Operation[] = [];

    operations.push({
      ref: categoryRef,
      data: { 
        available: status, 
        updated_at: new Date() 
      }
    });

    itemsSnapshot.docs.forEach((doc) => {
      operations.push({
        ref: doc.ref,
        data: { 
          available: status, 
          updated_at: new Date() 
        }
      });
    });

    productsSnapshot.docs.forEach((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const productData = doc.data() as any;
      const hasCategory = productData.customization_items?.some(
        (item: CustomizationItemConfig) => item.category === category.category_name
      );

      if (hasCategory && productData.customization_items) {
        const updatedCustomizationItems = productData.customization_items
          .map((item: CustomizationItemConfig) => {
            if (item.category === category.category_name) {
              return { 
                ...item, 
                available: status 
              };
            };

            return item;
          });

        operations.push({
          ref: doc.ref,
          data: { 
            customization_items: updatedCustomizationItems,
            updated_at: new Date() 
          }
        });
      }
    });

    const CHUNK_SIZE = 500;
    const batchPromises = [];

    for (let i = 0; i < operations.length; i += CHUNK_SIZE) {
      const chunk = operations.slice(i, i + CHUNK_SIZE);
      const batch = adminDb.batch();

      chunk.forEach((op) => {
        batch.update(op.ref, op.data);
      });

      batchPromises.push(batch.commit());
    };

    await Promise.all(batchPromises);
    return { 
      success: true, 
      count: operations.length 
    };
  } catch (error) {
    console.error("Erro ao desabilitar categoria:", error);
    throw new Error("Falha ao atualizar dados.");
  };
};

export async function deleteCategory(id: string) {
  const docRef = doc(db, Collections.CUSTOMIZATION_ITEMS_CATEGORIES_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Category not exists", 404);
  };

  await deleteDoc(docRef);
};

export const getCachedCustomizationItemsCategories = unstable_cache(
  async () => {
    const categories = await getAllCategories();
    return categories?.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      category_name: category.category_name,
      image_url: category?.image_url,
      available: category.available,
    } as CustomizationItemsCategoryModel));
  },
  ['customization_items_categories'],
  {
    revalidate: 3600,
    tags: ['customization_items_categories'],
  }
);