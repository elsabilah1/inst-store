import ProductCardAdmin from '@/components/cards/ProductCardAdmin'
import AdminLayout from '@/components/layouts/admin/Layout'
import { Alert, Button, Loader } from '@/components/utility'
import { Get } from '@/utils/axios'
import { PlusIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useProduct } from 'store/product'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await Get('/products')
  return {
    props: { products },
  }
}

const AdminProducts: NextPageWithLayout = ({ products }: any) => {
  const router = useRouter()
  const { loading, success, error, reset } = useProduct()

  if (error) {
    setTimeout(() => {
      reset()
    }, 4000)
  }

  if (success) {
    setTimeout(() => {
      reset()
      router.replace('/admin/products')
    }, 4000)
  }

  return (
    <>
      <section className="mt-2 flex justify-end">
        <Alert error={error} success={success} />
        {loading && <Loader />}

        <Button
          variant="secondary"
          size="auto"
          onClick={() => router.push('/admin/products/add')}
        >
          <span className="flex items-center gap-3">
            <PlusIcon className="w-4" />
            add new product
          </span>
        </Button>
      </section>

      <section className="mt-3 grid gap-3">
        {products.map((item: any) => (
          <ProductCardAdmin key={item._id} item={item} />
        ))}
      </section>
    </>
  )
}

export default AdminProducts

AdminProducts.getLayout = (page) => {
  return <AdminLayout pageTitle="Products">{page}</AdminLayout>
}
