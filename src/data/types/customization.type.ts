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
  available: boolean;
};

export type Step = {
  id: string;
  title: string;
  imageHelper?: string;
  isGrouped?: boolean;
  isOptional?: boolean; 
  isVirtual?: boolean;
  subtitle?: string;
  href?: string;
  isValid?: boolean;
};