/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Moment from 'react-moment'
import PinnedPostButton from '../Interactions/PinnedPostButton'
import MenuDropdown from './MenuDropdown'
import BookmarkButton from '../Interactions/BookmarkButton'
import ReactionButton from '../Interactions/ReactionButton'
import { RiHeart2Fill, RiBookmarkFill, RiDiscussFill, RiMusic2Fill, RiBookOpenFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
  border: string
  backgroundColor: string
}

const PostCard: React.FC<TypeProps> = ({ host, composition, border, backgroundColor }) => {

  const { pathname } = useRouter()

  return (
    <div className={`flex flex-row items-center justify-between w-full max-w-full p-3 space-x-5 rounded-xl ${ backgroundColor } ${ border }`}>
      <div className="flex flex-col w-full max-w-full space-y-5">
        <div className="flex w-full">
          <Link href={`/${composition.user.username}`}>
            <a className="flex flex-row items-center space-x-2">
              <img
                className="w-10 h-10 object-cover rounded-full bg-pantone-gray"
                src={composition.user.profile ? composition.user.profile : `https://ui-avatars.com/api/?name=${composition.user.name}&background=343739&color=aaa`}
                alt={composition.user.name}
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-pantone-white text-opacity-80 hover:underline">{ composition.user.name }</span>
                <span className="font-light text-xs text-pantone-white text-opacity-50">{ composition.user.account_type }</span>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex flex-row px-10 w-full">
          <div className="flex flex-col px-2 w-full space-y-2">
            <div className="flex w-full">
              <Link href={`/${composition.user.username}/posts/${composition.slug}`}>
                <a className="flex items-center space-x-1 uppercase font-bold text-base text-pantone-white">
                  {composition.category === 'Song' && <RiMusic2Fill className="w-3.5 h-3.5 text-red-500" />}
                  {composition.category === 'Poem' && <RiBookOpenFill className="w-3.5 h-3.5 text-red-500" />}
                  <span>{ composition.title }</span>
                </a>
              </Link>
            </div>
            <div className="font-normal text-[12px] text-pantone-white text-opacity-50">{ composition.description }</div>
            <div className="flex flex-row items-center w-full space-x-1 pt-3 font-light text-[10px] text-pantone-white text-opacity-40">
              <div className="flex space-x-1">
                <span>Published</span>
                <Moment date={ composition.datePublished } fromNow />
              </div>
              {composition.dateEdited && (
                <React.Fragment>
                  <span className="font-light text-xs text-pantone-white text-opacity-30">&bull;</span>
                  <div className="flex space-x-1">
                    <span>Edited</span>
                    <Moment date={ composition.dateEdited } fromNow />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[3rem] space-y-2">
        <div className="relative flex">
          {host.username === composition.user.username && (
            <MenuDropdown
              host={host}
              composition={composition}
            />
          )}
        </div>
        {!(pathname === '/' || pathname === '/songs' || pathname === '/poems') && (
          <div className="relative flex">
            {(host.username === composition.user.username && composition.status === 'Published') && (
              <PinnedPostButton
                host={host}
                composition={composition}
              />
            )}
          </div>
        )}
        <div className="flex flex-row items-center space-x-1">
          {!host || host.isLoggedIn === true && (
            <BookmarkButton
              host={host}
              composition={composition}
            />
          )}
          {!host || host.isLoggedIn === false && (
            <RiBookmarkFill className="w-5 h-5 text-pantone-white" />
          )}
          <p className="font-light text-[10px] text-pantone-white text-opacity-40">
            { composition.bookmarks.length > 0 ? composition.bookmarks.length : '' }
          </p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          {!host || host.isLoggedIn === true && (
            <Link href={`/${composition.user.username}/posts/${composition.slug}`}>
              <a>
                <RiDiscussFill className="w-5 h-5 transition ease-linear duration-100 hover:scale-90" />
              </a>
            </Link>
          )}
          {!host || host.isLoggedIn === false && (
            <RiDiscussFill className="w-5 h-5 text-pantone-white" />
          )}
          <p className="font-light text-[10px] text-pantone-white text-opacity-40">
            { composition.comments.length > 0 ? composition.comments.length : '' }
          </p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          {!host || host.isLoggedIn === true && (
            <ReactionButton
              host={host}
              composition={composition}
            />
          )}
          {!host || host.isLoggedIn === false && (
            <RiHeart2Fill className="w-5 h-5 text-pantone-white" />
          )}
          <p className="font-light text-[10px] text-pantone-white text-opacity-40">
            { composition.likes.length > 0 ? composition.likes.length : '' }
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostCard