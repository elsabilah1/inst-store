import { Navbar } from '@/components/utility'
import Image from 'next/image'
import Link from 'next/link'

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
  return (
    <div className="bg-primary text-white shadow-sm">
      <div className="flex h-20 items-center pl-3">
        <Link href="/">
          <a>
            <Image
              className="cursor-pointer"
              src="/images/logo.png"
              width={100}
              height={36}
              alt="logo"
            />
          </a>
        </Link>
      </div>
      <Navbar menu={AdminMenu} sidebar />
    </div>
  )
}

export default Sidebar
