/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ProfileLayout from '~/layouts/profile'
import PostCard from './Card/PostCard'
import ComposeCard from './Compose/ComposeCard'
import useSWR from 'swr'
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
  profile: any
  published_posts: any
  draft_posts: any
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Profile: React.FC<TypeProps> = ({ host, profile, published_posts, draft_posts }) => {

  const { data: get_published_posts } = useSWR(`/api/${profile.username}/post_published`, fetcher, {
    refreshInterval: 1000,
    fallbackData: published_posts
  })

  const { data: get_draft_posts } = useSWR(`/api/${profile.username}/post_draft`, fetcher, {
    refreshInterval: 1000,
    fallbackData: draft_posts
  })

  return (
    <ProfileLayout
      host={host}
      profile={profile}
    >
      <div className="flex flex-col w-full max-w-full space-y-2">
        {(get_published_posts.composition.length === 0 && get_draft_posts.composition.length === 0) && (
          <div className="flex flex-col items-center w-full max-w-full">
            <div className="flex flex-col items-start justify-center w-full max-w-sm space-y-5 text-pantone-white text-opacity-80">
              <div className="font-black text-3xl text-left">
                { host.username === profile.username ? 'You' : profile.name }
                {` hasn't Compose any poems or song lyrics`}
              </div>
              <span className="font-normal text-sm text-pantone-white text-opacity-50">
                When { host.username === profile.username ? 'you' : 'they' } do, 
                { host.username === profile.username ? ' your' : ' their' } compositions will show up here.
              </span>
              {host.username === profile.username && (
                <div className="flex w-full max-w-[8rem]">
                  <ComposeCard host={host} />
                </div>
              )}
            </div>
          </div>
        )}
        <Tab.Group>
          {(get_published_posts.composition.length > 0 || get_draft_posts.composition.length > 0) && (
            <Tab.List className="flex flex-row items-center justify-between w-full max-w-full h-full px-5 py-3 rounded-xl bg-pantone-darkblack">
              <div className="flex">
                <h3 className="text-sm">Compositions</h3>
              </div>
              <div className="flex flex-row items-center rounded-md space-x-0.5 overflow-auto">
                <Tab
                  className={({ selected }) => 
                    classNames(
                      'w-[5rem] text-sm px-3 py-2 transition ease-linear duration-200',
                      selected
                        ? 'font-normal text-xs p-2 bg-pantone-white bg-opacity-10 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-gray'
                        : 'font-normal text-xs p-2 bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10'
                    )
                  }
                >
                  Published
                </Tab>
                {host.username === profile.username && (
                  <Tab
                    className={({ selected }) => 
                      classNames(
                        'w-[5rem] text-sm px-3 py-2 transition ease-linear duration-200',
                        selected
                          ? 'font-normal text-xs p-2 bg-pantone-white bg-opacity-10 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-gray'
                          : 'font-normal text-xs p-2 bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10'
                      )
                    }
                  >
                    Drafts
                  </Tab>
                )}
              </div>
              {host.username === profile.username && (
                <div className="flex w-full max-w-[5rem]">
                  <ComposeCard host={host} />
                </div>
              )}
            </Tab.List>
          )}
          <Tab.Panels>
            <Tab.Panel>
              <div className="flex flex-col items-center w-full space-y-2">
                {get_published_posts.composition.length === 0 && get_draft_posts.composition.length > 0 && (
                  <div className="flex flex-col items-start justify-center w-full max-w-sm space-y-5 py-5 text-pantone-white text-opacity-80">
                    <div className="font-black text-3xl text-left">
                      { host.username === profile.username ? 'You' : profile.name }
                      {` hasn't Published any composition`}
                    </div>
                    <span className="font-normal text-sm text-pantone-white text-opacity-50">
                      When { host.username === profile.username ? 'you' : 'they' } do, 
                      { host.username === profile.username ? ' your' : ' their' } published compositions will show up here.
                    </span>
                  </div>
                )}
                {get_published_posts.composition.map((composition: any, i: number) => (
                  <PostCard
                    key={i}
                    host={host}
                    composition={composition}
                    border="border-none"
                    backgroundColor="bg-pantone-darkblack"
                  />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex flex-col items-center w-full space-y-2">
                {get_draft_posts.composition.length === 0 && get_published_posts.composition.length > 0 && (
                  <div className="flex flex-col items-start justify-center w-full max-w-sm space-y-5 py-5 text-pantone-white text-opacity-80">
                    <div className="font-black text-3xl text-left">
                      {`You hasn't Draft composition`}
                    </div>
                    <span className="font-normal text-sm text-pantone-white text-opacity-50">
                      When you do, your draft compositions will show up here.
                    </span>
                  </div>
                )}
                {get_draft_posts.composition.map((composition: any, i: number) => (
                  <PostCard
                    key={i}
                    host={host}
                    composition={composition}
                    border="border-none"
                    backgroundColor="bg-pantone-darkblack"
                  />
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </ProfileLayout>
  )
}

export default Profile