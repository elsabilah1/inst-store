/* eslint-disable no-unused-vars */
import ProductCardCart from '@/components/cards/ProductCardCart'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Alert, Button, InputField, SelectField } from '@/components/utility'
import { Get, Post } from '@/utils/axios'
import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useCart } from 'store/cart'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { NextPageWithLayout } from '../page'

const Schema = z.object({
  address: z.string(),
})

declare global {
  interface Window {
    snap: any
  }
}

const paymentList = ['cash on delivery', 'Transfer VA']

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: any = await getSession(ctx)
  const { user }: any = await Get(`/user/profile?id=${session.id}`)

  return {
    props: { user },
  }
}

const Cart: NextPageWithLayout = ({ user }: any) => {
  const router = useRouter()
  const [payment, setPayment] = useState<string>('')
  const { cartItems, total, deleteCartAll } = useCart()
  const [totalPrice, setTotal] = useState(0)
  const [cart, setCart] = useState<any[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 4000)
    setTotal(total)
    setCart(cartItems)
  }, [cartItems, total, error, setError])

  const handleOrder = async (values: any) => {
    const data = {
      ...user,
      address: values.address,
    }

    if (values.address === '') return setError('invalid address.')
    if (payment === '') return setError('invalid payment method.')

    if (payment === 'cash on delivery') {
      await Post('/user/orders', { ...data, payment: 'cash on delivery' })
      deleteCartAll()
      localStorage.clear()
      router.push('/me')
    } else {
      const post: any = await Post('/user/pay', data)

      window.snap.pay(post.transaction.token, {
        onSuccess: async (result: any) => {
          console.log('success', { result })
        },
        onPending: async (result: any) => {
          console.log('pending', { result })
          await Post('/user/orders', { ...data, payment: result })
          deleteCartAll()
          localStorage.clear()
          router.push('/me')
        },
        onError: async (result: any) => {
          console.log('error', { result })
        },
      })
    }
  }

  return (
    <>
      <Alert error={error} />
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="SB-Mid-client-A5zLo_R0ygqCcWAO"
      />
      <section className="mx-auto my-6 max-w-screen-lg px-4 md:my-10">
        <h1 className="text-3xl font-bold text-primary">Your Cart</h1>
        <div className="mx-auto mt-4 grid max-w-screen-md gap-4 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="space-y-4 rounded border bg-white py-3 px-4 shadow">
              {cart.length > 0
                ? cart.map((product: any) => (
                    <ProductCardCart key={product._id} product={product} />
                  ))
                : 'empty list'}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="space-y-4 rounded border bg-white py-3 px-4 shadow">
              <Formik
                initialValues={{
                  address: user.address,
                }}
                validationSchema={toFormikValidationSchema(Schema)}
                onSubmit={(values) => handleOrder(values)}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <InputField
                      name="address"
                      placeholder="Address"
                      error={errors.address}
                      touched={touched.address}
                      inputVariant="underline"
                    />
                    <SelectField
                      data={paymentList}
                      selected={payment}
                      setSelected={setPayment}
                      placeholder="Choose payment method"
                    />
                    <div className="flex justify-between pt-10">
                      <p className="font-medium">Total :</p>
                      <p className="font-bold">
                        Rp. {totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Button
                        type="submit"
                        variant="secondary"
                        disabled={cart.length === 0}
                      >
                        Place your order
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart

Cart.getLayout = (page) => {
  return <CustomerLayout pageTitle="Cart">{page}</CustomerLayout>
}
