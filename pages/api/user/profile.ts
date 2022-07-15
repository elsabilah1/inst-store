import connectDB from '@/lib/db'
import User from '@/lib/models/User'
import cloudinary from '@/utils/cloudinary'
import getFormData from '@/utils/getFormData'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const user = await User.findById(req.query.id)

    res.status(200).send({ user })
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

handler.put(async (req, res) => {
  const session = await getSession({ req })

  try {
    if (session?.role === 0) {
      const user = await User.findById(session.id)
      const fData = await getFormData(req)
      const { name, username, email, phone, address } = fData.fields
      const { avatar } = fData.files

      let image = { imageId: user.imageId, imageUrl: user.imageUrl }

      if (avatar) {
        if (user.imageId !== 'avatars/empty_avatar') {
          await cloudinary.uploader.destroy(user.imageId)
        }

        const res = await cloudinary.uploader.upload(avatar.filepath, {
          upload_preset: 'store_images',
          folder: 'avatars',
        })

        image = { imageId: res.public_id, imageUrl: res.secure_url }
      }

      await User.findByIdAndUpdate(session.id, {
        name,
        username,
        email,
        phone,
        address,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      })

      return res
        .status(200)
        .send({ message: 'your profile updated successfully.' })
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
