import type { NextPage } from 'next';

// NEXT import
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Image import
import img from '@public/asset/no_order.svg';

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Order Not Found - MyLittlePlant</title>
            </Head>
            <section className="min-h-3/4 flex flex-col my-10 gap-10">
                <Image
                    src={img}
                    alt="Not Found Illustration"
                    height={400}
                    width={400}
                />
                <div className="flex items-center flex-col gap-3">
                    <h3 className="text-3xl font-bold text-center">
                        Order not Found
                    </h3>
                    <p className="max-w-sm text-center">
                        Your transaction number does not exist. It seems like
                        you are lost. Please go back.
                    </p>
                    <Link href="/order" passHref>
                        <button className="btn btn-primary px-5 gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Try again
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default NotFound;
