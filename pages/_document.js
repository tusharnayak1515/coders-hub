import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <div id='modal-root'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}