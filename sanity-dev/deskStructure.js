import S from '@sanity/desk-tool/structure-builder'

const singletonSchemaName = 'menuOrder'
const singletonDocumentId = '2a101cc9-32ce-4654-8039-5312e9257aac'

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
    {
        return S.list()
        .title('Inhalt')
        .items([
            // manually set first item as singleton
            S.listItem()
                // .title('Reihenfolge der Speisen')
                .title(S.documentTypeListItems().find(listItem => listItem.getId() === singletonSchemaName).getTitle())
                .child(
                    S.document()
                        .schemaType(singletonSchemaName)
                        .documentId(singletonDocumentId)
                ),
            // and now all the other document-type items
            ...S.documentTypeListItems().filter(listItem => ![singletonSchemaName].includes(listItem.getId()))
        ])}