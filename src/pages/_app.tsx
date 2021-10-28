import React from 'react'
import NextNProgress from '~/lib/NextProgressbar'
import type { AppProps } from 'next/app'
import '~/styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <NextNProgress />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
