import React from 'react'
import NavigationBar from '~/components/NavigationBar'
import LeftSideBar from '~/components/Sidebars/LeftSideBar'
import RightSideBar from '~/components/Sidebars/RightSideBar'

interface TypeProps {
  host: any
  artists: any
  children: any
}

const Layout: React.FC<TypeProps> = ({ host, artists, children }) => {
  return (
    <div className="preventcopy font-poppins flex justify-center w-full h-screen bg-pantone-darkblack overflow-hidden">
      <div className="relative flex flex-col w-full max-w-[2400px] h-full text-pantone-white bg-pantone-black bg-opacity-50">
        <NavigationBar />
        <div className="flex flex-row items-start w-full max-w-full h-full">
          <LeftSideBar host={host} />
          <div className="flex flex-col w-full max-w-full h-full overflow-y-auto">
            { children }
          </div>
          <RightSideBar
            host={host}
            artists={artists}
          />
        </div>
      </div>
    </div>
  )
}

export default Layout
