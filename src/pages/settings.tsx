import type { GetStaticProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import useUser from '~/lib/useUser'
import Layout from '~/layouts/default'
import Guard from '~/layouts/guard'
import AccountSettings from '~/components/AccountSettings'
import prisma from '~/lib/Prisma'

interface TypeProps {
  artists: any
}

const Settings: NextPage<TypeProps> = ({ artists }) => {

  const { user: host } = useUser({
    redirectTo: "/login",
  })

  if (!host || host.isLoggedIn === false) {
    return (
      <React.Fragment>
        <Head>
          <title>Account Settings</title>
        </Head>
        <Guard />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Fixrhythm | Home</title>
      </Head>
      <Layout
        host={host}
        artists={artists}
      >
        <AccountSettings host={host} />
      </Layout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const artists = await prisma.users.findMany({
    select: {
      id: true,
      uuid: true,
      account_type: true,
      name: true,
      username: true,
      followedBy: true,
    }
  })

  return {
    props: {
      artists
    }
  }
}

export default Settings