// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function pong(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  res.status(200).send('pong')
}
