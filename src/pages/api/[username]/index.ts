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
        youtube: true
      }
    })
    res.status(200).json(profile)
  }
}