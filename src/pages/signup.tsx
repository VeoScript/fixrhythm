import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import withSession from '~/lib/Session'
import React from 'react'
import Head from 'next/head'
import Guard from '~/layouts/guard'
import SignupForm from '~/components/AuthForms/SignupForm'

const SignUp: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Create Account | Fixrhythm</title>
      </Head>
      <Guard>
        <SignupForm />
      </Guard>
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

  return {
    props: {}
  }
})

export default SignUp