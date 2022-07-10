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
    <>
      <section className="w-full bg-white py-10">
        <h1 className="mb-3 text-center text-2xl font-bold capitalize">
          best seller products
        </h1>
        <div className="mx-auto max-w-screen-lg px-3">
          <Link href="/products?sort=best seller" as="/products">
            <a className="flex items-center justify-end gap-1 font-bold text-secondary">
              see more
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </Link>
          <div className="my-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {products
              .sort(
                (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
              )
              .slice(0, 5)
              .map((item: any) => (
                <ProductCard key={item._id} item={item} />
              ))}
          </div>
        </div>
      </section>
      <HowToOrder />
    </>
  )
}

export default Home

Home.getLayout = (page) => {
  return <CustomerLayout pageTitle="Home">{page}</CustomerLayout>
}

const HowToOrder = () => {
  return (
    <section className="relative flex h-[100vh] w-full flex-col bg-primary py-10 text-white md:h-96">
      <h1 className="mb-8 text-center text-2xl font-bold capitalize">
        how to order
      </h1>
      <div className="mx-auto flex h-full w-full max-w-screen-lg flex-1 justify-center gap-5 px-3 md:flex-col">
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
        <div className="grid h-full place-items-center bg-white/10 text-secondary md:h-1 md:w-full md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <CheckCircleIcon key={i} className="w-3" />
          ))}
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
  )
}
