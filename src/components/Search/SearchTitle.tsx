import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiSearchLine, RiHeart2Fill } from 'react-icons/ri'

interface TypeProps {
  fetchPublishedCompositions: any
  fetchSongPublishedCompositions: any
  fetchPoemsPublishedCompositions: any
}

const SearchTitle: React.FC<TypeProps> = ({ fetchPublishedCompositions, fetchSongPublishedCompositions, fetchPoemsPublishedCompositions }) => {

  const { pathname } = useRouter()
  
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isDisplay, setIsDisplay] = React.useState(false)

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
    <div className="relative flex flex-col items-start md:items-center w-full">
      <form className="z-20 flex flex-row items-center w-full max-w-[15rem] md:max-w-[20rem] px-3 space-x-3 bg-pantone-white dark:bg-pantone-gray rounded-lg border border-pantone-gray border-opacity-20 dark:border-pantone-black focus-within:border-pantone-gray dark:focus-within:border-pantone-white focus-within:border-opacity-30 dark:focus-within:border-opacity-30">
        <RiSearchLine className="text-pantone-black dark:text-white text-opacity-60" />
        <input
          type="text"
          className="w-full py-2.5 text-[10px] md:text-xs text-pantone-black dark:text-white bg-transparent outline-none"
          placeholder={`Search ${ pathname === '/' && 'title' || pathname === '/songs' && 'song title' || pathname === '/poems' && 'poem title' }`}
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
          <div className="fixed md:absolute top-14 md:top-11 md:inset-auto z-20 inline-block md:flex justify-center w-full max-w-[20rem]">
            <div className="flex justify-center w-full max-w-full md:max-w-[20rem]">
              <div className="flex flex-col w-full max-w-[23rem] h-full max-h-[15rem] text-pantone-darkblack dark:text-pantone-white bg-pantone-white dark:bg-pantone-darkblack rounded-md overflow-y-auto my-scrollbar border border-pantone-gray dark:border-pantone-white border-opacity-30 dark:border-opacity-30">
                {search_results.length === 0 && (
                  <div className="flex px-5 py-3">
                    <span className="font-light text-xs">No results found.</span>
                  </div>
                )}
                {search_results.map((composition: any, i: number) => (
                  <Link href={`/${ composition.username }/posts/${ composition.uuid }`} key={i}>
                    <a 
                      className="flex flex-row items-center justify-between w-full px-5 py-3 bg-pantone-white dark:bg-pantone-darkblack hover:bg-pantone-gray dark:hover:bg-pantone-white hover:bg-opacity-5 dark:hover:bg-opacity-5"
                      onClick={(e: any) => {
                        setIsDisplay(false)
                        setSearchTerm(e.target.value="")
                      }}
                    >
                      <div className="flex flex-col">
                        <div className="font-bold text-sm">{ composition.title }</div>
                        <div className="font-light text-[10px]">
                          by { composition.name } - { composition.category }
                        </div>
                      </div>
                      <div className="flex items-center justify-start w-7">
                        <div className="flex items-center space-x-0.5">
                          <RiHeart2Fill className="w-5 h-5 text-pantone-gray dark:text-pantone-white text-opacity-20 dark:text-opacity-100" />
                          <span className="font-light text-[10px] text-pantone-gray dark:text-pantone-white text-opacity-90 dark:text-opacity-50">{ composition.likes.length }</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default SearchTitle