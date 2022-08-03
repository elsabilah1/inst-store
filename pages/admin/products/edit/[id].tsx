import AdminLayout from '@/components/layouts/admin/Layout'
import {
  Alert,
  Button,
  DropzoneField,
  InputField,
  SelectField,
} from '@/components/utility'
import { Get } from '@/utils/axios'
import { XIcon } from '@heroicons/react/solid'
import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useProduct } from 'store/product'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { NextPageWithLayout } from '../../../page'

const Schema = z.object({
  name: z.string(),
  buyingPrice: z.string().regex(/^\d+$/),
  sellingPrice: z.string().regex(/^\d+$/),
  stock: z.string().regex(/^\d+$/),
  description: z.string(),
  newCategory: z.string().optional(),
})

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const product = await Get(`/products/${ctx.params?.id}`)
  const categories = await Get('/products/categories')

  return { props: { product, categories } }
}

const AdminEditProduct: NextPageWithLayout = ({ product, categories }: any) => {
  const router = useRouter()
  const {
    edit: editProduct,
    loading,
    error: errorProduct,
    success,
    reset,
  } = useProduct()
  const [error, setError] = useState<string>(errorProduct)
  const categoryList = categories.map((item: any) => item.name)
  const [category, setCategory] = useState<any>(product.category)
  const [productImages, setProductImages] = useState<any[]>(product.imageUrl)
  const [imageId, setImageId] = useState<any[]>(product.imageId)
  const [imageUrl, setImageUrl] = useState<any[]>(product.imageUrl)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        reset()
      }, 4000)
    }

    if (success) {
      setTimeout(() => {
        reset()
        router.replace('/admin/products')
      }, 4000)
    }
  }, [error, reset, router, success])

  const onDrop = useCallback((acceptedFiles: any) => {
    const images = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    )
    setProductImages((prev) => [...images, ...prev])
  }, [])

  const handleDelete = (idx: number) => {
    if (typeof productImages[idx] === 'string') {
      setImageUrl((prev) => prev.filter((url) => url !== productImages[idx]))
      setImageId((prev) =>
        prev.filter((id) => !productImages[idx].includes(id))
      )
    }
    setProductImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = (values: any) => {
    if (values.newCategory) {
      const catDefined = categories.find(
        (item: any) => item.name === values.newCategory.toLowerCase()
      )

      if (catDefined) {
        setError(`Category "${values.newCategory}" has been defined.`)
        return
      }
    }

    const formData = {
      ...values,
      category,
      imageId,
      imageUrl,
    }

    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }

    productImages.map((file) => data.append(file.name, file))

    editProduct({ id: router.query.id, data })
  }

  return (
    <>
      <Alert error={error} success={success} />
      <section className="mx-auto mt-6 max-w-screen-md rounded-md bg-white py-8 px-20">
        <Formik
          initialValues={{
            name: product.name,
            buyingPrice: product.buyingPrice.toString(),
            sellingPrice: product.sellingPrice.toString(),
            stock: product.stock.toString(),
            description: product.description.toString(),
            newCategory: '',
          }}
          validationSchema={toFormikValidationSchema(Schema)}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form className="grid gap-3 md:gap-4">
              <InputField
                name="name"
                placeholder="name"
                error={errors.name}
                touched={touched.name}
                disabled={loading}
              />
              <InputField
                name="buyingPrice"
                placeholder="buying price"
                error={errors.buyingPrice}
                touched={touched.buyingPrice}
                disabled={loading}
              />
              <InputField
                name="sellingPrice"
                placeholder="selling price"
                error={errors.sellingPrice}
                touched={touched.sellingPrice}
                disabled={loading}
              />
              <InputField
                name="stock"
                placeholder="stock"
                error={errors.stock}
                touched={touched.stock}
                disabled={loading}
              />

              <div>
                <label htmlFor="category" className="mb-2 block font-medium">
                  Select an Available Category
                </label>
                <SelectField
                  data={categoryList}
                  selected={category}
                  setSelected={setCategory}
                  placeholder="select an available category"
                  disabled={loading}
                />
              </div>
              <InputField
                name="newCategory"
                placeholder="add new category"
                error={errors.newCategory}
                touched={touched.newCategory}
                disabled={loading}
              />
              <InputField
                name="description"
                placeholder="description"
                error={errors.description}
                touched={touched.description}
                component="textarea"
                disabled={loading}
              />

              <div className="flex items-end gap-3">
                <DropzoneField
                  label="foto"
                  onDrop={onDrop}
                  disabled={productImages.length === 4 || loading}
                />
                <div className="grid grid-cols-4 gap-1">
                  {productImages?.map((file: any, idx: any) => (
                    <div className="relative h-20 w-20" key={idx}>
                      <Image
                        src={file.preview ?? file}
                        layout="fill"
                        alt="product image"
                        objectFit="contain"
                      />
                      <button
                        type="button"
                        className="absolute z-50 h-full w-full cursor-pointer rounded-sm bg-danger/20 opacity-0 transition-all hover:opacity-100"
                        onClick={() => handleDelete(idx)}
                      >
                        <XIcon className="text-danger" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                variant="secondary"
                loading={loading}
                disabled={productImages.length === 0}
              >
                save
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  )
}

export default AdminEditProduct

AdminEditProduct.getLayout = (page) => {
  return <AdminLayout pageTitle="Edit Product">{page}</AdminLayout>
}
