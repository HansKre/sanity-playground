/* eslint-disable import/no-anonymous-default-export */
export default {
    name: 'menuOrder',
    title: 'Reihenfolge der Speisen',
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
        }
    ],
    // fix the preview, since the first field is used for the default title which is in our case an array
    preview: {
        select: {},
        prepare(selection) {
            return {
                title: 'Reihenfolge der Speisen'
            }
        }
    }
}
