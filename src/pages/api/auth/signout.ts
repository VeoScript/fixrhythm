import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession, Session } from 'next-iron-session'
type NextIronRequest = NextApiRequest & { session: Session }

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {
  
  req.session.destroy()
  res.send('Logged out')
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'fixrhythm',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})