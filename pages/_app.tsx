import Script from 'next/script'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
