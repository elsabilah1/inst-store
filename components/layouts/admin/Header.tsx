import { Button, Profile } from '@/components/utility'
import { ChatIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()
  const { data } = useSession()

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-sm transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3">
        {data?.role === 1 && (
          <div className="flex gap-3">
            <div className="hidden md:block">
              <Button
                variant="primary"
                onClick={() => router.push('/admin/register?for=supplier')}
              >
                Register Supplier
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={() => router.push('/admin/register?for=admin')}
            >
              Register Admin
            </Button>
          </div>
        )}

        <div
          className="flex gap-5"
          onClick={() => router.replace('/admin/chat')}
        >
          <button>
            <ChatIcon className="h-6 w-6 text-white" />
          </button>
          <Profile />
        </div>
      </div>
    </header>
  )
}

export default Header
