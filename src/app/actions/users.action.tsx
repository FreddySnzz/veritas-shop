'use server';

import { 
  getUserByEmail, 
  getUserById, 
  updateUser 
} from "@/data/services/user.service";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { buildAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function getAdminInfoAction() {
  try {
    const admin = await getUserByEmail('root.admin@veritasatelie.com');
    return serializeFirestoreData(admin);
  } catch (error) {
    console.error("Erro ao carregar informações do admin:", error);
    throw error;
  }
}

export async function getUserByIdAction(id: string) {
  try {
    const user = await getUserById(id);
    return serializeFirestoreData(user);
  } catch (error) {
    console.error("Erro ao carregar informações do usuário:", error);
    throw error;
  }
}

export async function getUserByEmailAction(email: string) {
  try {
    const user = await getUserByEmail(email);
    return serializeFirestoreData(user);
  } catch (error) {
    console.error("Erro ao carregar informações do usuário:", error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateUserAction(id: string, data: any) {
  try {
    const user = await updateUser(id, data);

    const accessToken = buildAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set('veritas_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return serializeFirestoreData(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}