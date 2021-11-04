import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Guard from '~/layouts/guard'
import NewsFeed from '~/components/NewsFeed'
import prisma from '~/lib/Prisma'

interface TypeProps {
  compositions: any
}

const Home: NextPage<TypeProps> = ({ compositions }) => {

  const { user: host } = useUser()

  if (!host || host.isLoggedIn === false) {
    return (
      <React.Fragment>
        <Head>
          <title>FixRhythm</title>
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
      <Layout host={host}>
        <NewsFeed
          host={host}
          compositions={compositions}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const compositions = await prisma.compositions.findMany({
    select: {
      id: true,
      uuid: true,
      title: true,
      description: true,
      content: true,
      status: true,
      date: true,
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
      compositions
    }
  }
}

export default Home