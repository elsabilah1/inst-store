import { Navbar } from '@/components/utility'
import { useRouter } from 'next/router'

export const AdminMenu = [
  {
    to: '/admin',
    title: 'dashboard',
  },
  {
    to: '/admin/orders',
    title: 'orders',
  },
  {
    to: '/admin/products',
    title: 'products',
  },
  {
    to: '/admin/customers',
    title: 'customer list',
  },
]

const Sidebar: React.FC = () => {
  const router = useRouter()
  return (
    <div className="bg-primary text-white shadow-sm">
      <div className="flex h-16 items-center pl-3">
        <button
          className="bg-secondary py-1 px-4 text-xs font-bold tracking-widest text-primary md:text-sm"
          onClick={() => router.push('/')}
        >
          inst-store
        </button>
      </div>
      <Navbar menu={AdminMenu} sidebar />
    </div>
  )
}

export default Sidebar
