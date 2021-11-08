import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Guard from '~/layouts/guard'
import DisplayFollowers from '~/components/DisplayFollowers'
import prisma from '~/lib/Prisma'

interface TypeProps {
  followers: any
  artists: any
}

const Followers: NextPage<TypeProps> = ({ followers, artists }) => {

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
        <DisplayFollowers
          host={host}
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

  const followers = await prisma.users.findFirst({
    where: {
      username: String(params?.username)
    },
    select: {
      followedBy: {
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

  return {
    props: {
      followers,
      artists
    }
  }
}

export default Followers