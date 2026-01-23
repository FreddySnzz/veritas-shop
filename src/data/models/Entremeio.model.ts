export default interface EntremeioModel {
  id: string;
  name: string;
  style?: string;
  available: boolean;
  ref: string;
  image_url?: string;
  updated_at: Date;
}