import Image from 'next/image'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { BiBookmark } from 'react-icons/bi'

export default function Card() {
  return (
    <div className="flex flex-row items-center justify-center w-full px-3 py-5 border-b border-pantone-white border-opacity-10">
      <div className="flex flex-row items-center w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center w-full space-x-2">
              <AuthorAvatar src="https://pbs.twimg.com/media/E9IG6lXWUAo4TBf?format=jpg&name=medium" alt="avatar" />
              <div className="flex flex-col">
                <span className="font-medium text-sm">Roseanne Park</span>
                <span className="font-light text-xs text-pantone-white text-opacity-30">The Lyricist</span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end w-full space-x-2">
              <button type="button">
                <AiOutlineHeart className="w-5 h-5 text-gray-500" />
              </button>
              <button type="button">
                <AiOutlineEye className="w-6 h-6 text-gray-500" />
              </button>
              <button type="button">
                <BiBookmark className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full mt-3">
            <span className="font-medium text-sm">The Title</span>
            <span className="font-light text-xs text-pantone-white text-opacity-30">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora excepturi laboriosam autem, at quibusdam dicta quam in adipisci vel aliquid quos cum asperiores nostrum eveniet quisquam laborum. Voluptatibus, culpa iusto.
            </span>
            <div className="flex flex-row items-center w-full space-x-1 mt-3">
              <span className="font-light text-[10px] text-pantone-white text-opacity-20">Just Now</span>
              <span className="font-light text-[10px] text-pantone-white text-opacity-20">&bull;</span>
              <span className="font-light text-[10px] text-pantone-white text-opacity-20">0 hearts</span>
              <span className="font-light text-[10px] text-pantone-white text-opacity-20">&bull;</span>
              <span className="font-light text-[10px] text-pantone-white text-opacity-20">0 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthorAvatar({ src, alt }) {
  return (
    <div className="flex flex-col w-full max-w-[3rem] rounded-full">
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