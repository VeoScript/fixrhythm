import React from 'react'

interface LayoutProps {
  children: any
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center w-full h-screen">
      <div className="flex w-full max-w-[2400px] h-full">
        { children }
      </div>
    </div>
  )
}

export default Layout
