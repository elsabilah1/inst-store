import { Button, Navbar, Profile } from '@/components/utility'
import { MenuIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const CustomerMenu = [
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
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary text-white shadow-sm transition-all">
        <div className="mx-auto max-w-screen-lg items-center gap-9 space-y-6 px-3 py-5 md:flex md:space-y-0">
          <div className="flex">
            <button onClick={() => router.push('/')}>
              <Image
                className="cursor-pointer"
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={36}
              />
            </button>
            <div className="ml-auto md:hidden">
              <button
                className="block h-8 w-8 text-white"
                onClick={() => setNavOpen(!navOpen)}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
          <div
            className={`${
              navOpen ? 'flex flex-col' : 'hidden'
            } flex-1 transition-all md:flex md:flex-row md:items-center`}
          >
            <Navbar menu={CustomerMenu} />
            {data ? <Profile /> : <AuthButton />}
          </div>
        </div>
      </header>
      {router.pathname === '/' && (
        <div className="relative h-[50vh]">
          <Image
            src="/images/hero-bg.jpg"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            priority={true}
            alt="hero"
          />
          <div className="absolute h-full w-full bg-primary/30 p-4"></div>
          <div className="absolute bottom-1/3 space-y-3 px-3 md:right-56">
            <h1 className="text-2xl font-bold text-white md:text-4xl md:font-medium">
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
