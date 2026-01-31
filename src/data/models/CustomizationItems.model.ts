export interface CustomizationItemsModel {
  id: string;
  name: string;
  plural_name: string;
  category: string;
  ref: string;
  image_url?: string;
  available: boolean;
  price_modifier?: number; 
  metadata?: {[key: string]: string };
  updated_at: Date;
};