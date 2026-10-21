import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Cart } from "@/features/cart/types/cart.type";

interface CartState {
  items: Cart[];
  isLoading: boolean;
  error: string | null;
  loadCart: () => void;
  addItem: (productId: string, quantity: number) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      loadCart: () => {
        set({ isLoading: false });
      },

      addItem: (productId: string, quantity: number) => {
        const { items } = get();
        const existingItem = items.find((item) => item.productId === productId);

        let newItems: Cart[];
        if (existingItem) {
          newItems = items.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
          newItems = [...items, { productId, quantity }];
        }

        set({ items: newItems });
      },

      incrementItem: (productId: string) => {
        const { items } = get();
        const newItems = items.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item));
        set({ items: newItems });
      },

      decrementItem: (productId: string) => {
        const { items } = get();
        const newItems = items.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item));
        set({ items: newItems });
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const newItems = items.filter((item) => item.productId !== productId);
        set({ items: newItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemQuantity: (productId: string) => {
        const { items } = get();
        const item = items.find((i) => i.productId === productId);
        return item?.quantity || 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
