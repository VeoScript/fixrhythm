import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const unlike = await prisma.likes.deleteMany({
    where: {
      userId: req.body.userId,
      compositionId: req.body.compositionId
    }
  })
  res.status(200).json(unlike)
}