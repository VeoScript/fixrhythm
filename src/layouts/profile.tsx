/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import UploadProfilePhoto from '~/components/UploadComponents/UploadProfilePhoto'
import UploadCoverPhoto from '~/components/UploadComponents/UploadCoverPhoto'
import FollowButton from '~/components/Interactions/Follows/FollowButton'
import UnfollowButton from '~/components/Interactions/Follows/UnfollowButton'
import useSWR from 'swr'
import { Facebook, Instagram, Twitter, TikTok, Youtube } from '~/utils/SocialMediaIcons'
import { RiBookOpenFill, RiMusic2Fill, RiCloseFill } from 'react-icons/ri'

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

  const { theme } = useTheme()

  const { pathname } = useRouter()

  const [isFollow, setIsFollow] = React.useState(false)

  const { data: get_profile } = useSWR(`/api/${profile.username}`, fetcher, {
    refreshInterval: 1000,
    fallbackData: profile
  })

  React.useEffect(() => {
    setIsFollow(get_profile.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid))
  }, [host.uuid, get_profile])

  return (
    <React.Fragment>
      <div className={`font-poppins flex flex-col items-center w-full h-full overflow-x-hidden overflow-y-auto`}>
        <div
          className={`${!host || host.isLoggedIn === false ? 'max-w-5xl rounded-b-xl' : 'max-w-full'} relative flex w-full h-full max-h-[18rem] bg-center bg-cover bg-no-repeat bg-pantone-gray dark:bg-pantone-gray bg-opacity-10 dark:bg-opacity-100`}
          style={{ backgroundImage: `url(${get_profile.coverphoto[0] && `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${get_profile.coverphoto[0].version}/${get_profile.coverphoto[0].publicId}.${get_profile.coverphoto[0].format}`})` }}
        >
          {/* Cover Photo Button */}
          <UploadCoverPhoto
            host={host}
            get_profile={get_profile}
          />
        </div>
        <div className={`${!host || host.isLoggedIn === false ? 'max-w-5xl' : 'max-w-full'} relative w-full`}>
          <div className="absolute -top-24 flex flex-col w-full px-3 lg:px-20 space-y-5">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start w-full">
              <div className="relative flex w-full max-w-[11rem]">
                <img
                  className="flex w-full h-[11rem] object-cover rounded-full bg-pantone-white dark:bg-[#1D1F21] border-4 border-[#CBD0E2] dark:border-[#000000]"
                  src={`${ get_profile.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${get_profile.profile[0].version}/${get_profile.profile[0].publicId}.${get_profile.profile[0].format}` : `https://ui-avatars.com/api/?name=${get_profile.name}&background=${theme === 'dark' ? '1D1F21' : 'EDF1FF'}&color=${theme === 'dark' ? 'FF3C3C' : '333333'}` }`}
                  alt={get_profile.username}
                />
                {/* Profile Photo Button */}
                <UploadProfilePhoto
                  host={host}
                  get_profile={get_profile}
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full mt-5 lg:mt-[7rem] ml-0 lg:ml-5">
                <div className="flex flex-col items-center lg:items-start w-full">
                  <span className="font-bold text-2xl text-pantone-gray dark:text-pantone-white">{ get_profile.name }</span>
                  <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-2">
                    <span className="font-medium text-base text-pantone-gray dark:text-pantone-white text-opacity-100 dark:text-opacity-50">{ get_profile.account_type }</span>
                    <span className="font-light dark:font-thin text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-70 dark:text-opacity-50">@{ get_profile.username }</span>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center w-full mt-5 lg:mt-0 space-x-0 lg:space-x-5 space-y-3 lg:space-y-0">
                  <div className="flex items-center justify-center lg:justify-end w-full space-x-3">
                    <div className="flex items-center space-x-1 font-light text-[14px]">
                      <span className="font-bold text-pantone-gray dark:text-pantone-white text-[16px]">{ get_profile.followedBy.length }</span>
                      {!host || host.isLoggedIn === true && (
                        <Link href={`/${get_profile.username}/followers`}>
                          <a className="transition ease-linear duration-200 text-pantone-gray dark:text-pantone-white text-opacity-90 dark:text-opacity-40 hover:text-pantone-red dark:hover:text-pantone-red">followers</a>
                        </Link>
                      )}
                      {!host || host.isLoggedIn === false && (
                        <span className="transition ease-linear duration-200 text-pantone-white text-opacity-40">followers</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 font-light text-[14px]">
                      <span className="font-bold text-pantone-gray dark:text-pantone-white text-[16px]">{ get_profile.following.length }</span>
                      {!host || host.isLoggedIn === true && (
                        <Link href={`/${get_profile.username}/following`}>
                          <a className="transition ease-linear duration-20 text-pantone-gray dark:text-pantone-white text-opacity-90 dark:text-opacity-40 hover:text-pantone-red dark:hover:text-pantone-red">following</a>
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
                            className="font-normal text-center text-sm w-[10rem] px-5 py-1.5 rounded-lg bg-pantone-darkblack bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
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
                              className="follow_button flex justify-center font-normal w-[10rem] text-sm text-center px-5 py-1.5 rounded-lg bg-pantone-darkblack bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
                            />
                          )}
                          {isFollow && (
                            <UnfollowButton
                              host={host}
                              profile={get_profile}
                              className="unfollow_button flex justify-center font-normal w-[10rem] text-sm text-center px-5 py-1.5 rounded-lg bg-pantone-darkblack bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-red"
                            />
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
            <div className="relative flex flex-col lg:flex-row items-start w-full pt-0 lg:pt-3 pb-20 space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
              <div className={`${pathname === '/[username]/followers' || pathname === '/[username]/following' ? 'hidden lg:flex' : 'static lg:sticky flex'}  top-5 flex-col w-full max-w-full lg:max-w-xs h-full max-h-[30rem] p-5 space-y-5 rounded-xl overflow-hidden bg-pantone-gray dark:bg-pantone-darkblack bg-opacity-5 dark:bg-opacity-100`}>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="font-bold text-base text-pantone-darkblack dark:text-pantone-white text-opacity-90 dark:text-opacity-30">Intro</h1>
                  <div className="flex items-center w-full space-x-2">
                    <h3 className="font-light text-xs text-pantone-darkblack dark:text-pantone-white">
                      {`${ get_profile.shortbio ? get_profile.shortbio : 'Welcome to Fixrhythm' }`}
                    </h3>
                  </div>
                </div>
                {(get_profile.facebook || get_profile.instagram || get_profile.twitter || get_profile.tiktok || get_profile.youtube) && (
                  <div className="flex flex-col w-full space-y-2">
                    <h1 className="font-bold text-base text-pantone-darkblack dark:text-pantone-white text-opacity-90 dark:text-opacity-30">Social Media</h1>
                    <div className="flex flex-col w-full space-y-2">
                      {get_profile.facebook && (
                        <Link href={`https://www.facebook.com/${get_profile.facebook}`}>
                          <a className="flex items-center space-x-2" target="_blank">
                            <Facebook className="w-4 h-4 fill-current text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-30" />
                            <span className="font-normal dark:font-light text-xs text-pantone-darkblack dark:text-pantone-white transition ease-linear duration-200 hover:text-pantone-red hover:text-opacity-100">
                              @{get_profile.facebook}
                            </span>
                          </a>
                        </Link>
                      )}
                      {get_profile.instagram && (
                        <Link href={`https://www.instagram.com/${get_profile.instagram}`}>
                          <a className="flex items-center w-full space-x-2" target="_blank">
                            <Instagram className="w-4 h-4 fill-current text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-30" />
                            <span className="font-normal dark:font-light text-xs text-pantone-darkblack dark:text-pantone-white transition ease-linear duration-200 hover:text-pantone-red hover:text-opacity-100">
                              @{get_profile.instagram}
                            </span>
                          </a>
                        </Link>
                      )}
                      {get_profile.twitter && (
                        <Link href={`https://www.twitter.com/${get_profile.twitter}`}>
                          <a className="flex items-center w-full space-x-2" target="_blank">
                            <Twitter className="w-4 h-4 fill-current text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-30" />
                            <span className="font-normal dark:font-light text-xs text-pantone-darkblack dark:text-pantone-white transition ease-linear duration-200 hover:text-pantone-red hover:text-opacity-100">
                              @{get_profile.twitter}
                            </span>
                          </a>
                        </Link>
                      )}
                      {get_profile.tiktok && (
                        <Link href={`https://www.tiktok.com/@${get_profile.tiktok}`}>
                          <a className="flex items-center w-full space-x-2" target="_blank">
                            <TikTok className="w-4 h-4 fill-current text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-30" />
                            <span className="font-normal dark:font-light text-xs text-pantone-darkblack dark:text-pantone-white transition ease-linear duration-200 hover:text-pantone-red hover:text-opacity-100">
                              @{get_profile.tiktok}
                            </span>
                          </a>
                        </Link>
                      )}
                      {get_profile.youtube && (
                        <Link href={`${get_profile.youtube}`}>
                          <a className="flex items-center w-full space-x-2" target="_blank">
                            <Youtube className="w-4 h-4 fill-current text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-30" />
                            <span className="font-normal dark:font-light text-xs text-pantone-darkblack dark:text-pantone-white transition ease-linear duration-200 hover:text-pantone-red hover:text-opacity-100">My Channel</span>
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center w-full overflow-y-hidden">
                  {get_profile.pinned.length > 0 && (
                    <div className="flex items-center w-full space-x-1">
                      <div className="flex items-center w-full py-2 space-x-2 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
                        <span className="font-bold text-base text-pantone-darkblack dark:text-pantone-white text-opacity-90 dark:text-opacity-30">Pinned</span>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center w-full space-y-3 overflow-y-auto scrollbar-hide">
                    {get_profile.pinned.map((pin: any, i: number) => (
                      <div className="flex flex-col w-full py-3 space-y-2 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10" key={i}>
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex">
                            <Link href={`/${get_profile.username}/posts/${pin.composition.uuid}`}>
                              <a className="flex flex-row items-center w-full space-x-1">
                                {pin.composition.category === 'Song' ? <RiMusic2Fill className="w-3 h-3 text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50" /> : <RiBookOpenFill className="w-3 h-3 text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50" />}
                                <span className="font-bold text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-80">{ pin.composition.title }</span>
                              </a>
                            </Link>
                          </div>
                          {host.username === get_profile.username && (
                            <button
                              className="outline-none"
                              type="button"
                              onClick={async () => {
                                const userId = host.uuid
                                const compositionId = pin.compositionId
                                await fetch('/api/interactions/pinned/delete', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ userId, compositionId })
                                })
                              }}
                            >
                              <RiCloseFill className="text-pantone-black dark:text-pantone-white text-opacity-50 dark:text-opacity-50" />
                            </button>
                          )}
                        </div>
                        <p className="font-normal text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-70 dark:text-opacity-30">
                          { pin.composition.description }
                        </p>
                      </div>
                    ))}
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
    </React.Fragment>
  )
}

export default ProfileLayout