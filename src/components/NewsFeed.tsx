import React from 'react'
import PostCard from './PostCard'
import { RiSearchLine } from 'react-icons/ri'
import { posts } from '~/mock'

const NewsFeed: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-full h-full overflow-hidden">
      <div className="flex flex-row items-center justify-between w-full max-w-full px-5 py-3 border-b border-pantone-white border-opacity-10">
        <div className="flex w-full max-w-xs">
          <span className="font-bold text-base text-pantone-white text-opacity-80">News Feed</span>
        </div>
        <div className="flex flex-row items-center w-full max-w-[15rem] px-3 space-x-3 bg-pantone-gray rounded-lg border border-pantone-black focus-within:border-pantone-white focus-within:border-opacity-30">
          <RiSearchLine className="text-white text-opacity-60" />
          <input type="text" className="w-full py-3 text-xs bg-transparent outline-none" placeholder="Search title" />
        </div>
        <div className="flex justify-end w-full max-w-xs">
          <button className="flex p-3 text-pantone-white bg-pantone-red rounded-lg transition ease-linear duration-200 hover:bg-opacity-80">
            <span className="font-light text-xs">Compose</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-y-auto p-3 pb-20 space-y-3">
        {posts.map((post: any, i: number) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </div>
  )
}

export default NewsFeed