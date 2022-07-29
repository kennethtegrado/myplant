import type { FunctionComponent } from 'react';

// State Management Import
import { useCartStore } from '@store/product';

// Component Import
import ProductCart from '../ProductCart';

const ShoppingCart: FunctionComponent = () => {
    const products = useCartStore((state) => state.products);

    return (
        <div className="flex-1 md:min-h-3/4">
            <h3 className="text-3xl font-bold">Shopping Cart</h3>
            <div className="divider"></div>
            <ul>
                {products?.map((item) => (
                    <ProductCart {...item} key={item._id} />
                ))}
            </ul>
        </div>
    );
};

export default ShoppingCart;
