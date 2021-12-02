/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Moment from 'react-moment'
import useSWR from 'swr'
import { RiBellFill } from 'react-icons/ri'

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
  get_notification: any
}

const DisplayNotifications: React.FC<TypeProps> = ({ host, get_notification }) => {
  
  const [isDropdown, setIsDropdown] = React.useState(false)
  
  const { data: countUnreadNotifications } = useSWR('/api/notifications/get_notification', fetcher, {
    refreshInterval: 1000,
    fallbackData: get_notification
  })

  const countNotifications = new Array

  for (let i = 0; i < countUnreadNotifications.length; i++) {
    countNotifications.push(countUnreadNotifications[i].notificationTo)
  }

  const getUser = countNotifications.find((user: { uuid: string }) => user.uuid === host.uuid)
  
  const getUserUnreadNotification = countNotifications.map((user: { uuid: string }) => user.uuid === host.uuid)

  const finalCountUnreadNotification = getUserUnreadNotification.filter((unread) => unread).length

  return (
    <div className="flex">
      <div className="relative flex">
        {finalCountUnreadNotification > 0 && (
          <div className="absolute -top-2 -right-4">
            <span className="flex items-center justify-center font-normal text-[10px] bg-red-600 w-5 h-5 rounded-full">
              {finalCountUnreadNotification}
            </span>
          </div>
        )}
        <button
          title="Menu"
          className="outline-none"
          type="button"
          onClick={() => {
            setIsDropdown(true)
          }} 
        >
          <RiBellFill className="w-7 h-6 transition ease-linear duration-200 text-[#848484] hover:text-pantone-white" />
        </button>
      </div>
      {isDropdown && (
        <React.Fragment>
          <button 
            className={`${isDropdown ? 'z-50 block fixed inset-0 w-full h-full cursor-default outline-none' : 'hidden'}`}
            type="button"
            onClick={() => {
              setIsDropdown(false)
            }} 
          />
          <div className="absolute top-14 z-50 flex w-full max-w-[23rem]">
            <div className="flex flex-col w-full h-full max-h-[20rem] bg-pantone-darkblack rounded-md overflow-y-auto border border-pantone-white border-opacity-30">
              {host.notificationTo.length === 0 && (
                <div className="flex px-5 py-3">
                  <span className="font-light text-xs">No notification as of now.</span>
                </div>
              )}
              {host.notificationTo.map((notification: any, i: number) => (
                <button
                  key={i}
                  className="flex flex-row items-center justify-between w-full space-x-2 px-3 py-3 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-5"
                  onClick={async () => {
                    // function for reading a notification and read in notification column will be turn to true.
                    await fetch('/api/notifications/read_notification', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ notificationId: notification.id })
                    })
                    // if the type of notification is Likes or Comments it will be redirect to post, but if the notification type is Follows then it will be redirect to user page who follows you.
                    Router.push(`${notification.type === 'Likes' || notification.type === 'Comments' ? `/${notification.notificationTo.username}/posts/${notification.composition.uuid}` : `/${notification.notificationFrom.username}`}`)
                    setIsDropdown(false)
                  }}
                >
                  <div className="flex flex-row items-start w-full">
                    <div className="flex w-full max-w-[3rem]">
                      <img
                        className="w-9 h-9 object-cover rounded-full bg-[#1D1F21]"
                        src={`${ notification.notificationFrom.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${notification.notificationFrom.profile[0].version}/${notification.notificationFrom.profile[0].publicId}.${notification.notificationFrom.profile[0].format}` : `https://ui-avatars.com/api/?name=${notification.notificationFrom.name}&background=2B2F31&color=FF3C3C` }`}
                        alt={`${notification.notificationTo.username}`}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full space-y-0.5">
                      <p className="font-light text-xs text-left space-x-1">
                        <Link href={`/${notification.notificationFrom.username}`}>
                          <a className="font-bold">{ notification.notificationFrom.username }</a>
                        </Link>
                        <span>{ notification.message }</span>
                        <span className="font-bold">{ notification.type === 'Likes' || notification.type === 'Comments' ? notification.composition.title : '' }</span>
                      </p>
                      <div className="font-light text-[10px] text-pantone-white text-opacity-50"><Moment date={ notification.date } fromNow /></div>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="flex">
                      <span className="font-bold text-3xl text-[#BDF705]">&bull;</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default DisplayNotifications
