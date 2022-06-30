import AdminLayout from '@/components/layouts/admin/Layout'
import { NextPageWithLayout } from '../../page'

const AdminOrders: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        orders
      </h1>
    </section>
  )
}

export default AdminOrders

AdminOrders.getLayout = (page) => {
  return <AdminLayout pageTitle="Orders">{page}</AdminLayout>
}
