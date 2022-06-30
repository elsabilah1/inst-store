import AdminLayout from '@/components/layouts/admin/Layout'
import { NextPageWithLayout } from '../../../page'

const AdminEditProduct: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        edit product
      </h1>
    </section>
  )
}

export default AdminEditProduct

AdminEditProduct.getLayout = (page) => {
  return <AdminLayout pageTitle="Edit Product">{page}</AdminLayout>
}
