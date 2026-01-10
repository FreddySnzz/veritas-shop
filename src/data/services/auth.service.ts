'use server';

import { compare } from "bcrypt";
import { buildAccessToken } from "@/lib/jwt";
import { LoginRequest, LoginResponse } from "../types/auth";
import { getUserByEmail } from "./user.service";

export async function login(
  payload: LoginRequest
): Promise<LoginResponse | undefined> {
  try {
    const user = await getUserByEmail(payload.email);

    if (!user?.length) return;

    const matched = await compare(payload.password, user[0].password);

    if (!matched) {
      return;
    };

    const accessToken = buildAccessToken(user[0]);

    return {
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
      tokens: {
        access: accessToken,
      },
    };
  } catch (error) {
    console.error("Login service error:", error);
    return undefined;
  };
};

export async function logout(
  payload: LoginRequest
): Promise<LoginResponse | undefined> {
  try {
    const user = await getUserByEmail(payload.email);

    if (!user?.length) return;

    const matched = await compare(payload.password, user[0].password);

    if (!matched) {
      return;
    };

    const accessToken = buildAccessToken(user[0]);

    return {
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
      tokens: {
        access: accessToken,
      },
    };
  } catch (error) {
    console.error("Login service error:", error);
    return undefined;
  };
};