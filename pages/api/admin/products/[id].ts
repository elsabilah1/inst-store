import connectDB from '@/lib/db'
import Product from '@/lib/models/Product'
import cloudinary from '@/utils/cloudinary'
import getFormData from '@/utils/getFormData'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.put(async (req, res) => {
  const session = await getSession({ req })
  try {
    if (session?.role === 1) {
      const selectedProduct = await Product.findById(req.query.id)

      const fData = await getFormData(req)
      const {
        name,
        category,
        buyingPrice,
        sellingPrice,
        stock,
        imageId,
        imageUrl,
      } = fData.fields
      const keys = Object.keys(fData.files)

      const toKeepImageId = imageId.split(',')
      const toKeepImageUrl = imageUrl.split(',')

      const uploadedImages: any = await Promise.all(
        keys.map(async (key: any) => {
          const res = await cloudinary.uploader.upload(
            fData.files[key].filepath,
            {
              upload_preset: 'store_images',
              folder: 'products',
            }
          )
          return { imageUrl: res.secure_url, imageId: res.public_id }
        })
      )

      if (toKeepImageId) {
        const toDeleteImage = selectedProduct.imageId.filter((id: any) => {
          if (!toKeepImageId.find((idImg: any) => idImg === id)) {
            return id
          }
        })

        toDeleteImage?.forEach(async (id: any) => {
          await cloudinary.uploader.destroy(id)
        })
      }

      const newImageUrl =
        uploadedImages?.map((file: any) => file.imageUrl) ?? []
      const newImageId = uploadedImages?.map((file: any) => file.imageId) ?? []

      await Product.findByIdAndUpdate(req.query.id, {
        name,
        category,
        buyingPrice,
        sellingPrice,
        stock,
        imageUrl: newImageUrl.concat(toKeepImageUrl),
        imageId: newImageId.concat(toKeepImageId),
      })

      res.status(200).send({ message: 'Product updated successfully.' })
    }
    throw new Error('Unauthorized')
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

handler.delete(async (req, res) => {
  const session = await getSession({ req })
  try {
    if (session?.role === 1) {
      const selectedProduct = await Product.findById(req.query.id)

      selectedProduct.imageId.forEach(async (item: any) => {
        await cloudinary.uploader.destroy(item)
      })

      await Product.findByIdAndDelete(req.query.id)

      res.status(200).send({ message: 'Product deleted successfully' })
    }
    throw new Error('Unauthorized')
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default connectDB(handler)
