import type { FunctionComponent } from 'react';

import { Fragment } from 'react';

// NEXT Import
import Image from 'next/image';
import Link from 'next/link';

// State Management Import
import { useCartStore } from '@store/product';

const ShoppingCart: FunctionComponent = () => {
    const products = useCartStore((state) => state.products);
    const increaseItem = useCartStore((state) => state.increaseItem);
    const reduceItem = useCartStore((state) => state.reduceItem);

    return (
        <div className="flex-1 md:min-h-3/4">
            <h3 className="text-3xl font-bold">Shopping Cart</h3>
            <div className="divider"></div>
            <ul>
                {products?.map((item) => (
                    <Fragment key={item._id}>
                        <li className="flex gap-5 items-center flex-col lg:flex-row cursor-pointer">
                            <Link href={`/product/${item.slug}`} passHref>
                                <div className="flex-none">
                                    <Image
                                        src={item.imageURL}
                                        alt={`${item.name} Plant`}
                                        width={300}
                                        height={300}
                                        className="mask mask-square"
                                    />
                                </div>
                            </Link>
                            <div className="flex-1 flex justify-between">
                                <div>
                                    <Link href={`/product/${item.slug}`}>
                                        <h4 className="text-lg font-medium link link-hover link-primary">
                                            {item.name}
                                        </h4>
                                    </Link>
                                    <p className="font-bold">
                                        ₱ {item.price * item.quantity}
                                    </p>
                                    <div className="form-control my-1">
                                        <div className="input-group">
                                            <button
                                                className={`btn text-xl btn-outline ${
                                                    item.quantity === 0 &&
                                                    'btn-disabled'
                                                }`}
                                                onClick={() =>
                                                    reduceItem(item._id)
                                                }
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                placeholder={item.quantity + ''}
                                                className="input input-bordered w-12"
                                            />
                                            <button
                                                className={`btn text-xl btn-outline ${
                                                    item.quantity >=
                                                        item.stock &&
                                                    'btn-disabled'
                                                }`}
                                                onClick={() =>
                                                    increaseItem(item._id)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        </li>
                        <div className="divider"></div>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingCart;
