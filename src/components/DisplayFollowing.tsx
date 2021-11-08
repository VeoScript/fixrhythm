/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import ProfileLayout from '~/layouts/profile'
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
  profile: any
  following: any
}

const DisplayFollowing: React.FC<TypeProps> = ({ host, profile, following }) => {

  const { data: get_following } = useSWR(`/api/follows/${following.username}/following`, fetcher, {
    refreshInterval: 1000,
    fallbackData: following
  })

  return (
    <ProfileLayout
      host={host}
      profile={profile}
    >
      <div className="flex flex-col w-full h-full max-h-[30rem]">
        <div className="flex flex-row items-center justify-between w-full max-w-full p-3 px-5">
          <div className="flex w-full max-w-[10rem]">
            <span className="font-bold text-sm text-pantone-white text-opacity-80">Following</span>
          </div>
          <div className="flex flex-row items-center w-full max-w-[20rem] px-3 space-x-3 bg-pantone-gray rounded-lg border border-pantone-black focus-within:border-pantone-white focus-within:border-opacity-30">
            <RiSearchLine className="text-white text-opacity-60" />
            <input type="text" className="w-full py-1.5 text-xs bg-transparent outline-none" placeholder="Search name" />
          </div>
          <div className="flex justify-end w-full max-w-[10rem]">
            <Link href={`/${ profile.username }`}>
              <a className="font-normal text-xs px-5 py-1.5 rounded-lg bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10">
                Back
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {get_following.following.map((following: any, i: number) => {
            const check_follow = following.follower.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid)
            console.log(check_follow)
            return (
              <React.Fragment key={i}>
                <div className="flex flex-row items-center justify-between w-full p-5 border-t border-pantone-white border-opacity-10">
                  <div className="flex flex-row items-center">
                    <Link href={`${`/${ following.follower.username }`}`}>
                      <a className="flex flex-row items-center space-x-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover bg-pantone-gray"
                          src={`${ !following.follower.profile ? `https://ui-avatars.com/api/?name=${ following.follower.name }&background=2B2F31&color=aaa` : following.follower.profile }`}
                          alt={ following.follower.username }
                        />
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm text-pantone-white hover:underline">{ following.follower.name }</span>
                          <div className="flex items-end space-x-2">
                            <span className="font-light text-xs text-pantone-white text-opacity-80">{ following.follower.account_type }</span>
                            <span className="font-light text-[10px] text-pantone-white text-opacity-30">{ following.follower.followedBy.length } Followers</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  {following.follower.username !== host.username && (
                    <React.Fragment>
                      {!check_follow && (
                        <FollowButton
                          host={host}
                          profile={following.follower}
                          className="follow_button flex justify-center w-[6rem] font-normal text-sm text-center px-3 py-1.5 rounded-lg bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
                        />
                      )}
                      {check_follow && (
                        <UnfollowButton
                          host={host}
                          profile={following.follower}
                          className="unfollow_button flex justify-center w-[7rem] font-normal text-sm text-center px-3 py-1.5 rounded-lg bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-red"
                        />
                      )}
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </ProfileLayout>
  )
}

export default DisplayFollowing