/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import FollowButton from '~/components/Interactions/Follows/FollowButton'
import UnfollowButton from '~/components/Interactions/Follows/UnfollowButton'
import useSWR from 'swr'
import { RiBookOpenFill, RiMusicFill, RiMusic2Fill, RiPushpinFill, RiCloseFill } from 'react-icons/ri'

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
  children: any
}

const ProfileLayout: React.FC<TypeProps> = ({ host, profile, children }) => {

  const [isFollow, setIsFollow] = React.useState(false)

  const { data: get_profile } = useSWR(`/api/${profile.username}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: profile
  })

  React.useEffect(() => {
    setIsFollow(get_profile.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid))
  }, [host.uuid, get_profile])

  return (
    <div className={`font-poppins flex flex-col items-center w-full h-full overflow-x-hidden overflow-y-auto`}>
      <div
        className={`${!host || host.isLoggedIn === false ? 'max-w-5xl rounded-b-xl' : 'max-w-full'} flex w-full h-full max-h-[12rem] bg-center bg-pantone-gray`}
        style={{ backgroundImage: `url(https://i.ytimg.com/vi/xSsT7esne-I/maxresdefault.jpg)` }}
      />
      <div className={`${!host || host.isLoggedIn === false ? 'max-w-5xl' : 'max-w-full'} relative w-full`}>
        <div className="absolute -top-20 flex flex-col w-full px-20 space-y-5">
          <div className="flex items-center w-full">
            <img
              className="flex w-full max-w-[11rem] h-[11rem] rounded-full bg-[#1D1F21] border-4 border-[#000000]"
              src={`${ get_profile.profile ? get_profile.profile : `https://ui-avatars.com/api/?name=${ get_profile.name }&background=1D1F21&color=FF3C3C` }`}
              alt={get_profile.username}
            />
            <div className="flex flex-row items-center justify-between w-full mt-20 ml-5">
              <div className="flex flex-col w-full">
                <span className="font-bold text-2xl">{ get_profile.name }</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-base text-pantone-white text-opacity-50">{ get_profile.account_type }</span>
                  <span className="font-thin text-sm text-pantone-white text-opacity-50">@{ get_profile.username }</span>
                </div>
              </div>
              <div className="flex flex-row items-center w-full space-x-5">
                <div className="flex items-center justify-end w-full space-x-3">
                  <div className="flex items-center space-x-1 font-light text-[14px]">
                    <span className="font-bold text-pantone-white text-[16px]">{ get_profile.followedBy.length }</span>
                    {!host || host.isLoggedIn === true && (
                      <Link href={`/${get_profile.username}/followers`}>
                        <a className="transition ease-linear duration-200 text-pantone-white text-opacity-40 hover:text-pantone-red">followers</a>
                      </Link>
                    )}
                    {!host || host.isLoggedIn === false && (
                      <span className="transition ease-linear duration-200 text-pantone-white text-opacity-40">followers</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 font-light text-[14px]">
                    <span className="font-bold text-pantone-white text-[16px]">{ get_profile.following.length }</span>
                    {!host || host.isLoggedIn === true && (
                      <Link href={`/${get_profile.username}/following`}>
                        <a className="transition ease-linear duration-20 text-pantone-white text-opacity-40 hover:text-pantone-red">following</a>
                      </Link>
                    )}
                    {!host || host.isLoggedIn === false && (
                      <span className="transition ease-linear duration-200 text-pantone-white text-opacity-40">following</span>
                    )}
                  </div>
                </div>
                {!host || host.isLoggedIn === true && (
                  <React.Fragment>
                    {/* if you are logged in Edit Profile button will display instead for Follow and Unfollow button */}
                    {host.username === get_profile.username && (
                      <Link href="/settings">
                        <a
                          className="font-normal text-sm w-[10rem] px-5 py-1.5 rounded-lg bg-pantone-darkblack text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
                        >
                          Edit Profile
                        </a>
                      </Link>
                    )}
                    {/* if you visit users/artist profile Follow and Unfollow button will display instead of Edit Profile button */}
                    {host.username !== get_profile.username && (
                      <React.Fragment>
                        {!isFollow && (
                          <FollowButton
                            host={host}
                            profile={get_profile}
                            className="follow_button flex justify-center font-normal w-[10rem] text-sm text-center px-5 py-1.5 rounded-lg bg-pantone-darkblack text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
                          />
                        )}
                        {isFollow && (
                          <UnfollowButton
                            host={host}
                            profile={get_profile}
                            className="unfollow_button flex justify-center font-normal w-[10rem] text-sm text-center px-5 py-1.5 rounded-lg bg-pantone-darkblack text-pantone-white transition ease-linear duration-200 hover:bg-pantone-red"
                          />
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex flex-row items-start w-full space-x-2">
            <div className="sticky top-5 flex flex-col w-full max-w-xs p-5 space-y-3 rounded-xl bg-pantone-darkblack">
              <div className="flex w-full">
                <h1>Intro</h1>
              </div>
              <div className="flex items-center w-full space-x-2">
                <RiMusicFill className="w-5 h-5 text-pantone-white text-opacity-50" />
                <h3 className="font-normal text-sm text-pantone-white">
                  {`${ get_profile.shortbio ? get_profile.shortbio : 'Welcome to Fixrhythm' }`}
                </h3>
              </div>
              <div className="flex flex-col items-center w-full space-y-3">
                <div className="flex items-center w-full space-x-1">
                  <div className="flex items-center w-full space-x-2">
                    <RiPushpinFill className="w-5 h-5 text-pantone-white text-opacity-50" />
                    <span className="font-normal text-sm">Pinned Compositions</span>
                  </div>
                </div>
                <div className="flex flex-col w-full py-3 space-y-2 border-t border-pantone-white border-opacity-10">
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row items-center w-full space-x-1">
                      <RiMusic2Fill className="w-3 h-3 text-pantone-white text-opacity-50" />
                      <span className="font-bold text-sm text-pantone-white text-opacity-80">Love of My Life</span>
                    </div>
                    <button>
                      <RiCloseFill />
                    </button>
                  </div>
                  <p className="font-normal text-xs text-pantone-white text-opacity-30">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ab animi hic velit exercitationem accusantium ut necessitatibus nulla iusto fugiat modi earum assumenda, placeat provident, saepe voluptates aliquid nam architecto!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full max-w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout