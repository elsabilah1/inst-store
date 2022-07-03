import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

interface ICustomerLayout {
  children: ReactNode
  pageTitle: string
}

const CustomerLayout: React.FC<ICustomerLayout> = ({ children, pageTitle }) => {
  return (
    <SessionProvider>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col">
        <Header />
        <main className="flex-grow bg-primary/40 pb-2">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  )
}

export default CustomerLayout
