import React from 'react'
import ComposeCard from './Compose/ComposeCard'
import PostCard from './PostCard'
import useSWR from 'swr'
import { RiSearchLine } from 'react-icons/ri'

interface TypeProps {
  host: any
  compositions: any
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

const NewsFeed: React.FC<TypeProps> = ({ host, compositions }) => {

  const { data: fetchCompositions } = useSWR('/api/compositions', fetcher, {
    refreshInterval: 1000,
    fallbackData: compositions
  })

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
          <ComposeCard host={host} />
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-y-auto p-3 pb-20 space-y-3">
        {fetchCompositions.map((composition: any, i: number) => (
          <PostCard composition={composition} key={i} />
        ))}
      </div>
    </div>
  )
}

export default NewsFeed