import type { FunctionComponent } from 'react';
import type { ICartProduct } from '@interface/sanity';

// NEXT Import
import Image from 'next/image';
import Link from 'next/link';

// Zustand
import { useCartStore } from '@store/product';

const ProductCart: FunctionComponent<ICartProduct> = ({
    slug,
    imageURL,
    name,
    _id,
    quantity,
    price,
    stock,
}) => {
    const increaseItem = useCartStore((state) => state.increaseItem);
    const reduceItem = useCartStore((state) => state.reduceItem);
    const removeItem = useCartStore((state) => state.removeItem);

    return (
        <>
            <li className="flex gap-5 items-center flex-col lg:flex-row relative">
                <Link href={`/product/${slug}`} passHref>
                    <div className="flex-none cursor-pointer">
                        <Image
                            src={imageURL}
                            alt={`${name} Plant`}
                            width={300}
                            height={300}
                            className="mask mask-square"
                        />
                    </div>
                </Link>
                <div className="flex-1 flex justify-between">
                    <div>
                        <Link href={`/product/${slug}`}>
                            <h4 className="text-lg font-medium link link-hover link-primary">
                                {name}
                            </h4>
                        </Link>
                        <p className="font-bold">₱ {price * quantity}</p>
                        <div className="flex flex-row gap-3 items-center my-2">
                            <button
                                className={`btn text-xl btn-outline ${
                                    quantity === 0 && 'btn-disabled'
                                } btn-circle btn-sm btn-primary`}
                                onClick={() => reduceItem(_id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <p className="text-lg font-medium">{quantity}</p>
                            <button
                                className={`btn text-xl btn-outline ${
                                    quantity >= stock && 'btn-disabled'
                                } btn-circle btn-sm btn-primary`}
                                onClick={() => increaseItem(_id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="absolute top-2 right-2">
                    <button
                        className="btn btn-circle btn-error"
                        onClick={() => removeItem(_id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </li>
            <div className="divider -my-1"></div>
        </>
    );
};

export default ProductCart;
