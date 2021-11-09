/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import ProfileLayout from '~/layouts/profile'
import FollowButton from './Interactions/Follows/FollowButton'
import UnfollowButton from './Interactions/Follows/UnfollowButton'
import PaginationButton from './Interactions/PaginationButton'

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
  followers: any
}

const DisplayFollowers: React.FC<TypeProps> = ({ host, profile, followers }) => {

  const { data: get_followers } = useSWR(`/api/follows/${followers.username}/followers`, fetcher, {
    refreshInterval: 1000,
    fallbackData: followers
  })

  const [isFollowers, setIsFollowers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [followersPerPage] = React.useState(5)

  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = get_followers
      setIsFollowers(res.data)
      setLoading(false)
    }
    fetchPosts()
  }, [get_followers])

  // get current posts
  const indexOfLastPost = currentPage * followersPerPage
  const indexOfFirstPost = indexOfLastPost - followersPerPage
  const currentFollowers = get_followers.followedBy.slice(indexOfFirstPost, indexOfLastPost)

  // change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <ProfileLayout
      host={host}
      profile={profile}
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row items-center justify-between w-full max-w-full p-3 px-5">
          <div className="flex w-full max-w-[10rem]">
            <span className="font-bold text-sm text-pantone-white text-opacity-80">Followers</span>
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
          {currentFollowers.map((follower: any, i: number) => {
            const check_follow = follower.following.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid)
            return (
              <React.Fragment key={i}>
                <div className="flex flex-row items-center justify-between w-full p-5 border-t border-pantone-white border-opacity-10">
                  <div className="flex flex-row items-center">
                    <Link href={`${`/${ follower.following.username }`}`}>
                      <a className="flex flex-row items-center space-x-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover bg-pantone-gray"
                          src={`${ !follower.following.profile ? `https://ui-avatars.com/api/?name=${ follower.following.name }&background=2B2F31&color=aaa` : follower.following.profile }`}
                          alt={ follower.following.username }
                        />
                        <div className="flex flex-col space-y-1">
                          <span className="font-bold text-sm text-pantone-white hover:underline">{ follower.following.name }</span>
                          <div className="flex items-end space-x-2">
                            <span className="font-light text-xs text-pantone-white text-opacity-80">{ follower.following.account_type }</span>
                            <span className="font-light text-[10px] text-pantone-white text-opacity-30">{ follower.following.followedBy.length } Followers</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  {follower.following.username !== host.username && (
                    <React.Fragment>
                      {!check_follow && (
                        <FollowButton
                          host={host}
                          profile={follower.following}
                          className="follow_button flex justify-center w-[6rem] font-normal text-xs text-center px-3 py-1.5 rounded-lg bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
                        />
                      )}
                      {check_follow && (
                        <UnfollowButton
                          host={host}
                          profile={follower.following}
                          className="unfollow_button flex justify-center w-[7rem] font-normal text-xs text-center px-3 py-1.5 rounded-lg bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-red"
                        />
                      )}
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
            )
          })}
        </div>
        <div className="flex flex-row items-center justify-center w-full max-w-full px-5 py-2 border-t border-pantone-white border-opacity-10">
          <PaginationButton
            followerCredential={get_followers}
            followers_followingPerPage={followersPerPage}
            totalFollowersFollowing={get_followers.followedBy.length}
            paginate={paginate}
          />
        </div>
      </div>
    </ProfileLayout>
  )
}

export default DisplayFollowers