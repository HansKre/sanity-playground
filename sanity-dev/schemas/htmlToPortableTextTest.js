/* eslint-disable import/no-anonymous-default-export */
export default {
    name: 'htmlToPortableTextTest',
    title: 'Test of Html-to-Portable-Text Plugin',
    type: 'document',
    fields: [
        {
            name: 'articleHeading',
            title: 'Article Heading',
            type: 'string'
        },
        {
            name: 'htmlToArticleBody',
            title: 'HTML to Article Body',
            type: 'htmlToProtableText',
            options: { refblockdefault: 'postBody', },
        },
        {
            name: 'articleBody',
            title: 'Article Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        // { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'H5', value: 'h5' },
                        { title: 'H6', value: 'h6' },
                        { title: 'Quote', value: 'blockquote' }
                    ]
                }
            ]
        },
        {
            name: 'postBody',
            title: 'Post Body',
            type: 'array',
            of: [
                { type: 'block' }
            ]
        }
    ],
}
