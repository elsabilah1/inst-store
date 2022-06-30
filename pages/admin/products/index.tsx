import AdminLayout from '@/components/layouts/admin/Layout'
import { NextPageWithLayout } from '../../page'

const AdminProducts: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        products
      </h1>
    </section>
  )
}

export default AdminProducts

AdminProducts.getLayout = (page) => {
  return <AdminLayout pageTitle="Products">{page}</AdminLayout>
}
