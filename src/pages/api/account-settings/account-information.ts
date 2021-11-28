import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.status(500).json('PUT Method Only')
  } else {
    const update_account_information = await prisma.users.update({
      where: {
        uuid: req.body.userId
      },
      data: {
        // profile: req.body.profile_photo,
        // coverphoto: req.body.cover_photo,
        shortbio: req.body.short_bio,
        account_type: req.body.account_type,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        tiktok: req.body.tiktok,
        youtube: req.body.youtube
      }
    })
    res.status(200).json(update_account_information)
  }
}