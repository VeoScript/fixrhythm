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
        <div className="flex flex-col w-full h-full overflow-hidden">
          <div className="flex flex-row items-center justify-between w-full px-5 py-3 bg-[#202426]">
            <span className="font-light text-pantone-white text-opacity-50">News Feed</span>
            <div className="flex flex-row items-center w-full max-w-[15rem] px-3 py-2 space-x-3 text-sm rounded-md bg-pantone-white bg-opacity-10 border border-transparent focus-within:border-pantone-white focus-within:border-opacity-30">
              <svg className="w-5 h-5 text-pantone-white text-opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                className="w-full bg-transparent focus:outline-none"
                type="text"
                name="search_title"
                placeholder="Search for title"
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-full overflow-y-auto">
            card here...
          </div>
        </div>
      </MainLayout>
    </React.Fragment>
  )
}
