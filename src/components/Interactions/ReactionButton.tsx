import React from 'react'
import { RiHeart2Fill } from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
}

const ReactionButton: React.FC<TypeProps> = ({ host, composition }) => {

  const likes = composition.likes
  const compositionId = composition.uuid
  const compositionUserId = composition.user.uuid
  const notificationId = composition.notifications.id

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

    sendOnNotification()
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

    sendRemoveNotification()
  }

  // send this request to notification as type of Likes Notification
  async function sendOnNotification() {
    const fromUserId = host.uuid
    const toUserId = compositionUserId
    const notification_type = "Likes"
    const notification_message = `liked your composition`

    // if the user liked her own post, function will be return
    //(para di agad mapuno yung database ko eh, yung notification is para nalang sa mga other users na naglike sa post mo)
    if(host.uuid === composition.user.uuid) return

    await fetch('/api/notifications/likes_and_comments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        notification_type,
        notification_message,
        compositionId,
        fromUserId,
        toUserId
      })
    })
  }

  // send this request to remove like notification
  async function sendRemoveNotification() {
    const notificationFromId = host.uuid
    const notificationType = "Likes"

    if(host.uuid === composition.user.uuid) return

    await fetch('/api/notifications/likes_and_comments/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        notificationId,
        compositionId,
        notificationFromId,
        notificationType
      })
    })
  }

  return (
    <button title="Reaction" className="outline-none" onClick={async () => {
      like ? await onUnlike(compositionId) : await onLike(compositionId)
      setLike(!like)
    }}>
      {like ? (
          <RiHeart2Fill className="w-4 md:w-5 h-4 md:h-5 text-pantone-red transition ease-linear duration-100 hover:scale-90" />
        ) : (
          <RiHeart2Fill className="w-4 md:w-5 h-4 md:h-5 text-pantone-gray dark:text-pantone-white text-opacity-20 dark:text-opacity-100 transition ease-linear duration-100 hover:scale-90" />
        )
      }
    </button>
  )
}

export default ReactionButton