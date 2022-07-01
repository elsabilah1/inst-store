import ProductCard from '@/components/cards/ProductCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Get } from '@/utils/axios'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../page'

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await Get('/products')
  return {
    props: { products },
  }
}

const Products: NextPageWithLayout = ({ products }: any) => {
  return (
    <>
      <section>filter</section>
      <section className="grid grid-cols-5 gap-4 py-6 px-4">
        {products.map((item: any) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </section>
    </>
  )
}

export default Products

Products.getLayout = (page) => {
  return <CustomerLayout pageTitle="Products">{page}</CustomerLayout>
}
