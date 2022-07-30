import { Navbar } from '@/components/utility'
import { useSession } from 'next-auth/react'
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
  {
    to: '/admin/suppliers',
    title: 'supplier list',
  },
]

export const SupplierMenu = [
  {
    to: '/admin/products',
    title: 'products',
  },
]

const Sidebar: React.FC = () => {
  const router = useRouter()
  const { data } = useSession()

  return (
    <div className="bg-primary text-white shadow-sm">
      <div className="flex h-16 items-center pl-3">
        <button
          className="bg-secondary py-1 px-4 text-xs font-bold tracking-widest text-primary md:text-sm"
          onClick={() => router.push('/admin')}
        >
          inst-store
        </button>
      </div>
      <Navbar menu={data?.role === 1 ? AdminMenu : SupplierMenu} sidebar />
    </div>
  )
}

export default Sidebar
