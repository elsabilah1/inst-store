import AdminLayout from '@/components/layouts/admin/Layout'
import { NextPageWithLayout } from 'pages/page'

const Dashboard: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        dashboard
      </h1>
    </section>
  )
}

export default Dashboard

Dashboard.getLayout = (page) => {
  return <AdminLayout pageTitle="Dashboard">{page}</AdminLayout>
}
