/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
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

  const { theme } = useTheme()

  const { pathname } = useRouter()

  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full max-w-full p-3 space-x-0 md:space-x-5 space-y-5 md:space-y-0 rounded-xl ${ backgroundColor } ${ border }`}>
      <div className="flex flex-col w-full max-w-full space-y-5">
        <div className="flex w-full">
          <Link href={`/${composition.user.username}`}>
            <a className="flex flex-row items-center space-x-2">
              <img
                className="w-10 h-10 object-cover rounded-full bg-[#CBD0E2] dark:bg-pantone-gray"
                src={`${ composition.user.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${composition.user.profile[0].version}/${composition.user.profile[0].publicId}.${composition.user.profile[0].format}` : `https://ui-avatars.com/api/?name=${composition.user.name}&background=${theme === 'dark' ? '2B2F31' : 'CBD0E2'}&color=${theme === 'dark' ? 'FF3C3C' : '333333'}` }`}
                alt={composition.user.name}
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-90 dark:text-opacity-80 hover:underline">{ composition.user.name }</span>
                <span className="font-light text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-90 dark:text-opacity-50">{ composition.user.account_type }</span>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex flex-row px-10 w-full">
          <div className="flex flex-col px-2 w-full space-y-2">
            <div className="flex w-full">
              <Link href={`/${composition.user.username}/posts/${composition.uuid}`}>
                <a className="flex items-center space-x-1 uppercase font-bold text-base text-pantone-darkblack dark:text-pantone-white">
                  {composition.category === 'Song' && <RiMusic2Fill className="w-3.5 h-3.5 text-red-500" />}
                  {composition.category === 'Poem' && <RiBookOpenFill className="w-3.5 h-3.5 text-red-500" />}
                  <span>{ composition.title }</span>
                </a>
              </Link>
            </div>
            <div className="font-normal text-[12px] text-left text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50">{ composition.description }</div>
            <div className="flex flex-col md:flex-row items-start md:items-center w-full space-x-0 md:space-x-1 pt-3 font-light text-[10px] text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-40">
              {!composition.dateEdited && (
                <div className="flex space-x-1">
                  <span>Published</span>
                  <Moment date={ composition.datePublished } fromNow />
                </div>
              )}
              {composition.dateEdited && (
                <div className="flex space-x-1">
                  <span>Edited</span>
                  <Moment date={ composition.dateEdited } fromNow />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse md:flex-col items-start justify-end w-full max-w-full md:max-w-[3rem] px-10 space-x-2 md:space-x-0 space-y-0 md:space-y-2">
        <div className="relative flex ml-2 md:ml-0">
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
            <RiBookmarkFill className="w-4 md:w-5 h-4 md:h-5 text-pantone-gray dark:text-pantone-white text-opacity-20 dark:text-opacity-100" />
          )}
          <p className="font-light text-[10px] text-pantone-gray dark:text-pantone-white text-opacity-90 dark:text-opacity-40">
            { composition.bookmarks.length > 0 ? composition.bookmarks.length : '' }
          </p>
        </div>
        <div className="flex flex-row items-center space-x-1">
          {!host || host.isLoggedIn === true && (
            <Link href={`/${composition.user.username}/posts/${composition.uuid}`}>
              <a title="Comments">
                <RiDiscussFill className="w-4 md:w-5 h-4 md:h-5 text-pantone-gray dark:text-pantone-white text-opacity-20 dark:text-opacity-100 transition ease-linear duration-100 hover:scale-90" />
              </a>
            </Link>
          )}
          {!host || host.isLoggedIn === false && (
            <RiDiscussFill className="w-4 md:w-5 h-4 md:h-5 text-pantone-gray dark:text-pantone-white text-opacity-20 dark:text-opacity-100" />
          )}
          <p className="font-light text-[10px] text-pantone-gray dark:text-pantone-white text-opacity-90 dark:text-opacity-40">
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
            <RiHeart2Fill className="w-4 md:w-5 h-4 md:h-5 text-pantone-gray dark:text-pantone-white text-opacity-20 dark:text-opacity-100" />
          )}
          <p className="font-light text-[10px] text-pantone-gray dark:text-pantone-white text-opacity-90 dark:text-opacity-40">
            { composition.likes.length > 0 ? composition.likes.length : '' }
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostCard