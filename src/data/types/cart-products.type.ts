import Products from "./products.type"

export type CartItem = Products & { quantity: number }

export type CartStore = {
  cart: CartItem[]
  addToCart: (product: Products) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}