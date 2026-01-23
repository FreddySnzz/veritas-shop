'use server';

import { 
  createLetra, 
  deleteLetra, 
  updateLetra 
} from "@/data/services/customization-items/letra.service";
import { refreshCacheAction } from "../cache.actions";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createLetraAction(data: any) {
  try {
    const letra = await createLetra(data);
    await refreshCacheAction('customization_items');
    return letra;
  } catch (error) {
    console.error("Erro ao criar letra:", error);
    return null;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateLetraAction(id: string, data: any) {
  try {
    const letra = await updateLetra(id, data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(letra);
  } catch (error) {
    console.error("Erro ao atualizar letra:", error);
    return null;
  };
};

export async function deleteLetraAction(id: string) {
  try {
    await deleteLetra(id);
    await refreshCacheAction('customization_items');
  } catch (error) {
    console.error("Erro ao excluir letra:", error);
  };
};