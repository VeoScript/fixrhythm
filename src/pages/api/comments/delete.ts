import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(500).json('POST Method Only')
  } else {
    const delete_comments = await prisma.comments.deleteMany({
      where: {
        uuid: req.body.commentId,
        userId: req.body.userId
      }
    })
    res.status(200).json(delete_comments)
  }
}