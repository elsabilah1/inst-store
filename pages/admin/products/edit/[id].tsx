import AdminLayout from '@/components/layouts/admin/Layout'
import {
  Alert,
  Button,
  DropzoneField,
  InputField,
  Loader,
  SelectField,
} from '@/components/utility'
import { Get } from '@/utils/axios'
import { XIcon } from '@heroicons/react/solid'
import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useProduct } from 'store/product'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { NextPageWithLayout } from '../../../page'

const Schema = z.object({
  name: z.string(),
  buyingPrice: z.string().regex(/^\d+$/),
  sellingPrice: z.string().regex(/^\d+$/),
  stock: z.string().regex(/^\d+$/),
  newCategory: z.string().optional(),
})

const categoryList = ['Guitar', 'Drum']

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const product = await Get(`/products/${ctx.params?.id}`)

  return { props: { product } }
}

interface IProps {
  product: {
    name: string
    category: string
    imageUrl: []
    imageId: []
    buyingPrice: number
    sellingPrice: number
    stock: number
    sold: number
  }
}

const AdminEditProduct: NextPageWithLayout<IProps> = ({ product }) => {
  const router = useRouter()
  const { edit: editProduct, loading, error, success, reset } = useProduct()
  const [category, setCategory] = useState<any>(product.category)
  const [productImages, setProductImages] = useState<any[]>(product.imageUrl)
  const [imageId, setImageId] = useState<any[]>(product.imageId)
  const [imageUrl, setImageUrl] = useState<any[]>(product.imageUrl)

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
      {loading && <Loader />}
      <section className="mt-6 rounded-md bg-white py-8">
        <Formik
          initialValues={{
            name: product.name,
            buyingPrice: product.buyingPrice.toString(),
            sellingPrice: product.sellingPrice.toString(),
            stock: product.stock.toString(),
            newCategory: '',
          }}
          validationSchema={toFormikValidationSchema(Schema)}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form className="flex justify-evenly">
              <div className="space-y-6">
                <InputField
                  name="name"
                  placeholder="name"
                  error={errors.name}
                  touched={touched.name}
                />
                <InputField
                  name="buyingPrice"
                  placeholder="buying price"
                  error={errors.buyingPrice}
                  touched={touched.buyingPrice}
                />
                <InputField
                  name="sellingPrice"
                  placeholder="selling price"
                  error={errors.sellingPrice}
                  touched={touched.sellingPrice}
                />
                <InputField
                  name="stock"
                  placeholder="stock"
                  error={errors.stock}
                  touched={touched.stock}
                />
                <Button type="submit" variant="secondary">
                  save
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 font-medium capitalize"
                  >
                    category
                  </label>
                  <SelectField
                    data={categoryList}
                    selected={category}
                    setSelected={setCategory}
                    placeholder="Pilih kategori"
                  />
                </div>
                <InputField
                  name="newCategory"
                  placeholder="add new category"
                  error={errors.newCategory}
                  touched={touched.newCategory}
                />
                <DropzoneField
                  label="foto"
                  onDrop={onDrop}
                  disabled={productImages.length === 4}
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
