import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from './page'

const Cart: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        cart
      </h1>
    </section>
  )
}

export default Cart

Cart.getLayout = (page) => {
  return <CustomerLayout pageTitle="Cart">{page}</CustomerLayout>
}
