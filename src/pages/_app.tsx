import React from 'react'
import NextNProgress from '~/lib/NextProgressbar'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '~/styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <NextNProgress />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
