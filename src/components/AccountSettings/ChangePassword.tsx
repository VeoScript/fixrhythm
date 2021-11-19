import React from 'react'
import { useForm } from 'react-hook-form'
import { RiShieldKeyholeLine } from 'react-icons/ri'

interface TypeProps {
  host: any
}

interface FormData {
  oldpassword: string
  newpassword: string
  repassword: string
}

const ChangePassword: React.FC<TypeProps> = ({ host }) => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  return (
    <div className="flex flex-col w-full border-b border-pantone-white border-opacity-10">
      <div className="flex flex-row items-center w-full px-5 py-3 border-b border-pantone-white border-opacity-5">
        <span className="font-bold text-sm text-pantone-white text-opacity-50 uppercase">Change Your Password</span>
      </div>
      <div className="flex flex-col w-full px-5 py-3 space-y-2">
        <div className="flex flex-col justify-center w-full space-y-2">
          <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Old Password</span>
          <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
            <div className="px-3 border-r border-pantone-white border-opacity-30">
              <RiShieldKeyholeLine className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
            </div>
            <input
              className="w-full px-3 py-5 text-sm bg-transparent outline-none"
              type="text"
              placeholder="Old Password"
              {...register("oldpassword", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center w-full space-y-2">
          <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">New Password</span>
          <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
            <div className="px-3 border-r border-pantone-white border-opacity-30">
              <RiShieldKeyholeLine className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
            </div>
            <input
              className="w-full px-3 py-5 text-sm bg-transparent outline-none"
              type="text"
              placeholder="New Password"
              {...register("newpassword", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center w-full space-y-2">
          <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Re-enter Password</span>
          <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
            <div className="px-3 border-r border-pantone-white border-opacity-30">
              <RiShieldKeyholeLine className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
            </div>
            <input
              className="w-full px-3 py-5 text-sm bg-transparent outline-none"
              type="text"
              placeholder="Re-enter Password"
              {...register("repassword", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-end w-full pt-3">
          <button
            className="flex justify-center w-full px-5 py-5 text-pantone-white bg-pantone-red rounded-lg transition ease-linear duration-200 hover:bg-opacity-80"
            type="button"
          >
            <span className="font-light text-xs">Change Password</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
