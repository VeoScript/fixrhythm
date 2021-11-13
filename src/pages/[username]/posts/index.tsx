import { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

const PostsPage: NextPage = () => {
  React.useEffect(() => {
    Router.replace('/')
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm</title>
      </Head>
      <div className="bg-pantone-black"></div>
    </React.Fragment>
  )
}

export default PostsPage