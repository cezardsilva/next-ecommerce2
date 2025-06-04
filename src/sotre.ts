import { create }from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/ProductType";

type CartState = {
    cart: ProductType[];
    addProduct: (product: ProductType) => void;
    // removeProduct: (productId: string) => void;
    isOpen: boolean;
    toogleCart: () => void;
};

export const useCartStore = create<CartState>() (
    persist(
        (set) => ({
            cart: [],
            addProduct: (item) =>
                set((state) => {
                    const product = state.cart.find((p) => p.id === item.id);
                    if (product) {
                        const updatedCart = state.cart.map((p) => {
                            if (p.id === item.id) {
                                return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 };
                            }
                            return p;
                        });
                        return { ...state, cart: updatedCart };
                    } else {
                        return { ...state, cart: [...state.cart, { ...item, quantity: 1 }] };
                    }
                }),
            isOpen: false,
            toogleCart: () => set((state) => ({ ...state, isOpen: !state.isOpen }))
        }),
        { name: 'cart-storage' }
    )
);