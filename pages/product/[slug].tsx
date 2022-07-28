import type { GetServerSideProps, NextPage } from 'next';
import type { IProduct } from '@interface/sanity';

// NEXT
import Head from 'next/head';
import Link from 'next/link';

// Sanity
import { groq } from 'next-sanity';

// Utils
import { getClient, imageBuilder } from '@utils/sanity';

// Component Import
import {
    ProductDescription,
    ProductCarousel,
    ProductsContainer,
    ProductHeader,
} from '@components/project-ui';

interface ProductProps {
    product: IProduct;
}

const Product: NextPage<ProductProps> = ({ product }) => {
    return (
        <>
            <Head>
                <title>{product.name} - MyLittlePlant</title>
                <meta name="description" content={product.blurb} />
                <meta
                    property="og:title"
                    content={`Buy your very own ${product.name} through MyLittlePlant Shop.`}
                />
                <meta property="og:description" content={product.blurb} />
                <meta
                    property="og:image"
                    content={imageBuilder(product.images[0]).toString()}
                />
            </Head>
            <section className="py-10">
                <div className="text-sm breadcrumbs mb-5">
                    <ul>
                        <li className="flex flex-row gap-2 text-primary">
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
                            <Link href="/shop">
                                <span className="font-medium link link-hover cursor-pointer ">
                                    Shop
                                </span>
                            </Link>
                        </li>

                        <li className="flex flex-row gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">{product.name}</span>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col lg:flex-row mb-10 gap-10 lg:items-center">
                    <ProductCarousel
                        images={product.images}
                        productName={product.name}
                    />
                    <ProductHeader
                        _id={product._id}
                        category={product.category}
                        name={product.name}
                        blurb={product.blurb}
                        stocks={product.stocks}
                        price={product.price}
                        image={product.images[0]}
                        slug={product.slug}
                    />
                </div>
                <ProductDescription description={product.description} />
                {product.relatedProducts.length ? (
                    <ProductsContainer
                        title="Related Products"
                        products={product.relatedProducts}
                    />
                ) : undefined}
            </section>
        </>
    );
};

const productQuery = groq`
*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    price,
    stocks,
    images,
    blurb, 
    category->{
        title
    },
    description,
    "slug": slug.current,
    relatedProducts[]->{
      name,
      price,
      "image": images[0],
      "slug": slug.current,
      blurb,
      stocks
    }
}
`;

export const getServerSideProps: GetServerSideProps = async ({
    params,
    preview = false,
}) => {
    const slug = params?.slug || '';

    const product: IProduct = await getClient(preview).fetch(productQuery, {
        slug,
    });

    if (!product)
        return {
            notFound: true,
        };

    return {
        props: {
            product,
        },
    };
};

export default Product;
