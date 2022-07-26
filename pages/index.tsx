import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { ICategory, IProductCard } from '@interface/sanity';

import { Fragment } from 'react';

// NEXT Import
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Image
import hero from '@public/hero.webp';

// Sanity
import { groq } from 'next-sanity';
import { getClient, imageBuilder } from '@utils/sanity';

// Component Import
import { ProductsContainer } from '@components/project-ui';

interface HomeProps {
    products: IProductCard[];
    categories: ICategory[];
}

const Home: NextPage<HomeProps> = ({ products, categories }) => {
    return (
        <>
            <Head>
                <title>Discover - MyLittlePlant</title>
                <meta
                    name="description"
                    content="An application built specifically for you to buy your dream plants."
                />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="Discover - MyLittlePlant" />
                <meta
                    property="og:description"
                    content="An application built specifically for you to buy your dream plants."
                />
                <meta
                    property="og:image"
                    content="https://myplant.vercel.app/hero.webp"
                />
            </Head>
            <section className="hero my-10">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <Image
                        src={hero}
                        alt="This is where it all began."
                        className="max-w-sm rounded-lg shadow-2xl"
                    ></Image>
                    <div>
                        <h1 className="text-5xl font-black">
                            Turn Earth into Green
                        </h1>
                        <p className="py-6">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Eum deleniti molestiae inventore fugit fuga
                            quasi doloremque ab iste aspernatur, sapiente libero
                            eaque in ut et consequatur autem amet ipsa
                            voluptatem.
                        </p>
                        <Link passHref href="/shop">
                            <button className="btn btn-primary">
                                Visit Shop
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="my-10">
                <ProductsContainer
                    products={products}
                    title="Trending Products"
                    link="/shop"
                    linkText="See all products →"
                />
            </section>
            <section className="my-10">
                <h3 className="text-2xl mb-2">Categories</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-5 gap-x-3 gap-y-5 md:gap-8">
                    {categories?.map((item, index) => (
                        <div
                            className="card card-compact w-full bg-base-100 shadow-xl"
                            key={index}
                        >
                            <Link href={`/shop?categories="${item.name}"`}>
                                <figure>
                                    <Image
                                        src={imageBuilder(
                                            item.image
                                        ).toString()}
                                        alt={`${item.name} Category`}
                                        width={400}
                                        height={250}
                                        className="cursor-pointer"
                                    />
                                </figure>
                            </Link>

                            <div className="card-body">
                                <Link href={`/shop?categories="${item.name}"`}>
                                    <h4 className="card-title capitalize text-primary font-bold link link-hover">
                                        {item.name}
                                    </h4>
                                </Link>

                                <p>{item.blurb}</p>
                                <div className="card-actions justify-end">
                                    <Link
                                        href={`/shop?categories="${item.name}"`}
                                    >
                                        <button className="btn btn-primary btn-xs md:btn-md">
                                            View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

const TrendingProductsQuery = groq`
*[_type == "product" && trending == true][0...4] {
    name,
    price,
    "image": images[0],
    "slug": slug.current,
    stocks,
    blurb
  }
`;

const CategoriesQuery = groq`
*[_type == "category"]{
    "name": title,
    blurb,
    image
  }
`;

export const getServerSideProps: GetServerSideProps = async ({
    preview = false,
}) => {
    const trendingProducts: IProductCard[] = await getClient(preview).fetch(
        TrendingProductsQuery
    );
    const categories: ICategory[] = await getClient(preview).fetch(
        CategoriesQuery
    );

    return { props: { products: trendingProducts, categories } };
};

export default Home;
