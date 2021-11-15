/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiHome5Fill, RiMusic2Fill, RiBookOpenFill, RiBellFill, RiSettings5Fill, RiSearchLine } from 'react-icons/ri'

interface TypeProps {
  user?: any
  host: any
}

const NavigationBar: React.FC<TypeProps> = ({ user, host }) => {

  const { pathname } = useRouter()

  return (
    <React.Fragment>
      {(user || !host || host.isLoggedIn === true) && (
        <div className="flex flex-row items-center justify-between w-full py-3 shadow-xl border-b border-pantone-white border-opacity-10">
          <div className="flex items-center justify-center w-full max-w-xs">
            <Link href="/">
              <a className="font-black text-xl text-pantone-red">FIXRHYTHM</a>
            </Link>
          </div>
          <div className="flex items-center justify-center w-full max-w-full space-x-10">
            <Link href="/">
              <a><RiHome5Fill className={`${ pathname === '/' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
            </Link>
            <Link href="/">
              <a><RiMusic2Fill className={`${ pathname === '/lyrics' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
            </Link>
            <Link href="/">
              <a><RiBookOpenFill className={`${ pathname === '/poems' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
            </Link>
            <Link href="/">
              <a><RiBellFill className={`${ pathname === '/notification' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
            </Link>
            <Link href="/">
              <a><RiSettings5Fill className={`${ pathname === '/settings' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
            </Link>
          </div>
          <div className="flex items-center justify-center w-full max-w-xs px-3 space-x-3">
            <div className="flex flex-row items-center w-full px-3 space-x-3 bg-pantone-gray rounded-lg border border-pantone-black focus-within:border-pantone-white focus-within:border-opacity-30">
              <RiSearchLine className="text-white text-opacity-60" />
              <input type="text" className="w-full py-3 text-xs bg-transparent outline-none" placeholder="Search author" />
            </div>
            <Link href={`/${host.username}`}>
              <a className="flex w-full max-w-[3rem] transition ease-linear duration-100 hover:scale-95">
                <img
                  className="w-10 h-10 rounded-full bg-[#1D1F21]"
                  src={`${ host.profile ? host.profile : `https://ui-avatars.com/api/?name=${ host.name }&background=1D1F21&color=FF3C3C` }`}
                  alt=""
                />
              </a>
            </Link>
          </div>
        </div>
      )}
      {(user === '' || !host || host.isLoggedIn === false) && (
        <div className="flex flex-row items-center justify-between w-full py-3 shadow-xl border-b border-pantone-white border-opacity-10">
          <div className="flex items-center justify-center w-full max-w-xs">
            <Link href="/">
              <a className="font-black text-xl text-pantone-red">FIXRHYTHM</a>
            </Link>
          </div>
          <div className="flex items-center justify-center w-full max-w-xs px-3 space-x-2">
            <Link href="/login">
              <a className="font-normal text-xs px-5 py-3 rounded-lg bg-pantone-gray text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10">
                Sign In
              </a>
            </Link>
            <Link href="/signup">
              <a className="font-normal text-xs px-5 py-3 rounded-lg bg-pantone-red text-pantone-white transition ease-linear duration-200 hover:bg-opacity-80">
                Create Account
              </a>
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default NavigationBar
