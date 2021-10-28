/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { RiMoreFill, RiEye2Fill, RiHeart2Fill, RiBookmarkFill } from 'react-icons/ri'

const PostCard: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full max-w-full p-3 space-x-5 rounded-lg border border-white border-opacity-10">
      <div className="flex flex-col space-y-3">
        <Link href="/">
          <a className="flex flex-row items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full bg-pantone-gray"
              src="https://ui-avatars.com/api/?name=Fix+Rhythm&background=343739&color=aaa"
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-pantone-white text-opacity-80 hover:underline">Fixrhythm</span>
              <span className="font-light text-xs text-pantone-white text-opacity-50">Lyricist</span>
            </div>
          </a>
        </Link>
        <div className="flex flex-row">
          <div className="flex flex-col px-2 space-y-2">
            <Link href="/">
              <a className="font-bold text-sm text-pantone-white">Depression</a>
            </Link>
            <p className="font-normal text-xs text-pantone-white text-opacity-30">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ab animi hic velit exercitationem accusantium ut necessitatibus nulla iusto fugiat modi earum assumenda, placeat provident, saepe voluptates aliquid nam architecto!
            </p>
            <div className="flex flex-row items-center w-full space-x-1">
              <p className="font-light text-[10px] text-pantone-white text-opacity-20">7 Days Ago</p>
              <span className="font-light text-xs text-pantone-white text-opacity-30">&bull;</span>
              <p className="font-light text-[10px] text-pantone-white text-opacity-20">500 Likes</p>
              <span className="font-light text-xs text-pantone-white text-opacity-30">&bull;</span>
              <p className="font-light text-[10px] text-pantone-white text-opacity-20">Saved by 100 people</p>
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