import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const add_pinned = await prisma.pinned.create({
    data: {
      userId: req.body.userId,
      compositionId: req.body.compositionId
    }
  })
  res.status(200).json(add_pinned)
}