import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Guard from '~/layouts/guard'
import DisplayFollowers from '~/components/DisplayFollowers'
import prisma from '~/lib/Prisma'

interface TypeProps {
  profile: any
  artists: any
  followers: any
  get_notification: any
}

const Followers: NextPage<TypeProps> = ({ profile, artists, followers, get_notification }) => {

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
        <title>{ profile.name } | Followers</title>
      </Head>
      <Layout
        host={host}
        artists={artists}
        get_notification={get_notification}
      >
        <DisplayFollowers
          host={host}
          profile={profile}
          followers={followers}
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

  const followers = await prisma.users.findFirst({
    where: {
      username: String(params?.username)
    },
    select: {
      username: true,
      followedBy: {
        orderBy: [
          {
            id: 'desc'
          }
        ],
        select: {
          following: {
            select: {
              id: true,
              uuid: true,
              profile: true,
              account_type: true,
              name: true,
              username: true,
              followedBy: true
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
      followers,
      get_notification
    },
    revalidate: 10
  }
}

export default Followers