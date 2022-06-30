import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from '../../page'

const DetailOrder: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        order details
      </h1>
    </section>
  )
}

export default DetailOrder

DetailOrder.getLayout = (page) => {
  return <CustomerLayout pageTitle="Profile">{page}</CustomerLayout>
}
