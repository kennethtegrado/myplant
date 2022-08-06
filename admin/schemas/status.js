export default {
    name: 'status',
    title: 'Order Status',
    type: 'document',
    fields: [
        {
            name: 'status',
            type: 'string',
            title: 'Order Status',
            description: 'This is what will appear on the database.',
            readOnly: true,
        },
        {
            name: 'description',
            type: 'text',
            title: 'Status Description',
            description:
                'Tell your content manager what this status is all about.',
            readOnly: true,
        },
    ],
    preview: {
        select: {
            title: 'status',
        },
        prepare(selection) {
            const { title } = selection;
            return { title: title.charAt(0).toUpperCase() + title.slice(1) };
        },
    },
};
