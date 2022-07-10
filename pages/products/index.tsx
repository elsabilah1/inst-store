import ProductCard from '@/components/cards/ProductCard'
import CustomerLayout from '@/components/layouts/customer/Layout'
import { SelectField } from '@/components/utility'
import { Get } from '@/utils/axios'
import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useProduct } from 'store/product'
import { NextPageWithLayout } from '../page'

const Products: NextPageWithLayout = () => {
  const [categoryList, setCategoryList] = useState<any[]>([])
  const { itemList, loading } = useProduct()

  const [products, setProducts] = useState<any>()

  const fetchData = async () => {
    const categories: any = await Get('/products/categories')
    const products = await Get('/products')
    const catName = categories.map((item: any) => item.name)
    setCategoryList(['all', ...catName])
    setProducts(products)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-lg px-3">
        <FilterProduct categoryList={categoryList} products={products} />
        <section className="grid gap-4 py-6 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            itemList?.map((item: any) => (
              <ProductCard key={item._id} item={item} />
            ))
          )}
        </section>
      </div>
    </div>
  )
}

export default Products

Products.getLayout = (page) => {
  return <CustomerLayout pageTitle="Products">{page}</CustomerLayout>
}

const sortList = ['a-z', 'z-a', 'highest price', 'lowest price', 'best seller']

const FilterProduct = ({ categoryList, products }: any) => {
  const router = useRouter()
  const { cat, sort } = router.query
  const { setItem } = useProduct()
  const [category, setCategory] = useState<any>()
  const [sortBy, setSortBy] = useState<any>()
  const [keyword, setKeyword] = useState<any>('')

  useEffect(() => {
    setCategory(cat)
    setSortBy(sort)
  }, [cat, sort])

  useEffect(() => {
    let data = products

    // Filtering
    if (keyword !== '')
      data = data.filter((p: any) => p.name.toLowerCase().includes(keyword))

    if (category !== 'all' && category !== undefined)
      data = data.filter((p: any) => p.category === category)

    // Sorting
    if (sortBy !== '') {
      if (sortBy === 'best seller')
        data = data.sort(
          (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
        )

      if (sortBy === 'lowest price')
        data = data.sort(
          (a: { sellingPrice: number }, b: { sellingPrice: number }) =>
            a.sellingPrice - b.sellingPrice
        )

      if (sortBy === 'highest price')
        data = data.sort(
          (a: { sellingPrice: number }, b: { sellingPrice: number }) =>
            b.sellingPrice - a.sellingPrice
        )

      if (sortBy === 'a-z')
        data = data.sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        )

      if (sortBy === 'z-a')
        data = data.sort((a: { name: string }, b: { name: string }) =>
          b.name.localeCompare(a.name)
        )
    }

    setItem(data)
  }, [category, keyword, products, setItem, sortBy])

  return (
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
  )
}
