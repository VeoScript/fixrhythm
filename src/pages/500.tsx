import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

const Custom500: NextPage = () => {
  React.useEffect(() => {
    Router.replace('/')
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>500 | Fixrhythm Internal Server Error</title>
      </Head>
      <div className="font-poppins flex flex-row items-center justify-center w-full h-screen text-pantone-white bg-pantone-darkblack">
        <div className="flex items-center justify-center w-full space-x-5">
          <h1 className="font-bold text-xl text-red-600">500</h1>
          <hr className="border-l border-pantone-white border-opacity-10 h-16" />
          <h2 className="font-normal text-sm text-pantone-white text-opacity-50">Internal Server Error.</h2>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Custom500