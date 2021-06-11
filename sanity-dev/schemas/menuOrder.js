/* eslint-disable import/no-anonymous-default-export */

const TITLE = 'Konfiguration'

export default {
    name: 'menuOrder',
    title: TITLE,
    type: 'document',
    // disallow create and delete actions since this is a singleton
    __experimental_actions: [
        // 'create',
        'update',
        // 'delete',
        'publish'
    ],
    fields: [
        {
            name: 'menuOrder',
            title: 'Reihenfolge der Speisen',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    title: 'Kategorie hinzufügen',
                    to: { type: 'category' },
                    // dynamic filters: https://www.sanity.io/docs/reference-type#8118f73f6758
                    options: {
                        filter: ({ document }) => {
                            const { menuOrder } = document

                            const refsToExclude = []
                            if (menuOrder?.length > 0) {
                                menuOrder.forEach(entry => {
                                    if (entry.hasOwnProperty('_ref')) refsToExclude.push(entry._ref)
                                })
                            }
                            // always exclude drafts by default
                            let filter = '!(_id match "drafts*")'
                            const params = {}
                            refsToExclude.forEach((ref, i) => {
                                const paramName = `ref${i}`
                                params[paramName] = ref
                                filter += `&& _id != $${paramName}`
                            })

                            return {
                                filter: filter,
                                params: params
                            }
                        }
                    }
                }
            ]
        },
        {
            name: 'openingHours',
            title: 'Öffnungszeiten',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string'
                },
                {
                    name: 'block',
                    title: 'Block',
                    type: 'array',
                    of: [{ type: 'block' }]
                }
            ]
        },
        {
            name: 'contact',
            title: 'Kontakt',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Titel',
                    type: 'string'
                },
                {
                    name: 'block',
                    title: 'Block',
                    type: 'array',
                    of: [{ type: 'block' }]
                }
            ]
        },
        {
            name: 'zusatzstoffe',
            title: 'Zusatzstoffe',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'allergene',
            title: 'Allergene',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'myUniqueReferencesList',
            title: 'My List of Unique References',
            type: 'array',
            of: [
                {
                    type: 'uniquereferencesinputlist',
                    to: { type: 'category' }
                }
            ]
        }
    ],
    // fix the preview, since the first field is used for the default title which is in our case an array
    preview: {
        select: {},
        prepare(selection) {
            return {
                title: TITLE
            }
        }
    }
}
