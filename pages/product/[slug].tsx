import type { GetServerSideProps, NextPage } from 'next';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { IProduct } from '@interface/sanity';

// NEXT
import Head from 'next/head';

// Sanity
import { groq } from 'next-sanity';

// Utils
import { getClient } from '@utils/sanity';

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
                <title>{product.name}</title>
            </Head>
            <section className="py-10">
                <div className="flex flex-col lg:flex-row mb-10 gap-10 lg:items-center">
                    <ProductCarousel
                        images={product.images}
                        productName={product.name}
                    />
                    <ProductHeader
                        _id={product._id}
                        categories={product.categories}
                        name={product.name}
                        blurb={product.blurb}
                        stocks={product.stocks}
                        price={product.price}
                        image={product.images[0]}
                        slug={product.slug}
                    />
                </div>
                <ProductDescription description={product.description} />
                <ProductsContainer
                    title="Related Products"
                    products={product.relatedProducts}
                />
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
    categories[]->{
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
