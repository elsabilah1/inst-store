import AdminLayout from '@/components/layouts/admin/Layout'
import { Button } from '@/components/utility'
import { Get } from '@/utils/axios'
import {
  ArrowSmLeftIcon,
  ArrowSmRightIcon,
  MinusIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { NextPageWithLayout } from '../page'

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [start, setStart] = useState<string>(
    new Date().toLocaleDateString('en-CA').toString()
  )
  const [end, setEnd] = useState<string>(
    new Date().toLocaleDateString('en-CA').toString()
  )

  useEffect(() => {
    router.replace(router.pathname, {
      query: { start, end },
    })
  }, [start, end])

  const { data, error } = useSWR(
    `/admin/reports?page=${page}&limit=5&start=${start}&end=${end}`,
    (url: any) => Get(url).then((res: any) => res)
  )

  return (
    <main className="my-6 space-y-6 text-primary">
      <section className="flex items-center justify-end gap-3">
        <input
          type="date"
          onChange={(e) => setStart(e.target.value)}
          defaultValue={new Date(
            router?.query?.start?.toString() ?? new Date()
          ).toLocaleDateString('en-CA')}
        />
        <MinusIcon className="h-5 w-5" />
        <input
          type="date"
          onChange={(e) => setEnd(e.target.value)}
          defaultValue={new Date(
            router?.query?.end?.toString() ?? new Date()
          ).toLocaleDateString('en-CA')}
        />
      </section>
      <section>
        <h1 className="mb-3 text-xl font-bold">Overview</h1>
        <div className="grid gap-3 md:grid-cols-3">
          {data?.overview?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="space-y-3 rounded-sm bg-white p-4 text-center shadow"
            >
              <h3 className="font-bold text-secondary">{item.title}</h3>
              <p className="text-4xl font-bold text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className="mb-3 text-xl font-bold">Sold Products</h1>
        <table className="w-full">
          <thead className="bg-primary text-white">
            <tr className="font-semibold capitalize">
              <td className="p-3">no</td>
              <td>name</td>
              <td>sold</td>
              <td>buying price</td>
              <td>selling price</td>
              <td>category</td>
              <td>profit</td>
            </tr>
          </thead>
          <tbody>
            {!data && !error ? (
              <tr className="bg-white text-sm">
                <td className=" col-span-full px-4 py-2" colSpan={7}>
                  Loading...
                </td>
              </tr>
            ) : data?.products.length > 0 ? (
              data.products.map(({ item, profit, sold }: any, idx: any) => (
                <tr key={item._id} className="bg-white text-sm">
                  <td className="p-2">{idx + 1}</td>
                  <td className="w-60 p-2">
                    <p className="line-clamp-2">{item.name}</p>
                  </td>
                  <td className="p-2">{sold}</td>
                  <td className="p-2">
                    Rp. {item.buyingPrice.toLocaleString()}
                  </td>
                  <td className="p-2">
                    Rp. {item.sellingPrice.toLocaleString()}
                  </td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">Rp. {profit.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-white text-sm">
                <td className="p-2" colSpan={7}>
                  Empty List
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-end">
          <Button
            variant="primary"
            size="auto"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ArrowSmLeftIcon className="h-5 w-5" />
          </Button>
          <div className="mx-2 rounded bg-white px-3 py-1 text-xl shadow">
            {page}
          </div>
          <Button
            variant="primary"
            size="auto"
            onClick={() => setPage(page + 1)}
            disabled={
              data?.result !== 5 || data?.result * page === data?.length
            }
          >
            <ArrowSmRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  )
}

export default Dashboard

Dashboard.getLayout = (page) => {
  return <AdminLayout pageTitle="Dashboard">{page}</AdminLayout>
}
