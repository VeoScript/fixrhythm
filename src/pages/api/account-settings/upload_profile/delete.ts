import { NextApiRequest, NextApiResponse } from 'next'
import { getImage } from '~/lib/Formidable'
import { uploadImage } from '~/lib/Cloudinary'
import { withIronSession, Session } from 'next-iron-session'
type NextIronRequest = NextApiRequest & { session: Session }
import prisma from '~/lib/Prisma'

export const config = {
  api: {
    bodyParser: false
  }
}

async function handler(
  req: NextIronRequest,
  res: NextApiResponse,
): Promise<void> {

  const user = req.session.get('user')

  const delete_current_profile = await prisma.profile.deleteMany({
    where: {
      userId: user.id
    }
  })

  res.status(200).json(delete_current_profile)
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'fixrhythm',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})