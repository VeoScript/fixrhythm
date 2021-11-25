import React from 'react'
import { useRouter } from 'next/router'
import SearchTitle from './Search/SearchTitle'
import ComposeCard from './Compose/ComposeCard'
import PostCard from './Card/PostCard'
import useSWR from 'swr'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  host: any
  published_compositions?: any
  song_published_compositions?: any
  poems_published_compositions?: any
}

const NewsFeed: React.FC<TypeProps> = ({ host, published_compositions, song_published_compositions, poems_published_compositions }) => {

  const { pathname } = useRouter()

  // fetch post compositions in homepage all songs and poems
  const { data: fetchPublishedCompositions } = useSWR('/api/compositions/publish', fetcher, {
    refreshInterval: 1000,
    fallbackData: published_compositions
  })

  // fetch post compositions in songs page all songs
  const { data: fetchSongPublishedCompositions } = useSWR('/api/compositions/songs_and_poems/songs', fetcher, {
    refreshInterval: 1000,
    fallbackData: song_published_compositions
  })

  // fetch post compositions in poems page all poems
  const { data: fetchPoemsPublishedCompositions } = useSWR('/api/compositions/songs_and_poems/poems', fetcher, {
    refreshInterval: 1000,
    fallbackData: poems_published_compositions
  })

  return (
    <div className="flex flex-col items-center w-full max-w-full h-full pb-16 overflow-hidden">
      <div className="flex flex-row items-center justify-between w-full max-w-full px-5 py-3 border-b border-pantone-white border-opacity-10">
        <div className="flex w-full max-w-[10rem]">
          <span className="font-bold text-base text-pantone-white text-opacity-80">
            {pathname === '/' && 'News Feed'}
            {pathname === '/songs' && 'Songs'}
            {pathname === '/poems' && 'Poems'}
          </span>
        </div>
        <SearchTitle
          fetchPublishedCompositions={fetchPublishedCompositions}
          fetchSongPublishedCompositions={fetchSongPublishedCompositions}
          fetchPoemsPublishedCompositions={fetchPoemsPublishedCompositions}
        />
        <div className="flex justify-end w-full max-w-[10rem]">
          <div className="flex justify-end w-full max-w-[5rem]">
            <ComposeCard host={host} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-y-auto p-3 space-y-3">
        {/* dynamic fetch of post compositions in each page (home, songs, and poems) */}
        {pathname === '/' && (
          <React.Fragment>
            {fetchPublishedCompositions.map((composition: any, i: number) => (
              <PostCard
                key={i}
                host={host}
                composition={composition}
                border="border border-white border-opacity-10"
                backgroundColor="bg-transparent"
              />
            ))}
          </React.Fragment>
        )}
        {pathname === '/songs' && (
          <React.Fragment>
            {fetchSongPublishedCompositions.map((composition: any, i: number) => (
              <PostCard
                key={i}
                host={host}
                composition={composition}
                border="border border-white border-opacity-10"
                backgroundColor="bg-transparent"
              />
            ))}
          </React.Fragment>
        )}
        {pathname === '/poems' && (
          <React.Fragment>
            {fetchPoemsPublishedCompositions.map((composition: any, i: number) => (
              <PostCard
                key={i}
                host={host}
                composition={composition}
                border="border border-white border-opacity-10"
                backgroundColor="bg-transparent"
              />
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default NewsFeed