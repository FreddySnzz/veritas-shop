import { Roles } from "../types/auth";

export default interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: Roles;
  updated_at: Date;
};