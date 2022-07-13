import { Button, Navbar, Profile } from '@/components/utility'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const CustomerMenu = [
  {
    to: '/',
    title: 'home',
  },
  {
    to: '/products',
    title: 'products',
  },
  {
    to: '/about',
    title: 'about us',
  },
]

const Header: React.FC = () => {
  const { data } = useSession()
  const router = useRouter()

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary text-white shadow">
        <div className="mx-auto max-w-screen-lg items-center gap-9 space-y-6 p-3 md:flex md:space-y-0">
          <div className="flex w-full items-center justify-between">
            <button className="flex" onClick={() => router.push('/')}>
              <Image src="/images/logo.png" alt="logo" width={84} height={24} />
            </button>

            <div className="md:hidden">
              {data ? <Profile /> : <AuthButton />}
            </div>

            <div className="hidden flex-1 items-center justify-between md:flex">
              <Navbar menu={CustomerMenu} />
              {data ? <Profile /> : <AuthButton />}
            </div>
          </div>
        </div>
      </header>
      {router.pathname === '/' && (
        <div className="relative h-[70vh] bg-primary">
          <Image
            layout="fill"
            alt="hero"
            src="/images/hero-bg.jpg"
            className="object-cover object-top opacity-40"
            priority
          />
          <div className="absolute top-1/2 space-y-3 px-3 md:left-1/2 md:-translate-y-1/2">
            <h1 className="text-xl font-semibold text-white md:text-4xl md:font-semibold">
              Find the best gear <br /> at the great low price now!
            </h1>
            <Button
              variant="secondary"
              onClick={() =>
                data ? router.push('/products') : router.push('/register')
              }
            >
              shop now
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header

const AuthButton = () => {
  const router = useRouter()

  return (
    <div className="ml-auto mt-3 space-x-4 md:mt-0">
      <Button variant="primary" onClick={() => router.push('/login')}>
        sign in
      </Button>
      <Button variant="secondary" onClick={() => router.push('/register')}>
        register
      </Button>
    </div>
  )
}
