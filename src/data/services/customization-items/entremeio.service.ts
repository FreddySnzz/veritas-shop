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
import EntremeioModel from "@/data/models/Entremeio.model";

async function entremeioExists(
  ref: string,
): Promise<boolean> {
  const entremeioRef = collection(db, Collections.ENTREMEIOS_COLLECTION);

  const refQuery = query(
    entremeioRef, where("ref", "==", ref)
  );

  // const imageQuery = query(
  //   entremeioRef, where("image_url", "==", entremeio.image_url)
  // );

  const refSnap = await getDocs(refQuery);

  if (!refSnap.empty) return true;

  return false;
};

export async function getAllEntremeios(): Promise<EntremeioModel[] | null> {
  const q = query(collection(
    db, 
    Collections.ENTREMEIOS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data
    } as EntremeioModel;
  });
};

export async function getEntremeioById(id: string): Promise<EntremeioModel> {
  const docSnap = await getDoc(
    doc(db, Collections.ENTREMEIOS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as EntremeioModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Entremeio not exists", 404
  );

  return data;
};

export async function getEntremeioByRef(ref: string): Promise<EntremeioModel[] | null> {
  const entremeioRef = collection(db, Collections.ENTREMEIOS_COLLECTION);

  const refQuery = query(
    entremeioRef, where("ref", "==", ref)
  );

  const refSnap = await getDocs(refQuery);
  
  return refSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as EntremeioModel;
  });
};

export async function createEntremeio(data: EntremeioModel): Promise<EntremeioModel> {
  const verifyEntremeioExists = await entremeioExists(data.ref);

  if (verifyEntremeioExists) {
    throw new ProductServiceError("Entremeio already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.ENTREMEIOS_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateEntremeio(id: string, data: EntremeioModel): Promise<EntremeioModel> {
  const docRef = doc(db, Collections.ENTREMEIOS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Entremeio not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteEntremeio(id: string) {
  const docRef = doc(db, Collections.ENTREMEIOS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Entremeio not exists", 404);
  };

  await deleteDoc(docRef);
};