/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { RiPushpinFill, RiEye2Fill, RiMusic2Fill, RiBookOpenFill } from 'react-icons/ri'

interface TypeProps {
  host: any
}

const LeftSideBar: React.FC<TypeProps> = ({ host }) => {
  return (
    <div className="flex flex-col w-full max-w-xs h-full overflow-y-auto scrollbar-hide pb-20 bg-pantone-gray border-r border-pantone-white border-opacity-10">
      <div className="flex flex-col items-center w-full px-5 py-5 space-y-3">
        <img
          className="w-40 h-40 rounded-full bg-[#1D1F21]"
          src={`${ host.profile ? host.profile : `https://ui-avatars.com/api/?name=${ host.name }&background=1D1F21&color=FF3C3C` }`}
          alt=""
        />
        <div className="flex flex-col items-center w-full space-y-2">
          <span className="font-bold text-xl text-pantone-white">{ host.name }</span>
          <span className="font-light text-sm text-pantone-white">{ host.account_type }</span>
          <span className="font-light text-xs text-pantone-white text-opacity-30 text-center">
            {`${ host.shortbio ? host.shortbio : 'Welcome to Fixrhythm' }`}
          </span>
        </div>
        <div className="flex flex-col items-center w-full space-y-1">
          <button
            className="flex justify-center w-full p-3 text-pantone-white bg-pantone-darkblack rounded-lg transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
            onClick={() => {
              Router.push(`${`/${ host.username }`}`)
            }}
          >
            <span className="font-light text-xs">View Profile</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full px-5 space-x-3">
        <div className="flex items-center w-full space-x-1 font-light text-[11px]">
          <span className="font-bold text-pantone-white text-sm">{ host.followedBy.length }</span>
          <Link href={`/${host.username}/followers`}>
            <a className="transition ease-linear duration-200 hover:text-red-500">followers</a>
          </Link>
        </div>
        <div className="flex items-center w-full space-x-1 font-light text-[11px]">
          <span className="font-bold text-pantone-white text-sm">{ host.following.length }</span>
          <Link href="/">
            <a className="transition ease-linear duration-200 hover:text-red-500">following</a>
          </Link>
        </div>
        <div className="flex items-center w-full space-x-1 font-light text-[11px]">
          <span className="font-bold text-pantone-white text-sm">0</span>
          <Link href="/">
            <a className="transition ease-linear duration-200 hover:text-red-500">compositions</a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-5">
        <div className="flex items-center w-full px-3 py-2 space-x-1 border-t border-b border-pantone-white border-opacity-10">
          <div className="flex items-center justify-center w-full space-x-1">
            <RiPushpinFill className="w-3 h-3" />
            <span className="font-normal text-xs">Pinned Compositions</span>
          </div>
        </div>
        <div className="flex flex-col w-full p-3 space-y-2 border-b border-pantone-white border-opacity-10">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center w-full space-x-1">
              <RiMusic2Fill className="w-3 h-3 text-pantone-white text-opacity-50" />
              <span className="font-bold text-sm text-pantone-white text-opacity-80">Love of My Life</span>
            </div>
            <button>
              <RiEye2Fill />
            </button>
          </div>
          <p className="font-normal text-xs text-pantone-white text-opacity-30">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ab animi hic velit exercitationem accusantium ut necessitatibus nulla iusto fugiat modi earum assumenda, placeat provident, saepe voluptates aliquid nam architecto!
          </p>
        </div>
        <div className="flex flex-col w-full p-3 space-y-2 border-b border-pantone-white border-opacity-10">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center w-full space-x-1">
              <RiBookOpenFill className="w-3 h-3 text-pantone-white text-opacity-50" />
              <span className="font-bold text-sm text-pantone-white text-opacity-80">Asteroids</span>
            </div>
            <button>
              <RiEye2Fill />
            </button>
          </div>
          <p className="font-normal text-xs text-pantone-white text-opacity-30">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ab animi hic velit exercitationem accusantium ut necessitatibus nulla iusto fugiat modi earum assumenda, placeat provident, saepe voluptates aliquid nam architecto!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar