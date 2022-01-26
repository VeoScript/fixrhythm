import React from 'react'
import { useRouter } from 'next/router'
import NavigationBar from '~/components/NavigationBar'
import LeftSideBar from '~/components/Sidebars/LeftSideBar'
import RightSideBar from '~/components/Sidebars/RightSideBar'

interface TypeProps {
  user?: any
  host: any
  artists: any
  children: any
  get_notification: any
}

const Layout: React.FC<TypeProps> = ({ user, host, artists, children, get_notification }) => {

  const { pathname } = useRouter()

  return (
    <div className="preventcopy font-poppins flex justify-center w-full h-screen bg-[#FFFFFF] dark:bg-pantone-black overflow-hidden">
      <div className="relative flex flex-col w-full max-w-[2400px] h-full text-pantone-white bg-pantone-white dark:bg-pantone-darkblack bg-opacity-100 dark:bg-opacity-50">
        <NavigationBar
          host={host}
          user={user}
          artists={artists}
          get_notification={get_notification}
        />
        <div className="flex flex-row items-start w-full max-w-full h-full">
          {!(pathname === '/[username]' || pathname === '/[username]/posts/[uuid]' || pathname === '/[username]/followers' || pathname === '/[username]/following') && (
            <LeftSideBar host={host} />
          )}
          <div className="flex flex-col w-full max-w-full h-full overflow-y-auto">
            { children }
          </div>
          {!host || host.isLoggedIn === true && (
            <React.Fragment>
              {pathname !== '/[username]/posts/[uuid]' && (
                <RightSideBar
                  host={host}
                  artists={artists}
                />
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default Layout
