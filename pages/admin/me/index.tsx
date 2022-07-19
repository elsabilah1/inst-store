import AdminLayout from '@/components/layouts/admin/Layout'
import { Get } from '@/utils/axios'
import { HomeIcon, PencilAltIcon, PhoneIcon } from '@heroicons/react/solid'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../../page'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: any = await getSession(ctx)
  const { user }: any = await Get(`/user/profile?id=${session.id}`)

  return {
    props: { user },
  }
}

const DetailProfile: NextPageWithLayout = ({ user }: any) => {
  const router = useRouter()

  return (
    <section className="mx-auto max-w-screen-md space-y-5 py-10">
      <div className="relative grid place-items-center rounded border bg-white p-5 shadow-sm">
        <div>
          <div className="mb-3 flex gap-3">
            <Image
              src={user.imageUrl}
              width="50"
              height="50"
              alt={user.name}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold">
                {user.name}
                <span className="text-sm font-light"> ({user.username})</span>
              </h3>
              <p className="text-sm font-light">{user.email}</p>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              {user.phone}
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              {user.address}
            </div>
          </div>
        </div>

        <button
          className="absolute top-0 right-0 m-6"
          onClick={() => router.push('/admin/me/edit')}
        >
          <PencilAltIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default DetailProfile

DetailProfile.getLayout = (page) => {
  return <AdminLayout pageTitle="Profile">{page}</AdminLayout>
}
