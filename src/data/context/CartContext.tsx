'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/data/hook/useLocalStorage';
import { Customization } from '@/data/types/customization.type';
import ProductModel from '../models/Product.model';

export interface CartItem {
  cartId: string;
  product: ProductModel;
  quantity: number;
  customization?: Customization;
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: ProductModel, customization?: Customization) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('veritas_shopping_cart', []);

  const addItem = (product: ProductModel, customization?: Customization) => {
    setItems((prev) => {
      if (!product.customizable) {
        const existingItem = prev.find(item => item.product.id === product.id);
        if (existingItem) {
          return prev.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        };
      };

      const newItem: CartItem = {
        cartId: crypto.randomUUID(),
        product,
        quantity: 1,
        customization,
      };

      return [...prev, newItem];
    });
  };

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => {
    return acc + (item.product.initial_price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCart must be used within a CartProvider');

  return context;
};