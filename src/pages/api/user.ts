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
      },
      include: {
        profile: {
          select: {
            id: true,
            publicId: true,
            version: true,
            format: true,
            user: {
              select: {
                uuid: true,
                name: true,
                username: true
              }
            }
          }
        },
        coverphoto: {
          select: {
            id: true,
            publicId: true,
            version: true,
            format: true,
            user: {
              select: {
                uuid: true,
                name: true,
                username: true
              }
            }
          }
        },
        pinned: {
          orderBy: [
            {
              id: 'desc'
            }
          ],
          include: {
            composition: {
              select: {
                uuid: true,
                title: true,
                category: true,
                description: true,
                slug: true,
                pinned: true,
                likes: true,
                bookmarks: true,
                user: {
                  select: {
                    name: true,
                    username: true,
                    account_type: true
                  }
                }
              }
            }
          }
        },
        likes: true,
        comments: true,
        bookmarks: {
          orderBy: [
            {
              id: 'desc'
            }
          ],
          include: {
            composition: {
              select: {
                uuid: true,
                title: true,
                category: true,
                description: true,
                slug: true,
                pinned: true,
                likes: true,
                bookmarks: true,
                notifications: {
                  select: {
                    id: true
                  }
                },
                user: {
                  select: {
                    name: true,
                    username: true,
                    account_type: true
                  }
                }
              }
            }
          }
        },
        notificationTo: {
          orderBy: [
            {
              id: 'desc'
            }
          ],
          
          select: {
            id: true,
            date: true,
            read: true,
            type: true,
            message: true,
            follows: true,
            composition: {
              select: {
                uuid: true,
                title: true
              }
            },
            notificationFrom: {
              select: {
                uuid: true,
                profile: true,
                username: true,
                name: true
              }
            },
            notificationTo: {
              select: {
                uuid: true,
                profile: true,
                username: true,
                name: true
              }
            }
          }
        },
        composition: true,
        followedBy: true,
        following: true
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