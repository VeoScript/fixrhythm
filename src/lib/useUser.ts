import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function useUser({
  redirectAuthorized = "/",
  redirectUnauthorized = "/login",
} = {}) {

  const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher, {
    refreshInterval: 1000
  })

  useEffect(() => {
    if(user?.isLoggedIn) {
      Router.push(redirectAuthorized)
    } else {
      Router.push(redirectUnauthorized)
    }
  }, [user, redirectAuthorized, redirectUnauthorized])

  return { user, mutateUser }
}