import create from 'zustand';

import type { ICartProduct } from '@interface/sanity';

interface CartState {
    items: number;
    totalPrice: number;
    alert: { success: boolean; message: string };
    addProduct: (product: ICartProduct) => void;
    products: ICartProduct[];
    reduceItem: (id: string) => void;
    increaseItem: (id: string) => void;
    setAlert: (success: boolean, message: string) => void;
    removeItem: (id: string) => void;
}

const useCartStore = create<CartState>((set) => ({
    items: 0,
    products: [],
    alert: { success: false, message: '' },
    totalPrice: 0,
    addProduct: (product) =>
        set((state) => {
            if (product.quantity > product.stock)
                throw new Error(
                    `There's not enough stock for ${
                        product.quantity - product.stock
                    } more item${
                        product.quantity - product.stock > 1 ? 's' : ''
                    }`
                );

            const existingProduct = state.products.find(
                (item) => item._id === product._id
            );
            if (existingProduct) {
                const newQuantity = existingProduct.quantity + product.quantity;

                if (newQuantity > product.stock)
                    throw new Error(
                        `There's not enough stock for ${
                            newQuantity - product.stock
                        } more item${
                            newQuantity - product.stock > 1 ? 's' : ''
                        }`
                    );

                existingProduct.quantity = newQuantity;

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
    setAlert: (success, message) =>
        set({
            alert: { success, message },
        }),
    removeItem: (id) =>
        set((state) => {
            const removeProduct = state.products.find(
                (item) => item._id === id
            );

            if (!removeProduct) return state;

            const newProducts = state.products.filter(
                (item) => item !== removeProduct
            );

            const newCount = state.items - removeProduct.quantity;

            const reducePrice = removeProduct.quantity * removeProduct.price;

            return {
                products: newProducts,
                totalPrice: state.totalPrice - reducePrice,
                items: newCount,
            };
        }),
}));

export default useCartStore;
