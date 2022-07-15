import CustomerLayout from '@/components/layouts/customer/Layout'
import {
  Alert,
  Button,
  DropzoneField,
  InputField,
  Loader,
} from '@/components/utility'
import { Get } from '@/utils/axios'
import { XIcon } from '@heroicons/react/solid'
import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useAuth } from 'store/auth'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { NextPageWithLayout } from '../page'

const Schema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email('invalid email.'),
  phone: z.string(),
  address: z.string(),
})

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: any = await getSession(ctx)
  const { user }: any = await Get(`/user/profile?id=${session.id}`)

  return {
    props: { user },
  }
}

const EditProfile: NextPageWithLayout = ({ user }: any) => {
  const router = useRouter()
  const { reset, updateProfile, loading, error, success } = useAuth()
  const emptyAvatar = {
    url: 'https://res.cloudinary.com/dnfo2vrzr/image/upload/v1654354790/avatars/empty_avatar.png',
    id: 'avatars/empty_avatar',
  }
  const [avatar, setAvatar] = useState<any>({
    url: user.imageUrl,
    id: user.imageId,
  })

  const onDrop = useCallback((acceptedFiles: any) => {
    const newProfile = acceptedFiles[0]
    newProfile.preview = URL.createObjectURL(newProfile)
    setAvatar(newProfile)
  }, [])

  const handleSubmit = (values: any) => {
    const data = new FormData()
    if (!avatar.imageId) data.append('avatar', avatar)
    for (const key in values) {
      data.append(key, values[key])
    }

    updateProfile(data)
  }

  if (success) {
    setTimeout(() => {
      reset()
      router.replace('/me')
    }, 4000)
  }

  return (
    <>
      <Alert error={error} success={success} />
      {loading && <Loader />}
      <section className="bg-primary/70 px-4 py-6">
        <div className="mx-auto max-w-screen-sm rounded bg-white py-8 px-6 shadow">
          <h1 className="mb-2 text-2xl font-bold">Edit Profile</h1>
          <Formik
            initialValues={{
              name: user.name,
              username: user.username,
              email: user.email,
              phone: user.phone,
              address: user.address,
            }}
            validationSchema={toFormikValidationSchema(Schema)}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mx-auto mb-5 flex justify-center">
                  <div className="relative cursor-pointer">
                    <DropzoneField onDrop={onDrop} avatar />
                    {avatar.url !== emptyAvatar.url && (
                      <div className="absolute inset-0 rounded-full">
                        <div>
                          <Image
                            src={avatar.preview ?? avatar.url}
                            alt={user.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                          <button
                            type="button"
                            className="absolute inset-0 z-50 grid cursor-pointer place-items-center rounded-full bg-danger/20 opacity-0 transition-all hover:opacity-100"
                            onClick={() => setAvatar(emptyAvatar)}
                          >
                            <XIcon className="h-5 w-5 text-danger" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2 md:gap-10">
                  <div className="space-y-3">
                    <InputField
                      name="name"
                      placeholder="name"
                      error={errors.name}
                      touched={touched.name}
                    />
                    <InputField
                      name="username"
                      placeholder="username"
                      error={errors.username}
                      touched={touched.username}
                    />
                    <InputField
                      name="email"
                      placeholder="email"
                      error={errors.email}
                      touched={touched.email}
                    />
                  </div>
                  <div className="space-y-3">
                    <InputField
                      name="phone"
                      placeholder="phone number"
                      error={errors.phone}
                      touched={touched.phone}
                    />
                    <InputField
                      name="address"
                      placeholder="address"
                      error={errors.address}
                      touched={touched.address}
                      component="textarea"
                    />
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <Button type="submit" variant="secondary">
                    save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  )
}

export default EditProfile

EditProfile.getLayout = (page) => {
  return <CustomerLayout pageTitle="Profile">{page}</CustomerLayout>
}
