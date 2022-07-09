import OrderDetailStatusBadgeAdmin from '@/components/badges/OrderDetailStatusBadgeAdmin'
import OrderStatusBadge from '@/components/badges/OrderStatusBadge'
import OrderDetailCard from '@/components/cards/OrderDetailCard'
import AdminLayout from '@/components/layouts/admin/Layout'
import { Get } from '@/utils/axios'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res: any = await Get(`/admin/orders/${ctx.query.id}`)
  const data = res.orders

  return {
    props: { data },
  }
}

const AdminDetailOrder: NextPageWithLayout = ({ data }: any) => {
  return (
    <section className="mt-6 grid grid-cols-5">
      <div className="col-span-5 mb-6 grid grid-cols-5 gap-3">
        <div className="col-span-3 rounded bg-white p-6 text-sm capitalize">
          <div className="grid grid-cols-2">
            <div className="grid gap-3">
              <span>
                <p className="font-bold">name</p>
                <p>{data.user.name}</p>
              </span>
              <span>
                <p className="font-bold">phone number</p>
                <p>{data.user.phone}</p>
              </span>
              <span>
                <p className="font-bold">address</p>
                <p>{data.user.address}</p>
              </span>
            </div>
            <div className="grid gap-3">
              <span>
                <p className="font-bold">total price</p>
                <p>rp. {data.order.total.toLocaleString()},-</p>
              </span>
              <span>
                <p className="font-bold">payment method</p>
                <p>{data.order.paymentMethod.replace('_', ' ')}</p>
              </span>
              <span>
                <p className="mb-1 font-bold">status</p>
                <p>
                  <OrderStatusBadge status={data.order.status.title} />
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 grid rounded bg-white p-6">
          <span>
            <p className="mb-1 font-bold">Action</p>
            <OrderDetailStatusBadgeAdmin
              status={data.order.status.title}
              content={data.order.status.content}
            />
          </span>
          <span>
            <p className="font-bold">Complain</p>
            <p>{data.order.status.content || '-'}</p>
          </span>
        </div>
      </div>
      <div className="col-span-3">
        <h3 className="mb-3 text-xl font-bold text-secondary">Order List</h3>
        <div className="rounded bg-white p-6">
          {data.order.cart.cartItems.map((product: any) => (
            <OrderDetailCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminDetailOrder

AdminDetailOrder.getLayout = (page) => {
  return <AdminLayout pageTitle="Detail Order">{page}</AdminLayout>
}
