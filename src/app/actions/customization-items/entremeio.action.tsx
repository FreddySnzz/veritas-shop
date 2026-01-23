'use server';

import { 
  createEntremeio, 
  deleteEntremeio, 
  updateEntremeio 
} from "@/data/services/customization-items/entremeio.service";
import { refreshCacheAction } from "../cache.actions";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createEntremeioAction(data: any) {
  try {
    const entremeio = await createEntremeio(data);
    await refreshCacheAction('customization_items');
    return entremeio;
  } catch (error) {
    console.error("Erro ao criar entremeio:", error);
    return null;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateEntremeioAction(id: string, data: any) {
  try {
    const entremeio = await updateEntremeio(id, data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(entremeio);
  } catch (error) {
    console.error("Erro ao atualizar entremeio:", error);
    return null;
  };
};

export async function deleteEntremeioAction(id: string) {
  try {
    await deleteEntremeio(id);
    await refreshCacheAction('customization_items');
  } catch (error) {
    console.error("Erro ao excluir entremeio:", error);
  };
};