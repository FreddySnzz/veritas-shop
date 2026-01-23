'use server';

import { 
  createConta, 
  deleteConta, 
  updateConta 
} from "@/data/services/customization-items/conta.service";
import { refreshCacheAction } from "../cache.actions";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createContaAction(data: any) {
  try {
    const conta = await createConta(data);
    await refreshCacheAction('customization_items');
    return conta;
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    return null;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateContaAction(id: string, data: any) {
  try {
    const conta = await updateConta(id, data);
    await refreshCacheAction('customization_items');
    return serializeFirestoreData(conta);
  } catch (error) {
    console.error("Erro ao atualizar conta:", error);
    return null;
  };
};

export async function deleteContaAction(id: string) {
  try {
    await deleteConta(id);
    await refreshCacheAction('customization_items');
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
  };
};