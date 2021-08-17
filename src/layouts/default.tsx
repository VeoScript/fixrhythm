import React from 'react'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center w-full h-screen bg-[#222]">
      <div className="flex w-full max-w-[2400px] h-full text-pantone-white bg-pantone-black bg-opacity-50">
        { children }
      </div>
    </div>
  )
}

export default Layout
