import { number } from 'prop-types';

export default {
    name: 'order',
    title: 'Plant Orders',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: "Customer's Name",
            type: 'string',
            required: true,
            readOnly: true,
        },
        {
            name: 'address',
            title: "Customer's Address",
            type: 'text',
            required: true,
            readOnly: true,
        },
        {
            name: 'number',
            title: "Customer's Contact Number",
            type: 'string',
            required: true,
            readOnly: true,
        },
        {
            name: 'price',
            title: 'Total Price of Items',
            type: 'number',
            required: true,
            readOnly: true,
        },
        {
            name: 'items',
            title: 'Total Number of Items',
            type: 'number',
            required: true,
            readOnly: true,
        },
        {
            name: 'orders',
            title: 'Products Purchased',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'product',
                            title: 'Product Ordered',
                            type: 'reference',
                            to: { type: 'product' },
                            required: true,
                            readOnly: true,
                        },
                        {
                            name: 'items',
                            title: 'Number of Items Ordered',
                            type: 'number',
                            required: true,
                            readOnly: true,
                        },
                    ],
                },
            ],
            required: true,
            readOnly: true,
        },
        {
            name: 'processing',
            title: 'Process Order',
            description:
                'If the transaction is processed, mark the order as true.',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'status',
            title: 'Order Status',
            description: 'Notify customers about their order status.',
            type: 'reference',
            to: { type: 'status' },
        },
    ],
    preview: {
        select: {
            title: 'name',
            processing: 'processing',
        },
        prepare(selection) {
            const { title, processing } = selection;
            return {
                title: title,
                subtitle: processing
                    ? 'This order still needs to be processed.'
                    : 'This order is already processed, please check the status.',
            };
        },
    },
};
