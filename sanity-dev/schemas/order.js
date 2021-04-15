/* eslint-disable import/no-anonymous-default-export */
export default {
    name: 'order',
    title: 'Reihenfolge',
    type: 'document',
    __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
    fields: [
        {
            name: 'order',
            title: 'Reihenfolge',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }]
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
