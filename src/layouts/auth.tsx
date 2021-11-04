/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface TypeProps {
  children: any
}

const Auth: React.FC<TypeProps> = ({ children }) => {
  return (
    <div className="preventcopy font-poppins flex flex-col items-center justify-center w-full h-screen bg-pantone-darkblack overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full max-w-[2400px] h-full text-pantone-white bg-pantone-black bg-opacity-50">
        <div className="flex flex-col items-center w-full space-y-3">
          <div className="flex flex-col items-center w-full">
            <h3 className="font-black text-3xl text-pantone-red">FIXRHYTHM</h3>
            <h6 className="font-light text-sm text-center">Evolve Your Ideas</h6>
          </div>
          <div className="flex flex-col items-center w-full">
            { children }
          </div>
          <div className="absolute bottom-5 flex flex-row items-center justify-center w-full space-x-3 font-light text-[10px] text-[#6f6f6f]">
            <span>&copy; 2021 FIXRHYTHM</span>
            <img className="w-6 h-6" src="fixrhythm.png" alt="fixrhythm" />
            <span>by VEOSCRIPT.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth