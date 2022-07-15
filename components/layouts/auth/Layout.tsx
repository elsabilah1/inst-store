import { Alert, Loader } from '@/components/utility'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useAuth } from 'store/auth'

interface IAuthLayout {
  children: ReactNode
  pageTitle: string
}

const AuthLayout: React.FC<IAuthLayout> = ({ children, pageTitle }) => {
  const router = useRouter()
  const { loading, error, success, reset } = useAuth()

  if (error || success) {
    setTimeout(() => {
      reset()
    }, 4000)
  }

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
      <div className="flex min-h-screen flex-col">
        <header className="bg-primary text-white shadow-sm">
          <div className="mx-auto flex max-w-screen-lg items-center p-3">
            <button
              className="bg-secondary py-1 px-4 text-xs font-bold tracking-widest text-primary md:text-sm"
              onClick={() => router.push('/')}
            >
              inst-store
            </button>{' '}
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center bg-primary/40">
          {children}
        </main>
        {loading && <Loader />}
        <Alert error={error} success={success} />
      </div>
    </SessionProvider>
  )
}

export default AuthLayout
