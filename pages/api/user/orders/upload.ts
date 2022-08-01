import connectDB from '@/lib/db'
import cloudinary from '@/utils/cloudinary'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get((_, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: 'payment_proof',
      },
      process.env.CLOUD_API_SECRET!
    )

    res.status(200).send({
      signature,
      timestamp,
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
    })
  } catch (error) {
    res.status(500).send('Something went wrong.')
  }
})

export default connectDB(handler)
