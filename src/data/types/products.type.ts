export interface Product {
  id: string;
  cordoes: string;
  contas: string;
  letras: string;
  crucifixos: string;
  entremeios: string;
}

export enum ProductTypes {
  'Terço' = 'rosario',
  'Terço Personalizado' = 'rosario',
  'Pulseira' = 'pulseira',
  'Pulseira Personalizada' = 'pulseira',
  'Dezena' = 'dezena',
  'Dezena Personalizada' = 'dezena',
  'Chaveiro' = 'chaveiro',
  'Chaveiro Personalizado' = 'chaveiro',
}

export interface baseProductCustomization {
  id: string;
  type: ProductTypes
  name: string;
  price: number;
  image: string;
  customizable: boolean;
  customizationItems?: string[];
  available?: boolean;
};