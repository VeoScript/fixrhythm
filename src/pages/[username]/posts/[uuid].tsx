import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import withSession from '~/lib/Session'
import prisma from '~/lib/Prisma'
import DisplayPostAndComment from '~/components/DisplayPostAndComment'

interface TypeProps {
  user: any
  host: any
  uuid: any
  artists: any
  composition: any
  get_notification: any
}

const PublishedPostDisplay: NextPage<TypeProps> = ({ user, host, uuid, artists, composition, get_notification }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{ composition.title }</title>
        <meta name="description" content={`${composition.title}`} />
        <meta property="og:title" content={`Fixrhythm | ${composition.title}`} />
        <meta property="og:description" content={`${composition.title}`} />
        <meta property="og:url" content={`https://www.fixrhythm.tk/${composition.user.username}/posts/${composition.title}`} />
        <meta property="og:type" content="website" />
      </Head>
      <Layout
        user={user}
        host={host}
        artists={artists}
        get_notification={get_notification}
      >
        <DisplayPostAndComment
          user={user}
          host={host}
          uuid={uuid}
          composition={composition}
        />
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async function (context: any) {
  const user_session = context.req.session.get('user')
  const { username, uuid } = context.query
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
      profile: true,
      likes: true,
      comments: true,
      bookmarks: true,
      composition: true,
      followedBy: true,
      following: true,
      notificationTo: {
        orderBy: [
          {
            id: 'desc'
          }
        ],
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
      }
    }
  })

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

  const composition = await prisma.compositions.findFirst({
    where: {
      uuid: uuid
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
      pinned: true,
      bookmarks: true,
      likes: true,
      notifications: {
        select: {
          id: true
        }
      },
      comments: {
        select: {
          id: true,
          uuid: true,
          content: true,
          date: true,
          user: {
            select: {
              uuid: true,
              profile: true,
              name: true,
              username: true,
              account_type: true
            }
          }
        }
      }
    }
  })

  // check if the post is equal to url query username and the owner of the particular post; if not then it will redirect to profile page...
  if (username !== composition?.user.username) {
    return {
      redirect: {
        destination: `/${username}`,
        permanent: false
      }
    }
  }

  // this code will hide the draft posts to visited post page display and other users loggedin...
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
      uuid,
      artists,
      composition,
      get_notification
    }
  }
})

export default PublishedPostDisplay