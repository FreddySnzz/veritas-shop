export interface CustomizationItemsCategoryModel {
  id: string;
  name: string; 
  description?: string;
  category_name: string;
  image_url?: string;
  available: boolean;
  updated_at: Date;
};