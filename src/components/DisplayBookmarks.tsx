import React from 'react'
import Link from 'next/link'
import ReactionButton from './Interactions/ReactionButton'
import BookmarkButton from './Interactions/BookmarkButton'
import { RiMusic2Fill, RiBookOpenFill } from 'react-icons/ri'

interface TypeProps {
  host: any
}

const DisplayBookmarks: React.FC<TypeProps> = ({ host }) => {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto pb-28 my-scrollbar">
      {host.bookmarks.map((bookmark: any, i: number) => (
        <div className="flex flex-row items-center justify-between w-full space-x-2 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-5" key={i}>
          <div className="flex flex-col w-full p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {bookmark.composition.category === 'Song' ? <RiMusic2Fill className="w-4 h-4 text-pantone-darkblack dark:text-pantone-white text-opacity-30 dark:text-opacity-30" /> : <RiBookOpenFill className="w-4 h-4 text-pantone-darkblack dark:text-pantone-white text-opacity-30 dark:text-opacity-30" />}
                <Link href={`/${bookmark.composition.user.username}/posts/${bookmark.composition.uuid}`}>
                  <a className="font-bold text-sm hover:underline text-pantone-darkblack dark:text-pantone-white text-opacity-90 dark:text-opacity-50">{ bookmark.composition.title }</a>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <ReactionButton
                  host={host}
                  composition={bookmark.composition}
                />
                <BookmarkButton
                  host={host}
                  composition={bookmark.composition}
                />
              </div>
            </div>
            <span className="flex w-full font-light text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50">{ bookmark.composition.description }</span>
            <div className="flex items-center space-x-1 text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50">
              <span className="font-medium text-[11px]">{ bookmark.composition.user.name }</span>
              <span className="font-light text-[10px]">- { bookmark.composition.user.account_type }</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayBookmarks
