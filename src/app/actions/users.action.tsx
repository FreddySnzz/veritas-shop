'use server';

import { getUserByEmail, updateUser } from "@/data/services/user.service";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";

export async function getAdminInfoAction() {
  try {
    const admin = await getUserByEmail('root.admin@veritasatelie.com');
    return serializeFirestoreData(admin);
  } catch (error) {
    console.error("Erro ao carregar informações do admin:", error);
    return error;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserAction(id: string, data: any) {
  try {
    const user = await updateUser(id, data);
    return serializeFirestoreData(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return error;
  };
};