import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import FormLoader from '~/utils/FormLoader'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { RiShieldUserLine, RiShieldKeyholeLine } from 'react-icons/ri'

interface FormData {
  username: string
  password: string
}

const LoginForm: React.FC = () => {

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  async function onSignIn(formData: FormData) {
    const username = formData.username
    const password = formData.password
    
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
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
    Router.push('/')
  }

  return (
    <div className="flex flex-col w-full max-w-md space-y-10">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <form onSubmit={handleSubmit(onSignIn)} className="flex flex-col w-full space-y-2">
        <div className="flex w-full ml-3">
          <h5 className="font-extralight text-xs"><span className="font-bold text-sm">Welcome.</span> Please login.</h5>
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
        <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
          <div className="px-3 border-r border-pantone-white border-opacity-30">
            <RiShieldKeyholeLine className="w-6 h-6 text-pantone-white text-opacity-50" />
          </div>
          <input
            className="w-full px-3 py-5 text-sm bg-transparent outline-none"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>
        {!isSubmitting && (
          <button
            className="flex justify-center w-full px-3 py-5 text-sm outline-none rounded-md bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus:border-pantone-white"
            type="submit"
          >
            Sign In
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
        <Link href="/login">
          <a className="hover:underline">Forgot Password?</a>
        </Link>
        <span className="text-pantone-white text-opacity-20">|</span>
        <div className="flex items-center space-x-1">
          <h6>{`Don't have an account yet?`}</h6>
          <Link href="/signup">
            <a className="font-bold hover:underline">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm