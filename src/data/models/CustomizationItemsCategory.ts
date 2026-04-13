export interface CustomizationItemsCategoryModel {
  id: string;
  name: string; 
  description?: string;
  category_name: string;
  image_url?: string;
  display_order: number;
  available: boolean;
  updated_at: Date;
};