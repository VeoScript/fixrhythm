import React from 'react'
import useSWR from 'swr'
import DisplayBookmarks from '../DisplayBookmarks'
import DisplaySuggestedArtists from '../DisplaySuggestedArtists'
import { Tab } from '@headlessui/react'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

interface TypeProps {
  host: any
  artists: any
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const RightSideBar: React.FC<TypeProps> = ({ host, artists }) => {

  const { data: fetchArtists } = useSWR('/api/artists', fetcher, {
    refreshInterval: 1000,
    fallbackData: artists
  })

  return (
    <div className="hidden md:flex flex-col w-full max-w-xs h-full overflow-hidden bg-pantone-white dark:bg-pantone-gray border-l border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
      <div className="flex flex-col items-center w-full max-w-full">
        <Tab.Group>
          <Tab.List>
            <div className="flex flex-row items-center w-full space-x-0.5 border-b border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-5">
              <Tab
                className={({ selected }) => 
                  classNames(
                    'w-[10rem] transition ease-linear duration-200',
                    selected
                      ? 'font-normal text-xs p-2 bg-pantone-darkblack dark:bg-pantone-white bg-opacity-20 dark:bg-opacity-10 text-pantone-darkblack dark:text-pantone-white transition ease-linear duration-200 hover:bg-[#c5c7ce] dark:hover:bg-pantone-gray'
                      : 'font-normal text-xs p-2 bg-pantone-gray dark:bg-pantone-black bg-opacity-10 dark:bg-opacity-50 text-pantone-black dark:text-pantone-white transition ease-linear duration-200 hover:bg-[#c5c7ce] dark:hover:bg-pantone-gray'
                  )
                }
              >
                Suggested Accounts
              </Tab>
              <Tab
                className={({ selected }) => 
                  classNames(
                    'w-[10rem] transition ease-linear duration-200',
                    selected
                      ? 'font-normal text-xs p-2 bg-pantone-darkblack dark:bg-pantone-white bg-opacity-20 dark:bg-opacity-10 text-pantone-darkblack dark:text-pantone-white transition ease-linear duration-200 hover:bg-[#c5c7ce] dark:hover:bg-pantone-gray'
                      : 'font-normal text-xs p-2 bg-pantone-gray dark:bg-pantone-black bg-opacity-10 dark:bg-opacity-50 text-pantone-black dark:text-pantone-white transition ease-linear duration-200 hover:bg-[#c5c7ce] dark:hover:bg-pantone-gray'
                  )
                }
              >
                My Bookmarks
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels className="flex w-full">
            <Tab.Panel className="flex w-full">
              <DisplaySuggestedArtists
                host={host}
                fetchArtists={fetchArtists}
              />
            </Tab.Panel>
            <Tab.Panel className="flex w-full">
              <DisplayBookmarks host={host} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default RightSideBar