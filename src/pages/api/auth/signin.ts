import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession, Session } from 'next-iron-session'
import bcrypt from 'bcryptjs'
import prisma from '~/lib/Prisma'
type NextIronRequest = NextApiRequest & { session: Session }

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {

  const username = req.body.username
  const password = req.body.password

  // find user from the database
  const foundUser = await prisma.users.findMany({
    where: {
      username: username
    },
    select: {
      uuid: true,
      username: true,
      password: true
    }
  })

  // if user not found, return error
  if (!foundUser[0]) {
    return res
      .status(401)
      .json({
        message: `Account not found, sign up first.`
      })
  }

  // initialize found user credentials
  const getId = foundUser[0].uuid
  const getUsername = foundUser[0].username
  const hashPassword = foundUser[0].password

  // match the user password and hashed password from the database
  const matchPassword = await bcrypt.compare(password, hashPassword)

  if (!matchPassword) {
    return res
      .status(401)
      .json({
        message: `Password is incorrect!`
      })
  }

  // if success, create a session
  req.session.set('user', {
    id: getId,
    username: getUsername,
    admin: true
  })
  await req.session.save()
  res.send('Logged in')
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'fixrhythm',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})