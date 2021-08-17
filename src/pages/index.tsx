import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="font-normal text-2xl">Welcome to <span className="font-bold">Fixrhythm</span></h1>
      </div>
    </React.Fragment>
  )
}

export default Home