export interface Cordoes {
  id: string;
  name: string;
  color: string;
  available: boolean;
  ref: string;
  img: string;
}

export interface Contas {
  id: string;
  name: string;
  color: string;
  available: boolean;
  ref: string;
  img: string;
}

export interface Letras {
  id: string;
  name: string;
  available: boolean;
  ref: string;
  img: string;
}

export interface Crucifixos {
  id: string;
  style: string;
  available: boolean;
  ref: string;
  img: string;
}

export interface Entremeios {
  id: string;
  name: string;
  style: string;
  available: boolean;
  ref: string;
  img: string;
}

export interface Product {
  id: string;
  cordoes: string;
  contas: string;
  letras: string;
  crucifixos: string;
  entremeios: string;
}