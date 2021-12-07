/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import MenuDropdown from '~/components/Card/MenuDropdown'
import BookmarkButton from '~/components/Interactions/BookmarkButton'
import ReactionButton from '~/components/Interactions/ReactionButton'
import DisplayComment from './Comments/DisplayComment'
import useSWR from 'swr'
import { RiHeart2Fill, RiBookmarkFill, RiDiscussFill, RiAppleFill, RiSpotifyFill, RiYoutubeFill } from 'react-icons/ri'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  user: any
  host: any
  uuid: any
  composition: any
}

const DisplayPostAndComment: React.FC<TypeProps> = ({ user, host, uuid, composition }) => {

  const { data: get_composition } = useSWR(`/api/compositions/${ uuid }`, fetcher, {
    refreshInterval: 1000,
    fallbackData: composition
  })

  return (
    <div className="flex items-start justify-center w-full pt-0 md:pt-5 pb-14 md:pb-20">
      <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-6xl space-x-0 md:space-x-3">
        <div className="flex flex-col w-full max-w-3xl rounded-none md:rounded-2xl bg-pantone-darkblack">
          <div className="flex flex-col items-center text-center w-full max-w-full py-3 -space-y-1 md:hidden border-b border-pantone-white border-opacity-5">
            <h3 className="block md:hidden font-bold text-base md:text-lg text-pantone-red uppercase">{ get_composition.title }</h3>
            <h6 className="block md:hidden font-light text-[11px] md:text-xs text-pantone-white text-opacity-50">{ get_composition.category }</h6>
          </div>
          <div className="flex flex-row items-center justify-between w-full px-3 md:px-5 py-3 border-b border-pantone-white border-opacity-5">
            <div className="flex justify-start w-full max-w-xs">
              <Link href={`/${get_composition.user.username}`}>
                <a className="flex flex-row items-center space-x-2">
                  <img
                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full bg-pantone-gray"
                    src={`${ get_composition.user.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${get_composition.user.profile[0].version}/${get_composition.user.profile[0].publicId}.${get_composition.user.profile[0].format}` : `https://ui-avatars.com/api/?name=${get_composition.user.name}&background=343739&color=aaa` }`}
                    alt={get_composition.user.name}
                  />
                  <div className="flex flex-col -space-y-1">
                    <span className="font-bold text-[11px] md:text-sm text-pantone-white text-opacity-80 hover:underline">{ get_composition.user.name }</span>
                    <span className="font-light text-[10px] md:text-xs text-pantone-white text-opacity-50">{ get_composition.user.account_type }</span>
                  </div>
                </a>
              </Link>
            </div>
            <div className="md:flex flex-col items-center text-center w-full max-w-full -space-y-1 hidden">
              <h3 className="hidden md:block font-bold text-[14px] md:text-lg text-pantone-red uppercase">{ get_composition.title }</h3>
              <h6 className="hidden md:block font-light text-[11px] md:text-xs text-pantone-white text-opacity-50">{ get_composition.category }</h6>
            </div>
            <div className="flex flex-row items-center justify-end w-full max-w-xs space-x-3">
              <div className="flex flex-row items-center space-x-1">
                {(user || !host || host.isLoggedIn === true) && (
                  <ReactionButton
                    host={host}
                    composition={get_composition}
                  />
                )}
                {(user === '' || !host || host.isLoggedIn === false) && (
                  <RiHeart2Fill className="w-4 md:w-5 h-4 md:h-5 text-pantone-white" />
                )}
                <p className="font-light text-[10px] text-pantone-white text-opacity-40">
                  { get_composition.likes.length > 0 ? get_composition.likes.length : '' }
                </p>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <RiDiscussFill className="w-4 md:w-5 h-4 md:h-5 text-pantone-white" />
                <p className="font-light text-[10px] text-pantone-white text-opacity-40">
                  { get_composition.comments.length > 0 ? get_composition.comments.length : '' }
                </p>
              </div>
              <div className="flex flex-row items-center space-x-1">
                {(user || !host || host.isLoggedIn === true) && (
                  <BookmarkButton
                    host={host}
                    composition={get_composition}
                  />
                )}
                {(user === '' || !host || host.isLoggedIn === false) && (
                  <RiBookmarkFill className="w-4 md:w-5 h-4 md:h-5 text-pantone-white" />
                )}
                <p className="font-light text-[10px] text-pantone-white text-opacity-40">
                  { get_composition.bookmarks.length > 0 ? get_composition.bookmarks.length : '' }
                </p>
              </div>
              {(user || !host || host.isLoggedIn === true) && (
                <div className="relative flex">
                  {host.username === composition.user.username && (
                    <MenuDropdown
                      host={host}
                      composition={composition}
                      postUrl={uuid}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full px-3 py-5">
            <div className="flex flex-col items-center font-normal text-xs md:text-sm text-center whitespace-pre-wrap">
              <p>{get_composition.content}</p>
            </div>
          </div>
          {(get_composition.spotify || get_composition.applemusic || get_composition.youtube) && (
            <div className="flex flex-row items-center justify-center w-full p-5 border-t border-pantone-white border-opacity-5">
              <span className="font-light text-[10px] md:text-xs">Play this on &nbsp;</span>
              <div className="flex flex-row items-center space-x-1">
                {get_composition.spotify && (
                  <Link href={`${get_composition.spotify}`}>
                    <a target="_blank" className="transition ease-linear duration-200 transform hover:scale-95">
                      <RiSpotifyFill className="w-5 h-5 text-[#1ED760]" />
                    </a>
                  </Link>
                )}
                {get_composition.applemusic && (
                  <Link href={`${get_composition.applemusic}`}>
                    <a target="_blank" className="transition ease-linear duration-200 transform hover:scale-95">
                      <RiAppleFill className="w-5 h-5 -mt-1 text-[#FFFFFF]" />
                    </a>
                  </Link>
                )}
                {get_composition.youtube && (
                  <Link href={`${get_composition.youtube}`}>
                    <a target="_blank" className="transition ease-linear duration-200 transform hover:scale-95">
                      <RiYoutubeFill className="w-5 h-5 text-[#D31D1E]" />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
        {(user || !host || host.isLoggedIn === true) && (
          <DisplayComment
            host={host}
            get_composition={get_composition}
          />
        )}
      </div>
    </div>
  )
}

export default DisplayPostAndComment
