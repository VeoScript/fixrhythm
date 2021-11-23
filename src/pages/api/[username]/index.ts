import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const { username } = req.query
    const profile = await prisma.users.findFirst({
      where: {
        username: String(username)
      },
      select: {
        id: true,
        uuid: true,
        account_type: true,
        profile: true,
        coverphoto: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        shortbio: true,
        verify_email: true,
        followedBy: true,
        following: true,
        facebook: true,
        instagram: true,
        twitter: true,
        tiktok: true,
        youtube: true,
        pinned: {
          orderBy: [
            {
              id: 'desc'
            }
          ],
          include: {
            composition: {
              select: {
                uuid: true,
                title: true,
                category: true,
                description: true,
                slug: true,
                pinned: true,
                likes: true,
                bookmarks: true,
                user: {
                  select: {
                    name: true,
                    username: true,
                    account_type: true
                  }
                }
              }
            }
          }
        }
      }
    })
    res.status(200).json(profile)
  }
}