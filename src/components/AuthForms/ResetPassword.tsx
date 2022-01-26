import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import FormLoader from '~/utils/FormLoader'
import { useForm } from 'react-hook-form'
import { RiShieldKeyholeLine, RiShieldCheckLine } from 'react-icons/ri'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  token: string
}

interface FormData {
  newpassword: string
  repassword: string
}

const ResetPassword: React.FC<TypeProps> = ({ token }) => {

  const [signupError, setSignupError] = React.useState('')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()

  async function onForgotPassword(formData: FormData) {
    const newpassword = formData.newpassword
    const repassword = formData.repassword

    if(newpassword !== repassword) {
      setSignupError('Set password did not match.')
      return
    }

    await fetch(`/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newpassword })
    })

    Router.push('/login')
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md space-y-10">
      <form onSubmit={handleSubmit(onForgotPassword)} className="flex flex-col w-full px-3 md:px-0 space-y-2">
        <div className="flex flex-col items-center justify-between w-full px-3">
          <h5 className="font-light dark:font-extralight text-xs"><span className="font-bold text-sm">Welcome.</span> Reset your password.</h5>
          <span className="font-light text-[10px] text-red-600">{ signupError }</span>
        </div>
        <div className={`${ signupError ? 'hover:border-pantone-red focus-within:border-pantone-red' : 'hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-darkblack dark:text-pantone-white bg-transparent border border-gray-300 dark:border-pantone-gray transition ease-linear duration-200 hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white`}>
          <div className="px-3 border-r border-pantone-gray dark:border-pantone-white border-opacity-30 dark:border-opacity-30">
            <RiShieldKeyholeLine className="w-6 h-6 text-pantone-black dark:text-white text-opacity-60" />
          </div>
          <input
            className="w-full px-3 py-5 text-sm bg-transparent outline-none"
            type="password"
            placeholder="New Password"
            onInput={() => setSignupError("")}
            {...register("newpassword", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/ })}
          />
        </div>
        <div className={`${ signupError ? 'hover:border-pantone-red focus-within:border-pantone-red' : 'hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-darkblack dark:text-pantone-white bg-transparent border border-gray-300 dark:border-pantone-gray transition ease-linear duration-200 hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white`}>
          <div className="px-3 border-r border-pantone-gray dark:border-pantone-white border-opacity-30 dark:border-opacity-30">
            <RiShieldCheckLine className="w-6 h-6 text-pantone-black dark:text-white text-opacity-60" />
          </div>
          <input
            className="w-full px-3 py-5 text-sm bg-transparent outline-none"
            type="password"
            placeholder="Re-enter Password"
            onInput={() => setSignupError("")}
            {...register("repassword", { required: true })}
          />
        </div>
        {errors.newpassword && <span className="flex justify-start w-full font-light text-[10px] text-red-500">Invalid password, contains at least 8 alphanumeric values</span>}
        {!isSubmitting && (
          <button
            className="flex justify-center w-full px-3 py-5 text-sm outline-none rounded-md bg-transparent border border-gray-300 dark:border-pantone-gray transition ease-linear duration-200 hover:border-gray-500 focus-within:border-gray-500 dark:hover:border-pantone-white dark:focus-within:border-pantone-white"
            type="submit"
          >
            Confirm
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
      <div className="flex flex-row items-center justify-center w-full space-x-2 font-light text-xs text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-50">
        <div className="flex items-center space-x-1">
          <h6>Back to</h6>
          <Link href="/login">
            <a className="font-bold hover:underline">Login</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
