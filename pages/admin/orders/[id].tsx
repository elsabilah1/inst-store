import OrderDetailStatusBadgeAdmin from '@/components/badges/OrderDetailStatusBadgeAdmin'
import OrderStatusBadge from '@/components/badges/OrderStatusBadge'
import OrderDetailCard from '@/components/cards/OrderDetailCard'
import AdminLayout from '@/components/layouts/admin/Layout'
import { InputField, SelectField } from '@/components/utility'
import { Get, Put } from '@/utils/axios'
import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res: any = await Get(`/admin/orders/${ctx.query.id}`)
  const shippings = await Get('/admin/orders/shippings')
  const data = res.orders

  return {
    props: { data, shippings },
  }
}

const AdminDetailOrder: NextPageWithLayout = ({ data, shippings }: any) => {
  const router = useRouter()
  const shippingList = shippings.map((item: any) => item.name)
  const [shipping, setShipping] = useState<any>('')

  const changeOrderStatus = async (values: any) => {
    const trackingNumber = values.trackingNumber
    const shippingService = shippings.find(
      (item: any) => item.name === shipping
    )

    const newStatus =
      data.order.status.title === 'process' ? 'delivery' : 'complaint_processed'

    await Put(`/admin/orders/${router.query.id}`, {
      title: newStatus,
      content: data.order.status.content,
      trackingNumber,
      shippingService,
    })
    router.reload()
  }

  const processPayment = async (e: any) => {
    e.preventDefault()

    const paymentStatus = e.target.payment.value

    if (paymentStatus === 'accept') {
      await Put(`/admin/orders/${router.query.id}`, {
        title: 'process',
        content: '',
      })
      router.reload()
    } else if (paymentStatus === 'reject') {
      await Put(
        `/user/orders?type=updateimage`,
        {
          _id: router.query.id,
          url: '',
        },
        'application/json'
      )
      router.reload()
    }
  }

  return (
    <section className="mt-6 grid grid-cols-5">
      <div className="col-span-5 mb-6 grid gap-3 md:grid-cols-5">
        <div className="rounded bg-white p-6 text-sm capitalize md:col-span-3">
          <div className="mb-2 space-y-1 text-xs">
            <p className="font-bold">
              oid:
              <span className="ml-2 font-normal">{data.order._id}</span>
            </p>
            <p className="block w-full font-bold">
              tracking number:
              <span className="ml-2 font-normal">
                {data.order.trackingNumber ?? '-'}
                {` (${data?.order?.shippingService?.name})` ?? ''}
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-2">
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
            {data.order.paymentMethod !== 'cash on delivery' && (
              <div className="mt-3 space-y-2">
                <p className="mb-1 font-bold">Proof of payment:</p>
                {data.order.image_proof ? (
                  <img
                    src={data.order.image_proof}
                    alt={'image'}
                    width={300}
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <p>-</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="grid h-fit rounded bg-white p-6 md:col-span-2">
          <div className="mb-2">
            <p className="mb-1 font-bold">Action</p>

            {(data.order.status.title === 'process' ||
              data.order.status.title === 'complaint') && (
              <Formik
                initialValues={{
                  trackingNumber: '',
                }}
                validationSchema={toFormikValidationSchema(
                  z.object({
                    trackingNumber: z.string(),
                  })
                )}
                onSubmit={(values) => changeOrderStatus(values)}
              >
                {({ errors, touched }) => (
                  <Form className="my-4 space-y-4">
                    <SelectField
                      data={shippingList}
                      selected={shipping}
                      setSelected={setShipping}
                      placeholder="Choose service"
                    />
                    <InputField
                      name="trackingNumber"
                      placeholder="tracking number"
                      error={errors.trackingNumber}
                      touched={touched.trackingNumber}
                      inputVariant="underline"
                    />
                    <OrderDetailStatusBadgeAdmin
                      status={data.order.status.title}
                    />
                  </Form>
                )}
              </Formik>
            )}

            {data.order.status.title === 'payment' && (
              <form className="space-y-3" onSubmit={processPayment}>
                <div className="flex justify-evenly">
                  <div className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="payment"
                      value="accept"
                      id="accept"
                      className="h-3 w-3"
                      disabled={!data.order.image_proof}
                    />
                    <label htmlFor="accept">Accept payment</label>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="payment"
                      value="reject"
                      id="reject"
                      className="h-3 w-3"
                      disabled={!data.order.image_proof}
                    />
                    <label htmlFor="reject">Reject payment</label>
                  </div>
                </div>
                <OrderDetailStatusBadgeAdmin status={data.order.status.title} />
              </form>
            )}

            {data.order.status.title !== 'process' &&
              data.order.status.title !== 'complaint' &&
              data.order.status.title !== 'payment' && (
                <OrderDetailStatusBadgeAdmin status={data.order.status.title} />
              )}
          </div>
          <span>
            <p className="mb-1 font-bold">Complaint</p>
            <p className="text-xs">{data.order.status.content || '-'}</p>
          </span>
        </div>
      </div>
      <div className="col-span-3">
        <h3 className="mb-3 text-xl font-bold text-secondary">Order List</h3>
        <div className="space-y-3 rounded bg-white p-6">
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
