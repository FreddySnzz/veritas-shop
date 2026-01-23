export default interface CrucifixoModel {
  id: string;
  style?: string;
  available: boolean;
  ref: string;
  image_url?: string;
  updated_at: Date;
}