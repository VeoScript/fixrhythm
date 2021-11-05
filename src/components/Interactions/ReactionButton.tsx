import React from 'react'
import { RiHeart2Fill } from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
}

const ReactionButton: React.FC<TypeProps> = ({ host, composition }) => {

  const likes = composition.likes
  const compositionId = composition.uuid

  // useState check if the post is liked
  const [like, setLike] = React.useState(false)

  // i am using useEffect hook for update the likes state if there is a new post...
  React.useEffect(() => {
    // if this (likes.some) is true, setLike state will turn to true...
    setLike(likes.some((liked: { userId: any }) => liked.userId === host.uuid))
  }, [host.uuid, likes])

  // function for liking the post
  async function onLike(compositionId: any) {
    const userId = host.uuid

    await fetch('/api/interactions/likes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, compositionId })
    })
  }

  // function for unliking the post
  async function onUnlike(compositionId: any) {
    const userId = host.uuid

    await fetch('/api/interactions/likes/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, compositionId })
    })
  }

  return (
    <button className="outline-none" onClick={async () => {
      like ? await onUnlike(compositionId) : await onLike(compositionId)
      setLike(!like)
    }}>
      {like ? (
          <RiHeart2Fill className="w-5 h-5 text-pantone-red transition ease-linear duration-100 hover:scale-90" />
        ) : (
          <RiHeart2Fill className="w-5 h-5 text-pantone-white transition ease-linear duration-100 hover:scale-90" />
        )
      }
    </button>
  )
}

export default ReactionButton