import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const send_notification = await prisma.notifications.create({
    data: {
      date: String(new Date),
      type: req.body.notification_type,
      message: req.body.notification_message,
      compositionId: req.body.compositionId,
      notificationFromId: req.body.fromUserId, //this will be the host
      notificationToId: req.body.toUserId //this will be the receiver of the notification
    }
  })
  res.status(200).json(send_notification)
}