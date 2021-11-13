import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Profile from '~/components/Profile'
import prisma from '~/lib/Prisma'

interface TypeProps {
  profile: any
  artists: any
  published_posts: any
  draft_posts: any
}

const ProfilePage: NextPage<TypeProps> = ({ profile, artists, published_posts, draft_posts }) => {

  const { user } = useUser()

  const host = user ? user : ''

  return (
    <React.Fragment>
      <Head>
        <title>{ profile.name }</title>
      </Head>
      <Layout
        host={host}
        artists={artists}
      >
        <Profile
          host={host}
          profile={profile}
          published_posts={published_posts}
          draft_posts={draft_posts}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const songs = await prisma.compositions.findMany({
    select: {
      uuid: true,
    }
  })

  return {
    paths: songs.map((song: any) => ({
      params: {
        uuid: song.uuid
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
      name: true,
      username: true,
      email: true,
      phone: true,
      shortbio: true,
      verify_email: true,
      followedBy: true,
      following: true
    }
  })

  const artists = await prisma.users.findMany({
    select: {
      id: true,
      uuid: true,
      account_type: true,
      name: true,
      username: true,
      followedBy: true
    }
  })

  const published_posts = await prisma.users.findFirst({
    where: {
      username: String(params?.username)
    },
    select: {
      id: true,
      uuid: true,
      username: true,
      composition: {
        where: {
          status: 'Published'
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
          datePublished: true,
          dateEdited: true,
          likes: true,
          comments: true,
          bookmarks: true,
          user: {
            select: {
              id: true,
              uuid: true,
              account_type: true,
              profile: true,
              name: true,
              username: true
            }
          }
        }
      }
    }
  })

  const draft_posts = await prisma.users.findFirst({
    where: {
      username: String(params?.username)
    },
    select: {
      id: true,
      uuid: true,
      username: true,
      composition: {
        where: {
          status: 'Draft'
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
          datePublished: true,
          dateEdited: true,
          likes: true,
          comments: true,
          bookmarks: true,
          user: {
            select: {
              id: true,
              uuid: true,
              account_type: true,
              profile: true,
              name: true,
              username: true
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
      published_posts,
      draft_posts
    }
  }
}

export default ProfilePage