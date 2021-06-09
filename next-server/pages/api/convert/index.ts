// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');
import Schema from '@sanity/schema'
import blockTools from '@sanity/block-tools'
import client from '../../../client'

type Data = {
    name: string
}

const schemaTemplate = {
    name: 'myBlog',
    types: [
        {
            type: 'object',
            name: 'blogPost',
            fields: [
                {
                    title: 'Body',
                    name: 'body',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            lists: [],
                            marks: {}
                        }
                    ]
                }
            ]
        }
    ]
}

const convertToBlock = (inputValue: string, decorators, styles): string => {
    if (styles) schemaTemplate.types[0].fields[0].of[0].styles = styles
    if (styles) schemaTemplate.types[0].fields[0].of[0].marks.decorators = decorators
    const defaultSchema = Schema.compile(schemaTemplate)
    const blockContentType = defaultSchema.get('blogPost')
        .fields.find(field => field.name === 'body').type
    // sanitize html
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const cleanHtmlString = DOMPurify.sanitize(inputValue, {USE_PROFILES: {html: true}})
    // convert
    const blocks = blockTools.htmlToBlocks(
        cleanHtmlString,
        blockContentType,
        {
            parseHtml: html => new JSDOM(html).window.document
        }
    )
    console.log(JSON.stringify(blockTools.getBlockContentFeatures(blockContentType), undefined, 2))

    return blocks
}

export default (req: NextApiRequest, res: NextApiResponse<string>) => {
    const {html, categoryName, categoryDetails, decorators, styles} = req.body
    if (req.method === 'POST') {
        if (html) {
            const blocks = convertToBlock(html, decorators, styles)
            const doc = {
                _type: 'category',
                category: categoryName,
                categoryDetails: categoryDetails,
                deserializer: html,
                body: blocks
            }
            client.create(doc).then((sanityResponse) => {
                console.log(`New document ID is ${sanityResponse._id}`)
                res.status(200).send(JSON.stringify(sanityResponse, undefined, 2))
            }).catch(
                (error) => {
                    res.status(501).send(error.message)
                }
            )

        } else {
            res.status(406).send('Request not acceptable without html property in request body')
        }
    } else {
        res.status(405).send('Unsupported HTTP method')
    }
}
