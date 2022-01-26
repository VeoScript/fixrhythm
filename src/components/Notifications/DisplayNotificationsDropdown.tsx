/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
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

const DisplayNotificationsDropdown: React.FC<TypeProps> = ({ host, get_notification }) => {

  const { theme } = useTheme()

  const { pathname } = useRouter()
  
  const [isDropdown, setIsDropdown] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('resize', function ResizeScreen() {
      setIsDropdown(false)
    })
  }, [])

  // fetch unread notifications by logged in user
  const { data: fetchUnreadNotification } = useSWR('/api/user', fetcher, {
    refreshInterval: 1000
  })
  
  // count unread notifications
  const { data: countUnreadNotifications } = useSWR('/api/notifications/get_notification', fetcher, {
    refreshInterval: 1000,
    fallbackData: get_notification
  })

  // passing all notification info to this array
  const countNotifications = new Array

  for (let i = 0; i < countUnreadNotifications.length; i++) {
    countNotifications.push(countUnreadNotifications[i].notificationTo)
  }

  // get user who is the receiver of this notification
  const getUser = countNotifications.find((user: { uuid: string }) => user.uuid === host.uuid)
  
  // get all the notifications
  const getUserUnreadNotification = countNotifications.map((user: { uuid: string }) => user.uuid === host.uuid)

  // get only the unread notifications
  const finalCountUnreadNotification = getUserUnreadNotification.filter((unread) => unread).length

  return (
    <div className="flex">
      {/* notification button for bottom navigation bar */}
      <div className="relative flex md:hidden">
        {finalCountUnreadNotification > 0 && (
          <div className="absolute top-1 -right-4">
            <span className="flex items-center justify-center font-normal text-[10px] bg-red-600 w-5 h-5 rounded-full">
              {finalCountUnreadNotification}
            </span>
          </div>
        )}
        <button
          title="Notifications"
          className="outline-none py-3 md:py-0"
          type="button"
          onClick={() => {
            setIsDropdown(true)
            Router.push('/notifications')
          }} 
        >
          <RiBellFill className={`${ pathname === '/notifications' || isDropdown ? 'text-pantone-darkblack dark:text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-gray dark:hover:text-pantone-white`} />
        </button>
      </div>
      {/* notification button for top navigation bar */}
      <div className="relative hidden md:flex">
        {finalCountUnreadNotification > 0 && (
          <div className="absolute -top-2 -right-4">
            <span className="flex items-center justify-center font-normal text-[10px] bg-red-600 w-5 h-5 rounded-full">
              {finalCountUnreadNotification}
            </span>
          </div>
        )}
        <button
          title="Notifications"
          className="outline-none py-3 md:py-0"
          type="button"
          onClick={() => {
            setIsDropdown(true)
          }} 
        >
          <RiBellFill className={`${ pathname === '/notifications' || isDropdown ? 'text-pantone-darkblack dark:text-pantone-white' : 'text-[#848484]' } w-7 h-6 transition ease-linear duration-200 hover:text-pantone-gray dark:hover:text-pantone-white`} />
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
            <div className="flex flex-col w-full h-full max-h-[20rem] bg-pantone-white dark:bg-pantone-darkblack rounded-md overflow-y-hidden border border-pantone-gray dark:border-pantone-white border-opacity-10 dark:border-opacity-10">
              <div className="flex flex-row items-center justify-between px-3 py-3 border-b border-pantone-gray dark:border-pantone-white border-opacity-5 dark:border-opacity-5">
                <span className="font-bold text-sm text-pantone-darkblack dark:text-pantone-white">Notifications</span>
                {(fetchUnreadNotification.notificationTo && fetchUnreadNotification.notificationTo.length > 0) && (
                  <div className="flex flex-row items-center space-x-1">
                    {finalCountUnreadNotification > 0 && (
                      <button
                        className="flex justify-center font-normal text-[10px] text-center px-2 py-1 rounded-lg bg-pantone-gray bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10"
                        type="button"
                        onClick={async () => {
                          // function for reading a notification and read in notification column will be turn to true.
                          await fetch('/api/notifications/read_all_notification', {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ notificationToId: getUser.uuid })
                          })
                        }}
                      >
                        Mark all as read
                      </button>
                    )}
                    <Link href="/notifications">
                      <a className="flex justify-center font-normal text-[10px] text-center px-2 py-1 rounded-lg bg-pantone-gray bg-opacity-80 dark:bg-opacity-100 text-pantone-white transition ease-linear duration-200 hover:bg-pantone-darkblack hover:bg-opacity-60 dark:hover:bg-pantone-white dark:hover:bg-opacity-10">
                        See all
                      </a>
                    </Link>
                  </div>
                )}
              </div>
              {(fetchUnreadNotification.notificationTo && fetchUnreadNotification.notificationTo.length === 0) && (
                <div className="flex justify-center px-3 py-3">
                  <span className="font-light text-xs">No notification as of now.</span>
                </div>
              )}
              <div className="relative flex flex-col w-full h-full overflow-x-hidden overflow-y-auto">
                {fetchUnreadNotification.notificationTo && fetchUnreadNotification.notificationTo.map((notification: any, i: number) => (
                  <React.Fragment key={i}>
                    <div className="outer relative border border-b border-pantone-gray dark:border-pantone-white border-opacity-5 dark:border-opacity-5 bg-pantone-white dark:bg-pantone-darkblack  hover:bg-pantone-gray hover:bg-opacity-5 dark:hover:bg-pantone-white dark:hover:bg-opacity-5">
                      <Link href={`${notification.type === 'Likes' || notification.type === 'Comments' ? `/${notification.notificationTo.username}/posts/${notification.composition.uuid}` : `/${notification.notificationFrom.username}`}`}>
                        <a 
                          className="absolute left-0 top-0 bottom-0 right-0"
                          onClick={async () => {
                            // function for reading a notification and read in notification column will be turn to true.
                            await fetch('/api/notifications/read_notification', {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ notificationId: notification.id })
                            })
                            setIsDropdown(false)
                          }}
                        ></a>
                      </Link>
                      <div className="inner relative z-[1] pointer-events-none text-xs flex flex-row items-start justify-between w-full p-3 space-x-2">
                        <Link href={`/${notification.notificationFrom.username}`}>
                          <a 
                            className="flex w-full max-w-[2.5rem] pointer-events-auto"
                            onClick={() => {
                              setIsDropdown(false)
                            }}
                          >
                            <img
                              className="inline z-[3] w-9 h-9 object-cover rounded-full border-[#CBD0E2] dark:bg-[#1D1F21]"
                              src={`${ notification.notificationFrom.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${notification.notificationFrom.profile[0].version}/${notification.notificationFrom.profile[0].publicId}.${notification.notificationFrom.profile[0].format}` : `https://ui-avatars.com/api/?name=${notification.notificationFrom.name}&background=${theme === 'dark' ? '2B2F31' : 'CBD0E2'}&color=${theme === 'dark' ? 'FF3C3C' : '333333'}` }`}
                              alt={`${notification.notificationTo.username}`}
                            />
                          </a>
                        </Link>
                        <div className="flex flex-col w-full">
                          <div className="space-x-1 w-full text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50">
                            <Link href={`/${notification.notificationFrom.username}`}>
                              <a 
                                className="inline pointer-events-auto font-bold hover:underline"
                                onClick={() => {
                                  setIsDropdown(false)
                                }}
                              >
                                { notification.notificationFrom.username }
                              </a>
                            </Link>
                            <span className="inline">
                              { notification.message }
                              <span className="font-bold text-red-500">&nbsp;{ notification.type === 'Likes' || notification.type === 'Comments' ? notification.composition.title : '' }</span>
                            </span>
                          </div>
                          <div className="font-light text-[10px] text-pantone-darkblack dark:text-pantone-white text-opacity-100 dark:text-opacity-50"><Moment date={ notification.date } fromNow /></div>
                        </div>
                        {!notification.read && (
                          <div className="flex">
                            <span className="font-bold text-3xl text-[#BDF705]">&bull;</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default DisplayNotificationsDropdown
