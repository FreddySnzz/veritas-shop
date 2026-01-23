'use server';

import { 
  createCordao, 
  deleteCordao, 
  updateCordao 
} from "@/data/services/customization-items/cordao.service";
import { refreshCacheAction } from "../cache.actions";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createCordaoAction(data: any) {
  try {
    const cordao = await createCordao(data);
    await refreshCacheAction('customization_items');
    return cordao;
  } catch (error) {
    console.error("Erro ao criar cordão:", error);
    return null;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCordaoAction(id: string, data: any) {
  try {
    const cordao = await updateCordao(id, data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(cordao);
  } catch (error) {
    console.error("Erro ao atualizar cordão:", error);
    return null;
  };
};

export async function deleteCordaoAction(id: string) {
  try {
    await deleteCordao(id);
    await refreshCacheAction('customization_items');
  } catch (error) {
    console.error("Erro ao excluir cordão:", error);
  };
};