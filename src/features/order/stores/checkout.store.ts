import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CheckoutProduct {
  productId: string;
  quantity: number;
  note?: string;
}

interface CheckoutState {
  productsCheckout: CheckoutProduct[];
  addProduct: (product: CheckoutProduct) => void;
  removeProduct: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  clearCheckout: () => void;
  isProductSelected: (productId: string) => boolean;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      productsCheckout: [],

      addProduct: (product) => {
        set((state) => {
          const existing = state.productsCheckout.find((item) => item.productId === product.productId);

          if (existing) {
            return {
              productsCheckout: state.productsCheckout.map((item) => (item.productId === product.productId ? { ...item, quantity: item.quantity + product.quantity } : item)),
            };
          }

          return {
            productsCheckout: [...state.productsCheckout, product],
          };
        });
      },

      removeProduct: (productId) => {
        set((state) => ({
          productsCheckout: state.productsCheckout.filter((item) => item.productId !== productId),
        }));
      },

      updateProductQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeProduct(productId);
          return;
        }

        set((state) => ({
          productsCheckout: state.productsCheckout.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        }));
      },

      clearCheckout: () => {
        set({ productsCheckout: [] });
      },

      isProductSelected: (productId) => get().productsCheckout.some((item) => item.productId === productId),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
