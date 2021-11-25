/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
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
      <form className="z-20 flex flex-row items-center w-full max-w-[20rem] px-3 space-x-3 bg-pantone-gray rounded-lg border border-pantone-black focus-within:border-pantone-white focus-within:border-opacity-30">
        <RiSearchLine className="text-white text-opacity-60" />
        <input
          type="text"
          className="w-full py-2.5 text-xs bg-transparent outline-none"
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
            <div className="flex flex-col w-full h-full max-h-[15rem] bg-pantone-darkblack rounded-md overflow-y-auto">
              {search_results.map((artist: any, i: number) => (
                <Link href={`/${ artist.username }`} key={i}>
                  <a
                    className="flex flex-row items-center w-full space-x-2 px-3 py-3 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-5"
                    onClick={(e: any) => {
                      setIsDisplay(false)
                      setSearchTerm(e.target.value="")
                    }}
                  >
                    <div className="flex">
                      <img
                        className="w-8 h-8 object-cover rounded-full bg-[#1D1F21]"
                        src={`${ artist.profile ? artist.profile : `https://ui-avatars.com/api/?name=${ artist.name }&background=1D1F21&color=FF3C3C` }`}
                        alt={`${ artist.username }`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-xs">{ artist.name }</div>
                      <div className="font-light text-[10px]">
                        { artist.composition.length } composition
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