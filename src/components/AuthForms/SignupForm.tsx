import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import FormLoader from '~/utils/FormLoader'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import {
  RiUser3Line,
  RiMusicLine,
  RiSmartphoneLine,
  RiShieldUserLine,
  RiMailLine,
  RiShieldKeyholeLine,
  RiShieldCheckLine
} from 'react-icons/ri'

interface FormData {
  name: string
  account_type: string
  username: string
  phone: string
  email: string
  password: string
  repassword: string
}

const SignupForm: React.FC = () => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function onSignUp(formData: FormData) {
    const password = formData.password
    const repassword = formData.repassword

    if (password !== repassword) {
      toast('Password not matched, try again.',
        {
          icon: '🤔',
          style: {
            borderRadius: '10px',
            fontSize: '14px',
            background: '#24282B',
            color: '#fff',
          }
        }
      )
      return
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if(!res.ok) {
      const json = await res.json()
      toast(json.message,
        {
          icon: '🤫',
          style: {
            borderRadius: '10px',
            fontSize: '14px',
            background: '#24282B',
            color: '#fff',
          }
        }
      )
      return
    }

    reset()
    Router.replace('/login')
  }

  return (
    <div className="flex flex-col w-full max-w-xl space-y-5">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <form onSubmit={handleSubmit(onSignUp)} className="flex flex-col w-full space-y-2">
        <div className="flex w-full ml-3">
          <h5 className="font-extralight text-xs"><span className="font-bold text-sm">Welcome.</span> Create your account.</h5>
        </div>
        <div className="flex flex-col w-full space-y-2">
          <div className="flex flex-row items-center w-full space-x-2">
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiUser3Line className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white text-opacity-60 bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiMusicLine className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <select
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                {...register("account_type", { required: true })}
              >
                <option value="" className="hidden">Account Type</option>
                <option value="Typical" className="bg-pantone-darkblack">Typical</option>
                <option value="Lyricist" className="bg-pantone-darkblack">Lyricist</option>
                <option value="Poet" className="bg-pantone-darkblack">Poet</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row items-center w-full space-x-2">
            <div className={`${ errors.phone ? 'hover:border-pantone-red focus-within:border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200`}>
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiSmartphoneLine className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Phone"
                {...register("phone", { required: true, pattern: /\d+/ })}
              />
            </div>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiShieldUserLine className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </div>
          </div>
          <div className={`${ errors.email ? 'hover:border-pantone-red focus-within:border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200`}>
            <div className="px-3 border-r border-pantone-white border-opacity-30">
              <RiMailLine className="w-6 h-6 text-pantone-white text-opacity-50" />
            </div>
            <input
              className="w-full px-3 py-5 text-sm bg-transparent outline-none"
              type="text"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            />
          </div>
          <div className="flex flex-row items-center w-full space-x-2">
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiShieldKeyholeLine className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="password"
                placeholder="Password"
                {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/ })}
              />
            </div>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiShieldCheckLine className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="password"
                placeholder="Re-enter Password"
                {...register("repassword", { required: true })}
              />
            </div>
          </div>
        </div>
        {!isSubmitting && (
          <button
            className="flex justify-center w-full px-3 py-5 text-sm outline-none rounded-md bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus:border-pantone-white"
            type="submit"
          >
            Sign Up
          </button>
        )}
        {isSubmitting && (
          <div className="flex justify-center w-full px-3 py-4 text-sm outline-none rounded-md bg-transparent border border-pantone-gray">
            <FormLoader
              width="28px"
              height="28px"
              color="#C71F2D"
            />
          </div>
        )}
      </form>
      <div className="flex flex-row items-center justify-center w-full space-x-2 font-light text-xs text-pantone-white text-opacity-50">
        <div className="flex items-center space-x-1">
          <h6>Do you already have an account?</h6>
          <Link href="/login">
            <a className="font-bold hover:underline">Login</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupForm