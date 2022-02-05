/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Pantone from '~/utils/Pantone'
import { pantone } from '~/mock/pantone'

const About: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm | About</title>
      </Head>
      <div className="preventcopy font-poppins flex flex-col items-center px-3 py-16 w-full h-screen overflow-y-auto space-y-10 text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-darkblack">
        <div className="flex flex-col items-center space-y-2">
          <img className="w-[32rem]" src="./fixrhythm_logo.png" alt="fixrhythm_official" />
          <h1 className="font-extrabold text-2xl text-pantone-gray dark:text-pantone-white">EVOLVE YOUR IDEAS</h1>
        </div>
        <div className="flex flex-col items-center text-center w-full max-w-3xl space-y-2">
          <h3 className="font-medium text-xl text-pantone-gray dark:text-pantone-white text-opacity-80 dark:text-opacity-80">
            Fixrhythm is a social media whose goal is for people to share their thoughts around the world through music and poetry. And to inspire other music artist and lyricists to compose their own compositions.
          </h3>
        </div>
        <div className="flex flex-col items-center text-center w-full max-w-3xl space-y-10">
          <h3 className="text-lg text-pantone-gray dark:text-pantone-white text-opacity-80 dark:text-opacity-80">
            Special thanks to <Link href="https://www.pantone.com/hk/en/" passHref={true}><a className="hover:underline" target="_blank">PANTONE</a></Link>, provides a universal language of color that enables color-critical decisions through every stage of the workflow for brands and manufacturers.
          </h3>
          <div className="flex flex-row items-center justify-center w-full space-x-3">
            {pantone.map((info: any, i: number) => (
              <div className="flex flex-col pantone-card w-36 h-[12rem] p-1 rounded-sm text-panther bg-white border border-[#919191]" key={i}>
                <div className={`flex w-full h-[20rem] ${info.color}`} />
                <div className="flex flex-col justify-start items-start w-full h-full px-2 py-2">
                  <Pantone />
                  <div className="flex flex-col items-start -mt-7 text-pantone-darkblack">
                    <span className="text-sm">{ info.code }</span>
                    <span className="text-sm">{ info.name }</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <Link href="/">
            <a className="flex justify-center w-full px-5 py-2 text-pantone-white bg-pantone-red rounded-lg transition ease-linear duration-200 hover:bg-opacity-80">
              Go to Fixrhythm
            </a>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center w-full space-x-3 font-bold text-xs text-[#434343] dark:text-[#919191]">
          <span>&copy; 2021 FIXRHYTHM</span>
          <img className="w-6 h-6" src="/fixrhythm.png" alt="fixrhythm" />
          <span>by VEOSCRIPT.</span>
        </div>
      </div>
    </React.Fragment>
  )
}

export default About