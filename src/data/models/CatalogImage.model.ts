export default interface CatalogImageModel {
  id: string;
  desc?: string;
  image_url?: string;
  available: boolean;
  updated_at: Date;
};