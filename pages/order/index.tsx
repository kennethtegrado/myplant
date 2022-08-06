import type { NextPage } from 'next';
import type { FormEventHandler } from 'react';

// NEXT Import
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Component Import
import img from '@public/asset/order.svg';

const Order: NextPage = () => {
    const router = useRouter();

    const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const formInput = event.currentTarget['tracking-id'].value;

        if (!formInput) return;

        router.push(`/order/${formInput}`);
    };

    return (
        <>
            <Head>
                <title>Track Order - MyLittlePlant</title>
            </Head>
            <section className="hero min-h-3/4 my-10">
                <div className="hero-content flex-col-reverse lg:flex-row justify-between gap-2 w-full">
                    <div className="card w-full max-w-lg lg:shadow-2xl">
                        <form className="card-body" onSubmit={submitHandler}>
                            <div className="form-control gap-4">
                                <label
                                    htmlFor="tracking-id"
                                    className="label text-lg font-bold tracking-wider"
                                >
                                    Tracking Number
                                </label>
                                <input
                                    type="text"
                                    id="tracking-id"
                                    name="tracking-id"
                                    className="input input-bordered"
                                    placeholder="Place your tracking number..."
                                />
                            </div>
                            <div className="card-actions mt-5 flex justify-end">
                                <button className="btn btn-primary gap-3 w-full">
                                    Search
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <Image
                        src={img}
                        alt="Order Page Illustration"
                        className="block"
                        height={650}
                        width={650}
                    />
                </div>
            </section>
        </>
    );
};

export default Order;
