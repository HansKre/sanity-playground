// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import client from '../../../client'

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
    if (req.method === 'DELETE') {
        const {type} = req.query
        const query = `*[_type == "${type}"][0...999]`
        const response = await client
            .delete({query: query})
        res.status(200).json(JSON.stringify(response))
    } else {
        res.status(405).send('Unsupported HTTP method')
    }
}
