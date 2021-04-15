import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECTID,
    dataset: process.env.REACT_APP_SANITY_DATASET,
    apiVersion: '2021-03-25',
    useCdn: true
})