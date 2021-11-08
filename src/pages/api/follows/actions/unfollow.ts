import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const unfollow = await prisma.follows.deleteMany({
    where: {
      followerId: req.body.profileId,
      followingId: req.body.userId
    }
  })
  res.status(200).json(unfollow)
}