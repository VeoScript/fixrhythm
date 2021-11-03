import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(500).json('POST Method Only')
  } else {

    const {
      name,
      username,
      phone,
      email,
      password: rawPassword
    } = req.body

    // find user from the database
    const foundUser = await prisma.users.findMany({
      select: {
        id: true,
        uuid: true,
        verify_email: true,
        phone: true,
        email: true,
        username: true,
        password: true
      }
    })

    // check phone number if exist
    if (foundUser[0].phone === phone) {
      return res
        .status(401)
        .json({
          message: `Phone number is not available.`
        })
    }

    // check username if exist
    if (foundUser[0].username === username) {
      return res
        .status(401)
        .json({
          message: `Username is already exist`
        })
    }

    // check email if exist
    if (foundUser[0].email === email) {
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
        username: username,
        phone: phone,
        email: email,
        password: password
      }
    })
    res.status(200).json(signup)
  }
}