// add item
// remove items
// clear the cart
// (keep track of cart items)

import { Product } from "@/payloadTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

// State management library
// Zustand used
// with reload data is lost
// zustand still keeps it
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] };
        }),
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items.filter((item) => item.product.id !== id),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      // configuration where to store
      name: "cart-storage",
      // to tell zustand to store it in local not session storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
