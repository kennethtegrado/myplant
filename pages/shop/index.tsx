import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { IProductCard } from '@interface/sanity';
import type { ParsedUrlQuery } from 'querystring';

// NEXT Import
import Head from 'next/head';

// Sanity
import { groq } from 'next-sanity';
import { getClient } from '@utils/sanity';

// Components
import {
    FilterModal,
    ProductsContainer,
    SearchProduct,
    ShopPagination,
} from '@components/project-ui';

// Config
import { config } from '@config/database';

interface ShopProps {
    products: Array<IProductCard>;
    count: number;
    pages: number;
}

const Shop: NextPage<ShopProps> = ({ products, count, pages }) => {
    return (
        <>
            <Head>
                <title>Shop</title>
            </Head>
            <section className="mt-10">
                <h1 className="text-center text-4xl font-bold text-primary">
                    Shop
                </h1>
                <p className="text-center italic text-secondary-content">
                    View all available products
                </p>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li className="flex flex-row gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">Shop</span>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-between md:justify-end my-2 items-center gap-3">
                    <FilterModal />
                    <SearchProduct />
                </div>
                <div>
                    <p className="text-xl">
                        {count} item{count > 1 ? 's' : ''} found
                    </p>
                </div>
            </section>

            <section className="min-h-3/4 flex flex-col justify-end">
                <ProductsContainer products={products} />
                <ShopPagination pages={pages} />
            </section>
        </>
    );
};

export default Shop;

const ShopQueryFn = (query: ParsedUrlQuery) => {
    const search = query.search;
    const maxPrice = query.maxprice && +query.maxprice;
    const minPrice = query.minprice && +query.minprice;
    const category = query.categories;
    let page = query.page;

    if (!page) page = '1';

    const startingIndex = (+page - 1) * config.ITEM_COUNT;
    const endIndex = config.ITEM_COUNT * +page;

    const queryString = `${search ? `&& name match "${search}"` : ''} ${
        maxPrice ? `&& price <= ${maxPrice}` : ''
    } ${minPrice ? `&& price >= ${minPrice}` : ''} ${
        category ? `&& category->title in [${category}]` : ''
    }`;

    return groq`{
        "products": *[_type == "product" ${queryString}] | order(_createdAt desc) [${startingIndex}...${endIndex}]  {
                        name,
                        "slug": slug.current,
                        blurb,
                        stocks,
                        price,
                        "image": images[0]
        },
        "count": count(*[_type == "product" ${queryString}])
    }`;
};

interface IResponse {
    products: IProductCard[];
    count: number;
}

export const getServerSideProps: GetServerSideProps = async ({
    preview = false,
    query,
}) => {
    const response: IResponse = await getClient(preview).fetch(
        ShopQueryFn(query)
    );

    const { products, count } = response;

    const pages = Math.round(count / 8) || 1;

    return { props: { products, count, pages } };
};
