export default {
    name: 'category',
    title: 'Plant Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Category Title',
            type: 'string',
            required: true,
            validation: (Rule) =>
                Rule.lowercase().error(
                    'A category title should be in lower case'
                ),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Let people know what this category is all about.',
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection) {
            const { title } = selection;
            return { title: title[0].toUpperCase() + title.slice(1) };
        },
    },
};
