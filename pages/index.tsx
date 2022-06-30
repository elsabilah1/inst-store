import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from './page'

const Home: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        homepage
      </h1>
    </section>
  )
}

export default Home

Home.getLayout = (page) => {
  return <CustomerLayout pageTitle="Home">{page}</CustomerLayout>
}
