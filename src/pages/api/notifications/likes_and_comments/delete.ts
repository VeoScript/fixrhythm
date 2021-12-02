import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const remove_notification = await prisma.notifications.deleteMany({
   where: {
     id: req.body.notificationId,
     compositionId: req.body.compositionId,
     notificationFromId: req.body.notificationFromId,
     type: req.body.notificationType
   }
  })
  res.status(200).json(remove_notification)
}