import connectDB from '@/lib/db'
import Category from '@/lib/models/Category'
import Product from '@/lib/models/Product'
import cloudinary from '@/utils/cloudinary'
import getFormData from '@/utils/getFormData'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  const session = await getSession({ req })
  try {
    if (session?.role === 1) {
      const fData: any = await getFormData(req)
      const {
        name,
        category: cat,
        description,
        newCategory,
        buyingPrice,
        sellingPrice,
        stock,
      } = fData.fields
      const keys = Object.keys(fData.files)

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

      const imageUrl = uploadedImages.map((file: any) => file.imageUrl)
      const imageId = uploadedImages.map((file: any) => file.imageId)

      let category
      if (newCategory) {
        await Category.create({ name: newCategory.toLowerCase() })
        category = newCategory.toLowerCase()
      } else {
        category = cat
      }

      await Product.create({
        name,
        category,
        description,
        buyingPrice,
        sellingPrice,
        stock,
        imageUrl,
        imageId,
      })

      return res.status(201).send({ message: 'Product created successfully.' })
    }
    throw new Error('Unauthorized')
  } catch (error: any) {
    console.log(error)

    res.status(error.status).send(error)
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default connectDB(handler)
