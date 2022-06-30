import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from '../page'

const Products: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        products
      </h1>
    </section>
  )
}

export default Products

Products.getLayout = (page) => {
  return <CustomerLayout pageTitle="Products">{page}</CustomerLayout>
}
