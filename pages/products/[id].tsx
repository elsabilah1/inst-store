import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from '../page'

const DetailProduct: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        product details
      </h1>
    </section>
  )
}

export default DetailProduct

DetailProduct.getLayout = (page) => {
  return <CustomerLayout pageTitle="Details">{page}</CustomerLayout>
}
