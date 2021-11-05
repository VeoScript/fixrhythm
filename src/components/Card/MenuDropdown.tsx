import React from 'react'
// import EditPost from '../../PostsCard/Edit/EditPost'
// import DeletePost from '../../PostsCard/Delete/DeletePost'
import { RiMoreFill } from 'react-icons/ri'

interface TypeProps {
  host: any
  composition: any
}

const MenuDropdown: React.FC<TypeProps> = ({ host, composition }) => {
  
  const [isDropdown, setIsDropdown] = React.useState(false)

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
          <div className="absolute w-full">
            <div className="absolute w-full max-w-[5rem] -left-24 top-0 z-10">
              <div className="flex w-full overflow-hidden shadow-sm rounded-md bg-pantone-darkblack border border-pantone-white border-opacity-10">
                <div className="flex flex-col w-full">
                  <button
                    className="w-full px-3 py-2 font-light text-xs text-left transition ease-linear duration-200 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-10"
                  >
                    Edit
                  </button>
                  <button
                    className="w-full px-3 py-2 border-t border-pantone-white border-opacity-10 font-light text-xs text-left transition ease-linear duration-200 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default MenuDropdown
