import ProductCardCart from '@/components/cards/ProductCardCart'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { useCart } from 'store/cart'
import { NextPageWithLayout } from '../page'

const Cart: NextPageWithLayout = () => {
  const { cartItems } = useCart()

  return (
    <section className="mx-auto my-6 max-w-screen-lg px-4">
      <h1 className="text-3xl font-bold text-white">Your Cart</h1>
      <div className="mx-auto mt-4 grid max-w-screen-md grid-cols-5 gap-4">
        <div className="col-span-3 space-y-4 rounded bg-white py-3 px-4">
          {cartItems.length > 0
            ? cartItems.map((product: any) => (
                <ProductCardCart key={product._id} product={product} />
              ))
            : 'empty list'}
        </div>
        <div className="col-span-2 bg-white"></div>
      </div>
    </section>
  )
}

export default Cart

Cart.getLayout = (page) => {
  return <CustomerLayout pageTitle="Cart">{page}</CustomerLayout>
}
