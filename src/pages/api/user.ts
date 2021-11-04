import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession, Session } from 'next-iron-session'
type NextIronRequest = NextApiRequest & { session: Session }
import prisma from '~/lib/Prisma'

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {

  const user = req.session.get('user')

  if (user) {
    const host = await prisma.users.findFirst({
      where: {
        username: user.username
      }
    })
    res.json({
      isLoggedIn: true,
      ...host
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'fixrhythm',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})