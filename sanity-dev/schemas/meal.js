import React from 'react'
import FormattingPreview from './FormattingPreview';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: 'meal',
    title: 'Speise',
    type: 'object',
    fields: [
        {
            name: 'meal',
            title: 'Beschreibung',
            type: 'array',
            of: [
                {
                    type: 'block',
                    // Disallow styles
                    styles: [],
                    // Disallow lists
                    lists: [],
                    marks: {
                        // Only allow these decorators
                        decorators: [
                            { title: 'Fett', value: 'strong' },
                            {
                                title: 'Hochgestellt',
                                value: 'sup',
                                blockEditor: {
                                    icon: () => <div>⤴</div>,
                                    render: ({ children }) => <span><sup>{children}</sup></span>
                                }
                            },
                        ],
                        // disallow links
                        annotations: []
                    }
                }
            ]
        },
        {
            name: 'price',
            title: 'Preis',
            type: 'number',
        },
    ],
    preview: {
        select: {
            blocks: 'meal',
            subtitle: 'price',
        },
        // get the first block text from a block array,
        // concatenate the text from its spans and use as title for a preview
        prepare(selection) {
            const { blocks, subtitle } = selection;
            const block = (blocks || []).find(block => block._type === 'block')
            return {
                title: block
                    ? block.children
                        .filter(child => child._type === 'span')
                        .map(span => {
                            if (span.marks[0]) {
                                const tag = span.marks[0];
                                return `<${tag}>${span.text}</${tag}>`
                            } else {
                                return span.text;
                            }
                        })
                        .join('')
                    : 'No title',
                subtitle: subtitle + ' €' // 13.3 -> 13.3 €
            }
        },
        // use a React Component to render markdown even in preview
        component: FormattingPreview
    },
}
