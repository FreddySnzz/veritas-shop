'use server';

import { 
  createCrucifixo, 
  deleteCrucifixo, 
  updateCrucifixo 
} from "@/data/services/customization-items/crucifixo.service";
import { refreshCacheAction } from "../cache.actions";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCrucifixoAction(data: any) {
  try {
    const crucifixo = await createCrucifixo(data);
    await refreshCacheAction('customization_items');
    return crucifixo;
  } catch (error) {
    console.error("Erro ao criar crucifixo:", error);
    return null;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCrucifixoAction(id: string, data: any) {
  try {
    const crucifixo = await updateCrucifixo(id, data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(crucifixo);
  } catch (error) {
    console.error("Erro ao atualizar crucifixo:", error);
    return null;
  };
};

export async function deleteCrucifixoAction(id: string) {
  try {
    await deleteCrucifixo(id);
    await refreshCacheAction('customization_items');
  } catch (error) {
    console.error("Erro ao excluir crucifixo:", error);
  };
};