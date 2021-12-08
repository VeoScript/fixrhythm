import React from 'react'
import Link from 'next/link'
import FormLoader from '~/utils/FormLoader'
import emailjs from 'emailjs-com'
import jwt from 'jwt-simple'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { RiMailLine } from 'react-icons/ri'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  found_user: any
}

interface FormData {
  email: string
}

const ForgotPassword: React.FC<TypeProps> = ({ found_user }) => {

  const { data: user } = useSWR(`/api/auth/forgot-password`, fetcher, {
    refreshInterval: 1000,
    fallbackData: found_user
  })

  const [signupError, setSignupError] = React.useState('')
  const [signupSuccess, setSignupSuccess] = React.useState('')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function onForgotPassword(formData: FormData) {
    try {
      const email = formData.email

      const check_email_exist = user.find((user: { email: string }) => user.email === email)

      if(!check_email_exist) {
        setSignupError("Email not found, try again")
        return
      }

      // create jwt token
      const payload = { userId: check_email_exist.uuid }
      const secret = process.env.JWT_SECRET as string
      const token = jwt.encode(payload, secret)

      // pass parameter data to EmailJS Template
      const name = check_email_exist.name
      const message = 'Here is your reset password link to recover your account'
      const link = `https://www.fixrhythm.tk/reset-password/${token}`
      // const link = `http://localhost:3000/reset-password/${token}`

      const mail = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID as string,
        process.env.EMAILJS_TEMPLATE_ID as string,
        { name, email, message, link },
        process.env.EMAILJS_USER_ID
      )

      if (mail) {
        setSignupSuccess("Check your email to reset your new password!")
        reset()
      } else {
        setSignupError("Something went wrong try again.")
        reset()
      }
      
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md space-y-10">
      <form onSubmit={handleSubmit(onForgotPassword)} className="flex flex-col w-full px-3 md:px-0 space-y-2">
        <div className="flex flex-col items-center justify-center w-full">
          <h5 className="font-extralight text-xs"><span className="font-bold text-sm">Welcome.</span> Recover your account.</h5>
          <span className={`font-light text-right text-[10px] ${signupSuccess ? 'text-[#35af2a]' : 'text-red-500'}`}>{ signupSuccess ? signupSuccess : signupError }</span>
        </div>
        <div className={`${ errors.email ? 'hover:border-pantone-red focus-within:border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200`}>
          <div className="px-3 border-r border-pantone-white border-opacity-30">
            <RiMailLine className="w-6 h-6 text-pantone-white text-opacity-50" />
          </div>
          <input
            className="w-full px-3 py-5 text-sm bg-transparent outline-none"
            type="text"
            placeholder="Email"
            onInput={() => {
              setSignupError("")
              setSignupSuccess("")
            }}
            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
          />
        </div>
        {errors.email && <span className="flex justify-start w-full font-light text-[10px] text-red-500">Invalid email</span>}
        {!isSubmitting && (
          <button
            className="flex justify-center w-full px-3 py-5 text-sm outline-none rounded-md bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus:border-pantone-white"
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
      <div className="flex flex-row items-center justify-center w-full space-x-2 font-light text-xs text-pantone-white text-opacity-50">
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

export default ForgotPassword
