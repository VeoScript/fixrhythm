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

  const imageUploaded = await getImage(req)

  const imageData = await uploadImage(imageUploaded.path)

  const result = await prisma.coverPhoto.create({
    data: {
      publicId: imageData.public_id,
      format: imageData.format,
      version: imageData.version.toString(),
      userId: user.id
    }
  })

  res.status(200).json(result)
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'fixrhythm',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})