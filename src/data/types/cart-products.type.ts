import { Product } from "./products.type"

export type CartItem = Product & { quantity: number }

export type CartStore = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}