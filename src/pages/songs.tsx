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
  song_published_compositions: any
}

const Songs: NextPage<TypeProps> = ({ artists, song_published_compositions }) => {

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
        <title>Fixrhythm | Songs</title>
      </Head>
      <Layout
        host={host}
        artists={artists}
      >
        <NewsFeed
          host={host}
          song_published_compositions={song_published_compositions}
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
    }
  })

  const song_published_compositions = await prisma.compositions.findMany({
    where: {
      status: 'Published',
      category: 'Song'
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
      datePublished: true,
      dateEdited: true,
      pinned: true,
      likes: true,
      comments: true,
      bookmarks: true,
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
      song_published_compositions
    }
  }
}

export default Songs