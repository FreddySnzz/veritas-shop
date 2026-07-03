'use server';

import { cookies } from "next/headers";
import { serializeFirestoreData } from "@/data/functions/firebaseSerialize";
import UserModel from "@/data/models/User.model";
import { userLogin } from "@/data/services/auth.service";
import { createUser, createUserWithGoogle } from "@/data/services/user.service";
import { CreateUserRequest, CreateUserWithGoogleRequest, LoginResponse } from "@/data/types/auth";
import { buildAccessToken } from "@/lib/jwt";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function userLoginAction(payload: any) {
  try {
    const response = await userLogin(payload);
    
    if (response?.tokens?.access) {
      const cookieStore = await cookies();
      cookieStore.set('veritas_token', response.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });
    }

    return response;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('veritas_token');
}

export async function registerAction(
  payload: CreateUserRequest
): Promise<Partial<UserModel> | undefined> {
  try {
    const response = await createUser(serializeFirestoreData(payload));
    return response;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
}

export async function registerWithGoogleAction(
  payload: CreateUserWithGoogleRequest
): Promise<LoginResponse | undefined> {
  try {
    const response = await createUserWithGoogle(
      serializeFirestoreData(payload)
    );

    if (!response) return;

    const accessToken = buildAccessToken({
      id: payload.uid,
      name: payload.displayName,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
    });

    const cookieStore = await cookies();
    cookieStore.set('veritas_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return {
      user: {
        id: payload.uid as string,
        name: payload.displayName,
        email: payload.email as string,
        phone: payload.phone,
        role: payload.role,
      },
      tokens: {
        access: accessToken,
      },
    }
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
}