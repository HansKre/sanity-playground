/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'category',
  title: 'Kategorie',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Kategorie',
      type: 'string',
    },
    {
      name: 'categoryDetails',
      title: 'Details',
      type: 'string',
    },
    {
      name: 'categoryMeals',
      title: 'Speisen',
      type: 'array',
      of: [
        { type: 'meal' }
      ],
      options: {
        editModal: 'fullscreen'
      }
    }
  ],
}
