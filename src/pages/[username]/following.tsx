import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Guard from '~/layouts/guard'
import DisplayFollowing from '~/components/DisplayFollowing'
import prisma from '~/lib/Prisma'

interface TypeProps {
  profile: any
  artists: any
  following: any
  get_notification: any
}

const Following: NextPage<TypeProps> = ({ profile, artists, following, get_notification }) => {

  const { user: host } = useUser({
    redirectTo: "/login",
  })

  if (!host || host.isLoggedIn === false) {
    return (
      <React.Fragment>
        <Head>
          <title>Fixrhythm</title>
        </Head>
        <Guard />
      </React.Fragment>
    )
  }
  
  return (
    <React.Fragment>
      <Head>
        <title>{ profile.name } | Following</title>
      </Head>
      <Layout
        host={host}
        get_notification={get_notification}
        artists={artists}
      >
        <DisplayFollowing
          host={host}
          profile={profile}
          following={following}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await prisma.users.findMany({
    select: {
      username: true,
    }
  })

  return {
    paths: artists.map((artist: any) => ({
      params: {
        username: artist.username
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context

  const profile = await prisma.users.findFirst({
    where: {
      username: String(params?.username)
    },
    select: {
      id: true,
      uuid: true,
      account_type: true,
      profile: true,
      coverphoto: true,
      name: true,
      username: true,
      email: true,
      phone: true,
      shortbio: true,
      verify_email: true,
      followedBy: true,
      following: true,
      facebook: true,
      instagram: true,
      twitter: true,
      tiktok: true,
      youtube: true,
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
              spotify: true,
              applemusic: true,
              youtube: true,
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
      }
    }
  })

  const artists = await prisma.users.findMany({
    select: {
      id: true,
      uuid: true,
      profile: true,
      account_type: true,
      name: true,
      username: true,
      followedBy: true,
      composition: true
    }
  })

  const get_notification = await prisma.notifications.findMany({
    where: {
      read: false
    },
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
  })

  const following = await prisma.users.findFirst({
    where: {
      username: String(params?.username)
    },
    select: {
      username: true,
      following: {
        orderBy: [
          {
            id: 'desc'
          }
        ],
        select: {
          follower: {
            select: {
              id: true,
              uuid: true,
              profile: true,
              account_type: true,
              name: true,
              username: true,
              followedBy: true,
            }
          }
        }
      }
    }
  })

  return {
    props: {
      profile,
      artists,
      following,
      get_notification
    }
  }
}

export default Following