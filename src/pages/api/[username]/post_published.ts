import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const { username } = req.query
    const published_posts = await prisma.users.findFirst({
      where: {
        username: String(username)
      },
      select: {
        id: true,
        uuid: true,
        username: true,
        composition: {
          where: {
            status: 'Published'
          },
          orderBy: [
            {
              id: 'desc'
            }
          ],
          select: {
            id: true,
            uuid: true,
            title: true,
            description: true,
            content: true,
            category: true,
            status: true,
            slug: true,
            spotify: true,
            applemusic: true,
            youtube: true,
            datePublished: true,
            dateEdited: true,
            pinned: true,
            likes: true,
            comments: true,
            bookmarks: true,
            notifications: {
              select: {
                id: true
              }
            },
            user: {
              select: {
                id: true,
                uuid: true,
                account_type: true,
                profile: true,
                name: true,
                username: true
              }
            }
          }
        }
      }
    })
    res.status(200).json(published_posts)
  }
}