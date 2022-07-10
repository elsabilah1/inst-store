import connectDB from '@/lib/db'
import Product from '@/lib/models/Product'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const data = await Product.find()
    return res.status(200).send(data)
  } catch (error: any) {
    res.status(error.status).send(error)
  }
})

export default connectDB(handler)
