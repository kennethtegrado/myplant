import type { NextPage } from 'next';

// Component Import
import { OrderSummary, ShoppingCart } from '@components/project-ui';

const Cart: NextPage = () => {
    return (
        <section className="flex flex-col items-center lg:flex-row py-10 gap-10">
            <ShoppingCart />
            <OrderSummary />
        </section>
    );
};

export default Cart;
