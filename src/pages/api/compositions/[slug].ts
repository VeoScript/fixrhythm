import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const { slug } = req.query
    const composition = await prisma.compositions.findFirst({
      where: {
        slug: {
          contains: String(slug),
          mode: 'insensitive'
        }
      },
      include: {
        user: {
          select: {
            uuid: true,
            account_type: true,
            profile: true,
            name: true,
            username: true
          }
        },
        bookmarks: true,
        likes: true,
        comments: true
      }
    })
    res.status(200).json(composition)
  }
}