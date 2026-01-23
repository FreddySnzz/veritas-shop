import { db } from "../../firebase/config";
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
import { Collections } from "../../types/collections.enum";
import { ProductServiceError } from "../product.service";
import CordaoModel from "@/data/models/Cordao.model";

async function cordaoExists(
  ref: string,
): Promise<boolean> {
  const cordaoRef = collection(db, Collections.CORDOES_COLLECTION);

  const refQuery = query(
    cordaoRef, where("ref", "==", ref)
  );

  // const imageQuery = query(
  //   cordaoRef, where("image_url", "==", cordao.image_url)
  // );

  const refSnap = await getDocs(refQuery);

  if (!refSnap.empty) return true;

  return false;
};

export async function getAllCordoes(): Promise<CordaoModel[] | null> {
  const q = query(collection(
    db, 
    Collections.CORDOES_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as CordaoModel;
  });
};

export async function getCordaoById(id: string): Promise<CordaoModel> {
  const docSnap = await getDoc(
    doc(db, Collections.CORDOES_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as CordaoModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Cordao not exists", 404
  );

  return data;
};

export async function getCordaoByRef(ref: string): Promise<CordaoModel[] | null> {
  const cordaoRef = collection(db, Collections.CORDOES_COLLECTION);

  const refQuery = query(
    cordaoRef, where("ref", "==", ref)
  );

  const refSnap = await getDocs(refQuery);
  
  return refSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as CordaoModel;
  });
};

export async function createCordao(data: CordaoModel): Promise<CordaoModel> {
  const verifyCordaoExists = await cordaoExists(data.ref);

  if (verifyCordaoExists) {
    throw new ProductServiceError("Cordao already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.CORDOES_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateCordao(id: string, data: CordaoModel): Promise<CordaoModel> {
  const docRef = doc(db, Collections.CORDOES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Cordao not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteCordao(id: string) {
  const docRef = doc(db, Collections.CORDOES_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Cordao not exists", 404);
  };

  await deleteDoc(docRef);
};