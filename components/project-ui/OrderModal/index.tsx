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

    const products = useCartStore((state) => state.products);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const totalItems = useCartStore((state) => state.items);

    const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

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
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Customer Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
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
                            <span className="label-text">Customer Address</span>
                        </label>
                        <textarea
                            placeholder="Full Address"
                            className="textarea textarea-bordered w-full"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
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
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="input input-bordered w-full"
                            value={phoneNumber}
                            onChange={(event) => setNumber(event.target.value)}
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
                        <button className="btn btn-primary">
                            Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default OrderModal;
