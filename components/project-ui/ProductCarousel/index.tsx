import type { FunctionComponent } from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// NEXT Import
import Image from 'next/image';

// Utils Import
import { imageBuilder } from '@utils/sanity';

interface ProductCarouselProps {
    images: SanityImageSource[];
    productName: string;
}

const ProductCarousel: FunctionComponent<ProductCarouselProps> = ({
    productName,
    images,
}) => {
    return (
        <div className="flex-1">
            <div className="carousel w-full">
                {images.map((item, index) => (
                    <div
                        id={`slide${index}`}
                        key={index}
                        className="carousel-item relative w-full"
                    >
                        <Image
                            src={imageBuilder(item).width(600).toString()}
                            className="w-full"
                            alt={`${productName}-{index} demo image`}
                            width={1000}
                            height={1000}
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                                href={`#slide${
                                    index === 0 ? images.length - 1 : index - 1
                                }`}
                                className="btn btn-circle btn-primary"
                            >
                                &#10094;
                            </a>
                            <a
                                href={`#slide${
                                    index === images.length - 1 ? 0 : index + 1
                                }`}
                                className="btn btn-circle btn-primary"
                            >
                                &#10095;
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
