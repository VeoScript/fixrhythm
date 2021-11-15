import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date()
  const create_comment = await prisma.comments.create({
    data: {
      content: req.body.content,
      date: String(date),
      userId: req.body.userId,
      compositionId: req.body.compositionId
    }
  })
  res.status(200).json(create_comment)
}