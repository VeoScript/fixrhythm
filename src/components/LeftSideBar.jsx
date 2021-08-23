import Link from 'next/link'
import Image from 'next/image'
import Scrollbar from 'react-smooth-scrollbar'
import { BsPeople, BsPeopleFill, BsCollectionFill } from 'react-icons/bs'
import { FacebookIcon, InstagramIcon, TwitterIcon, TiktokIcon, YoutubeIcon } from '~/utils/icons'

export default function LeftSideBar() {
  return (
    <div className="flex flex-row w-full max-w-sm h-full overflow-y-auto pt-16 text-white border-r border-white border-opacity-10 bg-[#202426]">
      <Scrollbar
        thumbMinSize={20}
        className="w-full"
      >
        <div className="flex flex-col items-center w-full px-3 py-5">
          <UserAvatar
            src="https://pbs.twimg.com/media/E9D8F0tXEAYUfOS?format=jpg&name=900x900"
            alt="user_profile"
          />
          <div className="flex flex-col w-full px-10 pt-3">
            <div className="flex flex-col w-full space-y-3">
              <div className="flex flex-col w-full">
                <span className="font-bold text-2xl text-pantone-white text-opacity-80">Lisa Manoban</span>
                <span className="font-light text-xl text-pantone-white text-opacity-50">lalalalisa</span>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-light text-base text-pantone-white text-opacity-80">The Poet</span>
              </div>
              <hr className="opacity-5" />
              <div className="flex flex-row items-center justify-between w-full">
                <Link href="/">
                  <a className="flex flex-row items-center space-x-2">
                    <BsPeopleFill className="w-4 h-4 fill-current text-white text-opacity-30" />
                    <span className="font-light text-xs text-pantone-white text-opacity-50">
                      <strong className="font-bold text-pantone-white">0</strong> followers
                    </span>
                  </a>
                </Link>
                <Link href="/">
                  <a className="flex flex-row items-center space-x-2">
                    <BsPeople className="w-4 h-4 fill-current text-white text-opacity-30" />
                    <span className="font-light text-xs text-pantone-white text-opacity-50">
                      <strong className="font-bold text-pantone-white">0</strong> following
                    </span>
                  </a>
                </Link>
                <Link href="/">
                  <a className="flex flex-row items-center space-x-2">
                    <BsCollectionFill className="w-4 h-4 fill-current text-white text-opacity-30" />
                    <span className="font-light text-xs text-pantone-white text-opacity-50">
                      <strong className="font-bold text-pantone-white">0</strong> Posts
                    </span>
                  </a>
                </Link>
              </div>
              <hr className="opacity-5" />
              <div className="flex flex-col w-full space-y-2">
                <div className="flex flex-row items-center w-full space-x-2">
                  <FacebookIcon className="w-4 h-4 fill-current text-white text-opacity-30" />
                  <span className="font-light text-sm text-pantone-white text-opacity-70">@Facebook</span>
                </div>
                <div className="flex flex-row items-center w-full space-x-2">
                  <InstagramIcon className="w-4 h-4 fill-current text-white text-opacity-30" />
                  <span className="font-light text-sm text-pantone-white text-opacity-70">@Instagram</span>
                </div>
                <div className="flex flex-row items-center w-full space-x-2">
                  <TwitterIcon className="w-4 h-4 fill-current text-white text-opacity-30" />
                  <span className="font-light text-sm text-pantone-white text-opacity-70">@Twitter</span>
                </div>
                <div className="flex flex-row items-center w-full space-x-2">
                  <TiktokIcon className="w-4 h-4 fill-current text-white text-opacity-30" />
                  <span className="font-light text-sm text-pantone-white text-opacity-70">@Tiktok</span>
                </div>
                <div className="flex flex-row items-center w-full space-x-2">
                  <YoutubeIcon className="w-4 h-4 fill-current text-white text-opacity-30" />
                  <span className="font-light text-sm text-pantone-white text-opacity-70">@YouTube</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  )
}

function UserAvatar({ src, alt }) {
  return (
    <div className="flex flex-col w-full max-w-[15rem] rounded-full ring-2 ring-pantone-white ring-opacity-30">
      <Image
        src={src}
        width={1000}
        height={1000}
        alt={alt}
        blurDataURL={src}
        placeholder="blur"
        layout="responsive"
        className="rounded-full bg-pantone-black"
      />
    </div>
  )
}