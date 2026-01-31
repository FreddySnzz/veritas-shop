import ContaModel from "../models/Conta.model";
import CordaoModel from "../models/Cordao.model";
import CrucifixoModel from "../models/Crucifixo.model";
import EntremeioModel from "../models/Entremeio.model";
import LetraModel from "../models/Letra.model";

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

export interface CustomizationItems {
  crucifixos: CrucifixoModel[];
  contas: ContaModel[];
  entremeios: EntremeioModel[];
  letras: LetraModel[];
  cordoes: CordaoModel[];
};

export type CustomizationItemConfig = {
  category_name: string;
  category: string;
  required: boolean;
};