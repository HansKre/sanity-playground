import S from '@sanity/desk-tool/structure-builder'

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
    S.list()
        .title('Inhalt')
        .items([
            S.listItem()
                .title('Reihenfolge der Speisen')
                .child(
                    S.document()
                        .schemaType('order')
                        .documentId('2a101cc9-32ce-4654-8039-5312e9257aac')
                ),
            ...S.documentTypeListItems().filter(listItem => !['order'].includes(listItem.getId()))
        ])