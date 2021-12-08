import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { token } = req.query

  const secret = process.env.JWT_SECRET as string
  const decode = jwt.decode(token.toString(), secret)

  const userId = decode.userId
  const rawPassword = req.body.newpassword

  const salt = await bcrypt.genSalt()
  const password = await bcrypt.hash(rawPassword, salt)

  const reset_password = await prisma.users.update({
    where: {
      uuid: userId
    },
    data: {
      password: password
    }
  })
  res.json(reset_password)
}