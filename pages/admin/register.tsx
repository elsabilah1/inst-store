import AdminLayout from '@/components/layouts/admin/Layout'
import { Alert, Button, InputField } from '@/components/utility'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
  password: z.string().min(8, 'must contain min 8 character.'),
  confirmPassword: z.string(),
})

const RegisterAdmin: NextPageWithLayout = () => {
  const router = useRouter()
  const { register, loading, error, success, reset } = useAuth()

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        reset()
      }, 4000)
    }

    if (success) {
      router.replace('/admin')
    }
  }, [error, reset, success, router])

  return (
    <>
      <Alert error={error} success={success} />
      <main className="my-6 space-y-6 text-primary">
        <Formik
          initialValues={{
            name: '',
            username: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={toFormikValidationSchema(Schema)}
          onSubmit={(values) =>
            register({
              ...values,
              role: router.query.for === 'supplier' ? 2 : 1,
            })
          }
        >
          {({ errors, touched }) => (
            <Form className="flex w-full flex-col gap-3 rounded-md bg-white px-9 py-6 shadow-md">
              <h3 className="text-xl font-bold">
                Create {router.query.for} account
              </h3>
              <div className="grid gap-3 md:grid-cols-2 md:gap-20">
                <div className="space-y-3">
                  <InputField
                    name="name"
                    placeholder="name"
                    error={errors.name}
                    touched={touched.name}
                    disabled={loading}
                  />
                  <InputField
                    name="username"
                    placeholder="username"
                    error={errors.username}
                    touched={touched.username}
                    disabled={loading}
                  />
                  <InputField
                    name="email"
                    placeholder="email"
                    error={errors.email}
                    touched={touched.email}
                    disabled={loading}
                  />
                  <InputField
                    name="phone"
                    placeholder="phone number"
                    error={errors.phone}
                    touched={touched.phone}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-3">
                  <InputField
                    name="address"
                    placeholder="address"
                    error={errors.address}
                    touched={touched.address}
                    component="textarea"
                    disabled={loading}
                  />
                  <InputField
                    name="password"
                    placeholder="password"
                    error={errors.password}
                    touched={touched.password}
                    secure
                    disabled={loading}
                  />
                  <InputField
                    name="confirmPassword"
                    placeholder="confirm password"
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    secure
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mt-3">
                <Button type="submit" variant="secondary" loading={loading}>
                  register
                </Button>
                <div className="mt-2 flex gap-1 text-sm">
                  <p className="text-primary/75">Register</p>
                  <button
                    type="button"
                    onClick={() =>
                      router.replace(
                        `/admin/register?for=${
                          router.query.for === 'supplier' ? 'admin' : 'supplier'
                        }
                      `
                      )
                    }
                    className="cursor-pointer font-bold hover:text-primary/75 active:text-secondary"
                  >
                    {router.query.for === 'supplier' ? 'admin' : 'supplier'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </>
  )
}

export default RegisterAdmin

RegisterAdmin.getLayout = (page) => {
  return <AdminLayout pageTitle="Register">{page}</AdminLayout>
}
