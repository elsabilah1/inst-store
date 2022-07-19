/* eslint-disable no-unused-vars */
import { Get } from '@/utils/axios'
import { PhoneIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MDSpinner from 'react-md-spinner'
const appID = process.env.NEXT_PUBLIC_COMETCHAT_APP_ID
const region = process.env.NEXT_PUBLIC_COMETCHAT_REGION
const AUTH_KEY = process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY
const wid = process.env.NEXT_PUBLIC_COMETCHAT_WID

declare global {
  interface Window {
    CometChatWidget: any
  }
}

const Footer: React.FC = () => {
  const router = useRouter()
  const { data: session }: any = useSession()
  const [load, setLoad] = useState(false)
  const [categories, setCategories] = useState<any>()
  const fetchCategories = async () => {
    const data = await Get('/products/categories')
    setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (session?.role === 0) {
      setLoad(true)
      window.CometChatWidget.init({
        appID: appID,
        appRegion: region,
        authKey: AUTH_KEY,
      }).then(async () => {
        console.log('Initialization completed successfully')
        //You can now call login function.
        let uid = session.id

        window.CometChatWidget.login({
          uid: uid,
        })
          .then(() => {
            window.CometChatWidget.launch({
              widgetID: wid,
              roundedCorners: 'true',
              docked: 'true',
              height: '300px',
              width: '400px',
              defaultID: process.env.NEXT_PUBLIC_AGENT_ID,
              defaultType: 'user', //user or group
            })
            setLoad(false)
          })
          .catch(() => {
            const user = new window.CometChatWidget.CometChat.User(uid)
            user.setName(session.user.name)
            user.setAvatar(session.user.image)

            window.CometChatWidget.createOrUpdateUser(user).then(() => {
              // Proceed with user login
              window.CometChatWidget.login({
                uid: uid,
              }).then(() => {
                // Proceed with launching your Chat Widget
                window.CometChatWidget.launch({
                  widgetID: wid,
                  roundedCorners: 'true',
                  docked: 'true',
                  height: '300px',
                  width: '400px',
                  defaultID: process.env.NEXT_PUBLIC_AGENT_ID,
                  defaultType: 'user', //user or group
                })
                setLoad(false)
              })
            })
          })
      })
    }
  }, [session])

  return (
    <footer className="bg-primary px-3 text-white md:px-0">
      <div className="mx-auto mt-12 mb-16 max-w-screen-md shadow-sm">
        <div className="grid gap-6 font-bold capitalize md:grid-cols-4">
          <div className="space-y-2">
            <h1>shop by categories</h1>
            {categories?.slice(0, 5).map((item: any) => (
              <Link
                key={item._id}
                href={`/products?cat=${item.name}`}
                as="/products"
              >
                <a className="block text-sm font-normal">{item.name}</a>
              </Link>
            ))}
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
            <button
              className="bg-secondary py-1 px-4 text-xs font-bold tracking-widest text-primary md:text-sm"
              onClick={() => router.push('/')}
            >
              inst-store
            </button>
          </div>
        </div>
      </div>
      {load && (
        <div className="fixed bottom-0 right-0 m-10">
          <MDSpinner />
        </div>
      )}
    </footer>
  )
}

export default Footer
