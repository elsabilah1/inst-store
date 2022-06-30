import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from '../page'

const EditProfile: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        profile details
      </h1>
    </section>
  )
}

export default EditProfile

EditProfile.getLayout = (page) => {
  return <CustomerLayout pageTitle="Profile">{page}</CustomerLayout>
}
