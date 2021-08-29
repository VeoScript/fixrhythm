import '~/styles/tailwind.css'
import NextNProgress from '~/lib/NextProgressbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
