/* eslint-disable import/no-anonymous-default-export */
export default {
    name: 'currentInfo',
    title: 'Aktuelle Informationen',
    type: 'document',
    fields: [
        {
            name: 'header',
            title: 'Überschrift',
            type: 'string',
            validation: Rule => Rule.required().min(10).max(80)
        },
        {
            name: 'date',
            title: 'Datum',
            type: 'date',
            validation: Rule => Rule.required()
        },
        {
            name: 'message',
            title: 'Nachricht',
            type: 'array',
            of: [{ type: 'block' }],
            validation: Rule => Rule.required()
        },
    ]
}