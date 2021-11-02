/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { artists } from '~/mock'

const RightSideBar: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-xs h-full overflow-y-auto bg-pantone-gray border-l border-pantone-white border-opacity-10">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center w-full px-3 py-2 space-x-1 border-b border-pantone-white border-opacity-10">
          <div className="flex items-center justify-between w-full space-x-1">
            <span className="font-normal text-sm text-pantone-white text-opacity-50">Suggested Accounts</span>
            <Link href="/">
              <a className="font-extralight text-xs text-pantone-white text-opacity-50 hover:underline">See All</a>
            </Link>
          </div>
        </div>
        {artists.map((artist: any, i: number) => (
          <div key={i} className="flex flex-row items-center justify-between w-full p-3 space-x-2 border-b border-pantone-white border-opacity-10">
            <Link href="/">
              <a className="flex flex-row items-center space-x-2">
                <img
                  className="w-10 h-10 rounded-full object-cover bg-pantone-gray"
                  src={`${ !artist.profile ? 'https://ui-avatars.com/api/?name=Lisa+Manoban&background=24282B&color=aaa' : artist.profile }`}
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-pantone-white text-opacity-80 hover:underline">{ artist.name }</span>
                  <span className="font-light text-xs text-pantone-white text-opacity-50">{ artist.type }</span>
                </div>
              </a>
            </Link>
            <button className="font-light text-[10px] px-2 py-1 rounded-md bg-pantone-red text-pantone-white transition ease-linear duration-200 hover:bg-opacity-80">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightSideBar