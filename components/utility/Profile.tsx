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

const Profile: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex items-center gap-3">
      {session?.role === 0 && (
        <button className="relative" onClick={() => router.push('/cart')}>
          <div className="absolute -bottom-1 -left-1 grid h-4 w-4 place-items-center rounded-full border border-secondary bg-white text-xs text-primary">
            0 {/* {state.cart.cart.length} */}
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
                <div className="w-40 overflow-hidden rounded-lg bg-white py-4 text-primary shadow-lg">
                  <a
                    onClick={() => router.push('/me')}
                    className="flow-root cursor-pointer py-2 pl-3 transition-all  hover:text-primary/40 focus:outline-none active:bg-primary/50 active:text-primary"
                  >
                    <span className="flex items-center">
                      <span className="flex gap-3 text-sm font-medium">
                        <UserIcon className="h-5 w-5 text-info" /> Profile
                      </span>
                    </span>
                  </a>
                  <a
                    onClick={() => signOut()}
                    className="flow-root cursor-pointer py-2 pl-3 transition-all  hover:text-primary/40 focus:outline-none active:bg-primary/50 active:text-primary"
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
