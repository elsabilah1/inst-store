import PrimaryLayout from '../components/layouts/primary/Layout'
import { NextPageWithLayout } from './page'

const Home: NextPageWithLayout = () => {
  return (
    <section>
      <h1 className="mx-auto max-w-screen-lg bg-black/30 text-6xl">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </section>
  )
}

export default Home

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
