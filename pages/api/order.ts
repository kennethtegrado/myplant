import type { NextApiRequest, NextApiResponse } from 'next';
import type { ICartProduct, OrderObject } from '@interface/sanity';

import client from '@utils/sanity';

interface OrderProduct {
    product: {
        _type: 'reference';
        _ref: string;
    };
    items: number;
    _key: string;
}

interface INewStockProduct extends ICartProduct {
    newStock: number;
}

interface RequestBody {
    products: INewStockProduct[];
    userInfo: {
        name: string;
        address: string;
        number: string;
    };
    totalPrice: number;
    items: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const orderProducts: OrderProduct[] = [];

    try {
        const { products, userInfo, totalPrice, items }: RequestBody =
            JSON.parse(req.body);

        products.forEach(async (item) => {
            orderProducts.push({
                product: { _type: 'reference', _ref: item._id },
                items: item.quantity,
                _key: item._id,
            });
            return await client
                .patch(item._id)
                .set({ stocks: item.newStock })
                .commit();
        });

        const item: OrderObject = await client.create({
            _type: 'order',
            ...userInfo,
            orders: orderProducts,
            processing: false,
            price: totalPrice,
            items,
        });

        res.status(200).json({
            message: 'Successfully added order!',
            data: item,
        });
    } catch (err) {
        if (!(err instanceof Error))
            res.status(201).json({
                message: 'Failed to add order!',
                data: null,
            });
    }
}
