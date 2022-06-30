import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from '../page'

const DetailProfile: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        profile details
      </h1>
    </section>
  )
}

export default DetailProfile

DetailProfile.getLayout = (page) => {
  return <CustomerLayout pageTitle="Profile">{page}</CustomerLayout>
}
