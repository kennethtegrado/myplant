import type { NextPage } from 'next';

// NEXT Import
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Image Import
import img from '@public/asset/not_found.svg';

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Page Not Found - MyLittlePlant</title>
            </Head>
            <section className="min-h-3/4 flex flex-col items-center gap-2 my-10">
                <Image
                    src={img}
                    alt="Not found illustration"
                    width={400}
                    height={400}
                />
                <h2 className="text-4xl font-bold text-center">
                    Page Not Found
                </h2>
                <p className="max-w-sm text-center">
                    It seems like you are far far away... Please go back to
                    where you belong.
                    <small className="text-xs text-success-content mt-3 block">
                        Let&apos;s get you back on track...
                    </small>
                </p>
                <Link href="/" passHref>
                    <button className="btn btn-primary gap-3 px-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>{' '}
                        Go back
                    </button>
                </Link>
            </section>
        </>
    );
};

export default NotFound;
