/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { useTheme } from 'next-themes'
import { RiSearchLine } from 'react-icons/ri'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  artists: any
}

const SearchArtist: React.FC<TypeProps> = ({ artists }) => {

  const { data: fetchArtists } = useSWR('/api/artists', fetcher, {
    refreshInterval: 1000,
    fallbackData: artists
  })

  const { theme } = useTheme()
  
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isDisplay, setIsDisplay] = React.useState(false)

  const handleChange = (e: { target: { value: any } }) => {
    setSearchTerm(e.target.value)
    if(!e.target.value) {
      setIsDisplay(false)
    } else {
      setIsDisplay(true)
    }
  }
  
  const getArtists = fetchArtists.map((artist: any) => {
    return {
      profile: artist.profile,
      name: artist.name,
      username: artist.username,
      composition: artist.composition,
      account_type: artist.account_type
    }
  })
  
  const search_results = !searchTerm ? getArtists : getArtists.filter((artist: any) => 
    artist.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  return (
    <div className="relative flex flex-col items-center w-full">
      <form className="z-20 flex flex-row items-center w-full max-w-[20rem] px-3 space-x-3 bg-pantone-white dark:bg-pantone-gray rounded-lg border border-pantone-gray border-opacity-20 dark:border-pantone-black focus-within:border-pantone-gray dark:focus-within:border-pantone-white focus-within:border-opacity-30 dark:focus-within:border-opacity-30">
        <RiSearchLine className="text-pantone-black dark:text-white text-opacity-60" />
        <input
          type="text"
          className="w-full py-2.5 text-xs text-pantone-black dark:text-pantone-white bg-transparent outline-none"
          placeholder="Search artist"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="hidden" />
      </form>
      {isDisplay && (
        <React.Fragment>
          <button
            className={`${isDisplay ? 'z-10 block fixed inset-0 w-full h-full cursor-default outline-none' : 'hidden'}`}
            type="button"
            onClick={(e: any) => {
              setIsDisplay(false)
              setSearchTerm(e.target.value="")
            }}
          />
          <div className="absolute top-11 z-10 flex justify-center w-full max-w-[20rem]">
            <div className="flex flex-col w-full h-full max-h-[15rem] text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-darkblack rounded-md overflow-y-auto border border-pantone-gray dark:border-pantone-white border-opacity-30 dark:border-opacity-30">
              {search_results.length === 0 && (
                <div className="flex px-5 py-3">
                  <span className="font-light text-xs">No results found.</span>
                </div>
              )}
              {search_results.map((artist: any, i: number) => (
                <Link href={`/${ artist.username }`} key={i}>
                  <a
                    className="flex flex-row items-center w-full space-x-2 px-3 py-3 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10 bg-pantone-white dark:bg-pantone-darkblack hover:bg-pantone-gray dark:hover:bg-pantone-white hover:bg-opacity-5 dark:hover:bg-opacity-5"
                    onClick={(e: any) => {
                      setIsDisplay(false)
                      setSearchTerm(e.target.value="")
                    }}
                  >
                    <div className="flex">
                      <img
                        className="w-10 h-10 object-cover rounded-full bg-[#CBD0E2] dark:bg-[#2B2F31]"
                        src={`${ artist.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${artist.profile[0].version}/${artist.profile[0].publicId}.${artist.profile[0].format}` : `https://ui-avatars.com/api/?name=${artist.name}&background=${theme === 'dark' ? '2B2F31' : 'CBD0E2'}&color=${theme === 'dark' ? 'FF3C3C' : '333333'}` }`}
                        alt={`${ artist.username }`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-xs">{ artist.name }</div>
                      <div className="font-light text-[10px]">
                        { artist.account_type }
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default SearchArtist