import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiHome5Fill, RiMusic2Fill, RiBookOpenFill, RiBellFill, RiSettings5Fill, RiSearchLine } from 'react-icons/ri'

const NavigationBar: React.FC = () => {

  const { pathname } = useRouter()

  return (
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
      <div className="flex items-center justify-center w-full max-w-xs px-3">
        <div className="flex flex-row items-center w-full px-3 space-x-3 bg-pantone-gray rounded-lg border border-pantone-black focus-within:border-pantone-white focus-within:border-opacity-30">
          <RiSearchLine className="text-white text-opacity-60" />
          <input type="text" className="w-full py-3 text-xs bg-transparent outline-none" placeholder="Search author" />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
