import type { GetServerSideProps, NextPage } from 'next'
import withSession from '~/lib/Session'
import React from 'react'
import Head from 'next/head'
import Auth from '~/layouts/auth'
import ResetPassword from '~/components/AuthForms/ResetPassword'

interface TypeProps {
  token: any
}

const ResetPasswordPage: NextPage<TypeProps> = ({ token }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Reset Password | Fixrhythm</title>
      </Head>
      <Auth>
        <ResetPassword token={token} />
      </Auth>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async function (context: any) {
  const { token } = context.query
  const user = context.req.session.get('user')
  
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { token }
  }
})

export default ResetPasswordPage