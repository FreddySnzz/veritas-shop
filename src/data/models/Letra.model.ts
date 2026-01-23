export default interface LetraModel {
  id: string;
  name?: string;
  available: boolean;
  ref: string;
  image_url?: string;
  updated_at: Date;
}