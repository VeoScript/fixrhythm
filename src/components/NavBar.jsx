import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NavBar() {

  const { pathname } = useRouter()
  
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="flex flex-row items-center justify-between w-full px-8 py-3 border-b border-white border-opacity-10 text-pantone-white bg-pantone-black">
      <div className="flex flex-row items-center w-full justify-start max-w-full space-x-5">
        <Link href="/">
          <a className="font-black text-xl text-pantone-red">FIXRHYTHM</a>
        </Link>
        <div className="flex flex-row items-center w-full max-w-xs px-3 py-2 space-x-2 text-sm rounded-md bg-pantone-white bg-opacity-10 border border-transparent focus-within:border-pantone-white focus-within:border-opacity-30">
          <svg className="w-5 h-5 text-pantone-white text-opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            className="w-full bg-transparent focus:outline-none"
            type="text"
            name="search_composers"
            placeholder="Search composers"
          />
        </div>
        <div className="flex flex-row items-center space-x-5 text-sm">
          <Link href="/">
            <a className={`${pathname === '/' ? 'text-pantone-red' : 'text-pantone-white text-opacity-50'} hover:text-opacity-90 transition ease-in-out duration-300`}>Home</a>
          </Link>
          <Link href="/">
            <a className={`${pathname === '/lyrics' ? 'text-pantone-red' : 'text-pantone-white text-opacity-50'} hover:text-opacity-90 transition ease-in-out duration-300`}>Songs</a>
          </Link>
          <Link href="/">
            <a className={`${pathname === '/poems' ? 'text-pantone-red' : 'text-pantone-white text-opacity-50'} hover:text-opacity-90 transition ease-in-out duration-300`}>Poems</a>
          </Link>
          <Link href="/">
            <a className={`${pathname === '/notifications' ? 'text-pantone-red' : 'text-pantone-white text-opacity-50'} hover:text-opacity-90 transition ease-in-out duration-300`}>Notifications</a>
          </Link>
        </div>
      </div>
      <div className="flex justify-end w-full max-w-md">
        <div className="relative flex justify-end w-full">
          <div className="flex flex-row items-center justify-end w-full">
            <button
              type="button"
              className="flex flex-row items-center justify-end w-full max-w-[4rem] space-x-1 focus:outline-none"
              onClick={() => setDialogOpen(true)}
            >
              <UserAvatar
                src="https://pbs.twimg.com/media/E9D8F0tXEAYUfOS?format=jpg&name=900x900"
                alt="user_profile"
              />
              <svg className="w-5 h-5 text-pantone-white text-opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
              </svg>
            </button>
          </div>
          {setDialogOpen && (
            <Fragment>
              <button onClick={() => {setDialogOpen(false)}} type="button" className={`${dialogOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
              <div className={`z-40 w-full ${dialogOpen ? 'fixed' : 'hidden'}`}>
                <div className="fixed top-14 right-8 w-full max-w-[13rem] rounded-md border border-pantone-white border-opacity-10 bg-pantone-black text-white">
                  <div className="flex flex-col w-full p-3 border-b border-pantone-white border-opacity-10 cursor-default">
                    <span className="font-light text-sm text-pantone-white text-opacity-50">Signed in as <span className="font-bold">lalalalisa</span></span>
                  </div>
                  <Link href="/">
                    <a className="flex flex-col w-full p-3 border-b border-pantone-white border-opacity-10 hover:bg-pantone-white hover:bg-opacity-10">
                      <span className="font-semibold text-sm text-pantone-white text-opacity-80">Your Profile</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="flex flex-col w-full p-3 border-b border-pantone-white border-opacity-10 hover:bg-pantone-white hover:bg-opacity-10">
                      <span className="font-semibold text-sm text-pantone-white text-opacity-80">Account Settings</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="flex flex-col w-full p-3 border-b border-pantone-white border-opacity-10 hover:bg-pantone-white hover:bg-opacity-10">
                      <span className="font-semibold text-sm text-pantone-white text-opacity-80">Privacy Policy</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="flex flex-col w-full p-3 hover:bg-pantone-white hover:bg-opacity-10">
                      <span className="font-semibold text-sm text-pantone-white text-opacity-80">Sign out</span>
                    </a>
                  </Link>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

function UserAvatar({ src, alt }) {
  return (
    <div className="flex flex-col w-full max-w-[2rem] rounded-full ring-2 ring-pantone-white ring-opacity-30">
      <Image
        src={src}
        width={1000}
        height={1000}
        alt={alt}
        blurDataURL={src}
        placeholder="blur"
        layout="responsive"
        className="rounded-full bg-pantone-black"
      />
    </div>
  )
}