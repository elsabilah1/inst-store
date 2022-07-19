import ProductCardAdmin from '@/components/cards/ProductCardAdmin'
import AdminLayout from '@/components/layouts/admin/Layout'
import { Alert, Button } from '@/components/utility'
import { Get } from '@/utils/axios'
import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useProduct } from 'store/product'
import useSWRInfinite from 'swr/infinite'
import { NextPageWithLayout } from '../../page'

const AdminProducts: NextPageWithLayout = () => {
  const router = useRouter()
  const { success, error: errorDelete, reset } = useProduct()
  const PAGE_LIMIT = 5

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `/products?page=${index + 1}&limit=${PAGE_LIMIT}`,
    (url: any) => Get(url).then((res: any) => res)
  )

  const products = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT)

  useEffect(() => {
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
  }, [error, reset, router, success])

  return (
    <>
      <section className="mt-2 flex justify-end">
        <Alert error={errorDelete} success={success} />
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
        {products?.map((item: any) => (
          <ProductCardAdmin key={item._id} item={item} />
        ))}
        <div className="text-center">
          <Button
            variant="primary"
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
            disabled={isReachingEnd}
          >
            Load more
          </Button>
        </div>
      </section>
    </>
  )
}

export default AdminProducts

AdminProducts.getLayout = (page) => {
  return <AdminLayout pageTitle="Products">{page}</AdminLayout>
}
