import AdminLayout from '@/components/layouts/admin/Layout'
import { NextPageWithLayout } from '../../page'

const AdminAddProduct: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        add new product
      </h1>
    </section>
  )
}

export default AdminAddProduct

AdminAddProduct.getLayout = (page) => {
  return <AdminLayout pageTitle="Add New Product">{page}</AdminLayout>
}
