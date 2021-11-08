import React from 'react'
import FormLoader from '~/utils/FormLoader'
import { useForm } from 'react-hook-form'

interface TypeProps {
  host: any
  profile: any
  width: string
  fontSize: string
  paddingX: string
  paddingY: string
}

const UnfollowButton: React.FC<TypeProps> = ({ host, profile, width, fontSize, paddingX, paddingY }) => {

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
          className={`unfollow_button font-normal ${ width } ${ fontSize } ${ paddingX } ${ paddingY } rounded-lg bg-pantone-darkblack text-pantone-white transition ease-linear duration-200 hover:bg-pantone-red`}
          type="button"
          onClick={handleSubmit(onUnfollow)}
        >
          <span>Following</span>
        </button>
      )}
      {isSubmitting && (
        <div
          className={`flex items-center justify-center font-normal ${ width } ${ fontSize } ${ paddingX } ${ paddingY } rounded-lg bg-pantone-red text-pantone-white`}
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