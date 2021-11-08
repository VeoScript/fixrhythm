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
}

const Following: NextPage<TypeProps> = ({ profile, artists, following }) => {

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
        <title>Fixrhythm</title>
      </Head>
      <Layout
        host={host}
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

  const following = await prisma.users.findFirst({
    where: {
      username: String(params?.username)
    },
    select: {
      username: true,
      following: {
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
      following
    }
  }
}

export default Following