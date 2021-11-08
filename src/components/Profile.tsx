/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import FollowButton from './Interactions/Follows/FollowButton'
import UnfollowButton from './Interactions/Follows/UnfollowButton'

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
}

const Profile: React.FC<TypeProps> = ({ host, profile }) => {

  const [isFollow, setIsFollow] = React.useState(false)

  const { data: get_profile } = useSWR(`/api/${profile.username}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: profile
  })

  React.useEffect(() => {
    setIsFollow(get_profile.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid))
  }, [host.uuid, get_profile])

  return (
    <div className="flex flex-col items-center w-full h-full overflow-x-hidden overflow-y-auto">
      <div className="relative w-full h-full max-h-[12rem] bg-pantone-gray border-b border-pantone-white border-opacity-10">
        <div className="absolute -bottom-20 left-20 w-full">
          <div className="flex w-full">
            <img
              className="w-40 h-40 rounded-full bg-[#1D1F21]"
              src={`${ get_profile.profile ? get_profile.profile : `https://ui-avatars.com/api/?name=${ get_profile.name }&background=1D1F21&color=FF3C3C` }`}
              alt=""
            />
            <div className="relative w-full">
              <div className="absolute bottom-3 pl-5 pr-10 w-full max-w-3xl">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col w-full">
                    <span className="font-bold text-2xl">{ get_profile.name }</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-base text-pantone-white text-opacity-50">{ get_profile.account_type }</span>
                      <span className="font-thin text-sm text-pantone-white text-opacity-50">@{ get_profile.username }</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center w-full space-x-5">
                    <div className="flex items-center justify-end w-full space-x-3">
                      <div className="flex items-center space-x-1 font-light text-[11px]">
                        <span className="font-bold text-pantone-white text-sm">{ get_profile.followedBy.length }</span>
                        <Link href={`/${get_profile.username}/followers`}>
                          <a className="transition ease-linear duration-200 text-pantone-white text-opacity-40 hover:text-red-500">followers</a>
                        </Link>
                      </div>
                      <div className="flex items-center space-x-1 font-light text-[11px]">
                        <span className="font-bold text-pantone-white text-sm">{ get_profile.following.length }</span>
                        <Link href="/">
                          <a className="transition ease-linear duration-20 text-pantone-white text-opacity-40 hover:text-red-500">following</a>
                        </Link>
                      </div>
                    </div>
                    {/* if you are logged in Edit Profile button will display instead for Follow and Unfollow button */}
                    {host.username === get_profile.username && (
                      <button
                        className="font-normal text-sm w-[10rem] px-5 py-1.5 rounded-lg bg-pantone-darkblack text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
                      >
                        Edit Profile
                      </button>
                    )}
                    {/* if you visit users/artist profile Follow and Unfollow button will display instead of Edit Profile button */}
                    {host.username !== get_profile.username && (
                      <React.Fragment>
                        {!isFollow && (
                          <FollowButton
                            host={host}
                            profile={get_profile}
                            width="w-[10rem]"
                            fontSize="text-sm"
                            paddingX="px-5"
                            paddingY="py-1.5"
                          />
                        )}
                        {isFollow && (
                          <UnfollowButton
                            host={host}
                            profile={get_profile}
                            width="w-[10rem]"
                            fontSize="text-sm"
                            paddingX="px-5"
                            paddingY="py-1.5"
                          />
                        )}
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-center w-full px-20 mt-[7rem] space-x-2">
        <div className="flex flex-col w-full max-w-xs p-3 rounded-lg bg-pantone-darkblack">
          <div>Left</div>
        </div>
        <div className="flex flex-col w-full p-3 rounded-lg bg-pantone-darkblack">
          <div>Right</div>
        </div>
      </div>
    </div>
  )
}

export default Profile