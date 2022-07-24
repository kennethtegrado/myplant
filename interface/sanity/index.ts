import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface IProduct {
    _id: string;
    name: string;
    images: SanityImageSource[];
    categories: Array<{
        title: string;
    }>;
    price: number;
    slug: string;
    stocks: number;
    description: any;
    blurb: string;
    relatedProducts: Array<{
        name: string;
        price: number;
        image: SanityImageSource;
        slug: string;
        stocks: number;
        blurb: string;
    }>;
}
