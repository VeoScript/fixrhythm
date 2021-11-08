import React from 'react'
import FormLoader from '~/utils/FormLoader'
import { useForm } from 'react-hook-form'

interface TypeProps {
  host: any
  profile: any
  className: string
}

const UnfollowButton: React.FC<TypeProps> = ({ host, profile, className }) => {

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  async function onUnfollow() {
    const userId = host.uuid
    const profileId = profile.uuid

    await fetch('/api/follows/actions/unfollow', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ userId, profileId })
    })
  }

  return (
    <React.Fragment>
      {!isSubmitting && (
        <button
          className={ className }
          type="button"
          onClick={handleSubmit(onUnfollow)}
        >
          <span>Following</span>
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

export default UnfollowButton