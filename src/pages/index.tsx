import type { NextPage } from 'next'
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

export default Home