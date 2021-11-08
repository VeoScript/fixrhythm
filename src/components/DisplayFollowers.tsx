/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import ComposeCard from './Compose/ComposeCard'
import FollowButton from './Interactions/Follows/FollowButton'
import UnfollowButton from './Interactions/Follows/UnfollowButton'
import { RiSearchLine } from 'react-icons/ri'

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
  followers: any
}

const DisplayFollowers: React.FC<TypeProps> = ({ host, followers }) => {

  const { data: get_followers } = useSWR(`/api/follows/${host.username}/followers`, fetcher, {
    refreshInterval: 1000,
    fallbackData: followers
  })

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <div className="flex flex-row items-center justify-between w-full max-w-full px-5 py-3 border-b border-pantone-white border-opacity-10">
        <div className="flex w-full max-w-[10rem]">
          <span className="font-bold text-base text-pantone-white text-opacity-80">Followers</span>
        </div>
        <div className="flex flex-row items-center w-full max-w-[20rem] px-3 space-x-3 bg-pantone-gray rounded-lg border border-pantone-black focus-within:border-pantone-white focus-within:border-opacity-30">
          <RiSearchLine className="text-white text-opacity-60" />
          <input type="text" className="w-full py-3 text-xs bg-transparent outline-none" placeholder="Search name" />
        </div>
        <div className="flex justify-end w-full max-w-[10rem]">
          <ComposeCard host={host} />
        </div>
      </div>
      {get_followers.followedBy.map((follower: any, i: number) => {
        const check_follow = follower.following.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid)
        return (
          <React.Fragment key={i}>
            <div className="flex flex-row items-center justify-between w-full p-5 border-b border-pantone-white border-opacity-10">
              <div className="flex flex-row items-center">
                <Link href={`${`/${ follower.following.username }`}`}>
                  <a className="flex flex-row items-center space-x-3">
                    <img
                      className="w-16 h-16 rounded-full object-cover bg-pantone-darkblack"
                      src={`${ !follower.following.profile ? `https://ui-avatars.com/api/?name=${ follower.following.name }&background=1D1F21&color=aaa` : follower.following.profile }`}
                      alt=""
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-base text-pantone-white hover:underline">{ follower.following.name }</span>
                      <div className="flex items-end space-x-2">
                        <span className="font-light text-sm text-pantone-white text-opacity-80">{ follower.following.account_type }</span>
                        <span className="font-light text-xs text-pantone-white text-opacity-30">{ follower.following.followedBy.length } Followers</span>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
              {!check_follow && (
                <FollowButton
                  host={host}
                  profile={follower.following}
                  width="w-[6rem]"
                  fontSize="text-xs"
                  paddingX="px-3"
                  paddingY="py-2"
                />
              )}
              {check_follow && (
                <UnfollowButton
                  host={host}
                  profile={follower.following}
                  width="w-[7rem]"
                  fontSize="text-xs"
                  paddingX="px-3"
                  paddingY="py-2"
                />
              )}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default DisplayFollowers