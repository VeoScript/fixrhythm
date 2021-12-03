import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const read_all_notification = await prisma.notifications.updateMany({
    where: {
      notificationToId: req.body.notificationToId
    },
    data: {
      read: true
    }
  })
  res.status(200).json(read_all_notification)
}