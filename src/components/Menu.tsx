/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { RiCloseFill, RiMenu5Fill } from 'react-icons/ri'

interface TypeProps {
  host: any
}

const Menu: React.FC<TypeProps> = ({ host }) => {

  const [isDropdown, setIsDropdown] = React.useState(false)

  window.addEventListener('resize', function ResizeScreen() {
    setIsDropdown(false)
  })

  return (
    <div className="flex">
      <button
        title="Menu"
        className="outline-none"
        type="button"
        onClick={() => {
          setIsDropdown(true)
        }} 
      >
        <RiMenu5Fill className="w-6 h-6 transition ease-linear duration-200 text-[#848484] hover:text-pantone-white" />
      </button>
      {isDropdown && (
        <React.Fragment>
          <button 
            className={`${isDropdown ? `z-50 block fixed inset-0 w-full h-full cursor-default outline-none` : 'hidden'}`}
            type="button"
            onClick={() => {
              setIsDropdown(false)
            }} 
          />
          <div className="fixed block md:hidden inset-0 z-50">
            <div className="flex w-full max-w-full h-full overflow-auto bg-pantone-black">
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-pantone-white border-opacity-10">
                  <span className="font-bold text-sm text-pantone-white text-opacity-50">Menu</span>
                  <button 
                    title="Close"
                    className="outline-none"
                    type="button"
                    onClick={() => {
                      setIsDropdown(false)
                    }} 
                  >
                    <RiCloseFill className="w-5 h-5 transition ease-linear duration-200 text-[#848484] hover:text-pantone-white" />
                  </button>
                </div>
                <div className="flex flex-row w-full items-center justify-between px-3 py-2 border-b border-pantone-white border-opacity-10 bg-pantone-black hover:bg-pantone-darkblack">
                  <div className="flex w-full">
                    <Link href={`/${host.username}`}>
                      <a className="flex flex-row items-center w-full space-x-2">
                        <div className="flex">
                          <img
                            className="w-12 h-12 object-cover rounded-full bg-[#1D1F21]"
                            src={`${ host.profile && host.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${host.profile[0].version}/${host.profile[0].publicId}.${host.profile[0].format}` : `https://ui-avatars.com/api/?name=${host.name}&background=1D1F21&color=FF3C3C` }`}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{ host.name }</span>
                          <span className="font-light text-xs text-pantone-white text-opacity-50">{ host.account_type }</span>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="flex w-[3rem]">
                    <button
                      className="follow_button flex justify-center font-normal text-[10px] text-center px-2 py-1 rounded-lg bg-red-600 text-pantone-white transition ease-linear duration-200 hover:bg-red-800"
                      type="button"
                      onClick={async () => {
                        await fetch('/api/auth/signout', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        })
                        Router.push('/login')
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <Link href={`/${host.username}`}>
                    <a className="flex px-3 py-3 font-normal text-xs text-pantone-white bg-pantone-black hover:bg-pantone-darkblack border-b border-pantone-white border-opacity-10">
                      Home
                    </a>
                  </Link>
                </div>
                <div className="flex flex-col w-full">
                  <Link href="/bookmarks">
                    <a className="flex px-3 py-3 font-normal text-xs text-pantone-white bg-pantone-black hover:bg-pantone-darkblack border-b border-pantone-white border-opacity-10">
                      Bookmarks
                    </a>
                  </Link>
                </div>
                <div className="flex flex-col w-full">
                  <Link href="/settings">
                    <a className="flex px-3 py-3 font-normal text-xs text-pantone-white bg-pantone-black hover:bg-pantone-darkblack border-b border-pantone-white border-opacity-10">
                      Account Settings
                    </a>
                  </Link>
                </div>
                <div className="flex flex-col w-full">
                  <Link href="/privacy-policy">
                    <a className="flex px-3 py-3 font-normal text-xs text-pantone-white bg-pantone-black hover:bg-pantone-darkblack border-b border-pantone-white border-opacity-10">
                      Privacy Policy
                    </a>
                  </Link>
                </div>
                <div className="flex flex-col w-full">
                  <Link href="/settings">
                    <a className="flex px-3 py-3 font-normal text-xs text-pantone-white bg-pantone-black hover:bg-pantone-darkblack border-b border-pantone-white border-opacity-10">
                      About
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Menu
