export default {
    name: 'product',
    title: 'Plant Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Product Name',
            type: 'string',
            description:
                'Help your customers identify the plant you are selling.',
            required: true,
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Click generate to create a slug.',
            options: {
                source: 'name',
                maxLength: 96,
            },
            required: true,
        },
        {
            title: 'Keywords',
            name: 'keywords',
            description:
                'Type keywords that help this specific product appear on search.',
            type: 'array',
            of: [
                {
                    type: 'string',
                },
            ],
            options: {
                layout: 'tags',
            },
            required: true,
        },
        {
            name: 'price',
            title: 'Product Price',
            type: 'number',
            description: 'Indicate the price of the product.',
            required: true,
        },
        {
            name: 'stocks',
            title: 'Stocks',
            description: 'Indicate the number of items left in the inventory.',
            required: true,
            type: 'number',
        },
        {
            name: 'trending',
            title: 'Mark as Trending',
            type: 'boolean',
            description:
                'Mark this product as trending and it will appear on the trending products section on the home page.',
            initialValue: false,
        },
        {
            name: 'images',
            title: 'Product Images',
            description:
                'Upload images of this product to customers see its beauty.',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
            required: true,
        },
        {
            name: 'blurb',
            title: 'Blurb',
            type: 'string',
            description: 'Create a short description for this product.',
            required: true,
        },

        {
            name: 'category',
            title: 'Category',
            description: 'Identify the kind of this plant',
            type: 'reference',
            to: { type: 'category' },
            required: true,
        },
        {
            name: 'description',
            title: 'Full Description',
            type: 'blockContent',
            required: true,
        },
        {
            name: 'relatedProducts',
            title: 'Related Products',
            description: 'Indicate similar products.',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }],
            validation: [
                (Rule) =>
                    Rule.unique().error('All related products must be unique.'),
                (Rule) =>
                    Rule.max(3).error(
                        'You can only put a maximum of three related products.'
                    ),
            ],
        },
    ],

    preview: {
        select: {
            title: 'name',
            media: 'images.0',
            trending: 'trending',
            blurb: 'blurb',
        },
        prepare(selection) {
            const { trending, media, title, blurb } = selection;
            return {
                title: title,
                media,
                subtitle: trending ? 'This product is trending.' : blurb,
            };
        },
    },
};
