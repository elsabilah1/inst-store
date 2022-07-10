import OrderDetailStatusBadge from '@/components/badges/OrderDetailStatusBadge'
import OrderDetailCard from '@/components/cards/OrderDetailCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Get } from '@/utils/axios'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: any = await getSession(ctx)
  const { user }: any = await Get(`/user/profile?id=${session.id}`)
  const { order }: any = await Get(`/user/orders/${ctx.query.id}`)

  return {
    props: { user, order },
  }
}

const DetailOrder: NextPageWithLayout = ({ order }: any) => {
  return (
    <section className="mx-auto my-6 max-w-screen-lg px-4">
      <h1 className="text-3xl font-bold text-white">Your Order</h1>
      <div className="mx-auto mt-4 grid max-w-screen-md gap-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="space-y-4 rounded bg-white py-3 px-4">
            {order.cart.cartItems.length > 0
              ? order.cart.cartItems.map((product: any) => (
                  <OrderDetailCard key={product._id} product={product} />
                ))
              : 'empty list'}
          </div>
        </div>
        <div className="md:col-span-2">
          <OrderDetailStatusBadge status={order.status.title} />
          <div className="space-y-4 rounded bg-white py-3 px-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium capitalize">Address</label>
              <div className="border-b border-b-primary/20 px-4 py-2 text-sm shadow-sm">
                {order.address}
              </div>
            </div>
            <div className="flex items-center justify-between pt-10">
              <p className="font-medium">Payment Method :</p>
              <p className="text-sm font-medium">
                {order.paymentMethod.replace('_', ' ')}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Total :</p>
              <p className="font-bold">Rp. {order.total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailOrder

DetailOrder.getLayout = (page) => {
  return <CustomerLayout pageTitle="Order Details">{page}</CustomerLayout>
}
