import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.status(500).json('PUT Method Only')
  } else {
    const raw_password = req.body.newpassword

    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(raw_password, salt)

    const change_password = await prisma.users.update({
      where: {
        uuid: req.body.userId
      },
      data: {
        password: password
      }
    })
    res.status(200).json(change_password)
  }
}