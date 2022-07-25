import type { FunctionComponent } from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// NEXT Import
import Image from 'next/image';
import Link from 'next/link';

// Util Import
import { imageBuilder } from '@utils/sanity';

interface ProductCardProps {
    name: string;
    price: number;
    image: SanityImageSource;
    slug: string;
    stocks: number;
    blurb: string;
    trending?: boolean;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({
    name,
    price,
    image,
    slug,
    stocks,
    blurb,
    trending,
}) => {
    return (
        <div className="card w-full md:w-80 bg-base-100 shadow-xl">
            <Link passHref href={`/product/${slug}`}>
                <figure className="cursor-pointer">
                    <Image
                        src={imageBuilder(image).width(600).toString()}
                        width={500}
                        height={450}
                        alt={`${name} Plant Product`}
                    />
                </figure>
            </Link>
            <div className="card-body p-3 md:px-8 md:py-5">
                <div
                    className={`badge ${
                        stocks ? 'badge-secondary' : 'badge-error'
                    } font-medium text-xs`}
                >
                    {stocks ? `${stocks} left` : 'No stocks'}
                </div>
                <Link href={`/product/${slug}`}>
                    <h2 className="card-title text-sm md:text-lg link link-hover">
                        {name}
                    </h2>
                </Link>

                <p className="text-xs hidden md:block">{blurb}</p>
                <div className="card-actions">
                    <p className="text-xs md:text-lg font-bold text-right text-primary">
                        ₱ {price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
