export default interface ProductModel {
  id: string;
  name: string;
  desc?: string;
  initial_price: number;
  image_url?: string;
  available: boolean;
  customizable: boolean;
  updated_at: Date;
}