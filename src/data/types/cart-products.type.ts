import { Customization } from "./customization.type"

interface ProductCart {
  id: string;
  cordoes: string;
  contas: string;
  letras: string;
  crucifixos: string;
  entremeios: string;
};

export type CartItem = ProductCart & { quantity: number }

export type CartStore = {
  cart: CartItem[]
  addToCart: (product: ProductCart) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  customizationPrice: number;
  image: string;
  customizable: boolean;
};

export interface CartProductItem {
  cartId: string;
  product: BaseProduct;
  quantity: number;
  customization?: Customization;
};