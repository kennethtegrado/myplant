import type { FunctionComponent } from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Component Import
import ProductCard from '../ProductCard';

interface ProductsContainerProps {
    title: string;
    products: Array<{
        name: string;
        price: number;
        image: SanityImageSource;
        slug: string;
        stocks: number;
        blurb: string;
    }>;
}

const ProductsContainer: FunctionComponent<ProductsContainerProps> = ({
    title,
    products,
}) => {
    if (!products) return null;

    return (
        <article>
            <h3 className="text-2xl">{title}</h3>
            <div className="flex flex-wrap py-5 gap-10">
                {products?.map((item, index) => (
                    <ProductCard {...item} key={index} />
                ))}
            </div>
        </article>
    );
};

export default ProductsContainer;
