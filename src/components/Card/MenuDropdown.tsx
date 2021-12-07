import React from 'react'
import EditCard from './Edit/EditCard'
import DeleteCard from './Delete/DeleteCard'
import { RiMoreFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
  postUrl?: any
}

const MenuDropdown: React.FC<TypeProps> = ({ host, composition, postUrl }) => {
  
  const [isDropdown, setIsDropdown] = React.useState(false)

  window.addEventListener('resize', function ResizeScreen() {
    setIsDropdown(false)
  })

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => {
          setIsDropdown(true)
        }}
      >
        <RiMoreFill className="flex w-5 h-5 transition ease-linear duration-100 hover:scale-90" />
      </button>
      {isDropdown && (
        <React.Fragment>
          <button 
            className={`${isDropdown ? 'z-10 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}
            type="button"
            onClick={() => {
              setIsDropdown(false)
            }} 
          />
          <div className="absolute w-[5rem] -left-14 top-7 z-10">
            <div className="flex w-full overflow-hidden shadow-sm rounded-md bg-pantone-black border border-pantone-white border-opacity-10">
              <div className="flex flex-col w-full">
                <EditCard
                  host={host}
                  composition={composition}
                  setIsDropdown={setIsDropdown}
                />
                <DeleteCard
                  host={host}
                  composition={composition}
                  setIsDropdown={setIsDropdown}
                  postUrl={postUrl}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default MenuDropdown
