import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiSearchLine, RiHeart2Fill, RiCloseFill } from 'react-icons/ri'

interface TypeProps {
  fetchPublishedCompositions: any
  fetchSongPublishedCompositions: any
  fetchPoemsPublishedCompositions: any
}

const SearchTitleMenu: React.FC<TypeProps> = ({ fetchPublishedCompositions, fetchSongPublishedCompositions, fetchPoemsPublishedCompositions }) => {

  const { pathname } = useRouter()
  
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isDisplay, setIsDisplay] = React.useState(false)
  const [isDropdown, setIsDropdown] = React.useState(false)

  let getAllCompositions
  let getSongCompositions
  let getPoemCompositions
  let search_results

  const handleChange = (e: { target: { value: any } }) => {
    setSearchTerm(e.target.value)
    if(!e.target.value) {
      setIsDisplay(false)
    } else {
      setIsDisplay(true)
    }
  }

  if(pathname === '/') {
    // if the page is in homepage this will be the search results
    getAllCompositions = fetchPublishedCompositions.map((composition: any) => {
      return {
        uuid: composition.uuid,
        title: composition.title,
        category: composition.category,
        name: composition.user.name,
        username: composition.user.username,
        likes: composition.likes
      }
    })
    // results will display all songs and poems compositions
    search_results = !searchTerm ? getAllCompositions : getAllCompositions.filter((composition: any) => 
      composition.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  }

  if(pathname === '/songs') {
    // if the page is in songs this will be the search results
    getSongCompositions = fetchSongPublishedCompositions.map((composition: any) => {
      return {
        uuid: composition.uuid,
        title: composition.title,
        category: composition.category,
        name: composition.user.name,
        username: composition.user.username,
        likes: composition.likes
      }
    })
    // results will display all songs compositions
    search_results = !searchTerm ? getSongCompositions : getSongCompositions.filter((composition: any) => 
      composition.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  }

  if(pathname === '/poems') {
    // if the page is in poems this will be the search results
    getPoemCompositions = fetchPoemsPublishedCompositions.map((composition: any) => {
      return {
        uuid: composition.uuid,
        title: composition.title,
        category: composition.category,
        name: composition.user.name,
        username: composition.user.username,
        likes: composition.likes
      }
    })
    // results will display all poems compositions
    search_results = !searchTerm ? getPoemCompositions : getPoemCompositions.filter((composition: any) => 
      composition.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  }

  return (
    <div className="flex">
      <button
        title="Search Compositions"
        className="outline-none"
        type="button"
        onClick={() => {
          setIsDropdown(true)
        }} 
      >
        <RiSearchLine className="w-5 h-5 transition ease-linear duration-200 text-[#848484] hover:text-pantone-gray dark:hover:text-pantone-white" />
      </button>
      {isDropdown && (
        <React.Fragment>
          <button 
            className={`${isDropdown ? `z-50 block fixed inset-0 w-full h-full cursor-default outline-none` : 'hidden'}`}
            type="button"
            onClick={() => {
              setIsDropdown(false)
            }} 
          />
          <div className="fixed block md:hidden inset-0 z-50">
            <div className="flex w-full max-w-full h-full overflow-auto bg-pantone-white dark:bg-pantone-black">
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10 bg-pantone-white dark:bg-pantone-darkblack">
                  <span className="font-bold text-sm text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50">Search Composition</span>
                  <button 
                    title="Close"
                    className="outline-none"
                    type="button"
                    onClick={() => {
                      setIsDropdown(false)
                    }} 
                  >
                    <RiCloseFill className="w-5 h-5 transition ease-linear duration-200 text-[#848484] hover:text-pantone-gray dark:hover:text-pantone-white" />
                  </button>
                </div>
                <div className="flex flex-col items-center w-full px-3 py-2 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
                  <form className="z-20 flex flex-row items-center w-full max-w-full px-3 space-x-3 bg-pantone-white dark:bg-pantone-gray rounded-lg border border-pantone-gray border-opacity-20 dark:border-pantone-black focus-within:border-pantone-gray dark:focus-within:border-pantone-white focus-within:border-opacity-30 dark:focus-within:border-opacity-30">
                    <RiSearchLine className="text-pantone-black dark:text-white text-opacity-60" />
                    <input
                      type="text"
                      className="w-full py-2.5 text-xs text-pantone-black dark:text-pantone-white bg-transparent outline-none"
                      placeholder={`Search ${ pathname === '/' && 'title' || pathname === '/songs' && 'song title' || pathname === '/poems' && 'poem title' }`}
                      value={searchTerm}
                      onChange={handleChange}
                    />
                    <button type="submit" className="hidden" />
                  </form>
                </div>
                {isDisplay && (
                  <div className="flex flex-col w-full">
                    {search_results.length === 0 && (
                      <div className="flex px-5 py-3">
                        <span className="font-light text-xs">No results found.</span>
                      </div>
                    )}
                    {search_results.map((composition: any, i: number) => (
                      <Link href={`/${ composition.username }/posts/${ composition.uuid }`} key={i}>
                        <a 
                          className="flex flex-row items-center justify-between w-full px-5 py-3 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10 bg-pantone-white dark:bg-pantone-darkblack hover:bg-pantone-gray dark:hover:bg-pantone-white hover:bg-opacity-5 dark:hover:bg-opacity-5"
                          onClick={(e: any) => {
                            setIsDisplay(false)
                            setSearchTerm(e.target.value="")
                          }}
                        >
                          <div className="flex flex-col">
                            <div className="font-bold text-sm text-pantone-darkblack dark:text-pantone-white">{ composition.title }</div>
                            <div className="font-normal dark:font-light text-[10px] text-pantone-darkblack dark:text-pantone-white text-opacity-80 dark:text-opacity-50">
                              by { composition.name } - { composition.category }
                            </div>
                          </div>
                          <div className="flex items-center justify-start w-7">
                            <div className="flex items-center space-x-0.5">
                              <RiHeart2Fill className="w-5 h-5 text-pantone-darkblack dark:text-pantone-white text-opacity-30 dark:text-opacity-30" />
                              <span className="font-light text-[10px] text-pantone-darkblack dark:text-pantone-white text-opacity-50 dark:text-opacity-50">{ composition.likes.length }</span>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default SearchTitleMenu