/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Moment from 'react-moment'

interface TypeProps {
  host: any
}

const DisplayNotifications: React.FC<TypeProps> = ({ host }) => {
  return (
    <React.Fragment>
      <div className="flex flex-row items-center justify-between px-3 py-3 border-b border-pantone-white border-opacity-5">
        <span className="font-bold text-sm text-pantone-white">Notifications</span>
        {(host.notificationTo && host.notificationTo.length > 0) && (
          <React.Fragment>
            <button
              className="flex justify-center font-normal text-[10px] text-center px-2 py-1 rounded-lg bg-pantone-black text-pantone-white transition ease-linear duration-200 hover:bg-pantone-white hover:bg-opacity-10"
              type="button"
              onClick={async () => {
                // function for reading a notification and read in notification column will be turn to true.
                await fetch('/api/notifications/read_all_notification', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ notificationToId: host.uuid })
                })
              }}
            >
              Mark all as read
            </button>
          </React.Fragment>
        )}
      </div>
      <div className="flex flex-col w-full h-full overflow-y-auto">
        {host.notificationTo && host.notificationTo.map((notification: any, i: number) => (
          <React.Fragment key={i}>
            <button
              className="flex flex-row items-center justify-between w-full space-x-2 px-3 py-3 border-b border-pantone-white border-opacity-5 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-5"
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
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  )
}

export default DisplayNotifications