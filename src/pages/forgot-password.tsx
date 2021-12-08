import type { GetServerSideProps, NextPage } from 'next'
import withSession from '~/lib/Session'
import prisma from '~/lib/Prisma'
import React from 'react'
import Head from 'next/head'
import Auth from '~/layouts/auth'
import ForgotPassword from '~/components/AuthForms/ForgotPassword'

interface TypeProps {
  found_user: any
}

const ForgotPasswordPage: NextPage<TypeProps> = ({ found_user }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Forgot Password | Fixrhythm</title>
      </Head>
      <Auth>
        <ForgotPassword found_user={found_user} />
      </Auth>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async function (context: any) {
  const user = context.req.session.get('user')

  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const found_user = await prisma.users.findMany({
    select: {
      uuid: true,
      username: true,
      name: true,
      email: true
    }
  })

  return {
    props: { found_user }
  }
})

export default ForgotPasswordPage