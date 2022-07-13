import OrderStatusBadge from '@/components/badges/OrderStatusBadge'
import AdminLayout from '@/components/layouts/admin/Layout'
import { Get } from '@/utils/axios'
import { PencilAltIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async () => {
  const res: any = await Get('/admin/orders')
  const orders = res.orders

  return {
    props: { orders },
  }
}

const AdminOrders: NextPageWithLayout = ({ orders }: any) => {
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
          {orders?.map((item: any, idx: any) => (
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
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default AdminOrders

AdminOrders.getLayout = (page) => {
  return <AdminLayout pageTitle="Orders">{page}</AdminLayout>
}
