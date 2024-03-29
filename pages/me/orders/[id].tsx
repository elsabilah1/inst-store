import OrderDetailStatusBadge from '@/components/badges/OrderDetailStatusBadge'
import OrderDetailCard from '@/components/cards/OrderDetailCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Button } from '@/components/utility'
import { Get, Post, Put } from '@/utils/axios'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: any = await getSession(ctx)
  const { user }: any = await Get(`/user/profile?id=${session.id}`)
  const { order }: any = await Get(`/user/orders/${ctx.query.id}`)
  const { timestamp, signature, api_key }: any = await Get(
    `/user/orders/upload`
  )

  return {
    props: { user, order, timestamp, signature, api_key },
  }
}

const DetailOrder: NextPageWithLayout = ({
  order,
  timestamp,
  signature,
  api_key,
}: any) => {
  const router = useRouter()
  const [file, setFile] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const uploadFile = async () => {
    const formData = new FormData()
    const proof = file[0]

    formData.append('file', proof)
    formData.append('api_key', api_key)
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260')
    formData.append('folder', 'payment_proof')

    setLoading(true)
    const res: any = await Post(
      'https://api.cloudinary.com/v1_1/dnfo2vrzr/auto/upload',
      formData,
      'application/json'
    )

    await Put(
      `/user/orders?type=updateimage`,
      {
        _id: order._id,
        url: res.url,
      },
      'application/json'
    )
    setLoading(false)

    router.reload()
  }

  return (
    <section className="mx-auto my-6 max-w-screen-lg px-4">
      <h1 className="text-3xl font-bold text-primary">Your Order</h1>
      <div className="mx-auto mt-4 grid max-w-screen-md gap-4 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="space-y-4 rounded border bg-white py-3 px-4 shadow">
            {order.cart.cartItems.length > 0
              ? order.cart.cartItems.map((product: any) => (
                  <OrderDetailCard key={product._id} product={product} />
                ))
              : 'empty list'}
          </div>
        </div>
        <div className="md:col-span-2">
          <OrderDetailStatusBadge status={order.status.title} />
          <div className="space-y-4 rounded border bg-white py-3 px-4 shadow">
            <div className="mb-2 space-y-1 text-xs">
              <p className="font-bold">
                oid:
                <span className="ml-2 font-normal">{order._id}</span>
              </p>
              {order.status.title !== 'payment' &&
                order.status.title !== 'process' && (
                  <>
                    <p className="block w-full font-bold">
                      tracking number:
                      <span className="ml-2 font-normal">
                        {order?.trackingNumber ?? '-'}
                        {` (${order?.shippingService?.name ?? ''})`}
                      </span>
                    </p>
                    <p className="block w-full font-bold">
                      courier name:
                      <span className="ml-2 font-normal">
                        {order?.courierName ?? '-'}
                      </span>
                    </p>
                  </>
                )}
            </div>

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
            {order.paymentMethod !== 'cash on delivery' &&
              (order.image_proof !== undefined ? (
                <div className="space-y-2">
                  <label
                    className="form-label font-medium"
                    htmlFor="customFile"
                  >
                    Proof of payment:
                  </label>
                  <img
                    src={order.image_proof}
                    alt={'image'}
                    width={300}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label
                    className="form-label font-medium"
                    htmlFor="customFile"
                  >
                    Proof of payment:
                  </label>
                  <input
                    type="file"
                    className="text-sm file:border-primary/50 file:bg-primary file:text-sm file:text-white"
                    id="customFile"
                    onChange={(e) => setFile(e.target.files)}
                  />
                  <div className="text-right">
                    <Button
                      onClick={uploadFile}
                      variant="secondary"
                      size="small"
                      loading={loading}
                    >
                      upload
                    </Button>
                  </div>
                </div>
              ))}
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
