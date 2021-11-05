/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import BookmarkButton from './Interactions/BookmarkButton'
import ReactionButton from './Interactions/ReactionButton'
import {
  RiMoreFill,
  RiEye2Fill,
  RiMusic2Fill,
  RiBookOpenFill
} from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
}

const PostCard: React.FC<TypeProps> = ({ host, composition }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full max-w-full p-3 space-x-5 rounded-lg border border-white border-opacity-10">
      <div className="flex flex-col w-full space-y-5">
        <div className="flex">
          <Link href="/">
            <a className="flex flex-row items-center space-x-2">
              <img
                className="w-10 h-10 object-cover rounded-full bg-pantone-gray"
                src={composition.profile ? composition.profile : `https://ui-avatars.com/api/?name=${composition.user.name}&background=343739&color=aaa`}
                alt={composition.user.name}
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-pantone-white text-opacity-80 hover:underline">{ composition.user.name }</span>
                <span className="font-light text-xs text-pantone-white text-opacity-50">{ composition.user.account_type }</span>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex flex-row px-10">
          <div className="flex flex-col px-2 space-y-2">
            <div className="flex">
              <Link href="/">
                <a className="flex items-center space-x-1 uppercase font-bold text-base text-pantone-white">
                  {composition.category === 'Song' && <RiMusic2Fill className="w-3.5 h-3.5 text-red-500" />}
                  {composition.category === 'Poem' && <RiBookOpenFill className="w-3.5 h-3.5 text-red-500" />}
                  <span>{ composition.title }</span>
                </a>
              </Link>
            </div>
            <span className="font-normal text-[12px] text-pantone-white text-opacity-50 h-full">{ composition.description }</span>
            <div className="flex flex-row items-center w-full space-x-1 pt-3 font-light text-[10px] text-pantone-white text-opacity-40">
              <span>Published</span>
              <span className="font-light text-xs text-pantone-white text-opacity-30">&bull;</span>
              <Moment date={ composition.date } fromNow />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[3rem] space-y-2">
        <button>
          <RiMoreFill className="w-5 h-5 transition ease-linear duration-100 hover:scale-90" />
        </button>
        <button>
          <RiEye2Fill className="w-5 h-5 transition ease-linear duration-100 hover:scale-90" />
        </button>
        <div className="flex flex-row items-center space-x-1">
          <BookmarkButton
            host={host}
            composition={composition}
          />
          <p className="font-light text-[10px] text-pantone-white text-opacity-40">
            { composition.bookmarks.length > 0 ? composition.bookmarks.length : '' }
          </p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <ReactionButton
            host={host}
            composition={composition}
          />
          <p className="font-light text-[10px] text-pantone-white text-opacity-40">
            { composition.likes.length > 0 ? composition.likes.length : '' }
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostCard