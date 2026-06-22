'use server';

import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import { userLogin } from "@/data/services/auth.service";
import { createUser } from "@/data/services/user.service";
import { CreateUserRequest } from "@/data/types/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function userLoginAction(payload: any) {
  try {
    const response = await userLogin(payload);
    return response;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
  };
};

export async function registerAction(
  payload: CreateUserRequest
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  try {
    const response = await createUser(serializeFirestoreData(payload));
    return response;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }; 
}; 