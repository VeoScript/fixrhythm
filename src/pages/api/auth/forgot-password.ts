import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body.email

  // find user from the database
  const foundUser = await prisma.users.findMany({
    select: {
      uuid: true,
      username: true,
      name: true,
      email: true
    }
  })

  res.status(200).json(foundUser)
}