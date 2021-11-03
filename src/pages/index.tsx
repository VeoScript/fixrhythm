import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import withSession from '~/lib/Session'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import NewsFeed from '~/components/NewsFeed'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm</title>
      </Head>
      <Layout>
        <NewsFeed />
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async function (context: any) {
  const user = context.req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
})

export default Home