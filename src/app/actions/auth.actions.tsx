'use server';

import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import UserModel from "@/data/models/User.model";
import { userLogin } from "@/data/services/auth.service";
import { createUser, createUserWithGoogle } from "@/data/services/user.service";
import { CreateUserRequest, CreateUserWithGoogleRequest } from "@/data/types/auth";

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
): Promise<Partial<UserModel> | undefined> {
  try {
    const response = await createUser(serializeFirestoreData(payload));
    return response;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }; 
}; 

export async function registerWithGoogleAction(
  payload: CreateUserWithGoogleRequest
): Promise<Partial<UserModel> | undefined> {
  try {
    const response = await createUserWithGoogle(serializeFirestoreData(payload));
    return response;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }; 
}; 