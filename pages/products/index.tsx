import LoaderCard from '@/components/cards/LoaderCard'
import ProductCard from '@/components/cards/ProductCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Button, SelectField } from '@/components/utility'
import { Get } from '@/utils/axios'
import { SearchIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { NextPageWithLayout } from '../page'

export const getServerSideProps: GetServerSideProps = async () => {
  const categories: any = await Get('/products/categories')
  const categoryList = categories.map((item: any) => item.name)
  categoryList.unshift('all')
  const sortList = [
    'a-z',
    'z-a',
    'highest price',
    'lowest price',
    'best seller',
  ]

  return {
    props: { categoryList, sortList },
  }
}

const Products: NextPageWithLayout = ({ categoryList, sortList }: any) => {
  const router = useRouter()
  const { cat, sort } = router.query
  const [category, setCategory] = useState<any>('')
  const [sortBy, setSortBy] = useState<any>('')
  const [keyword, setKeyword] = useState<any>('')

  const PAGE_LIMIT = 5

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `/products?page=${
        index + 1
      }&limit=${PAGE_LIMIT}&category=${category}&keyword=${keyword}&sortBy=${sortBy}`,
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
    if (cat) setCategory(cat)
    if (sort) setSortBy(sort)
  }, [cat, sort])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-lg px-3">
        <section className="mx-auto grid max-w-screen-md grid-cols-2 gap-3 py-3 text-2xl md:grid-cols-4">
          <SelectField
            data={categoryList}
            selected={category}
            setSelected={setCategory}
            placeholder="Choose category"
          />
          <SelectField
            data={sortList}
            selected={sortBy}
            setSelected={setSortBy}
            placeholder="Sort products"
          />
          <div className="relative col-span-2">
            <div className="absolute inset-y-0 grid place-items-center px-2">
              <SearchIcon className="h-5 w-5 text-primary/40" />
            </div>
            <input
              type="text"
              name="keyword"
              placeholder="Search..."
              className="w-full rounded-sm border border-primary/20 pl-8 text-sm shadow-sm placeholder:text-sm focus:border-secondary focus:ring-secondary"
              onChange={(e: any) => setKeyword(e.target.value)}
            />
          </div>
        </section>

        <section className="grid gap-4 py-6 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-5">
          {isLoadingInitialData ? (
            <LoaderCard length={5} />
          ) : products.length > 0 ? (
            products.map((item: any) => (
              <ProductCard key={item._id} item={item} />
            ))
          ) : (
            <div>Empty List</div>
          )}
        </section>
        <div className="mb-4 text-center">
          <Button
            variant="primary"
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
            disabled={isReachingEnd}
          >
            Load more
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Products

Products.getLayout = (page) => {
  return <CustomerLayout pageTitle="Products">{page}</CustomerLayout>
}
