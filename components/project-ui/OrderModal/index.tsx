import type { FormEventHandler, FunctionComponent } from 'react';
import type { OrderObject } from '@interface/sanity';

import { useState } from 'react';

// NEXT Import
import { useRouter } from 'next/router';

// Zustand Import
import { useCartStore } from '@store/product';

interface OrderAPIResponse {
    data: OrderObject;
    message: string;
}

const OrderModal: FunctionComponent = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [nameError, setNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [loading, setLoading] = useState(false);

    const products = useCartStore((state) => state.products);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const totalItems = useCartStore((state) => state.items);
    const clearItems = useCartStore((state) => state.clearItems);

    const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (loading) return;

        setLoading(true);

        if (!name || !address || !phoneNumber) {
            if (!name)
                setNameError('Please put your name so we can identify you.');
            else setNameError('');

            if (!address)
                setAddressError(
                    'Please put your address so we know where you are.'
                );
            else setAddressError('');

            if (!phoneNumber)
                setPhoneError('Please put your number so we can contact you.');
            else setPhoneError('');

            if (/(\+[0-9]{2}|[0-9]{2}|0)?9[0-9]{9}/gi.test(phoneNumber))
                setPhoneError('Please put a valid phone number.');
            else setPhoneError('');

            setLoading(false);
            return;
        } else {
            setPhoneError('');
            setAddressError('');
            setNameError('');
        }

        const orderData = {
            userInfo: { name, address, number: phoneNumber },
            products,
            totalPrice,
            items: totalItems,
        };

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });
            const { data }: OrderAPIResponse = await response.json();
            clearItems();
            setLoading(false);
            router.push(`/order/${data._id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <form className="modal-box" onSubmit={submitHandler}>
                    <div className="flex justify-end">
                        <label
                            htmlFor="order-modal"
                            className="btn btn-circle btn-outline"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>
                    </div>
                    {products.length ? (
                        <>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Customer Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="input input-bordered w-full"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                                {nameError && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {nameError}
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Customer Address
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Full Address"
                                    className="textarea textarea-bordered w-full"
                                    value={address}
                                    onChange={(event) =>
                                        setAddress(event.target.value)
                                    }
                                />
                                {addressError && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {addressError}
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Phone Number
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full"
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        setNumber(event.target.value)
                                    }
                                />
                                {phoneError && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {phoneError}
                                        </span>
                                    </label>
                                )}
                            </div>
                            <div className="modal-action">
                                <button
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center flex-col gap-3">
                                <span className="text-primary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 block"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                <p className="text-center text-xl font-bold mb-5">
                                    Cart is Empty
                                </p>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </>
    );
};

export default OrderModal;
