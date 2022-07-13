import OrderCard from '@/components/cards/OrderCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Get } from '@/utils/axios'
import { HomeIcon, PhoneIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { NextPageWithLayout } from '../page'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: any = await getSession(ctx)
  const { user }: any = await Get(`/user/profile?id=${session.id}`)
  const { orders }: any = await Get(`/user/orders?id=${session.id}`)

  const totalExpense = await orders.reduce((total: any, item: any) => {
    return total + item.cart.total
  }, 0)

  return {
    props: { user, orders, totalExpense },
  }
}

const DetailProfile: NextPageWithLayout = ({
  user,
  orders,
  totalExpense,
}: any) => {
  return (
    <div className="bg-primary/70">
      <section className="mx-auto max-w-screen-md space-y-5 py-10 px-5">
        <div className="grid place-items-center rounded border bg-white p-5 shadow-sm">
          <div>
            <div className="mb-3 flex gap-3">
              <Image
                src={user.imageUrl}
                width="50"
                height="50"
                alt={user.name}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold">
                  {user.name}
                  <span className="text-sm font-light"> ({user.username})</span>
                </h3>
                <p className="text-sm font-light">{user.email}</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-4">
                <PhoneIcon className="h-4 w-4" />
                {user.phone}
              </div>
              <div className="flex items-center gap-4">
                <HomeIcon className="h-4 w-4" />
                {user.address}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded border bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Order history</h3>
          <div className="grid gap-x-10 gap-y-5 md:mx-10 md:grid-cols-2">
            {orders.map((item: any) => (
              <OrderCard key={item._id} item={item} />
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded border bg-white p-5 text-center shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-gray-500">
              Total Orders This Month
            </h3>
            <p className="text-3xl font-semibold">{orders?.length ?? 0}</p>
          </div>
          <div className="rounded border bg-white p-5 text-center shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-gray-500">
              Total Expenses This Month
            </h3>
            <p className="text-3xl font-semibold">
              Rp. {totalExpense?.toLocaleString() ?? 0}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetailProfile

DetailProfile.getLayout = (page) => {
  return <CustomerLayout pageTitle="Profile">{page}</CustomerLayout>
}
