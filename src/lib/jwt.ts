import { User } from "@/data/types/auth";
import { Secret, SignOptions, sign } from "jsonwebtoken";

export function decodeJWT(token: string): User | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    };

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const data = JSON.parse(decoded);

    return {
      id: data.user?.id || data.id || data.sub,
      name: data.user?.name || data.name,
      email: data.user?.email || data.email,
    };
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  };
};

export function buildAccessToken(user: Partial<User>): string {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET as Secret;

  const options: SignOptions = {
    expiresIn: "1d" as SignOptions["expiresIn"]
  };

  const payload = {
    sub: user.id,
    email: user.email,
    type: "access",
  };

  try {
    return sign(payload as string | object | Buffer, secret, options);
  } catch (error) {
    console.error("Failed to build access token:", error);
    return "";
  };
};

export function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return true;
    };

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const data = JSON.parse(decoded);

    if (!data.exp) {
      return false;
    };

    const now = Math.floor(Date.now() / 1000);
    const margin = 30;
    
    return data.exp < (now - margin);
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  };
};

export function getTokenExpiration(token: string): Date | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    };

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const data = JSON.parse(decoded);

    if (!data.exp) {
      return null;
    };

    return new Date(data.exp * 1000);
  } catch {
    return null;
  };
};