import React from 'react'

interface TypeProps {
  host: any
}

const AccountSettings: React.FC<TypeProps> = ({ host }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row items-center justify-between w-full px-5 py-4 border-b border-pantone-white border-opacity-10">
        <div className="flex">
          <span className="font-bold text-base text-pantone-white text-opacity-80">Account Settings</span>
        </div>
        <div className="flex">
          <button
            className="flex justify-center w-full px-5 py-2 text-pantone-white bg-pantone-red rounded-lg transition ease-linear duration-200 hover:bg-opacity-80"
            type="button"
          >
            <span className="font-light text-xs">Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
