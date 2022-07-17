import AuthLayout from '@/components/layouts/auth/Layout'
import { Button, InputField } from '@/components/utility'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'store/auth'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { NextPageWithLayout } from './page'

const Schema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email('invalid email.'),
  phone: z.string(),
  address: z.string(),
  password: z.string().min(8, 'must contain min 8 character.'),
  confirmPassword: z.string(),
})

const Register: NextPageWithLayout = () => {
  const router = useRouter()
  const { status, data: session } = useSession()
  const { register, loading } = useAuth()

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.role === 1) {
        router.replace(`/admin`)
      } else {
        router.replace('/')
      }
    }
  }, [router, session?.role, status])

  return (
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
      onSubmit={(values) => register(values)}
    >
      {({ errors, touched }) => (
        <Form className="mx-3 my-3 flex w-full max-w-screen-md flex-col gap-3 rounded-md bg-white px-9 py-6 shadow-md">
          <h3 className="mb-8 text-4xl font-bold">Create account</h3>
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
              <p className="text-primary/75">Already have an account?</p>
              <button
                type="button"
                onClick={() => router.replace('/login')}
                className="cursor-pointer font-bold hover:text-primary/75 active:text-secondary"
              >
                Sign in
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Register

Register.getLayout = (page) => {
  return <AuthLayout pageTitle="Register">{page}</AuthLayout>
}
