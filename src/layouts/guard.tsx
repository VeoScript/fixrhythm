import React from 'react'
import DefaultLoader from '~/utils/DefaultLoader'

const Guard: React.FC = () => {
  return (
    <div className="font-poppins flex flex-row items-center justify-center w-full h-screen text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-darkblack">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-center w-full mb-2">
          <DefaultLoader
            width="40px"
            height="40px"
            color="#C71F2D"
          />
        </div>
        <h3 className="font-black text-3xl text-pantone-red">FIXRHYTHM</h3>
        <h6 className="font-light text-sm text-center">Evolve Your Ideas</h6>
      </div>
    </div>
  )
}

export default Guard