/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ProfileLayout from '~/layouts/profile'

interface TypeProps {
  host: any
  profile: any
}

const Profile: React.FC<TypeProps> = ({ host, profile }) => {

  return (
    <ProfileLayout
      host={host}
      profile={profile}
    >
      <div className="flex flex-col w-full max-w-full p-5">
        Right
      </div>
    </ProfileLayout>
  )
}

export default Profile