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

export interface ICategory {
    name: string;
    image: SanityImageSource;
    blurb: string;
}

export interface OrderObject {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    address: string;
    items: number;
    name: string;
    number: string;
    orders: Product[];
    price: number;
    processing: boolean;
}

interface Product {
    _key: string;
    items: number;
    product:
        | {
              _type: 'reference';
              _ref: string;
          }
        | null[];
}
