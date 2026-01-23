import ContaModel from "../models/Conta.model";
import CordaoModel from "../models/Cordao.model";
import CrucifixoModel from "../models/Crucifixo.model";
import EntremeioModel from "../models/Entremeio.model";
import LetraModel from "../models/Letra.model";

export enum ItemsCustomizationTypes {
  'cordoes' = 'cordao',
  'contas' = 'conta',
  'letras' = 'letra',
  'crucifixos' = 'crucifixo',
  'entremeios' = 'entremeio',
  'catalogImage' = 'catalog_image',
}

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
}

export interface CustomizationItems {
  crucifixos: CrucifixoModel[];
  contas: ContaModel[];
  entremeios: EntremeioModel[];
  letras: LetraModel[];
  cordoes: CordaoModel[];
};