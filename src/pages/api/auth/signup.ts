import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(500).json('POST Method Only')
  } else {

    const {
      name,
      account_type,
      username,
      phone,
      email,
      password: rawPassword
    } = req.body

    // find user from the database
    const foundUser = await prisma.users.findMany({
      select: {
        id: true,
        phone: true,
        username: true,
        email: true
      }
    })

    const check_phone_exist = foundUser.some((user: { phone: string }) => user.phone === phone)
    const check_username_exist = foundUser.some((user: { username: string }) => user.username === username)
    const check_email_exist = foundUser.some((user: { email: string }) => user.email === email)

    // check phone number if exist
    if (check_phone_exist) {
      return res
        .status(401)
        .json({
          message: `Phone number is not available.`
        })
    }

    // check username if exist
    if (check_username_exist) {
      return res
        .status(401)
        .json({
          message: `Username is already exist`
        })
    }

    // check email if exist
    if (check_email_exist) {
      return res
        .status(401)
        .json({
          message: `Email is not available.`
        })
    }
  
    // hashing the password
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(rawPassword, salt)
  
    // add user to database
    const signup = await prisma.users.create({
      data: {
        name: name,
        account_type: account_type,
        username: username,
        phone: phone,
        email: email,
        password: password
      }
    })
    res.status(200).json(signup)
  }
}