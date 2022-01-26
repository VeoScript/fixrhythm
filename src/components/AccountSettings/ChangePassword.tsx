import React from 'react'
import bcrypt from 'bcryptjs'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RiShieldKeyholeLine, RiShieldCheckLine } from 'react-icons/ri'

interface TypeProps {
  host: any
}

interface FormData {
  oldpassword: string
  newpassword: string
  repassword: string
}

const ChangePassword: React.FC<TypeProps> = ({ host }) => {

  const [changePasswordError, setChangePasswordError] = React.useState('')

  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm()

  async function onChangePassword(formData: FormData) {
    const userId = host.uuid
    const oldpassword = formData.oldpassword
    const newpassword = formData.newpassword
    const repassword = formData.repassword

    const hashpassword = host.password
    const match_old_password = await bcrypt.compare(oldpassword, hashpassword)

    if(!match_old_password) {
      setChangePasswordError("Old password did not match.")
      setError("oldpassword", {
        type: "manual",
        message: "Old password did not match.",
      })
      return
    }

    if(newpassword !== repassword) {
      setChangePasswordError("Set password did not match")
      setError("newpassword", {
        type: "manual",
        message: "Set password did not match.",
      })
      setError("repassword", {
        type: "manual",
        message: "Set password did not match.",
      })
      return
    }

    await fetch('/api/account-settings/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newpassword, userId })
    })

    reset()
    setChangePasswordError("")

    toast("Changed password saved successfully!", {
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
      <form onSubmit={handleSubmit(onChangePassword)} className="flex flex-col w-full border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
        <div className="flex flex-row items-center justify-between w-full px-5 py-3 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
          <span className="font-bold text-xs md:text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-50 uppercase">Change Your Password</span>
          <span className="font-light text-xs text-pantone-red">{ changePasswordError || errors.newpassword && 'Weak Password' }</span>
        </div>
        <div className="flex flex-col w-full px-5 py-3 space-y-2">
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50">Old Password</span>
            <div className={`${ errors.oldpassword ? 'hover:border-pantone-red border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-darkblack dark:text-pantone-white bg-transparent border border-gray-300 dark:border-pantone-gray transition ease-linear duration-200 hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white`}>
              <div className="px-3 border-r border-pantone-black dark:border-pantone-white border-opacity-20 dark:border-opacity-30">
                <RiShieldCheckLine className="w-6 h-6 text-pantone-gray dark:text-pantone-white text-opacity-50 dark:text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-xs md:text-sm bg-transparent outline-none"
                type="password"
                placeholder="Old Password"
                onInput={() => setChangePasswordError("")}
                {...register("oldpassword", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50">New Password</span>
            <div className={`${ errors.newpassword ? 'hover:border-pantone-red border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-darkblack dark:text-pantone-white bg-transparent border border-gray-300 dark:border-pantone-gray transition ease-linear duration-200 hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white`}>
              <div className="px-3 border-r border-pantone-black dark:border-pantone-white border-opacity-20 dark:border-opacity-30">
                <RiShieldKeyholeLine className="w-6 h-6 text-pantone-gray dark:text-pantone-white text-opacity-50 dark:text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-xs md:text-sm bg-transparent outline-none"
                type="password"
                placeholder="New Password"
                {...register("newpassword", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/ })}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50">Re-enter Password</span>
            <div className={`${ errors.repassword ? 'hover:border-pantone-red border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-darkblack dark:text-pantone-white bg-transparent border border-gray-300 dark:border-pantone-gray transition ease-linear duration-200 hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white`}>
              <div className="px-3 border-r border-pantone-black dark:border-pantone-white border-opacity-20 dark:border-opacity-30">
                <RiShieldCheckLine className="w-6 h-6 text-pantone-gray dark:text-pantone-white text-opacity-50 dark:text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-xs md:text-sm bg-transparent outline-none"
                type="password"
                placeholder="Re-enter Password"
                {...register("repassword", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-end w-full pt-1">
           {!isSubmitting && (
              <button
              className="flex justify-center w-full p-5 rounded-lg text-pantone-white bg-pantone-black bg-opacity-80 dark:bg-opacity-100 transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
                type="submit"
              >
                <span className="font-light text-xs">Change Password</span>
              </button>
           )}
           {isSubmitting && (
              <div className="flex justify-center w-full p-5 text-pantone-white bg-pantone-black bg-opacity-80 rounded-lg">
                <span className="font-light text-xs">Save changes...</span>
              </div>
           )}
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export default ChangePassword
