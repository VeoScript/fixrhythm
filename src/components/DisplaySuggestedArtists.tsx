/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import FollowButton from './Interactions/Follows/FollowButton'

interface TypeProps {
  host: any
  fetchArtists: any
}

const DisplaySuggestedArtists: React.FC<TypeProps> = ({ host, fetchArtists }) => {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto pb-28">
      {fetchArtists.map((artist: any, i: number) => {
        const check_follow = artist.followedBy.some((follow: { followingId: any }) => follow.followingId === host.uuid)
        return (
          <React.Fragment key={i}>
            {/* if the loggedin username is equal to the artist username it will not appear to the list, you cant respect your own account. */}
            {host.username !== artist.username && (
              <React.Fragment>
                {/* if the users/artists are already followed by the host, this will no longer display in suggested accounts */}
                {!check_follow && (
                  <div className="flex flex-row items-center justify-between w-full p-3 space-x-2 border-b border-pantone-white border-opacity-10">
                    <Link href={`${`/${ artist.username }`}`}>
                      <a className="flex flex-row items-center space-x-2">
                        <img
                          className="w-10 h-10 rounded-full object-cover bg-pantone-darkblack"
                          src={`${ !artist.profile ? `https://ui-avatars.com/api/?name=${ artist.name }&background=1D1F21&color=aaa` : artist.profile }`}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-pantone-white hover:underline">{ artist.name }</span>
                          <div className="flex items-end space-x-2">
                            <span className="font-light text-xs text-pantone-white text-opacity-80">{ artist.account_type }</span>
                            <span className="font-light text-[10px] text-pantone-white text-opacity-30">{ artist.followedBy.length } Followers</span>
                          </div>
                        </div>
                      </a>
                    </Link>
                    {/* if you are logged in your account will not display in suggestion accounts */}
                    {host.username !== artist.username && (
                      <React.Fragment>
                        {/* if you already followed the users/artists this will be no longer display in suggestion accounts */}
                        {!check_follow && (
                          <FollowButton
                            host={host}
                            profile={artist}
                            className="follow_button flex justify-center font-normal text-[10px] text-center px-2 py-1 rounded-lg bg-pantone-darkblack text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
                          />
                        )}
                      </React.Fragment>
                    )}
                  </div>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default DisplaySuggestedArtists
