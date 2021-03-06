import { Popover, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LogoutIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useCart } from 'store/cart'
import { AdminMenu } from '../layouts/admin/Sidebar'
import { CustomerMenu } from '../layouts/customer/Header'
import Navbar from './Navbar'

const Profile: React.FC = () => {
  const { data: session } = useSession()
  const { totalqty, deleteCartAll } = useCart()
  const router = useRouter()

  return (
    <div className="ml-auto flex items-center gap-3">
      {session?.role === 0 && (
        <button className="relative" onClick={() => router.push('/me/cart')}>
          <div className="absolute -bottom-1 -left-1 grid h-4 w-4 place-items-center rounded-full border border-secondary bg-white text-xs text-primary">
            {totalqty}
          </div>
          <ShoppingBagIcon className="h-6 w-6 text-secondary" />
        </button>
      )}
      <Popover className="relative z-50">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group flex items-center gap-3 text-sm text-white hover:text-opacity-100 focus:outline-none`}
            >
              {session?.user && (
                <>
                  <Image
                    src={session.user.image!}
                    width={30}
                    height={30}
                    className="rounded-full bg-white/75"
                    alt="avatar"
                    priority
                  />
                  <p className="capitalize">{session.user.name}</p>
                </>
              )}
              {open ? (
                <ChevronUpIcon
                  className={`${open ? '' : 'text-opacity-70'}
                   h-5 w-5 text-white transition-all group-hover:text-opacity-80`}
                />
              ) : (
                <ChevronDownIcon
                  className={`${open ? '' : 'text-opacity-70'}
                  h-5 w-5 text-white transition-all group-hover:text-opacity-80`}
                />
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 mt-2">
                <div className="w-40 overflow-hidden rounded-lg border-2 border-white bg-primary py-4 text-white shadow-lg">
                  <div className="md:hidden">
                    <Navbar
                      menu={session?.role === 0 ? CustomerMenu : AdminMenu}
                    />
                  </div>
                  <a
                    onClick={() =>
                      router.push(session?.role === 0 ? '/me' : '/admin/me')
                    }
                    className="flow-root cursor-pointer py-2 pl-3 transition-all  hover:text-secondary focus:outline-none active:bg-white/70 active:text-primary"
                  >
                    <span className="flex items-center">
                      <span className="flex gap-3 text-sm font-medium">
                        <UserIcon className="h-5 w-5 text-info" /> Profile
                      </span>
                    </span>
                  </a>
                  <a
                    onClick={() => {
                      deleteCartAll()
                      signOut()
                    }}
                    className="flow-root cursor-pointer py-2 pl-3 transition-all  hover:text-secondary focus:outline-none active:bg-white/70 active:text-primary"
                  >
                    <span className="flex items-center">
                      <span className="flex gap-3 text-sm font-medium">
                        <LogoutIcon className="h-5 w-5 text-danger" /> Logout
                      </span>
                    </span>
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default Profile
