/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import DisplayNotifications from './Notifications/DisplayNotificationsDropdown'
import SearchArtist from './Search/SearchArtist'
import ComposeMini from './Compose/ComposeMini'
import { RiHome5Fill, RiMusic2Fill, RiBookOpenFill, RiUserSettingsLine, RiLogoutCircleRLine, RiMenu5Fill } from 'react-icons/ri'

interface TypeProps {
  user?: any
  host: any
  artists: any
  get_notification: any
}

const NavigationBar: React.FC<TypeProps> = ({ user, host, artists, get_notification }) => {

  const { pathname } = useRouter()

  const [isDropdown, setIsDropdown] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', function ResizeScreen() {
      setIsDropdown(false)
    })
  }, [])

  return (
    <React.Fragment>
      {/* top navigation bar */}
      <React.Fragment>
        {(user || !host || host.isLoggedIn === true) && (
          <React.Fragment>
            <div className="hidden md:flex flex-row items-center justify-between w-full py-3 shadow-xl border-b border-pantone-white border-opacity-10">
              <div className="flex items-center justify-center w-full max-w-xs">
                <Link href="/">
                  <a className="font-black text-xl text-pantone-red">FIXRHYTHM</a>
                </Link>
              </div>
              <div className="flex items-center justify-center w-full max-w-full space-x-10">
                <Link href="/">
                  <a title="Home"><RiHome5Fill className={`${ pathname === '/' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
                </Link>
                <Link href="/songs">
                  <a title="Songs"><RiMusic2Fill className={`${ pathname === '/songs' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
                </Link>
                <Link href="/poems">
                  <a title="Poems"><RiBookOpenFill className={`${ pathname === '/poems' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
                </Link>
                <DisplayNotifications
                  host={host}
                  get_notification={get_notification}
                />
                <div className="relative flex">
                  <button
                    title="Menu"
                    className="outline-none"
                    type="button"
                    onClick={() => {
                      setIsDropdown(true)
                    }} 
                  >
                    <RiMenu5Fill className="w-7 h-6 transition ease-linear duration-200 text-[#848484] hover:text-pantone-white" />
                  </button>
                  {isDropdown && (
                    <React.Fragment>
                      <button 
                        className={`${isDropdown ? 'z-50 block fixed inset-0 w-full h-full cursor-default outline-none' : 'hidden'}`}
                        type="button"
                        onClick={() => {
                          setIsDropdown(false)
                        }} 
                      />
                      <div className="fixed top-14 z-50 w-full">
                        <div className="flex w-full max-w-[10rem] shadow-sm rounded-md overflow-auto bg-pantone-black border border-black-matt border-opacity-10">
                          <div className="flex flex-col w-full">
                            <Link href="/settings">
                              <a className="flex flex-row items-center w-full p-3 space-x-2 font-light text-xs text-pantone-white text-opacity-80 transition ease-linear duration-200 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-5">
                                <RiUserSettingsLine className="w-4 h-4" />
                                <span>Account Settings</span>
                              </a>
                            </Link>
                            <button
                              className="flex flex-row items-center w-full p-3 space-x-2 border-t border-pantone-white border-opacity-5 font-light text-xs text-pantone-white text-opacity-80 transition ease-linear duration-200 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-5"
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
                              <RiLogoutCircleRLine className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center w-full max-w-xs px-3 space-x-3">
                <SearchArtist artists={artists} />
                <Link href={`/${host.username}`}>
                  <a className="flex w-full max-w-[3rem] transition ease-linear duration-100 hover:scale-95">
                    <img
                      className="w-8 h-8 object-cover rounded-full bg-[#1D1F21]"
                      src={`${ host.profile && host.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${host.profile[0].version}/${host.profile[0].publicId}.${host.profile[0].format}` : `https://ui-avatars.com/api/?name=${host.name}&background=1D1F21&color=FF3C3C` }`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            {/* bottom navigation bar */}
            <div className="fixed md:hidden bottom-0 z-50 w-full border-t border-pantone-white border-opacity-10">
              <div className="flex flex-row items-center justify-between w-full px-10 bg-pantone-darkblack">
                <Link href="/">
                  <a title="Home" className="py-3"><RiHome5Fill className={`${ pathname === '/' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
                </Link>
                <Link href="/songs">
                  <a title="Songs" className="py-3"><RiMusic2Fill className={`${ pathname === '/songs' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
                </Link>
                <ComposeMini host={host} />
                <Link href="/poems">
                  <a title="Poems" className="py-3"><RiBookOpenFill className={`${ pathname === '/poems' ? 'text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-white`} /></a>
                </Link>
                <DisplayNotifications
                  host={host}
                  get_notification={get_notification}
                />
              </div>
            </div>
          </React.Fragment>
        )}
        {(user === '' || !host || host.isLoggedIn === false) && (
          <div className="flex flex-row items-center justify-between w-full px-3 md:px-0 py-3 shadow-xl border-b border-pantone-white border-opacity-10">
            <div className="flex items-center justify-start md:justify-center w-full max-w-xs">
              <Link href="/">
                <a className="font-black text-md md:text-xl text-pantone-red">FIXRHYTHM</a>
              </Link>
            </div>
            <div className="flex items-center justify-end md:justify-center w-full max-w-xs space-x-2">
              <Link href="/login">
                <a className="font-normal text-[10px] md:text-xs px-2 md:px-5 py-2 md:py-3 rounded-lg bg-pantone-gray text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10">
                  Sign In
                </a>
              </Link>
              <Link href="/signup">
                <a className="font-normal text-[10px] md:text-xs px-2 md:px-5 py-2 md:py-3 rounded-lg bg-pantone-red text-pantone-white transition ease-linear duration-200 hover:bg-opacity-80">
                  Create Account
                </a>
              </Link>
            </div>
          </div>
        )}
      </React.Fragment>
    </React.Fragment>
  )
}

export default NavigationBar
