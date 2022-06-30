import AuthLayout from '@/components/layouts/auth/Layout'
import { Button, InputField } from '@/components/utility'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useAuth } from 'store/auth'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { NextPageWithLayout } from './page'

const Schema = z.object({
  emailOrUsername: z.string(),
  password: z.string(),
})

const Login: NextPageWithLayout = () => {
  const router = useRouter()
  const { logIn } = useAuth()

  const { status, data } = useSession()
  if (status === 'authenticated') {
    if (data?.role === 1) {
      router.replace(`/dashboard`)
    } else {
      router.replace('/')
    }
  }

  return (
    <Formik
      initialValues={{
        emailOrUsername: '',
        password: '',
      }}
      validationSchema={toFormikValidationSchema(Schema)}
      onSubmit={(values) => logIn(values)}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-3 rounded-md bg-white px-9 py-6 shadow-md">
          <h3 className="mb-8 text-4xl font-bold">Sign-In</h3>
          <InputField
            name="emailOrUsername"
            placeholder="username/email"
            error={errors.emailOrUsername}
            touched={touched.emailOrUsername}
          />
          <InputField
            name="password"
            placeholder="password"
            error={errors.password}
            touched={touched.password}
            secure
          />

          <div className="mt-3">
            <Button type="submit" variant="secondary">
              Sign In
            </Button>
            <div className="mt-2 text-sm">
              <p className="text-primary/75">Don&apos;t have an account yet?</p>
              <button
                type="button"
                onClick={() => router.replace('/register')}
                className="cursor-pointer font-bold hover:text-primary/75 active:text-secondary"
              >
                Create an Account
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Login

Login.getLayout = (page) => {
  return <AuthLayout pageTitle="Login">{page}</AuthLayout>
}