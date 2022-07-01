import ProductCard from '@/components/cards/ProductCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Get } from '@/utils/axios'
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { NextPageWithLayout } from './page'

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await Get('/products')
  return {
    props: { products },
  }
}

const Home: NextPageWithLayout = ({ products }: any) => {
  return (
    <div className="space-y-2">
      <section className="mt-2 w-full bg-white py-12 shadow-sm">
        <h1 className="mb-3 text-center text-2xl font-bold capitalize">
          best seller products
        </h1>
        <div className="mx-auto max-w-7xl px-3">
          <Link href="/products">
            <a className="flex items-center justify-end gap-1 text-secondary">
              see more
              <span>
                <ArrowRightIcon className="w-4" />
              </span>
            </a>
          </Link>
          <div className="my-3 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item: any) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex h-[100vh] w-full flex-col bg-primary py-12 text-white shadow-sm md:h-96">
        <h1 className="mb-8 text-center text-2xl font-bold capitalize">
          how to order
        </h1>
        <div className="mx-auto flex h-full w-full max-w-7xl flex-1 justify-center gap-5 px-3 md:flex-col">
          <div className="grid flex-1 grid-rows-4 place-items-center md:grid-cols-4 md:grid-rows-1">
            <div className="text-center text-sm">
              <p className="font-bold">1</p>
              <p>
                Choose the
                <br />
                products
              </p>
            </div>
            <div className="row-start-3 w-32 text-center text-sm md:col-start-3 md:row-start-1">
              <p className="font-bold">3</p>
              <p>Choose payment method</p>
            </div>
          </div>
          <div className="grid h-full place-items-center rounded-full bg-white text-secondary md:h-1 md:w-full md:grid-cols-4">
            <CheckCircleIcon className="w-3" />
            <CheckCircleIcon className="w-3" />
            <CheckCircleIcon className="w-3" />
            <CheckCircleIcon className="w-3" />
          </div>
          <div className="grid flex-1 grid-rows-4 place-items-center md:grid-cols-4 md:grid-rows-1">
            <div className="row-start-2 w-20 text-center text-sm md:col-start-2 md:row-start-1">
              <p className="font-bold">2</p>
              <p>Check your order</p>
            </div>
            <div className="row-start-4 w-32 text-center text-sm md:col-start-4 md:row-start-1">
              <p className="font-bold">4</p>
              <p>We deliver your order!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

Home.getLayout = (page) => {
  return <CustomerLayout pageTitle="Home">{page}</CustomerLayout>
}
