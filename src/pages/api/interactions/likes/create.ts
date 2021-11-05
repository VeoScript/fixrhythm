import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const like = await prisma.likes.create({
    data: {
      userId: req.body.userId,
      compositionId: req.body.compositionId
    }
  })
  res.status(200).json(like)
}