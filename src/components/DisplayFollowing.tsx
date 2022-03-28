/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import useSWR from 'swr'
import ProfileLayout from '~/layouts/profile'
import FollowButton from './Interactions/Follows/FollowButton'
import UnfollowButton from './Interactions/Follows/UnfollowButton'
import PaginationButton from './Interactions/Follows/PaginationButton'

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

  const { theme } = useTheme()

  const { data: get_following } = useSWR(`/api/follows/${following.username}/following`, fetcher, {
    refreshInterval: 1000,
    fallbackData: following
  })

  const [isFollowing, setIsFollowing] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [followingPerPage] = React.useState(5)

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = get_following
      setIsFollowing(res.data)
      setLoading(false)
    }
    fetchPosts()
  }, [get_following])

  // get current posts
  const indexOfLastPost = currentPage * followingPerPage
  const indexOfFirstPost = indexOfLastPost - followingPerPage
  const currentFollowing = get_following.following.slice(indexOfFirstPost, indexOfLastPost)

  // change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <ProfileLayout
      host={host}
      profile={profile}
    >
      <div className="flex flex-col w-full h-full rounded-xl bg-pantone-gray dark:bg-pantone-darkblack bg-opacity-5 dark:bg-opacity-100">
        <div className="flex flex-row items-center justify-between w-full max-w-full p-3 px-5">
          <div className="flex w-full max-w-[10rem]">
            <span className="font-bold text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-80">Following</span>
          </div>
          <div className="flex justify-end w-full max-w-[10rem]">
            <Link href={`/${ profile.username }`}>
              <a title="Timeline" className="font-normal text-xs p-2 rounded-lg bg-pantone-gray dark:bg-pantone-black text-pantone-white transition ease-linear duration-200 bg-opacity-80 dark:bg-opacity-100 hover:bg-pantone-gray hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto my-scrollbar">
          {currentFollowing.length === 0 && (
            <div className="flex flex-row items-center justify-center w-full py-5 border-t border-pantone-gray dark:border-pantone-white border-opacity-5 dark:border-opacity-5">
              <div className="flex flex-col justify-center w-full max-w-sm p-3 space-y-3">
                <div className="font-black text-3xl text-left text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-50">
                  { host.username === profile.username ? 'You' : profile.name }
                  {` isn't following anyone`}
                </div>
                <span className="font-normal text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-70 dark:text-opacity-50">
                  When { host.username === profile.username ? 'you' : 'they' } do, {`they'll be listed here.`}
                </span>
              </div>
            </div>
          )}
          {currentFollowing.map((following: any, i: number) => {
            const check_follow = following.follower.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid)
            return (
              <React.Fragment key={i}>
                <div className="flex flex-row items-center justify-between w-full p-5 border-t border-pantone-gray dark:border-pantone-white border-opacity-5 dark:border-opacity-5">
                  <div className="flex flex-row items-center">
                    <Link href={`${`/${ following.follower.username }`}`}>
                      <a className="flex flex-row items-center space-x-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover bg-[#CBD0E2] dark:bg-pantone-gray"
                          src={`${ following.follower.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${following.follower.profile[0].version}/${following.follower.profile[0].publicId}.${following.follower.profile[0].format}` : `https://ui-avatars.com/api/?name=${following.follower.name}&background=${theme === 'dark' ? '24282B' : 'CBD0E2'}&color=${theme === 'dark' ? 'FFFFFF' : '333333'}` }`}
                          alt={ following.follower.username }
                        />
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm text-pantone-darkblack dark:text-pantone-white hover:underline">{ following.follower.name }</span>
                          <div className="flex items-end space-x-2">
                            <span className="font-light text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-80">{ following.follower.account_type }</span>
                            <span className="font-light text-[10px] text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-30">{ following.follower.followedBy.length } Followers</span>
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
                          className="follow_button flex justify-center w-[6rem] font-normal text-xs text-center px-3 py-1.5 rounded-lg bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
                        />
                      )}
                      {check_follow && (
                        <UnfollowButton
                          host={host}
                          profile={following.follower}
                          className="unfollow_button flex justify-center w-[7rem] font-normal text-xs text-center px-3 py-1.5 rounded-lg bg-pantone-black bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-red"
                        />
                      )}
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
            )
          })}
        </div>
        {currentFollowing.length > 0 && (
          <PaginationButton
            followers_followingPerPage={followingPerPage}
            totalFollowersFollowing={get_following.following.length}
            paginate={paginate}
          />
        )}
      </div>
    </ProfileLayout>
  )
}

export default DisplayFollowing