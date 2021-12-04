import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Guard from '~/layouts/guard'
import DisplayNotifications from '~/components/Notifications/DisplayNotifications'
import prisma from '~/lib/Prisma'

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
  get_notification: any
}

const Notifications: NextPage<TypeProps> = ({ artists, get_notification }) => {

  const { user: host } = useUser({
    redirectTo: "/login",
  })

  if (!host || host.isLoggedIn === false) {
    return (
      <React.Fragment>
        <Head>
          <title>Fixrhythm</title>
        </Head>
        <Guard />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm | Notifications</title>
      </Head>
      <Layout
        host={host}
        get_notification={get_notification}
        artists={artists}
      >
        <DisplayNotifications host={host} />
      </Layout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const artists = await prisma.users.findMany({
    select: {
      id: true,
      uuid: true,
      profile: true,
      account_type: true,
      name: true,
      username: true,
      followedBy: true,
      composition: true
    }
  })

  const get_notification = await prisma.notifications.findMany({
    where: {
      read: false
    },
    select: {
      id: true,
      date: true,
      read: true,
      type: true,
      message: true,
      follows: true,
      composition: {
        select: {
          uuid: true,
          title: true
        }
      },
      notificationFrom: {
        select: {
          uuid: true,
          profile: true,
          username: true,
          name: true
        }
      },
      notificationTo: {
        select: {
          uuid: true,
          profile: true,
          username: true,
          name: true
        }
      }
    }
  })

  return {
    props: {
      artists,
      get_notification
    }
  }
}

export default Notifications