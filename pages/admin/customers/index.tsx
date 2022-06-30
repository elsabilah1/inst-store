import AdminLayout from '@/components/layouts/admin/Layout'
import { NextPageWithLayout } from '../../page'

const Customers: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        customers
      </h1>
    </section>
  )
}

export default Customers

Customers.getLayout = (page) => {
  return <AdminLayout pageTitle="Customers">{page}</AdminLayout>
}
