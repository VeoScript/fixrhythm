/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import {
  RiMoreFill,
  RiEye2Fill,
  RiHeart2Fill,
  RiBookmarkFill,
  RiMusic2Fill,
  RiBookOpenFill
} from 'react-icons/ri'

interface TypeProps {
  composition: any
}

const PostCard: React.FC<TypeProps> = ({ composition }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full max-w-full p-3 space-x-5 rounded-lg border border-white border-opacity-10">
      <div className="flex flex-col space-y-3">
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
        <div className="flex flex-row">
          <div className="flex flex-col px-2 space-y-2">
            <Link href="/">
              <a className="flex items-center space-x-1 uppercase font-bold text-sm text-pantone-white">
                {composition.category === 'Song' && <RiMusic2Fill className="w-3 h-3 text-red-500" />}
                {composition.category === 'Poem' && <RiBookOpenFill className="w-3 h-3 text-red-500" />}
                <span>{ composition.title }</span>
              </a>
            </Link>
            <p className="font-normal text-xs text-pantone-white text-opacity-30">{ composition.description }</p>
            <div className="flex flex-row items-center w-full space-x-1">
              <p className="font-light text-[10px] text-pantone-white text-opacity-20">7 Days Ago</p>
              <span className="font-light text-xs text-pantone-white text-opacity-30">&bull;</span>
              <p className="font-light text-[10px] text-pantone-white text-opacity-20">{ composition.likes.length } Likes</p>
              <span className="font-light text-xs text-pantone-white text-opacity-30">&bull;</span>
              <p className="font-light text-[10px] text-pantone-white text-opacity-20">{ composition.comments.length } Comments</p>
              <span className="font-light text-xs text-pantone-white text-opacity-30">&bull;</span>
              <p className="font-light text-[10px] text-pantone-white text-opacity-20">Saved by { composition.bookmarks.length } people</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-3 space-y-2">
        <button>
          <RiMoreFill />
        </button>
        <button>
          <RiEye2Fill />
        </button>
        <button>
          <RiBookmarkFill />
        </button>
        <button>
          <RiHeart2Fill />
        </button>
      </div>
    </div>
  )
}

export default PostCard