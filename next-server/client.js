import sanityClient from '@sanity/client'
const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECTID,
    dataset: process.env.REACT_APP_SANITY_DATASET,
    apiVersion: '2021-03-25',
    token: process.env.REACT_APP_SANITY_TOKEN,
    useCdn: false,
})

export default client