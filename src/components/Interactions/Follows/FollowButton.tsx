import React from 'react'
import FormLoader from '~/utils/FormLoader'
import { useForm } from 'react-hook-form'

interface TypeProps {
  host: any
  profile: any
  className: string
}

const FollowButton: React.FC<TypeProps> = ({ host, profile, className }) => {

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  async function onFollow() {
    const userId = host.uuid
    const profileId = profile.uuid

    await fetch('/api/follows/actions/follow', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ userId, profileId })
    })

    sendOnNotification()
  }

  // send this request to notification as type of Follows Notification
  async function sendOnNotification() {
    const fromUserId = host.uuid
    const toUserId = profile.uuid
    const followsId = profile.uuid
    const notification_type = "Follows"
    const notification_message = `started following you.`

    await fetch('/api/notifications/follows/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        notification_type,
        notification_message,
        followsId,
        fromUserId,
        toUserId
      })
    })
  }

  return (
    <React.Fragment>
      {!isSubmitting && (
        <button
          className={ className }
          type="button"
          onClick={handleSubmit(onFollow)}
        >
          <span>Follow</span>
        </button>
      )}
      {isSubmitting && (
        <div
          className={ className }
        >
          <FormLoader
            width="20px"
            height="20px"
            color="#FFFFFF"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default FollowButton