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
            <div className="outer relative border border-b border-pantone-white border-opacity-5 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-5">
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
                  }}
                ></a>
              </Link>
              <div className="inner relative z-[1] pointer-events-none text-xs flex flex-row items-start justify-between w-full p-3 space-x-2">
                <Link href={`/${notification.notificationFrom.username}`}>
                  <a className="flex w-full max-w-[2.5rem] pointer-events-auto">
                    <img
                      className="inline z-[3] w-9 h-9 object-cover rounded-full bg-[#1D1F21]"
                      src={`${ notification.notificationFrom.profile[0] ? `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/v${notification.notificationFrom.profile[0].version}/${notification.notificationFrom.profile[0].publicId}.${notification.notificationFrom.profile[0].format}` : `https://ui-avatars.com/api/?name=${notification.notificationFrom.name}&background=2B2F31&color=FF3C3C` }`}
                      alt={`${notification.notificationTo.username}`}
                    />
                  </a>
                </Link>
                <div className="flex flex-col w-full">
                  <div className="space-x-1 w-full">
                    <Link href={`/${notification.notificationFrom.username}`}>
                      <a className="inline pointer-events-auto font-bold hover:underline">{ notification.notificationFrom.username }</a>
                    </Link>
                    <span className="inline">
                      { notification.message }
                      <span className="font-bold text-red-500">&nbsp;{ notification.type === 'Likes' || notification.type === 'Comments' ? notification.composition.title : '' }</span>
                    </span>
                  </div>
                  <div className="font-light text-[10px] text-pantone-white text-opacity-50"><Moment date={ notification.date } fromNow /></div>
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
    </React.Fragment>
  )
}

export default DisplayNotifications