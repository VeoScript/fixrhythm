import React from 'react'
import { Facebook, Instagram, Twitter, TikTok, Youtube } from '~/utils/SocialMediaIcons'
import { RiStarSFill, RiMailLine, RiMusicLine, RiShieldUserLine, RiSmartphoneLine, RiUser3Line } from 'react-icons/ri'

interface TypeProps {
  register: any
  errors: any
}

const AccountInformation: React.FC<TypeProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full border-b border-pantone-white border-opacity-10">
        <div className="flex flex-row items-center justify-between w-full px-5 py-3 border-b border-pantone-white border-opacity-5">
          <span className="font-bold text-sm text-pantone-white text-opacity-50 uppercase">Account Information</span>
        </div>
        <div className="flex flex-col w-full px-5 py-3 space-y-2">
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Short Bio</span>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiStarSFill className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Short Bio"
                {...register("short_bio")}
              />
            </div>
          </div>
          <div className="flex flex-row w-full space-x-2">
            <div className="flex flex-col items-center w-full space-y-2">
              <div className="flex flex-col justify-center w-full space-y-2">
                <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Name</span>
                <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
                  <div className="px-3 border-r border-pantone-white border-opacity-30">
                    <RiUser3Line className="w-6 h-6 text-pantone-white text-opacity-50" />
                  </div>
                  <input
                    className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center w-full space-y-2">
                <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Username</span>
                <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray">
                  <div className="px-3 border-r border-pantone-white border-opacity-30">
                    <RiShieldUserLine className="w-6 h-6 text-pantone-white text-opacity-50" />
                  </div>
                  <input
                    readOnly
                    className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full space-y-2">
              <div className="flex flex-col justify-center w-full space-y-2">
                <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Account Type</span>
                <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
                  <div className="px-3 border-r border-pantone-white border-opacity-30">
                    <RiMusicLine className="w-6 h-6 text-pantone-white text-opacity-50" />
                  </div>
                  <select
                    className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                    {...register("account_type", { required: true })}
                  >
                    <option value="" className="hidden"></option>
                    <option value="Typical" className="bg-pantone-darkblack">Typical</option>
                    <option value="Lyricist" className="bg-pantone-darkblack">Lyricist</option>
                    <option value="Poet" className="bg-pantone-darkblack">Poet</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full space-y-2">
                <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Phone</span>
                <div className={`${ errors.phone ? 'hover:border-pantone-red focus-within:border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200`}>
                  <div className="px-3 border-r border-pantone-white border-opacity-30">
                    <RiSmartphoneLine className="w-6 h-6 text-pantone-white text-opacity-50" />
                  </div>
                  <input
                    className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                    type="text"
                    placeholder="Phone"
                    {...register("phone", { required: true, pattern: /^(09|\+639)\d{9}$/ })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Email</span>
            <div className={`${ errors.email ? 'hover:border-pantone-red focus-within:border-pantone-red' : 'hover:border-pantone-white focus-within:border-pantone-white' } flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200`}>
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <RiMailLine className="w-6 h-6 text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Email"
                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full border-b border-pantone-white border-opacity-10">
        <div className="flex flex-row items-center w-full px-5 py-3 border-b border-pantone-white border-opacity-5">
          <span className="font-bold text-sm text-pantone-white text-opacity-50 uppercase">Social Media Links</span>
        </div>
        <div className="flex flex-col w-full px-5 py-3 space-y-2">
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Facebook</span>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <Facebook className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Facebook Username"
                {...register("facebook")}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Instagram</span>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <Instagram className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Instagram Username"
                {...register("instagram")}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Twitter</span>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <Twitter className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Twitter Username"
                {...register("twitter")}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">TikTok</span>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <TikTok className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="TikTok Username"
                {...register("tiktok")}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full space-y-2">
            <span className="px-2 font-light text-xs text-pantone-white text-opacity-50">Youtube</span>
            <div className="flex items-center w-full px-1 rounded-md text-pantone-white bg-transparent border border-pantone-gray transition ease-linear duration-200 hover:border-pantone-white focus-within:border-pantone-white">
              <div className="px-3 border-r border-pantone-white border-opacity-30">
                <Youtube className="w-5 h-5 fill-current text-pantone-white text-opacity-50" />
              </div>
              <input
                className="w-full px-3 py-5 text-sm bg-transparent outline-none"
                type="text"
                placeholder="Youtube Channel Link"
                {...register("youtube")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountInformation
