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
import LetraModel from "@/data/models/Letra.model";

async function letraExists(
  ref: string,
): Promise<boolean> {
  const letraRef = collection(db, Collections.LETRAS_COLLECTION);

  const refQuery = query(
    letraRef, where("ref", "==", ref)
  );

  // const imageQuery = query(
  //   letraRef, where("image_url", "==", letra.image_url)
  // );

  const refSnap = await getDocs(refQuery);

  if (!refSnap.empty) return true;

  return false;
};

export async function getAllLetras(): Promise<LetraModel[] | null> {
  const q = query(collection(
    db, 
    Collections.LETRAS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as LetraModel;
  });
};

export async function getLetraById(id: string): Promise<LetraModel> {
  const docSnap = await getDoc(
    doc(db, Collections.LETRAS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as LetraModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Letra not exists", 404
  );

  return data;
};

export async function getLetraByRef(ref: string): Promise<LetraModel[] | null> {
  const letraRef = collection(db, Collections.LETRAS_COLLECTION);

  const refQuery = query(
    letraRef, where("ref", "==", ref)
  );

  const refSnap = await getDocs(refQuery);
  
  return refSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as LetraModel;
  });
};

export async function createLetra(data: LetraModel): Promise<LetraModel> {
  const verifyLetraExists = await letraExists(data.ref);

  if (verifyLetraExists) {
    throw new ProductServiceError("Letra already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.LETRAS_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateLetra(id: string, data: LetraModel): Promise<LetraModel> {
  const docRef = doc(db, Collections.LETRAS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Letra not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteLetra(id: string) {
  const docRef = doc(db, Collections.LETRAS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Letra not exists", 404);
  };

  await deleteDoc(docRef);
};