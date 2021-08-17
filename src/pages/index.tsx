import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import NavigationBar from '~/components/NavigationBar'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center w-full h-full">
          <NavigationBar />
          <h1 className="font-normal text-2xl">Welcome to <span className="font-bold text-pantone-red">Fixrhythm</span></h1>
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default Home