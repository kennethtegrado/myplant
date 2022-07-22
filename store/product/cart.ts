import create from 'zustand';

interface ICartProduct {
    name: string;
    _id: string;
    imageURL: string;
    quantity: number;
    price: number;
}

interface CartState {
    items: number;
    addProduct: (product: ICartProduct) => void;
    products: ICartProduct[];
}

const useCartStore = create<CartState>((set) => ({
    items: 0,
    products: [],
    addProduct: (product) => {
        set((state) => ({
            products: [...state.products, product],
            items: state.items + product.quantity,
        }));
    },
}));

export default useCartStore;
