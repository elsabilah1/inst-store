import { Alert, Loader } from '@/components/utility'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useAuth } from 'store/auth'

interface IAuthLayout {
  children: ReactNode
  pageTitle: string
}

const AuthLayout: React.FC<IAuthLayout> = ({ children, pageTitle }) => {
  const { loading, error, success, reset } = useAuth()

  if (error || success) {
    setTimeout(() => {
      reset()
    }, 4000)
  }

  return (
    <>
      <Head>
        <title>Store | {pageTitle}</title>
      </Head>
      <div className="flex min-h-screen flex-col">
        <header className="bg-primary text-white shadow-sm">
          <div className="mx-auto flex max-w-screen-lg items-center py-5">
            <Link href="/">
              <a>
                <Image
                  className="cursor-pointer"
                  src="/images/logo.png"
                  alt="logo"
                  width={100}
                  height={36}
                />
              </a>
            </Link>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center bg-primary/40">
          {children}
        </main>
        {loading && <Loader />}
        <Alert error={error} success={success} />
      </div>
    </>
  )
}

export default AuthLayout
