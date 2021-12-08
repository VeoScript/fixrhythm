import React from 'react'
import { RiPushpin2Line, RiPushpin2Fill } from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
}

const PinnedPostButton: React.FC<TypeProps> = ({ host, composition }) => {

  const pinnedPost = composition.pinned
  const compositionId = composition.uuid

  // useState check if the post is already in the user pinned post
  const [pinnedpost, setPinnedPost] = React.useState(false)

  // i am using useEffect hook for update the pinned post state if there is a new post...
  React.useEffect(() => {
    // if this (pinnedPost.some) is true, setPinnedPost state will turn to true...
    setPinnedPost(pinnedPost.some((pinned: { userId: any }) => pinned.userId === host.uuid))
  }, [host.uuid, pinnedPost])

  // function for add the post to user pinned post
  async function addPinned(compositionId: any) {
    const userId = host.uuid

    await fetch('/api/interactions/pinned/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, compositionId })
    })
  }

  // function for remove the post to user pinned post
  async function removePinned(compositionId: any) {
    const userId = host.uuid

    await fetch('/api/interactions/pinned/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, compositionId })
    })
  }

  return (
    <button title="Pin this post" className="outline-none" onClick={async () => {
      pinnedpost ? await removePinned(compositionId) : await addPinned(compositionId)
      setPinnedPost(!pinnedpost)
    }}>
      {pinnedpost ? (
          <RiPushpin2Fill className="w-4 md:w-5 h-4 md:h-5 text-[#9e29ae] transition ease-linear duration-100 hover:scale-90" />
        ) : (
          <RiPushpin2Line className="w-4 md:w-5 h-4 md:h-5 text-pantone-white transition ease-linear duration-100 hover:scale-90" />
        )
      }
    </button>
  )
}

export default PinnedPostButton