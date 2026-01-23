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
import ContaModel from "@/data/models/Conta.model";

async function contaExists(
  ref: string,
): Promise<boolean> {
  const contaRef = collection(db, Collections.CONTAS_COLLECTION);

  const refQuery = query(
    contaRef, where("ref", "==", ref)
  );

  // const imageQuery = query(
  //   contaRef, where("image_url", "==", conta.image_url)
  // );

  const refSnap = await getDocs(refQuery);

  if (!refSnap.empty) return true;

  return false;
};

export async function getAllContas(): Promise<ContaModel[] | null> {
  const q = query(collection(
    db, 
    Collections.CONTAS_COLLECTION
  ));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as ContaModel;
  });
};

export async function getContaById(id: string): Promise<ContaModel> {
  const docSnap = await getDoc(
    doc(db, Collections.CONTAS_COLLECTION, id)
  );
  
  const data = docSnap.exists() ? (
    docSnap.data() as ContaModel
  ) : null;
  
  if (data === null) throw new ProductServiceError(
    "Conta not exists", 404
  );

  return data;
};

export async function getContaByRef(ref: string): Promise<ContaModel[] | null> {
  const contaRef = collection(db, Collections.CONTAS_COLLECTION);

  const refQuery = query(
    contaRef, where("ref", "==", ref)
  );

  const refSnap = await getDocs(refQuery);
  
  return refSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as ContaModel;
  });
};

export async function createConta(data: ContaModel): Promise<ContaModel> {
  const verifyContaExists = await contaExists(data.ref);

  if (verifyContaExists) {
    throw new ProductServiceError("Conta already exists", 400);
  };

  const docRef = await addDoc(collection(db, Collections.CONTAS_COLLECTION), data);

  return { 
    ...data, 
    id: docRef.id 
  };
};

export async function updateConta(id: string, data: ContaModel): Promise<ContaModel> {
  const docRef = doc(db, Collections.CONTAS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new ProductServiceError("Conta not exists", 404);
  };

  const updatedData = {
    ...docSnap.data(),
    ...data,
  };

  await updateDoc(docRef, updatedData);

  return updatedData;
};

export async function deleteConta(id: string) {
  const docRef = doc(db, Collections.CONTAS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new ProductServiceError("Conta not exists", 404);
  };

  await deleteDoc(docRef);
};