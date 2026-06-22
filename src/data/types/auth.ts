export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserLoginRequest {
  phone: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  email?: string;
  phone: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: Roles;
  };
  tokens: {
    access: string;
  };
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Roles;
};

export type Roles = 'user' | 'admin';