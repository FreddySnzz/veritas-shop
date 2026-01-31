export default interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  updated_at: Date;
};