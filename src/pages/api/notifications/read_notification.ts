import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const read_notification = await prisma.notifications.update({
    where: {
      id: req.body.notificationId
    },
    data: {
      read: true
    }
  })
  res.status(200).json(read_notification)
}