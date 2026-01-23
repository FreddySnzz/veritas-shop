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
import CrucifixoModel from "@/data/models/Crucifixo.model";
import { ProductServiceError } from "../product.service";

async function crucifixoExists(
  ref: string,
): Promise<boolean> {
  const crucifixoRef = collection(db, Collections.CRUCIFIXOS_COLLECTION);

  const refQuery = query(
    crucifixoRef, where("ref", "==", ref)
  );

  // const imageQuery = query(
  //   crucifixoRef, where("image_url", "==", crucifixo.image_url)
  // );

  const refSnap = await getDocs(refQuery);

  if (!refSnap.empty) return true;

  return false;
};

export async function getAllCrucifixos(): Promise<CrucifixoModel[] | null> {
  const q = query(collection(
    db, 
    Collections.CRUCIFIXOS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as CrucifixoModel;
  });
};

export async function getCrucifixoById(id: string): Promise<CrucifixoModel> {
  const docSnap = await getDoc(
    doc(db, Collections.CRUCIFIXOS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as CrucifixoModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Crucifixo not exists", 404
  );

  return data;
};

export async function getCrucifixoByRef(ref: string): Promise<CrucifixoModel[] | null> {
  const crucifixoRef = collection(db, Collections.CRUCIFIXOS_COLLECTION);

  const refQuery = query(
    crucifixoRef, where("ref", "==", ref)
  );

  const refSnap = await getDocs(refQuery);
  
  return refSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as CrucifixoModel;
  });
};

export async function createCrucifixo(data: CrucifixoModel): Promise<CrucifixoModel> {
  const verifyCrucifixoExists = await crucifixoExists(data.ref);

  if (verifyCrucifixoExists) {
    throw new ProductServiceError("Crucifixo already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.CRUCIFIXOS_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateCrucifixo(id: string, data: CrucifixoModel): Promise<CrucifixoModel> {
  const docRef = doc(db, Collections.CRUCIFIXOS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Crucifixo not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteCrucifixo(id: string) {
  const docRef = doc(db, Collections.CRUCIFIXOS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Crucifixo not exists", 404);
  };

  await deleteDoc(docRef);
};