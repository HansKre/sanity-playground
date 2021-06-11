/* eslint-disable import/no-anonymous-default-export */
export default {
    name: 'currentInfo',
    title: 'Aktuelle Informationen',
    type: 'document',
    fields: [
        {
            name: 'header',
            title: 'Überschrift',
            type: 'string'
        },
        {
            name: 'date',
            title: 'Datum',
            type: 'date'
        },
        {
            name: 'message',
            title: 'Nachricht',
            type: 'array',
            of: [{ type: 'block' }]
        },
    ]
}