import create from 'zustand';

import type { ICartProduct } from '@interface/sanity';

interface INewStockProduct extends ICartProduct {
    newStock: number;
}

interface CartState {
    items: number;
    totalPrice: number;
    alert: { success: boolean; message: string };
    addProduct: (product: ICartProduct) => void;
    products: INewStockProduct[];
    reduceItem: (id: string) => void;
    increaseItem: (id: string) => void;
    setAlert: (success: boolean, message: string) => void;
    removeItem: (id: string) => void;
    clearItems: () => void;
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
                const newStock = product.stock - newQuantity;
                existingProduct.quantity = newQuantity;
                existingProduct.newStock = newStock;
                return {
                    products: [...state.products],
                    items: state.items + product.quantity,
                    totalPrice:
                        product.quantity * product.price + state.totalPrice,
                };
            }
            const productNewStock = {
                ...product,
                newStock: product.stock - product.quantity,
            };

            return {
                products: [...state.products, productNewStock],
                items: state.items + product.quantity,
                totalPrice: product.quantity * product.price + state.totalPrice,
            };
        }),
    reduceItem: (id) =>
        set((state) => {
            const product = state.products.find((item) => item._id === id);

            if (product) {
                product.newStock++;
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
                product.newStock--;
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
    clearItems: () => {
        return set({ products: [], totalPrice: 0, items: 0 });
    },
}));

export default useCartStore;
