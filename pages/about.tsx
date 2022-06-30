import CustomerLayout from '@/components/layouts/customer/Layout'
import { NextPageWithLayout } from './page'

const About: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="grid max-w-screen-lg place-content-center text-xl font-bold text-red-700">
        about
      </h1>
    </section>
  )
}

export default About

About.getLayout = (page) => {
  return <CustomerLayout pageTitle="About">{page}</CustomerLayout>
}
