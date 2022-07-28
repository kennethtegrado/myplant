import type { ChangeEventHandler, FunctionComponent } from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// State
import { useState, useEffect } from 'react';

import { imageBuilder } from '@utils/sanity';

import { useCartStore } from '@store/product';

interface ProductHeaderProps {
    category: {
        title: string;
    };
    price: number;
    blurb: string;
    name: string;
    stocks: number;
    _id: string;
    image: SanityImageSource;
    slug: string;
}

const ProductHeader: FunctionComponent<ProductHeaderProps> = ({
    _id,
    category,
    price,
    blurb,
    name,
    stocks,
    image,
    slug,
}) => {
    const [quantity, setQuantity] = useState('');

    const addItem = useCartStore((state) => state.addProduct);
    const setAlert = useCartStore((state) => state.setAlert);

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) =>
        setQuantity(event.target.value);

    const addProduct = () => {
        if (+quantity > stocks) {
            setAlert(
                false,
                `There's not enough stocks for ${+quantity - stocks} item${
                    +quantity - stocks > 1 ? 's' : ''
                }`
            );
            return;
        }

        const imageURL = imageBuilder(image).toString();

        const product = {
            name,
            _id,
            imageURL,
            price,
            quantity: +quantity,
            slug,
            stock: stocks,
        };

        try {
            addItem(product);
            setAlert(
                true,
                `${quantity} items were successfully added to cart.`
            );
        } catch (error) {
            if (error instanceof Error) setAlert(false, error.message);
        }
    };

    return (
        <div className="flex-1">
            <div className="flex flex-row mb-2">
                <div className="badge badge-primary capitalize">
                    {category?.title}
                </div>
            </div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-lg">{blurb}</p>
            <div className="divider -mb-1"></div>
            <p className="flex items-center justify-between my-2">
                <span className="price">Price</span>
                <span className="price text-lg text-primary font-bold">
                    ₱ {price}
                </span>
            </p>
            <p className="flex items-center justify-between mt-2">
                <span className="price">Stocks</span>
                <span className="price">{stocks}</span>
            </p>
            <div className="divider"></div>
            <div className="my-2 flex gap-2 flex-col lg:flex-row">
                <div>
                    <input
                        type="number"
                        placeholder="Quantity"
                        className={`input input-bordered input-base-content ${
                            +quantity > stocks && 'input-error'
                        }`}
                        value={quantity}
                        onChange={changeHandler}
                    />
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {+quantity > stocks && 'Not enough items left.'}
                        </span>
                    </label>
                </div>

                <button
                    className="btn btn-outline btn-primary"
                    onClick={addProduct}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductHeader;
