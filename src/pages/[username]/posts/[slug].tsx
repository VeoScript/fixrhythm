import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import DefaultErrorPage from 'next/error'
import Layout from '~/layouts/default'
import withSession from '~/lib/Session'
import prisma from '~/lib/Prisma'
import DisplayPostAndComment from '~/components/DisplayPostAndComment'

interface TypeProps {
  user: any
  host: any
  slug: any
  artists: any
  composition: any
}

const PublishedPostDisplay: NextPage<TypeProps> = ({ user, host, slug, artists, composition }) => {

  if((user === '' && composition.status === 'Draft') || (!host || host.username !== composition.user.username && composition.status === 'Draft')) {
    return <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  }

  return (
    <React.Fragment>
      <Head>
        <title>{ composition.title }</title>
      </Head>
      <Layout
        user={user}
        host={host}
        artists={artists}
      >
        <DisplayPostAndComment
          user={user}
          host={host}
          slug={slug}
          composition={composition}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async function (context: any) {
  const user_session = context.req.session.get('user')
  const { username, slug } = context.query
  let user

  if(user_session) {
    user = username
  } else {
    user = ''
  }

  const host = await prisma.users.findFirst({
    where: {
      username:  user_session ? user_session.username : username
    },
    include: {
      likes: true,
      comments: true,
      bookmarks: true,
      composition: true,
      followedBy: true,
      following: true
    }
  })

  const artists = await prisma.users.findMany({
    select: {
      id: true,
      uuid: true,
      account_type: true,
      name: true,
      username: true,
      followedBy: true
    }
  })

  const composition = await prisma.compositions.findFirst({
    where: {
      slug: {
        contains: slug,
        mode: 'insensitive'
      }
    },
    include: {
      user: {
        select: {
          uuid: true,
          account_type: true,
          profile: true,
          name: true,
          username: true
        }
      },
      bookmarks: true,
      likes: true,
      comments: true
    }
  })

  if ((user === '' && composition?.status === 'Draft') || (!host || host.username !== composition?.user.username && composition?.status === 'Draft')) {
    return {
      redirect: {
        destination: `/${username}`,
        permanent: false
      }
    }
  }

  return {
    props: {
      user,
      host,
      slug,
      artists,
      composition
    }
  }
})

export default PublishedPostDisplay