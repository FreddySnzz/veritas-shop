import { CustomizationItemConfig } from "../types/customization.type";

export default interface ProductModel {
  id: string;
  name: string;
  desc?: string;
  initial_price: number;
  images_url?: string[];
  available: boolean;
  customizable: boolean;
  customization_items?: CustomizationItemConfig[];
  updated_at: Date;
};