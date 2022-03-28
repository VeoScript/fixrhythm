import React from 'react'
import AccountInformation from './AccountInformation'
import ChangePassword from './ChangePassword'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

interface TypeProps {
  host: any
}

interface FormData {
  profile_photo?: string
  cover_photo?: string
  short_bio?: string,
  name: string
  account_type: string
  phone: string
  email: string
  facebook?: string
  instagram?: string
  twitter?: string
  tiktok?: string
  youtube?: string
}

const AccountSettings: React.FC<TypeProps> = ({ host }) => {

  const defaultValues = {
    profile_photo: host.profile,
    cover_photo: host.coverphoto,
    short_bio: host.shortbio,
    name: host.name,
    account_type: host.account_type,
    username: host.username,
    phone: host.phone,
    email: host.email,
    facebook: host.facebook,
    instagram: host.instagram,
    twitter: host.twitter,
    tiktok: host.tiktok,
    youtube: host.youtube
  }

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues })

  async function onSave(formData: FormData) {
    const userId = host.uuid
    const profile_photo = formData.profile_photo
    const cover_photo = formData.cover_photo
    const short_bio = formData.short_bio
    const name = formData.name
    const account_type = formData.account_type
    const phone = formData.phone
    const email = formData.email
    const facebook = formData.facebook
    const instagram = formData.instagram
    const twitter = formData.twitter
    const tiktok = formData.tiktok
    const youtube = formData.youtube
    
    await fetch('/api/account-settings/account-information', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        profile_photo,
        cover_photo,
        short_bio,
        name,
        account_type,
        phone,
        email,
        facebook,
        instagram,
        twitter,
        tiktok,
        youtube
      })
    })
    toast("Saved Successfully!", {
      style: {
        borderRadius: '10px',
        border: '2px solid #1ED760',
        padding: '5px',
        fontSize: '14px',
        background: '#1D1F21',
        color: '#FFFFFF'
      }
    })
  }
  
  return (
    <React.Fragment>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex flex-row items-center justify-between w-full px-5 py-4 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
          <div className="flex">
            <span className="font-bold text-base text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-80">Account Settings</span>
          </div>
          <div className="flex">
            {!isSubmitting && (
              <button
                className="flex justify-center w-full px-5 py-2 text-pantone-white bg-pantone-red rounded-lg transition ease-linear duration-200 hover:bg-opacity-80"
                type="button"
                onClick={handleSubmit(onSave)}
              >
                <span className="font-light text-xs">Save</span>
              </button>
            )}
            {isSubmitting && (
              <div className="flex justify-center w-full px-5 py-2 text-pantone-white bg-red-900 rounded-lg">
                <span className="font-light text-xs">Saving...</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full h-full pb-16 overflow-y-auto my-scrollbar">
          <AccountInformation register={register} errors={errors} />
          <ChangePassword host={host} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default AccountSettings
