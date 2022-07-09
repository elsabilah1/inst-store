import ProductCard from '@/components/cards/ProductCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { Button, SelectField } from '@/components/utility'
import { Get } from '@/utils/axios'
import { SearchIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { NextPageWithLayout } from '../page'

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await Get('/products')
  return {
    props: { products },
  }
}

const Products: NextPageWithLayout = ({ products }: any) => {
  return (
    <div className=" bg-white">
      <div className="mx-auto max-w-screen-lg px-3">
        <FilterProduct />
        <section className="grid gap-4 py-6 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-5">
          {products.map((item: any) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Products

Products.getLayout = (page) => {
  return <CustomerLayout pageTitle="Products">{page}</CustomerLayout>
}

const categoryList = ['Guitar', 'Drum']
const sortList = ['a-z', 'price']

const FilterProduct = () => {
  const [category, setCategory] = useState<any>()
  const [sortBy, setSortBy] = useState<any>()
  const [keyword, setKeyword] = useState<any>()

  return (
    <section className="mx-auto grid max-w-screen-md gap-3 py-3 text-2xl md:grid-cols-5">
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
          defaultValue={keyword}
          placeholder="Search..."
          className="w-full rounded-sm border border-primary/20 pl-8 text-sm shadow-sm placeholder:text-sm focus:border-secondary focus:ring-secondary"
          onChange={(e: any) => setKeyword(e.target.value)}
        />
      </div>

      <Button variant="secondary" type="submit">
        Search
      </Button>
    </section>
  )
}
