import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(500).json('POST Method Only')
  } else {
    const delete_composition = await prisma.compositions.deleteMany({
      where: {
        uuid: req.body.compositionId,
        userId: req.body.userId
      }
    })
    res.status(200).json(delete_composition)
  }
}