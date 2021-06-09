import type {NextApiRequest, NextApiResponse} from 'next'
import createDOMPurify from 'dompurify'
import blockTools from '@sanity/block-tools'
import Schema from '@sanity/schema'
import {BlockSchemaType} from '@sanity/types'
const jsdom = require('jsdom')
const {JSDOM} = jsdom
import {nanoid} from 'nanoid'
import client from '../../../client'

const compileBlockContentType = (type: any) => {
    const compiledSchema = Schema.compile({
        name: 'dummy',
        types: [
            {
                name: 'blockType',
                type: 'document',
                fields: [
                    {
                        name: 'blockField',
                        type: 'array',
                        of: [
                            {
                                type: 'block',
                                styles: type?.styles,
                                lists: type?.lists,
                                marks: type?.marks,
                            }
                        ]
                    }
                ],
            }
        ]
    })
    const blockContentType = compiledSchema?.get('blockType')?.fields?.find((field: {name: string}) => field.name === 'blockField')?.type
    return blockContentType
}

function sanitizeHtml(html: string): string {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(html, {USE_PROFILES: {html: true}})
}

function convertToBlock(blockContentType: any, inputValue: string): BlockSchemaType | null {
    // sanitize html
    const cleanHtmlString = sanitizeHtml(inputValue)
    // replace single backslash from html since input component escapes them already
    const cleanHtmlStringWithoutBackslash = cleanHtmlString?.replace(/(?<!\\)\\(?!\\)/, '')
    // convert
    const blocks = blockTools.htmlToBlocks(
        cleanHtmlStringWithoutBackslash,
        blockContentType, {
        parseHtml: (html: string) => new JSDOM(html).window.document
    }
    )
    return blocks
}

type InMeal = {
    meal: string,
    price: string
}

type OutMeal = {
    meal: BlockSchemaType | null,
    price: number,
    _key: string
}

type InCategory = {
    category: string,
    categoryDetails: string,
    categoryMeals: Array<InMeal>,
}

type OutCategory = {
    _type: string,
    category: string,
    categoryDetails: string,
    categoryMeals: Array<OutMeal>,
}

export default (req: NextApiRequest, res: NextApiResponse<string>) => {
    if (req.method === 'POST') {
        const {categories, blockStyles} = req.body
        const blockContentType = compileBlockContentType(blockStyles)
        const responseMessages: Array<string> = []
        const promises =
            categories.reduce((acc: Array<Promise<any>>, categoryObj: InCategory) => {
                const {category, categoryDetails, categoryMeals} = categoryObj
                const categoryMealsBlocks = categoryMeals.map(meal => {
                    const block: BlockSchemaType | null = convertToBlock(blockContentType, meal.meal)
                    return {
                        meal: block,
                        price: Number(meal.price.replace(',', '.')),
                        _key: nanoid()
                    } as OutMeal
                })
                const doc: OutCategory = {
                    _type: 'category',
                    category: category,
                    categoryDetails: categoryDetails,
                    categoryMeals: categoryMealsBlocks
                }
                return [...acc,
                client.create(doc)
                    .then((sanityResponse) => {
                        responseMessages.push(`New document ID is ${sanityResponse._id}`)
                    })
                    .catch(
                        (error) => {
                            responseMessages.push(error.message)
                            res.status(501).json(JSON.stringify({result: responseMessages}))
                        }
                    )]
            }, [])
        Promise.all(promises).then(values => {
            res.status(200).json(JSON.stringify({result: responseMessages}))
        })
    } else {
        res.status(405).send('Unsupported HTTP method')
    }
}
