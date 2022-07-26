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
            name: 'blurb',
            title: 'Blurb',
            description: 'Give a short description about this category.',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Let people know what this category is all about.',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Show people what this category is all about.',
            options: {
                hotspot: true,
            },
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
        prepare(selection) {
            const { title, media } = selection;
            return {
                title: title[0].toUpperCase() + title.slice(1),
                media: media,
            };
        },
    },
};
