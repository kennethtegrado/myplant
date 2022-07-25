import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface IProduct {
    _id: string;
    name: string;
    images: SanityImageSource[];
    category: {
        title: string;
    };
    price: number;
    slug: string;
    stocks: number;
    description: any;
    blurb: string;
    relatedProducts: Array<IProductCard>;
}

export interface IProductCard {
    name: string;
    price: number;
    image: SanityImageSource;
    slug: string;
    stocks: number;
    blurb: string;
}

export interface ICartProduct {
    name: string;
    _id: string;
    imageURL: string;
    quantity: number;
    price: number;
    slug: string;
    stock: number;
}
