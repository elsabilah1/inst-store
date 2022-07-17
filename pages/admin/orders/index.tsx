import OrderStatusBadge from '@/components/badges/OrderStatusBadge'
import AdminLayout from '@/components/layouts/admin/Layout'
import { Button } from '@/components/utility'
import { Get } from '@/utils/axios'
import {
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  PencilAltIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import { NextPageWithLayout } from '../../page'

const AdminOrders: NextPageWithLayout = () => {
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(
    `/admin/orders?page=${page}&limit=10`,
    (url: any) => Get(url).then((res: any) => res)
  )

  return (
    <section className="mt-6">
      <table className="w-full">
        <thead className="bg-primary text-white">
          <tr className="font-semibold capitalize">
            <td className="p-3">no</td>
            <td>order id</td>
            <td>order date</td>
            <td>total price</td>
            <td>payment method</td>
            <td>status</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {!data && !error ? (
            <tr className="bg-white text-sm">
              <td className=" col-span-full px-4 py-2" colSpan={6}>
                Loading...
              </td>
            </tr>
          ) : (
            data?.orders?.map((item: any, idx: any) => (
              <tr key={item._id} className="bg-white text-sm">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{item._id}</td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </td>
                <td className="px-4 py-2">Rp. {item.total.toLocaleString()}</td>
                <td className="px-4 py-2">
                  {item.paymentMethod.replace('_', ' ')}
                </td>
                <td className="px-4 py-2">
                  <OrderStatusBadge status={item.status.title} />
                </td>
                <td className="px-4 py-2">
                  <Link href={`/admin/orders/${item._id}`}>
                    <a>
                      <PencilAltIcon className="h-5 w-5" />
                    </a>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-end">
        <Button
          variant="primary"
          size="auto"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <ArrowSmLeftIcon className="h-5 w-5" />
        </Button>
        <div className="mx-2 rounded bg-white px-3 py-1 text-xl shadow">
          {page}
        </div>
        <Button
          variant="primary"
          size="auto"
          onClick={() => setPage(page + 1)}
          disabled={data?.result !== 10 || data?.result * page === data?.length}
        >
          <ArrowSmRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}

export default AdminOrders

AdminOrders.getLayout = (page) => {
  return <AdminLayout pageTitle="Orders">{page}</AdminLayout>
}
