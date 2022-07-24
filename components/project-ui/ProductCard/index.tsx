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
}

const ProductCard: FunctionComponent<ProductCardProps> = ({
    name,
    price,
    image,
    slug,
    stocks,
    blurb,
}) => {
    return (
        <div className="card w-80 bg-base-100 shadow-xl">
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
            <div className="card-body">
                <div className="badge badge-secondary font-medium">
                    {stocks} item{stocks > 1 ? 's' : ''} left
                </div>
                <h2 className="card-title">{name}</h2>
                <p>{blurb}</p>
                <div className="card-actions">
                    <p className="text-lg font-bold text-right text-primary">
                        ₱ {price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
