export enum ItemsCustomizationTypes {
  'customizationItem' = 'customization_item',
  'catalogImage' = 'catalog_image',
  'category' = 'category',
};

export interface Customization {
  cordao?: string;
  conta?: string;
  frase?: Array<string>;
  styleLetra?: string;
  crucifixo?: string;
  entremeio?: string;
  product?: string;
  productType?: string;
  customizationItems?: string[];
};

export type CustomizationItemConfig = {
  category_name: string;
  category: string;
  required: boolean;
};