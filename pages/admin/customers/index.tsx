import AdminLayout from '@/components/layouts/admin/Layout'
import { Get } from '@/utils/axios'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async () => {
  const res: any = await Get('/admin/customers')
  const customers = res.customers

  return {
    props: { customers },
  }
}

const Customers: NextPageWithLayout = ({ customers }: any) => {
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
          {customers?.map((item: any, idx: any) => (
            <tr key={item._id} className="bg-white text-sm">
              <td className="p-3">{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Customers

Customers.getLayout = (page) => {
  return <AdminLayout pageTitle="Customers">{page}</AdminLayout>
}
