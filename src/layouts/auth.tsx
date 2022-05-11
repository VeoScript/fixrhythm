/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { RiInformationLine, RiGithubFill } from 'react-icons/ri'

interface TypeProps {
  children: any
}

const Auth: React.FC<TypeProps> = ({ children }) => {
  return (
    <div className="preventcopy font-poppins flex flex-col items-center justify-start md:justify-center w-full h-screen bg-pantone-white dark:bg-pantone-black overflow-hidden">
      <div className="relative flex flex-col items-center justify-start md:justify-center w-full max-w-[2400px] h-full overflow-y-auto my-scrollbar md:overflow-y-hidden py-10 md:py-0 text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-darkblack">
        <div className="flex flex-col items-center w-full space-y-5">
          <div className="absolute top-5 right-5">
            <div className="flex flex-row items-center space-x-2">
              <Link href="/about">
                <a title="About">
                  <RiInformationLine className="w-5 h-5 text-pantone-gray dark:text-pantone-white transition ease-in-out duration-200 hover:scale-95" />
                </a>
              </Link>
              <Link href="https://github.com/VeoScript/fixrhythm" passHref={true}>
                <a title="Project Source" target="_blank">
                  <RiGithubFill className="w-5 h-5 text-pantone-gray dark:text-pantone-white transition ease-in-out duration-200 hover:scale-95" />
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <h3 className="font-black text-3xl text-pantone-red">FIXRHYTHM</h3>
            <h6 className="font-light text-sm text-center">Evolve Your Ideas</h6>
          </div>
          <div className="flex flex-col items-center w-full">
            { children }
          </div>
          <div className="flex flex-row items-center justify-center w-full pt-5 space-x-3 font-light text-[10px] text-[#6f6f6f]">
            <span>&copy; {new Date().getFullYear()} FIXRHYTHM</span>
            <img className="w-6 h-6" src="/fixrhythm.png" alt="fixrhythm" />
            <span>by VEOSCRIPT.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
