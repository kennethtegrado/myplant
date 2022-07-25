import create from 'zustand';

import type { ICartProduct } from '@interface/sanity';

interface CartState {
    items: number;
    totalPrice: number;
    addProduct: (product: ICartProduct) => void;
    products: ICartProduct[];
    reduceItem: (id: string) => void;
    increaseItem: (id: string) => void;
}

const useCartStore = create<CartState>((set) => ({
    items: 0,
    products: [],
    totalPrice: 0,
    addProduct: (product) =>
        set((state) => {
            const existingProduct = state.products.find(
                (item) => item._id === product._id
            );
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
                return {
                    products: [...state.products],
                    items: state.items + product.quantity,
                    totalPrice:
                        product.quantity * product.price + state.totalPrice,
                };
            }

            return {
                products: [...state.products, product],
                items: state.items + product.quantity,
                totalPrice: product.quantity * product.price + state.totalPrice,
            };
        }),
    reduceItem: (id) =>
        set((state) => {
            const product = state.products.find((item) => item._id === id);

            if (product) {
                product.quantity--;
                return {
                    products: [...state.products],
                    items: state.items - 1,
                    totalPrice: state.totalPrice - product.price,
                };
            } else return { products: state.products };
        }),
    increaseItem: (id) =>
        set((state) => {
            const product = state.products.find((item) => item._id === id);

            if (product) {
                product.quantity++;
                return {
                    products: [...state.products],
                    items: state.items + 1,
                    totalPrice: state.totalPrice + product.price,
                };
            } else return { products: state.products };
        }),
}));

export default useCartStore;
