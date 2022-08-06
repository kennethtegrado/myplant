import type { NextPage } from 'next';

// NEXT Import
import Head from 'next/head';

// Component Import
import { OrderSummary, ShoppingCart } from '@components/project-ui';

const Cart: NextPage = () => {
    return (
        <>
            <Head>
                <title>Cart - MyLittlePlant</title>
            </Head>
            <section className="flex flex-col items-center lg:flex-row py-10 gap-10">
                <ShoppingCart />
                <OrderSummary />
            </section>
        </>
    );
};

export default Cart;
