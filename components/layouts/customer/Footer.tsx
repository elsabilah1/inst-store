import { PhoneIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary px-3 text-white md:px-0">
      <div className="mx-auto mt-12 mb-16 max-w-screen-md shadow-sm">
        <div className="grid gap-6 font-bold capitalize md:grid-cols-4">
          <div className="space-y-2">
            <h1>shop by categories</h1>
            <div className="text-sm font-normal">
              <p>Guitar</p>
              <p>Guitar</p>
              <p>Guitar</p>
            </div>
          </div>
          <div className="col-span-2 space-y-3 md:mx-auto">
            <h1>contact us</h1>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              <p className="text-sm font-normal">+62 85674394823</p>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <a>
                  <Image
                    className="cursor-pointer"
                    src="/images/icon_facebook.svg"
                    height={24}
                    width={24}
                    alt="facebook"
                  />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image
                    className="cursor-pointer"
                    src="/images/icon_instagram.svg"
                    height={24}
                    width={24}
                    alt="instagram"
                  />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image
                    className="cursor-pointer"
                    src="/images/icon_twitter.svg"
                    height={24}
                    width={24}
                    alt="twitter"
                  />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <Image
                    className="cursor-pointer"
                    src="/images/icon_mail.svg"
                    height={24}
                    width={24}
                    alt="mail"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div>
            <h1 className="mb-2 text-sm">&copy; InstStore 2022</h1>
            <Link href="/">
              <a>
                <Image
                  src="/images/logo.png"
                  className="cursor-pointer"
                  alt="logo"
                  width={84}
                  height={24}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
