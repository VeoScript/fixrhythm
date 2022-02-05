import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

const Custom404: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>404 | Fixrhythm</title>
      </Head>
      <div className="font-poppins flex flex-row items-center justify-center w-full h-screen text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-darkblack">
        <div className="flex items-center justify-center w-full space-x-5">
          <h1 className="font-bold text-xl text-red-600">404</h1>
          <hr className="border-l border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10 h-16" />
          <h2 className="font-normal text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-50">This page could not be found.</h2>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Custom404