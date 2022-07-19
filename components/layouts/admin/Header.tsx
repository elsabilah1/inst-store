import { Button, Profile } from '@/components/utility'
import { ChatIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-sm transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3">
        <Button variant="primary">Register Supplier</Button>
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
