import AdminLayout from '@/components/layouts/admin/Layout'
import { Button } from '@/components/utility'
import { Get } from '@/utils/axios'
import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import useSWR from 'swr'
import { NextPageWithLayout } from '../../page'

const Customers: NextPageWithLayout = () => {
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(
    `/admin/customers?page=${page}&limit=10`,
    (url: any) => Get(url).then((res: any) => res)
  )

  return (
    <section className="mt-6">
      <table className="w-full">
        <thead className="bg-primary text-white">
          <tr className="font-semibold capitalize">
            <td className="p-3">no</td>
            <td>name</td>
            <td>username</td>
            <td>email</td>
            <td>phone number</td>
            <td>address</td>
          </tr>
        </thead>
        <tbody>
          {!data && !error ? (
            <tr className="bg-white text-sm">
              <td className=" col-span-full px-4 py-2" colSpan={6}>
                Loading...
              </td>
            </tr>
          ) : (
            data?.customers?.map((item: any, idx: any) => (
              <tr key={item._id} className="bg-white text-sm">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.username}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.phone}</td>
                <td className="px-4 py-2">{item.address}</td>
              </tr>
            ))
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
          disabled={data?.result !== 10 || data?.result * page === data?.length}
        >
          <ArrowSmRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}

export default Customers

Customers.getLayout = (page) => {
  return <AdminLayout pageTitle="Customers">{page}</AdminLayout>
}
