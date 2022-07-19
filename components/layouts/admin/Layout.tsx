import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface IAdminLayout {
  children: ReactNode
  pageTitle: string
  hideTitle?: boolean
}

const AdminLayout: React.FC<IAdminLayout> = ({
  children,
  pageTitle,
  hideTitle,
}) => {
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

      <div className="mx-auto flex min-h-screen max-w-screen-xl">
        <div className="sticky top-0 hidden h-screen flex-1 bg-primary md:block">
          <Sidebar />
        </div>
        <div className="flex flex-[8] flex-col">
          <Header />
          <div className="flex-1 bg-primary/70 py-6 px-12">
            {!hideTitle && (
              <h1 className="text-3xl font-bold text-secondary">{pageTitle}</h1>
            )}
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
export default AdminLayout
