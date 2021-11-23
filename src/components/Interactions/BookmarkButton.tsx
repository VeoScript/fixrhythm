import React from 'react'
import { RiBookmarkFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
}

const BookmarkButton: React.FC<TypeProps> = ({ host, composition }) => {

  const bookMarks = composition.bookmarks
  const compositionId = composition.uuid

  // useState check if the post is already in the user bookmarks
  const [bookmark, setBookmark] = React.useState(false)

  // i am using useEffect hook for update the bookmarks state if there is a new post...
  React.useEffect(() => {
    // if this (bookMarks.some) is true, setBookmark state will turn to true...
    setBookmark(bookMarks.some((bookmarked: { userId: any }) => bookmarked.userId === host.uuid))
  }, [host.uuid, bookMarks])

  // function for add the post to user bookmarks
  async function addBookmark(compositionId: any) {
    const userId = host.uuid

    await fetch('/api/interactions/bookmarks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, compositionId })
    })
  }

  // function for remove the post to user bookmarks
  async function deleteBookmark(compositionId: any) {
    const userId = host.uuid

    await fetch('/api/interactions/bookmarks/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, compositionId })
    })
  }

  return (
    <button title="Bookmark" className="outline-none" onClick={async () => {
      bookmark ? await deleteBookmark(compositionId) : await addBookmark(compositionId)
      setBookmark(!bookmark)
    }}>
      {bookmark ? (
          <RiBookmarkFill className="w-5 h-5 text-[#1C99E6] transition ease-linear duration-100 hover:scale-90" />
        ) : (
          <RiBookmarkFill className="w-5 h-5 text-pantone-white transition ease-linear duration-100 hover:scale-90" />
        )
      }
    </button>
  )
}

export default BookmarkButton