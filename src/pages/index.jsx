import React from 'react'
import Head from 'next/head'
import MainLayout from '~/layouts/main'

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm</title>
      </Head>
      <MainLayout>
        <div className="flex">
          <h1 className="text-[#707070]">Fixrhythm</h1>
        </div>
      </MainLayout>
    </React.Fragment>
  )
}
