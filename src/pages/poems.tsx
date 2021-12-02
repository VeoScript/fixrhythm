import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Guard from '~/layouts/guard'
import NewsFeed from '~/components/NewsFeed'
import prisma from '~/lib/Prisma'

interface TypeProps {
  artists: any
  get_notification: any
  poems_published_compositions: any
}

const Poems: NextPage<TypeProps> = ({ artists, get_notification, poems_published_compositions }) => {

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
        <title>Fixrhythm | Poems</title>
      </Head>
      <Layout
        host={host}
        artists={artists}
        get_notification={get_notification}
      >
        <NewsFeed
          host={host}
          poems_published_compositions={poems_published_compositions}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {

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

  const poems_published_compositions = await prisma.compositions.findMany({
    where: {
      status: 'Published',
      category: 'Poem'
    },
    orderBy: [
      {
        id: 'desc'
      }
    ],
    select: {
      id: true,
      uuid: true,
      title: true,
      description: true,
      content: true,
      category: true,
      status: true,
      slug: true,
      spotify: true,
      applemusic: true,
      youtube: true,
      datePublished: true,
      dateEdited: true,
      pinned: true,
      likes: true,
      comments: true,
      bookmarks: true,
      notifications: {
        select: {
          id: true
        }
      },
      user: {
        select: {
          id: true,
          uuid: true,
          profile: true,
          account_type: true,
          name: true,
          username: true
        }
      }
    }
  })

  return {
    props: {
      artists,
      get_notification,
      poems_published_compositions
    }
  }
}

export default Poems