import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(500).json('POST Method Only')
  } else {
    const date = new Date()
    const update_as_draft = await prisma.compositions.updateMany({
      where: {
        uuid: req.body.compositionId,
        userId: req.body.userId
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content_editor,
        category: req.body.composition_category,
        status: String('Draft'),
        dateEdited: String(date),
        userId: req.body.userId
      }
    })
    res.status(200).json(update_as_draft)
  }
}